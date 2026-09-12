// Shared Supabase client + login/logout modal wiring, used by every page.
// Depends on supabase-config.js (SUPABASE_URL / SUPABASE_ANON_KEY) and the
// Supabase JS CDN script being loaded first.
//
// Pages that need to react to auth state should call window.onAuthChange(fn) rather
// than reading session state directly. It's a subscribe-with-replay: fn runs immediately
// with the current session if it's already known, and again on every future change.
// (A one-shot 'wp:authchange' DOM event would race: getSession() for a guest resolves
// in a microtask with no real network wait, and browsers flush microtasks between
// <script> tag executions — so a listener registered by a later script tag can miss it.)
// window.getCurrentSession() is also available for one-off reads (e.g. inside a click handler).

// The Supabase library is loaded from a CDN, and a CDN can be unavailable: offline (the
// service worker only caches same-origin requests, so the CDN script is never in the
// precache), a network that blocks jsdelivr, or an outage at either end. This file used to go
// straight into supabase.createClient(...), so when that happened it threw on its first
// statement and took everything below it down with it -- showEl/hideEl, onAuthChange,
// getCurrentSession and the whole account menu -- on every page of the site.
//
// None of the five study tools need an account. So when the library is missing the site should
// lose the account and keep the rest, rather than throwing and hoping the tools cope. A stub
// standing in for the client keeps every call site working without a null check at each one:
// there is simply never a session, and any write reports the same clear error.
const supabaseReady = typeof supabase !== 'undefined' && supabase && typeof supabase.createClient === 'function';

function makeUnavailableClient() {
    const error = { message: 'Account features are unavailable — could not reach the authentication service.', name: 'SupabaseUnavailable' };
    const result = Promise.resolve({ data: null, error });
    // A thenable that also answers the chained query builders (.select().eq().single() etc.)
    // so nothing has to know it is talking to a stub.
    const chain = () => new Proxy(function () { }, {
        get: (_, prop) => {
            if (prop === 'then') return result.then.bind(result);
            if (prop === 'catch') return result.catch.bind(result);
            if (prop === 'finally') return result.finally.bind(result);
            return chain();
        },
        apply: () => chain(),
    });
    return {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe() { } } } }),
            signInWithPassword: () => Promise.resolve({ data: null, error }),
            signUp: () => Promise.resolve({ data: null, error }),
            signOut: () => Promise.resolve({ error: null }),
            resetPasswordForEmail: () => Promise.resolve({ data: null, error }),
        },
        from: () => chain(),
        rpc: () => Promise.resolve({ data: null, error }),
    };
}

if (!supabaseReady) {
    console.warn('[auth] Supabase library unavailable — the study tools still work; account features are disabled.');
}
const supabaseClient = supabaseReady
    ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : makeUnavailableClient();
window.supabaseClient = supabaseClient;
window.supabaseReady = supabaseReady;

let currentSession = null;
let sessionKnown = false;
const authChangeListeners = [];

window.getCurrentSession = () => currentSession;
window.onAuthChange = function (fn) {
    authChangeListeners.push(fn);
    if (sessionKnown) fn(currentSession);
};

function showEl(el) { el.classList.remove('hidden'); }
function hideEl(el) { el.classList.add('hidden'); }

// Falls back to the English literal if i18n.js hasn't run yet (shouldn't happen given script
// order, but keeps this file safe to load standalone, e.g. in isolation during development).
// Named `tr`, not `t` -- a top-level `function t(){}` in a non-module script attaches itself to
// `window.t`, which would shadow (and infinitely recurse into) i18n.js's own window.t.
function tr(key, fallback) { return window.t ? window.t(key) : fallback; }

