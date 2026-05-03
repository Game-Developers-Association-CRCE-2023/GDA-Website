/**
 * Components Loader
 * Dynamically loads header and footer and handles active states.
 */

async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
        
        // If we just loaded the header, update the active link
        if (elementId === 'header-placeholder') {
            updateActiveLink();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Reset active state
        link.classList.remove('active');
        link.style.color = '';

        // Check if this link matches the current page
        if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
            link.style.color = '#7460F3';
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});
