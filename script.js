// Toggle dropdown menu
document.querySelector('.menu-button').addEventListener('click', function() {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        document.querySelector('.dropdown-content').classList.remove('show');
    }
});

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