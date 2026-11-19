// settings.html (2026-11-19): the account's own Settings page, three tabs.
//
// Several controls here are driven by auth-shared.js by id, exactly as they were in the old Settings
// pop-up -- the furigana buttons, Darker, the tours reset and the whole danger zone -- so this file
// does not touch them. What it adds: the tabs, language and day/night, every sound choice
// (audio-prefs.js), the two device menus, and the account section.
//
// Module script: nothing here is a global, and it runs after auth-shared.js has made the client.

const sb = window.supabaseClient;
const A = window.KhanAudio;
const t = (k) => (window.t ? window.t(k) : k);
const tf = (k, v) => (window.tf ? window.tf(k, v) : k);
const $ = (id) => document.getElementById(id);

// ------------------------------------------------------------------ tabs
const TABS = ['display', 'audio', 'account'];
const tabBtns = TABS.map(n => $('set-t-' + n));
function openTab(name, focus) {
    TABS.forEach((n, i) => {
        const on = n === name;
        tabBtns[i].setAttribute('aria-selected', String(on));
        tabBtns[i].tabIndex = on ? 0 : -1;
        $('set-' + n).hidden = !on;
    });
    if (focus) tabBtns[TABS.indexOf(name)].focus();
    // the address remembers the tab, so a link can open one ("settings.html#account")
    if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
}
tabBtns.forEach((b, i) => {
    b.addEventListener('click', () => openTab(TABS[i]));
    b.addEventListener('keydown', (e) => {
        const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -i : e.key === 'End' ? TABS.length - 1 - i : 0;
        if (!step) return;
        e.preventDefault();
        openTab(TABS[(i + step + TABS.length) % TABS.length], true);
    });
});
openTab(TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'display');

