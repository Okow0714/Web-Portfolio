// Title toggle functionality
document.querySelectorAll('.section-title').forEach(button => {
    button.addEventListener('click', function() {
        const description = this.nextElementSibling;
        description.classList.toggle('show');
        
        // Optional: Close other open descriptions
        document.querySelectorAll('.section-description').forEach(desc => {
            if (desc !== description) {
                desc.classList.remove('show');
            }
        });
    });
});

// Close descriptions when clicking elsewhere
document.addEventListener('click', function(event) {
    if (!event.target.closest('.section-title') && !event.target.closest('.section-description')) {
        document.querySelectorAll('.section-description').forEach(desc => {
            desc.classList.remove('show');
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Account for fixed header height
            const headerHeight = 80;
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(66, 21, 140, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(66, 21, 140, 0.9)';
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

// Copy contact info to clipboard
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('span').textContent;
        navigator.clipboard.writeText(text).then(function() {
            // Show a subtle feedback
            const originalBg = item.style.background;
            item.style.background = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                item.style.background = originalBg;
            }, 300);
        });
    });
});