// ---------------------------------------------------------------------------
// Auth modal
// ---------------------------------------------------------------------------
const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const authModalTitle = document.getElementById('auth-modal-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authModeToggle = document.getElementById('auth-mode-toggle');
const authError = document.getElementById('auth-error');
const authTermsRow = document.getElementById('auth-terms-row');
const authTermsCheckbox = document.getElementById('auth-terms-checkbox');
const authForgotBtn = document.getElementById('auth-forgot-btn');
let authMode = 'login';

function setAuthMode(mode) {
    authMode = mode;
    const isLogin = mode === 'login';
    authModalTitle.textContent = isLogin ? tr('auth.logIn', 'Log In') : tr('auth.signUp', 'Sign Up');
    authSubmitBtn.textContent = isLogin ? tr('auth.logIn', 'Log In') : tr('auth.signUp', 'Sign Up');
    authModeToggle.textContent = isLogin ? tr('auth.needAccount', 'Need an account? Sign up') : tr('auth.haveAccount', 'Already have an account? Log in');
    hideEl(authError);

    // Terms/privacy agreement is only required (and only shown) when signing up.
    if (isLogin) {
        hideEl(authTermsRow);
        authTermsCheckbox.required = false;
    } else {
        showEl(authTermsRow);
        authTermsCheckbox.required = true;
    }
    authTermsCheckbox.checked = false;
    showEl(authForgotBtn);
    if (!isLogin) hideEl(authForgotBtn);
}

function openAuthModal() {
    setAuthMode('login');
    authForm.reset();
    showEl(authModal);
}
window.openAuthModal = openAuthModal;

function closeAuthModal() {
    hideEl(authModal);
}

document.getElementById('auth-login-btn').addEventListener('click', openAuthModal);
document.getElementById('auth-modal-close').addEventListener('click', closeAuthModal);
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
});
authModeToggle.addEventListener('click', () => setAuthMode(authMode === 'login' ? 'signup' : 'login'));

authForgotBtn.addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value.trim();
    hideEl(authError);
    authError.classList.remove('auth-info');
    if (!email) {
        authError.textContent = tr('auth.enterEmailFirst', 'Enter your email above first, then click "Forgot password?" again.');
        showEl(authError);
        return;
    }
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: new URL('reset-password.html', window.location.href).toString(),
    });
    authError.textContent = error
        ? error.message
        : tr('auth.resetLinkSent', 'If that email has an account, a password reset link is on its way.');
    authError.classList.toggle('auth-info', !error);
    showEl(authError);
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    hideEl(authError);
    authError.classList.remove('auth-info');

    const { data, error } = authMode === 'login'
        ? await supabaseClient.auth.signInWithPassword({ email, password })
        : await supabaseClient.auth.signUp({ email, password });

    if (error) {
        authError.textContent = error.message;
        showEl(authError);
        return;
    }

    // If email confirmation is required, signUp succeeds but returns no session yet.
    if (authMode === 'signup' && !data.session) {
        authError.textContent = tr('auth.checkEmailToConfirm', 'Check your email to confirm your account, then log in.');
        authError.classList.add('auth-info');
        showEl(authError);
        setAuthMode('login');
        return;
    }

    closeAuthModal();
});

document.getElementById('auth-logout-btn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
});

// ---------------------------------------------------------------------------
// Account details modal (view email) + Settings modal (language, delete account)
// -- split from the single "Your Account" modal this used to be, so the account panel's
// "Account details" and "Settings" nav items each open something specific rather than both
// landing on the same everything-in-one-place screen.
// ---------------------------------------------------------------------------
const accountDetailsModal = document.getElementById('account-details-modal');
const accountSettingsModal = document.getElementById('account-settings-modal');
const accountDeleteStartBtn = document.getElementById('account-delete-start-btn');
const accountDeleteConfirmRow = document.getElementById('account-delete-confirm');
const accountDeleteInput = document.getElementById('account-delete-input');
const accountDeleteConfirmBtn = document.getElementById('account-delete-confirm-btn');
const accountDeleteStatus = document.getElementById('account-delete-status');

