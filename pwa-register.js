// Registers the service worker (sw.js) that makes the site installable and usable offline.
// Loaded on every page; the browser only actually installs it once per origin.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Installability just degrades to "normal webpage" -- nothing else depends on this.
        });
    });
}
