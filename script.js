// Title toggle functionality
// Some section titles (About Me, Qualifications, Academic History, Contact) sit above
// always-visible content rather than a collapsible .section-description, so their
// click should do nothing instead of closing every other open section.
// max-height is computed from the actual content (scrollHeight) rather than a fixed
// CSS cap, so long content (e.g. the Academic History timeline) never gets clipped.
function closeDescription(desc) {
    desc.classList.remove('show');
    desc.style.maxHeight = '';
}

function openDescription(desc) {
    desc.classList.add('show');
    desc.style.maxHeight = desc.scrollHeight + 'px';
}

document.querySelectorAll('.section-title').forEach(button => {
    button.addEventListener('click', function() {
        const description = this.nextElementSibling;
        if (!description || !description.classList.contains('section-description')) {
            return;
        }
        const wasOpen = description.classList.contains('show');

        document.querySelectorAll('.section-description').forEach(closeDescription);

        if (!wasOpen) {
            openDescription(description);
        }
    });
});

// Close descriptions when clicking elsewhere
document.addEventListener('click', function(event) {
    if (!event.target.closest('.section-title') && !event.target.closest('.section-description') && !event.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.section-description').forEach(closeDescription);
    }
});

// Auto-open a section's collapsible content when it's selected from the Menu dropdown.
// The open/close here happens instantly (no CSS transition) instead of animating: animating
// one section closed while another opens shifts the whole page layout while the browser's
// scroll-to-target is still in flight, landing hundreds of pixels off. Settling the layout
// first, then scrolling, keeps the landing position exact.
document.querySelectorAll('.nav-dropdown a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) {
            return;
        }
        e.preventDefault();

        const allDescriptions = document.querySelectorAll('.section-description');
        allDescriptions.forEach(desc => { desc.style.transition = 'none'; });

        allDescriptions.forEach(closeDescription);
        const description = target.querySelector('.section-description');
        if (description) {
            openDescription(description);
        }

        void target.offsetHeight; // force reflow so the instant height change applies now
        allDescriptions.forEach(desc => { desc.style.transition = ''; });

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add scroll effect to the header wrapper (background stays fully opaque; only the shadow reacts)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header-wrap');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(20, 20, 43, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skills-section')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 300);
    });
}

// Tab functionality for About Me section
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});