function resetAccountDeleteUI() {
    hideEl(accountDeleteConfirmRow);
    hideEl(accountDeleteStatus);
    accountDeleteInput.value = '';
    accountDeleteConfirmBtn.disabled = true;
    showEl(accountDeleteStartBtn);
}

// Settings is offered signed out as well as signed in: with language now in the masthead the
// only thing behind it for a visitor without an account is the tutorial reset, but hiding a
// settings screen from people who have not signed up is its own small hostility.
const accountSettingsBtnAnon = document.getElementById('account-settings-btn-anon');
if (accountSettingsBtnAnon) {
    accountSettingsBtnAnon.addEventListener('click', () => {
        closeAccountMenu();
        showEl(accountSettingsModal);
    });
}

// Furigana style. reading-style.js owns the preference and the transliteration; this is the
// control, and it re-renders itself on a language change like every other label here.
function renderReadingStyle() {
    if (!window.getReadingStyle) return;
    const mode = window.getReadingStyle();
    document.querySelectorAll('[data-reading-style]').forEach(btn => {
        const on = btn.dataset.readingStyle === mode;
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
}
document.querySelectorAll('[data-reading-style]').forEach(btn => {
    btn.addEventListener('click', () => {
        window.setReadingStyle(btn.dataset.readingStyle);
        renderReadingStyle();
    });
});
renderReadingStyle();

// Darker theme. display-prefs.js owns the preference and applied it before the first paint;
// this is only the control that flips it.
const darkerToggleBtn = document.getElementById('darker-toggle-btn');
function renderDarkerToggle() {
    if (!darkerToggleBtn) return;
    const on = window.getDarkerTheme && window.getDarkerTheme();
    darkerToggleBtn.textContent = on ? tr('account.darkerOn', 'On') : tr('account.darkerOff', 'Off');
    darkerToggleBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    darkerToggleBtn.classList.toggle('is-on', !!on);
}
if (darkerToggleBtn) {
    renderDarkerToggle();
    darkerToggleBtn.addEventListener('click', () => {
        window.setDarkerTheme(!window.getDarkerTheme());
        renderDarkerToggle();
    });
    document.addEventListener('sitelangchange', renderDarkerToggle);
}

// Clears every khanjp-tour-* flag, so the first-visit walkthroughs and the shared notation key
// are all offered again. Local to this browser, like the flags themselves.
const tutorialResetBtn = document.getElementById('tutorial-reset-btn');
if (tutorialResetBtn) {
    tutorialResetBtn.addEventListener('click', () => {
        try {
            Object.keys(localStorage)
                .filter(k => k.startsWith('khanjp-tour-'))
                .forEach(k => localStorage.removeItem(k));
        } catch (e) { /* private mode */ }
        tutorialResetBtn.textContent = tr('account.tutorialsDone', 'They will show again');
        tutorialResetBtn.disabled = true;
    });
}

document.getElementById('account-details-btn').addEventListener('click', () => {
    if (!currentSession) return;
    document.getElementById('account-details-email').textContent = currentSession.user.email;
    showEl(accountDetailsModal);
});
document.getElementById('account-details-modal-close').addEventListener('click', () => hideEl(accountDetailsModal));
accountDetailsModal.addEventListener('click', (e) => {
    if (e.target === accountDetailsModal) hideEl(accountDetailsModal);
});

document.getElementById('account-settings-btn').addEventListener('click', () => {
    if (!currentSession) return;
    resetAccountDeleteUI();
    showEl(accountSettingsModal);
});
document.getElementById('account-settings-modal-close').addEventListener('click', () => hideEl(accountSettingsModal));
accountSettingsModal.addEventListener('click', (e) => {
    if (e.target === accountSettingsModal) hideEl(accountSettingsModal);
});

accountDeleteStartBtn.addEventListener('click', () => {
    hideEl(accountDeleteStartBtn);
    showEl(accountDeleteConfirmRow);
    accountDeleteInput.focus();
});

accountDeleteInput.addEventListener('input', () => {
    accountDeleteConfirmBtn.disabled = accountDeleteInput.value.trim() !== 'DELETE';
});

accountDeleteConfirmBtn.addEventListener('click', async () => {
    accountDeleteConfirmBtn.disabled = true;
    accountDeleteConfirmBtn.textContent = tr('account.deleting', 'Deleting…');
    const { error } = await supabaseClient.rpc('delete_own_account');
    if (error) {
        accountDeleteStatus.textContent = tr('account.deleteFailed', "Couldn't delete your account — try again later.");
        showEl(accountDeleteStatus);
        accountDeleteConfirmBtn.textContent = tr('account.yesPermanentlyDelete', 'Yes, permanently delete my account');
        accountDeleteConfirmBtn.disabled = accountDeleteInput.value.trim() !== 'DELETE';
        return;
    }
    await supabaseClient.auth.signOut();
    hideEl(accountSettingsModal);
    window.location.href = 'index.html';
});

// ---------------------------------------------------------------------------
// Reset study progress — everything the dashboard and the level grids show,
// without touching the account itself.
//
// The work happens in one server call (reset_own_progress, migration 005) so a
// failure cannot leave someone with their Word Match times cleared and their
// word_stats intact. There is no client-side fallback: if the migration has not
// been run, this says so and changes nothing, which is better than a reset that
// half-works.
//
// Confirmation is two clicks rather than typing a word. Typing DELETE is right
// for destroying an account, which cannot be rebuilt; study progress can be
// earned again, and a wall in front of it would be theatre.
// ---------------------------------------------------------------------------
const progressResetStartBtn = document.getElementById('progress-reset-start-btn');
const progressResetConfirmRow = document.getElementById('progress-reset-confirm');
const progressResetConfirmBtn = document.getElementById('progress-reset-confirm-btn');
const progressResetCancelBtn = document.getElementById('progress-reset-cancel-btn');
const progressResetStatus = document.getElementById('progress-reset-status');

function resetProgressUI() {
    if (!progressResetStartBtn) return;
    hideEl(progressResetConfirmRow);
    hideEl(progressResetStatus);
    showEl(progressResetStartBtn);
    progressResetConfirmBtn.disabled = false;
    progressResetConfirmBtn.textContent = tr('account.resetConfirmYes', 'Yes, clear my progress');
}

if (progressResetStartBtn) {
    progressResetStartBtn.addEventListener('click', () => {
        hideEl(progressResetStartBtn);
        showEl(progressResetConfirmRow);
        progressResetConfirmBtn.focus();
    });

    progressResetCancelBtn.addEventListener('click', resetProgressUI);

    progressResetConfirmBtn.addEventListener('click', async () => {
        progressResetConfirmBtn.disabled = true;
        progressResetConfirmBtn.textContent = tr('account.resetting', 'Clearing…');
        const { error } = await supabaseClient.rpc('reset_own_progress');
        if (error) {
            progressResetStatus.textContent = tr('account.resetFailed',
                "Couldn't clear your progress — try again later.");
            showEl(progressResetStatus);
            progressResetConfirmBtn.textContent = tr('account.resetConfirmYes', 'Yes, clear my progress');
            progressResetConfirmBtn.disabled = false;
            return;
        }
        // The signed-out attempt buffer is the one piece of progress that lives on this device.
        try { localStorage.removeItem('khanjp-word-buffer'); } catch (e) { /* private mode */ }
        progressResetStatus.textContent = tr('account.resetDone', 'Progress cleared.');
        showEl(progressResetStatus);
        // Reload rather than re-render: every tool keeps its own progress cache in module scope,
        // and a stale grid showing times that no longer exist is worse than a blink.
        setTimeout(() => window.location.reload(), 900);
    });
}

// ---------------------------------------------------------------------------
// Account menu — the single top-right avatar/icon button that expands into a
// dropdown panel (replaces the old bare Log In button / email-and-Log-Out
// pair that just sat unstyled in the login bar).
// ---------------------------------------------------------------------------
const accountMenu = document.getElementById('account-menu');
const accountMenuTrigger = document.getElementById('account-menu-trigger');
const accountMenuAvatar = document.getElementById('account-menu-avatar');
const accountMenuProfileAvatar = document.getElementById('account-menu-profile-avatar');
const GUEST_AVATAR_HTML = accountMenuAvatar.innerHTML; // the generic person icon, to restore on logout

function closeAccountMenu() {
    accountMenu.classList.remove('open');
    accountMenuTrigger.setAttribute('aria-expanded', 'false');
}

accountMenuTrigger.addEventListener('click', () => {
    const nowOpen = !accountMenu.classList.contains('open');
    accountMenu.classList.toggle('open', nowOpen);
    accountMenuTrigger.setAttribute('aria-expanded', String(nowOpen));
});

// Not every page's account menu has a full-viewport scrim (about.html's is a small popover off
// its sidebar rail, not a side drawer) -- the generic outside-click check is the one handler
// that works everywhere; the scrim listener is just a more direct hit target where it exists.
document.getElementById('account-menu-scrim')?.addEventListener('click', closeAccountMenu);
document.addEventListener('click', (e) => {
    if (!accountMenu.contains(e.target)) closeAccountMenu();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAccountMenu();
});

// Opening the auth modal, a details/settings modal, or logging out should all close the side
// panel first rather than leaving it open behind whatever comes next.
document.getElementById('auth-login-btn').addEventListener('click', closeAccountMenu);
document.getElementById('account-details-btn').addEventListener('click', closeAccountMenu);
document.getElementById('account-settings-btn').addEventListener('click', closeAccountMenu);
document.getElementById('auth-logout-btn').addEventListener('click', closeAccountMenu);

// ---------------------------------------------------------------------------
// Header auth state
// ---------------------------------------------------------------------------
function updateAuthUI(session) {
    currentSession = session;
    sessionKnown = true;
    const anonEl = document.getElementById('auth-anon');
    const authedEl = document.getElementById('auth-authed');
    // Settings is open to visitors without an account, who have no account to delete. The markup
    // ships the danger zone hidden and it is revealed only for a real session, so a destructive
    // control is never what shows if this never runs.
    const dangerEl = document.getElementById('account-danger-zone');

    if (session) {
        hideEl(anonEl);
        showEl(authedEl);
        if (dangerEl) showEl(dangerEl);
        document.getElementById('auth-user-email').textContent = session.user.email;
        // Avatar becomes the first letter of the email, like a typical account-menu avatar,
        // instead of the generic guest icon -- shown both on the trigger button and again in
        // the panel's own profile header.
        const initial = session.user.email.charAt(0).toUpperCase();
        accountMenuAvatar.textContent = initial;
        accountMenuProfileAvatar.textContent = initial;
    } else {
        showEl(anonEl);
        hideEl(authedEl);
        if (dangerEl) hideEl(dangerEl);
        // A sign-out with either confirm step half-open would otherwise leave "Yes, permanently
        // delete" or "Yes, clear my progress" waiting behind the next sign-in.
        resetAccountDeleteUI();
        resetProgressUI();
        accountMenuAvatar.innerHTML = GUEST_AVATAR_HTML;
    }

    authChangeListeners.forEach(fn => fn(session));
}

supabaseClient.auth.getSession().then(({ data }) => updateAuthUI(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => updateAuthUI(session));

// ---------------------------------------------------------------------------
// Settings that follow the account (user_settings, migration 009)
//
// Language, the darker-theme toggle, the reading style and which page tours have been seen live in
// localStorage, so signing in on a second device gave an English site, kana readings and every
// coach mark again. This lives in auth-shared.js because it is the one script every page already
// loads, and because it needs the session anyway.
//
// The rule is simple enough to predict:
//   * the FIRST time a device syncs for an account, the stored settings win -- that is the whole
//     point, a new device inheriting what you already chose;
//   * after that the device's own choices win and are pushed up, so changing the language here does
//     not get undone by what another device saved last week;
//   * tours are a union, never subtracted -- having seen a tour anywhere means having seen it.
// ---------------------------------------------------------------------------
(function () {
    const PREF_KEYS = { lang: 'site-lang', darker: 'khanjp-darker', readingStyle: 'khanjp-reading-style' };
    const TOUR_PREFIX = 'khanjp-tour-';
    const SYNCED_KEY = 'khanjp-settings-account';   // which account this device last synced with
    const PUSH_DELAY = 800;

    let userId = null;
    let applying = false;     // guards the push that each setter's own change event would trigger
    let pushTimer = null;

    const ls = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } };

    function tourKeys() {
        const out = [];
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.indexOf(TOUR_PREFIX) === 0 && localStorage.getItem(k) === '1') out.push(k);
            }
        } catch (e) { /* private mode */ }
        return out.sort();
    }

    function localSettings() {
        const s = { tours: tourKeys() };
        Object.keys(PREF_KEYS).forEach(name => {
            const v = ls(PREF_KEYS[name]);
            if (v !== null) s[name] = v;
        });
        return s;
    }

    function applyRemote(remote) {
        if (!remote) return;
        applying = true;
        try {
            if (remote.lang && remote.lang !== ls(PREF_KEYS.lang) && window.setSiteLang) window.setSiteLang(remote.lang);
            if (typeof remote.darker === 'string' && remote.darker !== ls(PREF_KEYS.darker) && window.setDarkerTheme) {
                window.setDarkerTheme(remote.darker === '1');
            }
            if (remote.readingStyle && remote.readingStyle !== ls(PREF_KEYS.readingStyle) && window.setReadingStyle) {
                window.setReadingStyle(remote.readingStyle);
            }
        } finally {
            // the setters fire their change events synchronously; let them land before re-arming
            setTimeout(() => { applying = false; }, 0);
        }
        // tours are merged, not replaced: seen anywhere is seen
        (remote.tours || []).forEach(k => { if (typeof k === 'string' && k.indexOf(TOUR_PREFIX) === 0) lsSet(k, '1'); });
    }

    // Skips a write that would store exactly what was stored last. Without this every page load
    // wrote four times: onAuthChange fires for the restored session and again for the sign-in
    // event, and each one ended with a push.
    let lastPushed = null;

    async function push() {
        if (!userId || !window.supabaseReady) return;
        const settings = localSettings();
        const asJson = JSON.stringify(settings);
        if (asJson === lastPushed) return;
        lastPushed = asJson;
        try {
            await window.supabaseClient.from('user_settings')
                .upsert({ user_id: userId, settings, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
        } catch (e) { lastPushed = null; /* offline; the next change tries again */ }
    }

    function schedulePush() {
        if (applying || !userId) return;
        clearTimeout(pushTimer);
        pushTimer = setTimeout(push, PUSH_DELAY);
    }

    ['sitelangchange', 'displayprefchange', 'readingstylechange'].forEach(evt =>
        document.addEventListener(evt, schedulePush));

    window.onAuthChange(async (session) => {
        if (!session || !window.supabaseReady) { userId = null; return; }
        userId = session.user.id;
        const firstSyncHere = ls(SYNCED_KEY) !== userId;
        let remote = null;
        try {
            const { data, error } = await window.supabaseClient
                .from('user_settings').select('settings').eq('user_id', userId).maybeSingle();
            if (!error && data) remote = data.settings;
        } catch (e) { return; }   // offline: leave this device's own settings alone

        if (firstSyncHere) applyRemote(remote);
        else if (remote && remote.tours) applyRemote({ tours: remote.tours });
        lsSet(SYNCED_KEY, userId);
        push();   // whichever way it went, the server ends up holding the union
    });
})();
