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
// Auth-dependent UI (contact form, bookmarks)
// ---------------------------------------------------------------------------
window.onAuthChange((session) => {

    const contactForm = document.getElementById('contact-form');
    const contactPrompt = document.getElementById('contact-login-prompt');
    if (session) { showEl(contactForm); hideEl(contactPrompt); }
    else { hideEl(contactForm); showEl(contactPrompt); }

    refreshBookmarkButtons();
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
