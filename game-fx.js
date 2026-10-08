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


// The speaker buttons are a four-step volume control, not a toggle. The level lives on the
// button as data-vol and game.css fades the unlit bars, so this only has to set an attribute --
// and because both buttons read the same level, they can never disagree.
const VOL_LABELS = ['game.volMute', 'game.volLow', 'game.volMedium', 'game.volFull'];
function syncSoundButtons(level) {
    [
        document.getElementById('sound-toggle'),
        document.getElementById('board-sound-toggle'),
    ].forEach((btn) => {
        if (!btn) return;
        btn.dataset.vol = String(level);
        btn.classList.toggle('on', level > 0);
        const label = window.t(VOL_LABELS[level]);
        btn.title = label;
        btn.setAttribute('aria-label', label);
    });
}
document.getElementById('sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.cycleLevel()));
document.getElementById('board-sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.cycleLevel()));
// The stored level is read in game-audio.js before this runs, so the buttons start correct even
// when it is not the 3 the markup ships with.
syncSoundButtons(GameAudio.getLevel());

