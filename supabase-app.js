// Comments, bookmarks, and the account-linked contact form.
// Depends on auth-shared.js having already run (window.supabaseClient,
// window.getCurrentSession(), and the 'wp:authchange' event on document).

// Aliased as `sb`, not `supabaseClient` — top-level `const`/`let` in classic scripts
// share one global lexical scope across <script> tags, so reusing auth-shared.js's
// `supabaseClient` identifier here (even with `var`) would throw a SyntaxError for
// the whole page.
const sb = window.supabaseClient;

function showEl(el) { el.classList.remove('hidden'); }
function hideEl(el) { el.classList.add('hidden'); }

// ---------------------------------------------------------------------------
// Auth-dependent UI (comment forms, contact form, bookmarks)
// ---------------------------------------------------------------------------
window.onAuthChange((session) => {
    document.querySelectorAll('.comment-form').forEach(f => session ? showEl(f) : hideEl(f));
    document.querySelectorAll('.comment-login-prompt').forEach(p => session ? hideEl(p) : showEl(p));

    const contactForm = document.getElementById('contact-form');
    const contactPrompt = document.getElementById('contact-login-prompt');
    if (session) { showEl(contactForm); hideEl(contactPrompt); }
    else { hideEl(contactForm); showEl(contactPrompt); }

    refreshBookmarkButtons();
});

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

// Height is computed from actual content rather than a fixed CSS cap, so
// comment threads of any length are never clipped.
function syncPanelHeight(panel) {
    if (panel.classList.contains('show')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }
}

async function loadComments(block) {
    const projectId = block.dataset.projectId;
    const list = block.querySelector('.comments-list');
    const countEl = block.querySelector('.comments-count');
    const panel = block.querySelector('.comments-panel');

    const { data, error } = await sb
        .from('comments')
        .select('id, content, created_at, profiles(display_name)')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

    if (error) {
        list.innerHTML = `<p class="comment-error">Couldn't load comments.</p>`;
        syncPanelHeight(panel);
        return;
    }

    list.innerHTML = '';
    data.forEach(c => list.appendChild(renderComment(c)));
    countEl.textContent = `(${data.length})`;
    syncPanelHeight(panel);
}

document.querySelectorAll('.comments-block').forEach(block => {
    const toggle = block.querySelector('.comments-toggle');
    const panel = block.querySelector('.comments-panel');
    let loaded = false;

    toggle.addEventListener('click', async () => {
        const isOpen = panel.classList.contains('show');
        if (isOpen) {
            panel.classList.remove('show');
            panel.style.maxHeight = '';
            return;
        }
        panel.classList.add('show');
        if (!loaded) {
            loaded = true;
            await loadComments(block);
        } else {
            syncPanelHeight(panel);
        }
    });

    block.querySelector('.comment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const session = window.getCurrentSession();
        if (!session) return;
        const textarea = e.target.querySelector('textarea');
        const content = textarea.value.trim();
        if (!content) return;

        const { error } = await sb.from('comments').insert({
            project_id: block.dataset.projectId,
            user_id: session.user.id,
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
    const session = window.getCurrentSession();
    if (!session) {
        buttons.forEach(btn => btn.classList.remove('bookmarked'));
        return;
    }

    const { data, error } = await sb
        .from('bookmarks')
        .select('project_id')
        .eq('user_id', session.user.id);

    if (error) return;
    const saved = new Set(data.map(b => b.project_id));
    buttons.forEach(btn => btn.classList.toggle('bookmarked', saved.has(btn.dataset.projectId)));
}

document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const session = window.getCurrentSession();
        if (!session) {
            openAuthModal();
            return;
        }
        const projectId = btn.dataset.projectId;
        const isBookmarked = btn.classList.contains('bookmarked');

        if (isBookmarked) {
            await sb.from('bookmarks').delete()
                .eq('user_id', session.user.id)
                .eq('project_id', projectId);
            btn.classList.remove('bookmarked');
        } else {
            await sb.from('bookmarks').insert({
                user_id: session.user.id,
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
    const session = window.getCurrentSession();
    if (!session) return;
    const textarea = document.getElementById('contact-message');
    const message = textarea.value.trim();
    if (!message) return;

    const statusEl = document.getElementById('contact-form-status');
    const { error } = await sb.from('contact_messages').insert({
        user_id: session.user.id,
        message,
    });

    statusEl.textContent = error ? "Couldn't send your message. Try again." : 'Message sent!';
    statusEl.classList.remove('hidden');
    if (!error) textarea.value = '';
});
