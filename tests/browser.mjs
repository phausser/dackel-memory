// Requires a local HTTP server on :8000 and Chromium with remote debugging on :9222.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const pages = await (await fetch('http://127.0.0.1:9222/json')).json();
const ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', ({data}) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params);
  if (pending.has(message.id)) {
    const {resolve, reject} = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(message.error) : resolve(message.result);
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    pending.set(++id, {resolve, reject});
    ws.send(JSON.stringify({id, method, params}));
  });
}
async function run(expression) {
  const r = await send('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
const pause = ms => new Promise(r => setTimeout(r, ms));
async function ready() {
  for (let i = 0; i < 100; i++) {
    if (await run('document.querySelectorAll(".card").length === 24')) return;
    await pause(50);
  }
  throw new Error('Game failed to load');
}
try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', {url:'http://127.0.0.1:8000/'});
  await ready();
  assert.deepEqual(await run(`({count: state.cards.length, motifs: new Set(state.cards.map(c=>c.motif.id)).size, paired: motifs.every(m=>[0,2].includes(state.cards.filter(c=>c.motif.id===m.id).length)), hidden: [...board.children].every(b=>b.getAttribute('aria-label').endsWith('verdeckt'))})`), {count:24,motifs:12,paired:true,hidden:true});
  await run('state.cards[0].button.focus()');
  await send('Input.dispatchKeyEvent', {type:'keyDown', key:'Enter', code:'Enter', windowsVirtualKeyCode:13, text:'\r'});
  await send('Input.dispatchKeyEvent', {type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13});
  assert.equal(await run('!!state.first'), true);
  await run('state.first.button.click()');
  assert.equal(await run('state.moves'), 0);
  await run('state.cards.find(c=>c.motif.id!==state.first.motif.id).button.click(); state.cards.find(c=>c!==state.first && c!==state.second).button.click()');
  assert.equal(await run('document.querySelectorAll(".open").length'), 2);
  assert.equal(await run('state.moves'), 1);
  await pause(1100);
  assert.equal(await run('document.querySelectorAll(".open").length'), 0);
  for (const open of [0,1,2]) {
    await run('newGame()');
    await ready();
    if(open) await run('state.cards[0].button.click()');
    if(open===2) await run('state.cards.find(c=>c.motif.id!==state.first.motif.id).button.click()');
    await run('newGame()');
    await ready();
    await pause(1100);
    assert.deepEqual(await run('[state.moves,state.pairs,document.querySelectorAll(".open").length,state.locked]'), [0,0,0,false]);
  }
  await run(`for (const m of motifs) { for(const c of state.cards.filter(c=>c.motif.id===m.id)) c.button.click(); }`);
  assert.equal(await run('state.pairs'),12);
  assert.equal(await run('state.moves'),12);
  assert.equal(await run('status.textContent.includes("Geschafft!")'),true);
  await run('state.cards[0].button.click()');
  assert.equal(await run('state.moves'),12);
  await run('newGame()');
  await ready();
  const selections = new Set();
  for(let i=0;i<5;i++) {
    await run('newGame()');
    await ready();
    selections.add(await run('state.cards.map(c=>c.motif.id).sort((a,b)=>a-b).join()'));
  }
  assert.ok(selections.size>1);
  for(const width of [320,375,768,1280]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    const layout = await run('({columns:getComputedStyle(board).gridTemplateColumns.split(" ").length,overflow:document.documentElement.scrollWidth>innerWidth})');
    assert.equal(layout.columns,width<600?4:6);
    assert.equal(layout.overflow,false);
    if(width===375) {
      await run('state.cards[0].button.click()');
      const shot=await send('Page.captureScreenshot',{format:'png'});
      await writeFile('/tmp/dackel-mobile.png',Buffer.from(shot.data,'base64'));
      await run('newGame()');
      await ready();
    }
  }
  await send('Emulation.setTouchEmulationEnabled',{enabled:true});
  const point=await run('(()=>{const r=state.cards[0].button.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()');
  await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
  await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.equal(await run('!!state.first'),true);
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  assert.equal(await run('getComputedStyle(state.cards[0].button).transitionDuration'),'0s');
  await run('globalThis.savedPaths = motifs.map(m=>m.src); motifs.forEach(m=>m.src="assets/images/missing.webp"); newGame()');
  assert.equal(await run('retry.hidden'),false);
  assert.equal(await run('board.children.length'),0);
  await run('motifs.forEach((m,i)=>m.src=savedPaths[i]); retry.click()');
  await ready();
  assert.equal(await run('retry.hidden'),true);
  assert.equal(errors.length,0);
  console.log('PASS: deck, random selection, keyboard, touch, matches, mismatch lock, restart timers, win, image failure/retry, responsive layout, reduced motion; no JS errors.');
} finally { ws.close(); }