// ------------------------------------------------------------------ shared bits
function paint(group, value) {
    group.querySelectorAll('button[data-v]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(value))));
}
function onPick(group, fn) {
    group.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-v]');
        if (b) fn(b.dataset.v);
    });
}
function say(id, text) { const el = $(id); if (el) el.textContent = text || ''; }
// spoken names written in the page's first language are swapped with the rest of the page
function relabel() {
    document.querySelectorAll('[data-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.aria)));
    const toolName = { game: 'nav.wordGame', grammar: 'nav.grammarConnect', phonetics: 'nav.phoneticsFamily' };
    document.querySelectorAll('[data-vol]').forEach(g => {
        const [tool, kind] = g.dataset.vol.split(':');
        g.setAttribute('aria-label', t(toolName[tool]) + ': ' + t(kind === 'music' ? 'set.music' : 'set.sounds'));
    });
}
document.addEventListener('sitelangchange', () => { relabel(); paintAll(); renderAccount(window.getCurrentSession && window.getCurrentSession()); });

// ------------------------------------------------------------------ language and display
const langGroup = $('set-lang'), themeGroup = $('set-theme');
onPick(langGroup, (v) => window.setSiteLang && window.setSiteLang(v));
onPick(themeGroup, (v) => window.setTheme && window.setTheme(v || null));
document.addEventListener('themechange', () => paint(themeGroup, (window.getTheme && window.getTheme()) || ''));

// ------------------------------------------------------------------ audio
const flowNote = $('set-flow-note');
document.querySelectorAll('[data-vol]').forEach(g => {
    const [tool, kind] = g.dataset.vol.split(':');
    onPick(g, (v) => { A.setLevel(tool, kind, +v); paint(g, v); });
});
onPick($('set-select'), (v) => { A.setSelectMusic(v); paint($('set-select'), v); });
onPick($('set-flow'), (v) => { A.setFlow(v); paintAll(); });
onPick($('set-tts'), (v) => { A.setTtsSpeed(v); paint($('set-tts'), v); });

function paintAll() {
    paint(langGroup, window.siteLang ? window.siteLang() : 'mn');
    paint(themeGroup, (window.getTheme && window.getTheme()) || '');
    if (!A) return;
    document.querySelectorAll('[data-vol]').forEach(g => { const [tool, kind] = g.dataset.vol.split(':'); paint(g, A.level(tool, kind)); });
    paint($('set-select'), A.selectMusic());
    paint($('set-flow'), A.flow());
    flowNote.textContent = t(A.flow() === 'sparse' ? 'set.flowSparseNote' : 'set.flowLoopNote');
    paint($('set-tts'), A.ttsSpeed());
}

// ---- the two devices. Their names only appear once the browser has let the site use a
// microphone, so the menus start as "Device default" and fill after Show my devices or a test.
const md = navigator.mediaDevices;
const selMic = $('set-mic'), selSpk = $('set-spk'), bar = $('set-meter');
function option(value, text) { const o = document.createElement('option'); o.value = value; o.textContent = text; return o; }
async function listDevices() {
    if (!md || !md.enumerateDevices) return 0;
    const all = await md.enumerateDevices();
    const fill = (sel, kind, chosen) => {
        const devs = all.filter(d => d.kind === kind && d.label && d.deviceId !== 'default' && d.deviceId !== 'communications');
        sel.replaceChildren(option('', t('set.deviceDefault')), ...devs.map(d => option(d.deviceId, d.label)));
        // a device chosen earlier stays selected even while its name is still hidden
        if (chosen && !devs.some(d => d.deviceId === chosen)) sel.append(option(chosen, '• ' + t(kind === 'audioinput' ? 'set.mic' : 'set.spk')));
        sel.value = chosen || '';
        return devs.length;
    };
    const mics = fill(selMic, 'audioinput', A.mic());
    const spks = fill(selSpk, 'audiooutput', A.speaker());
    const canRoute = (window.AudioContext && 'setSinkId' in AudioContext.prototype) || ('setSinkId' in HTMLMediaElement.prototype);
    say('set-spk-msg', !canRoute ? t('set.spkFixed') : spks ? '' : t('set.spkWait'));
    return mics;
}
selMic.addEventListener('change', () => A.setMic(selMic.value));
selSpk.addEventListener('change', () => A.setSpeaker(selSpk.value));
if (md && md.addEventListener) md.addEventListener('devicechange', listDevices);

async function askMic(deviceId) {
    try { return await md.getUserMedia({ audio: deviceId ? { deviceId: { exact: deviceId } } : true }); }
    catch (e) { say('set-mic-msg', t('set.micDenied')); return null; }
}
$('set-mic-allow').addEventListener('click', async () => {
    if (!md || !md.getUserMedia) { say('set-mic-msg', t('set.micNone')); return; }
    const s = await askMic(''); if (!s) return;
    s.getTracks().forEach(tr => tr.stop());
    const n = await listDevices();
    say('set-mic-msg', tf('set.micFound', { n }));
});
let testing = false;
$('set-mic-test').addEventListener('click', async () => {
    if (testing) return;
    if (!md || !md.getUserMedia) { say('set-mic-msg', t('set.micNone')); return; }
    const stream = await askMic(selMic.value); if (!stream) return;
    testing = true;
    await listDevices();
    say('set-mic-msg', tf('set.micListening', { name: stream.getAudioTracks()[0].label || t('set.deviceDefault') }));
    const ac = new AudioContext(), an = ac.createAnalyser();
    ac.createMediaStreamSource(stream).connect(an);
    const buf = new Uint8Array(an.fftSize), end = performance.now() + 5000;
    (function tick() {
        an.getByteTimeDomainData(buf);
        let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v - 128));
        bar.style.width = Math.min(100, peak / 0.9) + '%';
        if (performance.now() < end) { requestAnimationFrame(tick); return; }
        stream.getTracks().forEach(tr => tr.stop()); ac.close(); bar.style.width = '0'; testing = false;
        say('set-mic-msg', t('set.micDone'));
    })();
});
$('set-ping').addEventListener('click', async () => {
    const ac = new AudioContext();
    A.useSpeaker(ac);
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = 660;
    g.gain.setValueAtTime(0.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ac.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.5);
    o.connect(g).connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.55);
    o.onended = () => ac.close();
    say('set-spk-msg', tf('set.pinged', { name: selSpk.value ? selSpk.options[selSpk.selectedIndex].text : t('set.defaultSpeaker') }));
});

// ------------------------------------------------------------------ account
let uid = null;
$('set-login').addEventListener('click', () => window.openAuthModal && window.openAuthModal());

