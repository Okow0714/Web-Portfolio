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

    // Smooth-scroll the index rail -- and MOVE FOCUS, which scrollIntoView does not do.
    //
    // Scrolling and focus are separate things. Without the focus call this handler sent the page
    // to the right place and left the keyboard where it was, so the next Tab carried on from the
    // link just activated. For the rail that is merely wrong; for the skip link, which this
    // selector also catches, it defeated the entire purpose: "Skip to content" scrolled to the
    // content and then put you back at the top of the masthead.
    //
    // tabindex -1 makes a non-interactive target focusable without adding it to the tab order, and
    // preventScroll stops focus() from fighting the smooth scroll it was just asked for.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.getElementById(link.getAttribute('href').slice(1));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        });
    });
})();
