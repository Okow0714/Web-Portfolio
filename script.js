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
        header.style.background = 'rgba(171, 171, 171, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(235, 235, 235, 0.9)';
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