async function renderAccount(session) {
    const signedIn = !!session;
    $('set-signedout').hidden = signedIn;
    $('set-signedin').hidden = !signedIn;
    if (!signedIn) { uid = null; return; }
    const first = uid !== session.user.id;
    uid = session.user.id;
    $('set-email-now').textContent = session.user.email || '';
    // sign-in methods, and whether this account has a password at all
    const providers = [...new Set((session.user.identities || []).map(i => i.provider))];
    const linked = $('set-linked');
    linked.replaceChildren(...providers.map(p => { const c = document.createElement('span'); c.className = 'set-chip is-on'; c.textContent = p === 'email' ? t('auth.email') : p.charAt(0).toUpperCase() + p.slice(1); return c; }));
    const hasPassword = providers.includes('email');
    $('set-pass-note').textContent = t(hasPassword ? 'set.passNote' : 'set.passNoteOauth');
    $('set-pass-save').textContent = t(hasPassword ? 'set.passChange' : 'set.passSet');
    paintAva();
    if (!first) return;
    loadAccountRows();
    renderMfa();
}
window.onAuthChange((session) => renderAccount(session));
document.addEventListener('avatarchange', paintAva);

function paintAva() {
    const ava = $('set-ava');
    const src = (() => { try { const c = JSON.parse(localStorage.getItem('khanjp-avatar') || 'null'); return c && c.uid === uid ? c.src : null; } catch (e) { return null; } })();
    ava.style.backgroundImage = src ? 'url("' + src.replace(/"/g, '') + '")' : '';
    const s = window.getCurrentSession && window.getCurrentSession();
    ava.textContent = src ? '' : ((($('set-name').value || (s && s.user.email) || '?').trim()[0]) || '?').toUpperCase();
}

async function loadAccountRows() {
    if (!window.supabaseReady || !uid) return;
    try {
        const { data } = await sb.from('profiles').select('display_name').eq('id', uid).maybeSingle();
        $('set-name').value = (data && data.display_name) || '';
        paintAva();
    } catch (e) { /* offline */ }
    try {
        const { data, error } = await sb.from('user_settings').select('phone').eq('user_id', uid).maybeSingle();
        if (!error) $('set-phone').value = (data && data.phone) || '';
    } catch (e) { /* the column arrives with migration 013 */ }
}

// ---- profile picture: resized here to a 160px square JPEG (about 8-15 KB) and kept on the
// account's own user_settings row, so no storage bucket is needed (migration 013)
const AVA_SIZE = 160;
async function toAvatar(file) {
    const img = await createImageBitmap(file);
    const side = Math.min(img.width, img.height);
    const c = document.createElement('canvas'); c.width = c.height = AVA_SIZE;
    c.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, AVA_SIZE, AVA_SIZE);
    return c.toDataURL('image/jpeg', 0.85);
}
async function saveAvatar(src) {
    const { error } = await sb.from('user_settings').upsert({ user_id: uid, avatar: src }, { onConflict: 'user_id' });
    if (error) { say('set-pic-msg', t('set.picFailed')); return false; }
    window.khanjpSetAvatar(uid, src);
    say('set-pic-msg', t('set.saved'));
    return true;
}
$('set-pic-file').addEventListener('change', async (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f || !uid) return;
    let src;
    try { src = await toAvatar(f); } catch (err) { say('set-pic-msg', t('set.picBad')); return; }
    await saveAvatar(src);
});
$('set-pic-rm').addEventListener('click', () => uid && saveAvatar(null));

