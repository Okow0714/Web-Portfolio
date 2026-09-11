// Word Match — board DOM handles, the particle canvases, and the effect helpers
//
// (tween, floating score text) plus the sound toggles.
//
// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.

const gameMain = document.querySelector('.game-main');
const boardWrapEl = document.getElementById('board-wrap');
const fxTextLayer = document.getElementById('fx-text-layer');
const ambientField = new ParticleField(document.getElementById('ambient-canvas'), gameMain);
const fxField = new ParticleField(document.getElementById('fx-canvas'), gameMain);
ambientField.spawnAmbient(50);

function resizeCanvases() { ambientField.resize(); fxField.resize(); }
window.addEventListener('resize', resizeCanvases);
if (window.ResizeObserver) {
    new ResizeObserver(() => resizeCanvases()).observe(gameMain);
}

let lastFrameT = performance.now();
function fxLoop(t) {
    const dt = Math.min((t - lastFrameT) / 1000, 0.05);
    lastFrameT = t;
    ambientField.update(dt); ambientField.draw();
    fxField.update(dt); fxField.draw();
    requestAnimationFrame(fxLoop);
}
requestAnimationFrame(fxLoop);

function centerOf(el) {
    const r = el.getBoundingClientRect();
    const mainRect = gameMain.getBoundingClientRect();
    return { x: r.left + r.width / 2 - mainRect.left, y: r.top + r.height / 2 - mainRect.top };
}

function tween(from, to, duration, onUpdate) {
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        onUpdate(from + (to - from) * ease(t));
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function floatText(x, y, text, big, lightning, extraClass) {
    const el = document.createElement('div');
    el.className = 'float-text' + (big ? ' streak-text' : '') + (lightning ? ' lightning-text' : '') + (extraClass ? ' ' + extraClass : '');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = big ? '1.5rem' : '1.05rem';
    el.textContent = text;
    fxTextLayer.appendChild(el);
    window.setTimeout(() => el.remove(), 1150);
}


function syncSoundButtons(on) {
    [
        [document.getElementById('sound-toggle'), document.getElementById('sound-icon')],
        [document.getElementById('board-sound-toggle'), document.getElementById('board-sound-icon')],
    ].forEach(([btn, icon]) => {
        btn.classList.toggle('on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.title = on ? window.t('game.soundOff') : window.t('game.soundOn');
        icon.textContent = on ? '\u{1F50A}' : '\u{1F507}';
    });
}
document.getElementById('sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));
document.getElementById('board-sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));

