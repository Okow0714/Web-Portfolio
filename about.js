// About Me page — highlights the current section in the sticky index rail as the reader
// scrolls, and smooth-scrolls when a rail/dropdown link is clicked.
(function () {
    const railLinks = Array.from(document.querySelectorAll('.about-rail-index a'));
    if (!railLinks.length) return;

    const sections = railLinks
        .map(link => document.getElementById(link.getAttribute('href').slice(1)))
        .filter(Boolean);

    const setCurrent = (id) => {
        railLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === '#' + id));
    };

    const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
            setCurrent(visible[0].target.id);
        }
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.getElementById(link.getAttribute('href').slice(1));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