// ---- name, email, password, phone
$('set-name-save').addEventListener('click', async () => {
    const name = $('set-name').value.trim().slice(0, 40);
    if (!name || !uid) return;
    const { error } = await sb.from('profiles').update({ display_name: name }).eq('id', uid);
    say('set-name-msg', t(error ? 'set.saveFailed' : 'set.saved'));
    paintAva();
});
$('set-email-save').addEventListener('click', async () => {
    const email = $('set-email').value.trim();
    if (!email) return;
    const { error } = await sb.auth.updateUser({ email });
    say('set-email-msg', error ? error.message : t('set.emailSent'));
});
$('set-pass-save').addEventListener('click', async () => {
    const p1 = $('set-pass1').value, p2 = $('set-pass2').value;
    if (p1.length < 6) { say('set-pass-msg', t('set.passNote')); return; }
    if (p1 !== p2) { say('set-pass-msg', t('set.passMismatch')); return; }
    const { error } = await sb.auth.updateUser({ password: p1 });
    say('set-pass-msg', error ? error.message : t('set.passDone'));
    if (!error) { $('set-pass1').value = ''; $('set-pass2').value = ''; }
});
$('set-phone-save').addEventListener('click', async () => {
    const phone = $('set-phone').value.trim();
    if (phone && !/^\+?[0-9 ()-]{6,24}$/.test(phone)) { say('set-phone-msg', t('set.phoneBad')); return; }
    const { error } = await sb.from('user_settings').upsert({ user_id: uid, phone: phone || null }, { onConflict: 'user_id' });
    say('set-phone-msg', t(error ? 'set.saveFailed' : 'set.saved'));
});

// ---- two-step verification: Supabase's TOTP. Turning it on enrols an authenticator app and
// confirms one code from it; sign-in then asks for a code (auth-shared.js) and migration 013 keeps
// the account's data from a session that has not given one.
let pendingFactor = null;
async function factors() {
    const { data, error } = await sb.auth.mfa.listFactors();
    if (error) throw error;
    return data;
}
async function renderMfa() {
    const state = $('set-mfa-state'), btn = $('set-mfa-toggle');
    if (!sb.auth || !sb.auth.mfa) { btn.disabled = true; say('set-mfa-msg', t('set.mfaUnavailable')); return; }
    try {
        const on = (await factors()).totp.some(f => f.status === 'verified');
        state.textContent = t(on ? 'set.mfaOn' : 'set.mfaOff');
        state.classList.toggle('is-on', on);
        btn.textContent = t(on ? 'set.mfaTurnOff' : 'set.mfaTurnOn');
        btn.dataset.on = on ? '1' : '';
        btn.disabled = false;
    } catch (e) { btn.disabled = true; say('set-mfa-msg', t('set.mfaUnavailable')); }
}
$('set-mfa-toggle').addEventListener('click', async () => {
    const btn = $('set-mfa-toggle');
    say('set-mfa-msg', '');
    try {
        const data = await factors();
        if (btn.dataset.on) {
            for (const f of data.totp.filter(f => f.status === 'verified')) {
                const { error } = await sb.auth.mfa.unenroll({ factorId: f.id });
                if (error) { say('set-mfa-msg', t('set.mfaNeedCode')); return; }
            }
            say('set-mfa-msg', t('set.mfaOffDone'));
            $('set-mfa-setup').hidden = true;
            await renderMfa();
            return;
        }
        // an earlier setup left half-done is cleared first, or a new one is refused
        for (const f of (data.all || []).filter(f => f.factor_type === 'totp' && f.status !== 'verified')) await sb.auth.mfa.unenroll({ factorId: f.id });
        const { data: en, error } = await sb.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Khan Japanese' });
        if (error) throw error;
        pendingFactor = en.id;
        $('set-mfa-qr').src = en.totp.qr_code;
        $('set-mfa-secret').textContent = en.totp.secret;
        $('set-mfa-code').value = '';
        $('set-mfa-setup').hidden = false;
        $('set-mfa-code').focus();
    } catch (e) { say('set-mfa-msg', t('set.mfaUnavailable')); }
});
$('set-mfa-confirm').addEventListener('click', async () => {
    const code = $('set-mfa-code').value.replace(/\D/g, '');
    if (!pendingFactor || code.length !== 6) { say('set-mfa-msg', t('set.mfaWrong')); return; }
    const { error } = await sb.auth.mfa.challengeAndVerify({ factorId: pendingFactor, code });
    if (error) { say('set-mfa-msg', t('set.mfaWrong')); return; }
    pendingFactor = null;
    $('set-mfa-setup').hidden = true;
    say('set-mfa-msg', t('set.mfaDone'));
    await renderMfa();
});

// ------------------------------------------------------------------ start
relabel();
paintAll();
listDevices();
