// Auth, comments, bookmarks, and the account-linked contact form.
// Depends on supabase-config.js (SUPABASE_URL / SUPABASE_ANON_KEY) and the
// Supabase JS CDN script being loaded first.

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentSession = null;

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

    document.querySelectorAll('.comment-form').forEach(f => session ? showEl(f) : hideEl(f));
    document.querySelectorAll('.comment-login-prompt').forEach(p => session ? hideEl(p) : showEl(p));

    const contactForm = document.getElementById('contact-form');
    const contactPrompt = document.getElementById('contact-login-prompt');
    if (session) { showEl(contactForm); hideEl(contactPrompt); }
    else { hideEl(contactForm); showEl(contactPrompt); }

    refreshBookmarkButtons();
}

supabaseClient.auth.getSession().then(({ data }) => updateAuthUI(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => updateAuthUI(session));

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------
function renderComment(comment) {
    const displayName = comment.profiles ? comment.profiles.display_name : 'Someone';
    const when = new Date(comment.created_at).toLocaleDateString();
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `<span class="comment-author">${escapeHtml(displayName)}</span>` +
        `<span class="comment-date">${when}</span>` +
        `<p class="comment-content">${escapeHtml(comment.content)}</p>`;
    return div;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

async function loadComments(block) {
    const projectId = block.dataset.projectId;
    const list = block.querySelector('.comments-list');
    const countEl = block.querySelector('.comments-count');

    const { data, error } = await supabaseClient
        .from('comments')
        .select('id, content, created_at, profiles(display_name)')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

    if (error) {
        list.innerHTML = `<p class="comment-error">Couldn't load comments.</p>`;
        return;
    }

    list.innerHTML = '';
    data.forEach(c => list.appendChild(renderComment(c)));
    countEl.textContent = `(${data.length})`;
}

document.querySelectorAll('.comments-block').forEach(block => {
    const toggle = block.querySelector('.comments-toggle');
    const panel = block.querySelector('.comments-panel');
    let loaded = false;

    toggle.addEventListener('click', () => {
        panel.classList.toggle('show');
        if (panel.classList.contains('show') && !loaded) {
            loaded = true;
            loadComments(block);
        }
    });

    block.querySelector('.comment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentSession) return;
        const textarea = e.target.querySelector('textarea');
        const content = textarea.value.trim();
        if (!content) return;

        const { error } = await supabaseClient.from('comments').insert({
            project_id: block.dataset.projectId,
            user_id: currentSession.user.id,
            content,
        });

        if (!error) {
            textarea.value = '';
            loadComments(block);
        }
    });
});

// ---------------------------------------------------------------------------
// Bookmarks
// ---------------------------------------------------------------------------
async function refreshBookmarkButtons() {
    const buttons = document.querySelectorAll('.bookmark-btn');
    if (!currentSession) {
        buttons.forEach(btn => btn.classList.remove('bookmarked'));
        return;
    }

    const { data, error } = await supabaseClient
        .from('bookmarks')
        .select('project_id')
        .eq('user_id', currentSession.user.id);

    if (error) return;
    const saved = new Set(data.map(b => b.project_id));
    buttons.forEach(btn => btn.classList.toggle('bookmarked', saved.has(btn.dataset.projectId)));
}

document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        if (!currentSession) {
            openAuthModal();
            return;
        }
        const projectId = btn.dataset.projectId;
        const isBookmarked = btn.classList.contains('bookmarked');

        if (isBookmarked) {
            await supabaseClient.from('bookmarks').delete()
                .eq('user_id', currentSession.user.id)
                .eq('project_id', projectId);
            btn.classList.remove('bookmarked');
        } else {
            await supabaseClient.from('bookmarks').insert({
                user_id: currentSession.user.id,
                project_id: projectId,
            });
            btn.classList.add('bookmarked');
        }
    });
});

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentSession) return;
    const textarea = document.getElementById('contact-message');
    const message = textarea.value.trim();
    if (!message) return;

    const statusEl = document.getElementById('contact-form-status');
    const { error } = await supabaseClient.from('contact_messages').insert({
        user_id: currentSession.user.id,
        message,
    });

    statusEl.textContent = error ? "Couldn't send your message. Try again." : 'Message sent!';
    statusEl.classList.remove('hidden');
    if (!error) textarea.value = '';
});
