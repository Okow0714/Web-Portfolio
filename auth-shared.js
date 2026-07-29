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
let authMode = 'login';

function setAuthMode(mode) {
    authMode = mode;
    const isLogin = mode === 'login';
    authModalTitle.textContent = isLogin ? 'Log In' : 'Sign Up';
    authSubmitBtn.textContent = isLogin ? 'Log In' : 'Sign Up';
    authModeToggle.textContent = isLogin ? "Need an account? Sign up" : 'Already have an account? Log in';
    hideEl(authError);
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
    } else {
        showEl(anonEl);
        hideEl(authedEl);
    }

    authChangeListeners.forEach(fn => fn(session));
}

supabaseClient.auth.getSession().then(({ data }) => updateAuthUI(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => updateAuthUI(session));
