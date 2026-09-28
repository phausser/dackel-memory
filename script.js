'use strict';

const descriptions = [
  'Roter Kurzhaardackel', 'Schwarz-roter Kurzhaardackel',
  'Schokobrauner Kurzhaardackel', 'Cremefarbener Langhaardackel',
  'Rauhaardackel mit struppigem Bart', 'Silberner Tigerdackel',
  'Roter Langhaardackel', 'Schwarz-roter Langhaardackel', 'Brauner Tigerdackel',
  'Weiß-brauner Scheckendackel', 'Heller Rauhaardackel', 'Schokobrauner Langhaardackel',
  'Roter Senior mit grauer Schnauze', 'Dunkler Rauhaardackel',
  'Cremefarbener Dackel mit dunklen Ohrspitzen', 'Zobelfarbener Langhaardackel',
  'Schwarz-weißer Scheckendackel', 'Rotbrauner Rauhaardackel'
];
const motifs = descriptions.map((description, index) => ({
  id: index + 1, description,
  src: `assets/images/dackel-${String(index + 1).padStart(2, '0')}.webp`
}));
const PAIRS = 12;
const board = document.querySelector('#board');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');
const state = { cards: [], first: null, second: null, moves: 0, pairs: 0,
  locked: true, timer: null, generation: 0 };

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function loadImage(motif) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeout = setTimeout(() => finish(false), 15000);
    function finish(ok) {
      clearTimeout(timeout);
      image.onload = image.onerror = null;
      if (ok) resolve(); else reject(new Error(motif.src));
    }
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = motif.src;
  });
}

function render() {
  document.querySelector('#moves').textContent = state.moves;
  document.querySelector('#pairs').textContent = `${state.pairs} / ${PAIRS}`;
  state.cards.forEach((card, index) => {
    const open = card.matched || card === state.first || card === state.second;
    card.button.classList.toggle('open', open);
    card.button.classList.toggle('matched', card.matched);
    card.button.setAttribute('aria-label', `Karte ${index + 1}, ${open ? card.motif.description : 'verdeckt'}${card.matched ? ', Paar gefunden' : ''}`);
    card.button.setAttribute('aria-disabled', String(state.locked || open));
  });
}

function choose(card) {
  if (state.locked || card.matched || card === state.first) return;
  if (!state.first) {
    state.first = card;
    status.textContent = 'Eine Karte ist offen. Finde den passenden Dackel.';
  } else {
    state.second = card;
    state.moves++;
    if (state.first.motif.id === card.motif.id) {
      state.first.matched = card.matched = true;
      state.pairs++;
      state.first = state.second = null;
      status.textContent = state.pairs === PAIRS
        ? `Geschafft! Du hast alle ${PAIRS} Paare in ${state.moves} Zügen gefunden. Spiele mit „Neues Spiel“ noch eine Runde.`
        : `Paar gefunden! ${state.pairs} von ${PAIRS} Paaren.`;
    } else {
      state.locked = true;
      status.textContent = 'Diese Dackel passen nicht zusammen. Merke dir ihre Plätze!';
      state.timer = setTimeout(() => {
        state.first = state.second = null;
        state.locked = false;
        state.timer = null;
        status.textContent = 'Wähle wieder zwei Karten.';
        render();
      }, 1000);
    }
  }
  render();
}

async function newGame() {
  const generation = ++state.generation;
  clearTimeout(state.timer);
  Object.assign(state, { cards: [], first: null, second: null, moves: 0,
    pairs: 0, locked: true, timer: null });
  board.replaceChildren();
  board.setAttribute('aria-busy', 'true');
  retry.hidden = true;
  status.textContent = 'Dackelbilder werden geladen …';
  render();
  const selected = shuffled(motifs).slice(0, PAIRS);
  try {
    await Promise.all(selected.map(loadImage));
    if (generation !== state.generation) return;
    state.cards = shuffled(selected.flatMap(motif => [0, 1].map(copy => ({
      id: `${motif.id}-${copy}`, motif, matched: false
    }))));
    for (const card of state.cards) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'card';
      button.id = `card-${card.id}`;
      const image = document.createElement('img');
      image.src = card.motif.src;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      image.draggable = false;
      button.append(image);
      button.addEventListener('click', () => choose(card));
      card.button = button;
      board.append(button);
    }
    state.locked = false;
    status.textContent = 'Los geht’s! Decke zwei Karten auf.';
    render();
  } catch {
    if (generation !== state.generation) return;
    status.textContent = 'Die Dackelbilder konnten nicht geladen werden. Bitte versuche es erneut.';
    retry.hidden = false;
  } finally {
    if (generation === state.generation) board.setAttribute('aria-busy', 'false');
  }
}

document.querySelector('#restart').addEventListener('click', newGame);
retry.addEventListener('click', () => {
  document.querySelector('#restart').focus();
  newGame();
});
newGame();
