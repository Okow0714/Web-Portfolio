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

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

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
    authModalTitle.textContent = isLogin ? 'Log In' : 'Sign Up';
    authSubmitBtn.textContent = isLogin ? 'Log In' : 'Sign Up';
    authModeToggle.textContent = isLogin ? "Need an account? Sign up" : 'Already have an account? Log in';
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
        authError.textContent = 'Enter your email above first, then click "Forgot password?" again.';
        showEl(authError);
        return;
    }
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: new URL('reset-password.html', window.location.href).toString(),
    });
    authError.textContent = error
        ? error.message
        : 'If that email has an account, a password reset link is on its way.';
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
        authError.textContent = 'Check your email to confirm your account, then log in.';
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
// Account modal (view email, delete account)
// ---------------------------------------------------------------------------
const accountModal = document.getElementById('account-modal');
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

document.getElementById('auth-user-email').addEventListener('click', () => {
    if (!currentSession) return;
    document.getElementById('account-modal-email').textContent = currentSession.user.email;
    resetAccountDeleteUI();
    showEl(accountModal);
});
document.getElementById('account-modal-close').addEventListener('click', () => hideEl(accountModal));
accountModal.addEventListener('click', (e) => {
    if (e.target === accountModal) hideEl(accountModal);
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
    accountDeleteConfirmBtn.textContent = 'Deleting…';
    const { error } = await supabaseClient.rpc('delete_own_account');
    if (error) {
        accountDeleteStatus.textContent = "Couldn't delete your account — try again later.";
        showEl(accountDeleteStatus);
        accountDeleteConfirmBtn.textContent = 'Yes, permanently delete my account';
        accountDeleteConfirmBtn.disabled = accountDeleteInput.value.trim() !== 'DELETE';
        return;
    }
    await supabaseClient.auth.signOut();
    hideEl(accountModal);
    window.location.href = 'index.html';
});

// ---------------------------------------------------------------------------
// Account menu — the single top-right avatar/icon button that expands into a
// dropdown panel (replaces the old bare Log In button / email-and-Log-Out
// pair that just sat unstyled in the login bar).
// ---------------------------------------------------------------------------
const accountMenu = document.getElementById('account-menu');
const accountMenuTrigger = document.getElementById('account-menu-trigger');
const accountMenuAvatar = document.getElementById('account-menu-avatar');
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

document.addEventListener('click', (e) => {
    if (!accountMenu.contains(e.target)) closeAccountMenu();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAccountMenu();
});

// Opening the auth modal, the account-settings modal, or logging out should all close the
// dropdown panel first rather than leaving it open behind/beside whatever comes next.
document.getElementById('auth-login-btn').addEventListener('click', closeAccountMenu);
document.getElementById('auth-user-email').addEventListener('click', closeAccountMenu);
document.getElementById('auth-logout-btn').addEventListener('click', closeAccountMenu);

// ---------------------------------------------------------------------------
// Header auth state
// ---------------------------------------------------------------------------
function updateAuthUI(session) {
    currentSession = session;
    sessionKnown = true;
    const anonEl = document.getElementById('auth-anon');
    const authedEl = document.getElementById('auth-authed');

    if (session) {
        hideEl(anonEl);
        showEl(authedEl);
        document.getElementById('auth-user-email').textContent = session.user.email;
        // Avatar becomes the first letter of the email, like a typical account-menu avatar,
        // instead of the generic guest icon.
        accountMenuAvatar.textContent = session.user.email.charAt(0).toUpperCase();
    } else {
        showEl(anonEl);
        hideEl(authedEl);
        accountMenuAvatar.innerHTML = GUEST_AVATAR_HTML;
    }

    authChangeListeners.forEach(fn => fn(session));
}

supabaseClient.auth.getSession().then(({ data }) => updateAuthUI(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => updateAuthUI(session));
