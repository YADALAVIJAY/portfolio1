// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's the resume link
        if (this.classList.contains('resume-link')) {
            return;
        }

        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.new-hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close Menu
function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.new-hamburger');
    navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.new-hamburger');
    const isClickInside = navMenu.contains(event.target) || (hamburger && hamburger.contains(event.target));

    if (!isClickInside && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Open Resume function
// Replaced by inline Document Viewer Modal

// Active navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll down arrow animation
document.querySelector('.scroll-down')?.addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animating to only animate once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to elements with fade-up or fade-in class
document.querySelectorAll('.fade-up, .fade-in').forEach(item => {
    observer.observe(item);
});

// Add current year to footer
const footer = document.querySelector('footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `&copy; ${currentYear} VIJAY YADALA. ALL RIGHTS RESERVED.`;
}

// Certificates Modal Functions
function openCertificatesModal() {
    const modal = document.getElementById('certificatesModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }
}

function closeCertificatesModal() {
    const modal = document.getElementById('certificatesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}

// Document Viewer Functions
function openDocumentViewer(url, title = 'Document') {
    const modal = document.getElementById('documentViewerModal');
    const iframe = document.getElementById('docViewerIframe');
    const titleEl = document.getElementById('docViewerTitle');

    if (modal && iframe && titleEl) {
        titleEl.textContent = title;
        iframe.src = url;
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }
}

function closeDocumentViewer() {
    const modal = document.getElementById('documentViewerModal');
    const iframe = document.getElementById('docViewerIframe');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        if (iframe) iframe.src = '';
    }
}

// Close modal when clicking the backdrop
window.addEventListener('click', function (event) {
    const certModal = document.getElementById('certificatesModal');
    const docModal = document.getElementById('documentViewerModal');
    if (event.target === certModal) closeCertificatesModal();
    if (event.target === docModal) closeDocumentViewer();
});

// Close modal with ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCertificatesModal();
        closeDocumentViewer();
    }
});

// Open certificate function
// Replaced by inline Document Viewer Modal

// Initialize with Home active on page load
window.addEventListener('load', () => {
    const homeLink = document.querySelector('nav a[href="#home"]');
    if (homeLink && window.scrollY < 100) {
        homeLink.classList.add('active');
    }
});

console.log('YV Portfolio loaded successfully! ✓');

// Tech Suggestions Logic
const techSuggestions = [
    "Learn Docker to simplify your deployment process.",
    "Master Git branching strategies for better collaboration.",
    "Explore GraphQL as an efficient alternative to REST APIs.",
    "Use TypeScript for better type safety in large JS projects.",
    "Check out Tailwind CSS for rapid UI development.",
    "Learn about Microservices architecture for simpler scaling.",
    "Practice LeetCode problems daily to sharpen problem solving.",
    "Understand the SOLID principles for cleaner code.",
    "Use Redis for caching to improve application performance.",
    "Keep your dependencies updated to avoid security vulnerabilities.",
    "Automate repetitive tasks using Python scripts.",
    "Understand how indexing works in databases for speed.",
    "Learn CI/CD pipelines to automate testing and deployment."
];

function showTechSuggestion() {
    const toast = document.getElementById('techToast');
    const message = document.getElementById('toastMessage');

    if (toast && message) {
        // Random suggestion
        const randomTip = techSuggestions[Math.floor(Math.random() * techSuggestions.length)];
        message.textContent = randomTip;

        toast.classList.add('active');

        // Auto hide after 5 seconds
        setTimeout(() => {
            closeToast();
        }, 5000);
    }
}

function closeToast() {
    const toast = document.getElementById('techToast');
    if (toast) {
        toast.classList.remove('active');
    }
}

// Splash Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Prevent scrolling while splash screen is active
        document.body.style.overflow = 'hidden';

        // Wait 2.8s total (1.5s animation + 0.7s delay + 0.6s buffer for visual comfort)
        setTimeout(() => {
            splash.classList.add('hidden');
            // Re-enable scrolling
            document.body.style.overflow = '';
        }, 2800);
    }
});

// Timeline Tab Switcher
function switchTab(tabId, btnElement) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (btnElement) {
        btnElement.classList.add('active');
    }

    // Update lanes
    document.querySelectorAll('.timeline-lane').forEach(lane => {
        lane.classList.remove('active');
    });
    const targetLane = document.getElementById('tab-' + tabId);
    if (targetLane) {
        targetLane.classList.add('active');
    }
}

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const sunBtn = document.querySelector('.theme-toggle-vertical button:first-child');
    const moonBtn = document.querySelector('.theme-toggle-vertical button:last-child');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        sunBtn.classList.add('active');
        moonBtn.classList.remove('active');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonBtn.classList.add('active');
        sunBtn.classList.remove('active');
    }

    // Toggle to Light Mode
    sunBtn.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunBtn.classList.add('active');
        moonBtn.classList.remove('active');
    });

    // Toggle to Dark Mode
    moonBtn.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moonBtn.classList.add('active');
        sunBtn.classList.remove('active');
    });
});

