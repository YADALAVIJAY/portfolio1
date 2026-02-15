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
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close Menu
function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInside && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Open Resume function
function openResume(e) {
    e.preventDefault();
    // Open resume PDF in new tab
    window.open('vijay_resume.pdf', '_blank');

    // If the PDF doesn't exist, show a message
    // You need to place your resume.pdf file in the same folder as index.html
}

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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and items
document.querySelectorAll('.project-card, .achievement-item, .education-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeCertificatesModal() {
    const modal = document.getElementById('certificatesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    const modal = document.getElementById('certificatesModal');
    if (event.target === modal) {
        closeCertificatesModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCertificatesModal();
    }
});

// Open certificate function
function openCertificate(type) {
    let certificateUrl = '';

    if (type === 'python') {
        certificateUrl = 'python certificate.pdf';
    }

    if (certificateUrl) {
        // Open certificate in new tab
        window.open(certificateUrl, '_blank');
    }
}

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
