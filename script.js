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

// Document Viewer Functions
function openDocumentViewer(url, title = 'Document') {
    const modal = document.getElementById('documentViewerModal');
    const iframe = document.getElementById('docViewerIframe');
    const titleEl = document.getElementById('docViewerTitle');

    if (modal && iframe && titleEl) {
        // Set the title
        titleEl.textContent = title;
        // Set the iframe source to the PDF/image
        iframe.src = url;

        // Show the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeDocumentViewer() {
    const modal = document.getElementById('documentViewerModal');
    const iframe = document.getElementById('docViewerIframe');

    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Clear the iframe source so it doesn't keep running in the background
        if (iframe) {
            iframe.src = '';
        }
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    const certModal = document.getElementById('certificatesModal');
    const docModal = document.getElementById('documentViewerModal');
    if (event.target === certModal) {
        closeCertificatesModal();
    }
    if (event.target === docModal) {
        closeDocumentViewer();
    }
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

// Cinematic Splash Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Prevent scrolling while splash screen is active
        document.body.style.overflow = 'hidden';

        // Set up Web Audio API for procedural thuds
        let audioCtx;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }

        function playThud() {
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.type = 'sine';

            // Low-frequency thump
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

            // Fast attack and decay for wood impact
            gainNode.gain.setValueAtTime(1.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        }

        // User must click "Enter" to start AudioContext and animations
        const startBtn = document.getElementById('start-btn');
        const startOverlay = document.getElementById('start-overlay');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                // Hide button overlay
                startOverlay.classList.add('hidden');
                // Trigger CSS animations
                splash.classList.add('is-playing');

                // Initialize audio context on user gesture
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    audioCtx = new AudioContext();
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume();
                    }
                } catch (e) {
                    console.warn("Web Audio API not supported", e);
                }

                // Calculate impact times based on CSS delays + 60% of animation duration (1.2s * 0.6 = 0.72s)
                const dropDelays = [100, 300, 500, 700, 900, 1100, 1300]; // in ms
                const impactOffset = 720;

                dropDelays.forEach((delay) => {
                    setTimeout(() => {
                        playThud();
                    }, delay + impactOffset);
                });

                // Determine the dynamic greeting
                let greetingText = "🙏 Welcome Sir";
                let spokenText = "Welcome, Sir";
                const hour = new Date().getHours();
                if (hour >= 5 && hour < 12) {
                    greetingText = "🙏 Good Morning Sir";
                    spokenText = "Good morning, Sir";
                } else if (hour >= 12 && hour < 17) {
                    greetingText = "🙏 Good Afternoon Sir";
                    spokenText = "Good afternoon, Sir";
                } else if (hour >= 17 && hour < 21) {
                    greetingText = "🙏 Good Evening Sir";
                    spokenText = "Good evening, Sir";
                } else {
                    greetingText = "🙏 Good Night Sir";
                    spokenText = "Good night, Sir";
                }

                // Set text and reveal plank
                setTimeout(() => {
                    const dynamicGreeting = document.getElementById('dynamic-greeting');
                    const greetingPlank = document.getElementById('greeting-plank');
                    if (dynamicGreeting && greetingPlank) {
                        dynamicGreeting.textContent = greetingText;
                        greetingPlank.classList.add('reveal');

                        // Speak the greeting
                        setTimeout(() => {
                            if ('speechSynthesis' in window) {
                                const utterance = new SpeechSynthesisUtterance(spokenText);
                                utterance.rate = 0.9;
                                utterance.pitch = 1.1;
                                // Attempt to pick a natural voice if available
                                const voices = window.speechSynthesis.getVoices();
                                const preferredVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google'));
                                if (preferredVoice) utterance.voice = preferredVoice;

                                window.speechSynthesis.speak(utterance);
                            }
                        }, 500); // Speak half a second after plank reveal
                    }
                }, 2200); // 1300 + 720 ~ 2020ms last impact, show plank at 2.2s

                // Hide splash screen after sequence finishes
                setTimeout(() => {
                    splash.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 5000); // 5s total orchestration time
            });
        }
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
