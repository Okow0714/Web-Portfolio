// Registers the service worker (sw.js) that makes the site installable and usable offline.
// Loaded on every page; the browser only actually installs it once per origin.
//
// The worker is asked to check for a new version whenever the tab comes back into view, so a
// tab left open for a day picks a deploy up too. (Reloading the page onto a new version is the
// worker's job -- see activate() in sw.js -- so it is not done here as well.)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((reg) => {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') reg.update().catch(() => {});
            });
        }).catch(() => {
            // Installability just degrades to "normal webpage" -- nothing else depends on this.
        });
    });
}
