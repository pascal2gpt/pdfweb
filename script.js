// ===================================
// CYBERPUNK PORTFOLIO - INTERACTIVE JS
// Digital Consciousness Theme
// ===================================

// ===================================
// Particle System
// ===================================

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);

            // Connect nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            'rgba(0, 243, 255, 0.8)',    // cyan
            'rgba(176, 38, 255, 0.8)',   // purple
            'rgba(255, 0, 110, 0.8)'     // pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }

        // Boundary check
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialize particle system
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    new ParticleSystem(canvas);
}

// ===================================
// Multi-Language System
// ===================================

const translations = {
    de: {
        // Navigation
        nav_home: 'START',
        nav_about: 'ÜBER MICH',
        nav_experience: 'ERFAHRUNG',
        nav_projects: 'PROJEKTE',
        nav_blog: 'BLOG',
        nav_testimonials: 'REFERENZEN',
        nav_achievements: 'ERFOLGE',
        nav_contact: 'KONTAKT',
        nav_github: 'GITHUB',

        // Hero Section
        hero_status: 'SYSTEM.AKTIV // UCSD',
        hero_tagline_1: 'KI, Politik & Innovation vereinen',
        hero_tagline_2: 'Lösungen für Bildung entwickeln',
        hero_tagline_3: 'Banking-Workflows automatisieren',
        hero_tagline_4: 'Tech & Public Policy verbinden',
        hero_btn_projects: 'PROJEKTE_ERKUNDEN',
        hero_btn_contact: 'KONTAKT_INITIIEREN',
        hero_btn_cv: 'LEBENSLAUF_LADEN',
        hero_scroll: 'NACH_UNTEN_SCROLLEN',

        // About Section
        about_title: 'SYSTEM.PROFIL',
        about_nationality: 'NATIONALITÄT',
        about_location: 'STANDORT',
        about_education: 'BILDUNG.LEVEL',
        about_education_value: 'B.A_IM_GANGE',
        about_languages: 'SPRACHEN.ARRAY',
        about_interests: 'INTERESSEN.TAGS',
        about_narrative: 'NARRATIV.STREAM',

        // Experience Section
        exp_title: 'ERFAHRUNGS.LOG',

        // Projects Section
        projects_title: 'PROJEKTE.ARRAY',
        projects_subtitle: 'KI-gesteuerte Lösungen für reale Herausforderungen entwickeln',

        // Blog Section
        blog_title: 'EINBLICKE.BLOG',
        blog_subtitle: 'Gedanken zu KI, Politik und Innovation',
        blog_read_more: 'MEHR_LESEN',
        blog_min_read: 'MIN LESEZEIT',
        blog_view_all: 'ALLE_ARTIKEL_ANZEIGEN',

        // Testimonials Section
        testimonials_title: 'REFERENZEN.LOG',
        testimonials_subtitle: 'Was Kollegen und Mitarbeiter sagen',

        // Achievements Section
        achievements_title: 'ERFOLGE.ARRAY',
        achievements_subtitle: 'Zertifikate, Auszeichnungen & Anerkennung',
        achievements_awards: 'AUSZEICHNUNGEN.LOG',
        achievements_certs: 'ZERTIFIKATE.STACK',
        achievements_view_cert: 'ZERTIFIKAT_ANSEHEN →',

        // Contact Section
        contact_title: 'KONTAKT.INITIIEREN',
        contact_subtitle: 'Bereit für KI, Politik oder Innovation zusammenzuarbeiten?',
        contact_opportunities: 'GELEGENHEITEN.OFFEN',
        contact_exploring: 'AKTUELL.ERKUNDEN',
        contact_get_in_touch: 'IN_KONTAKT_TRETEN',
        contact_name: 'NAME.EINGABE',
        contact_email: 'EMAIL.EINGABE',
        contact_message: 'NACHRICHT.TEXT',
        contact_send: 'NACHRICHT_SENDEN',
        contact_sending: 'SENDEN...',
        contact_success: '✓ NACHRICHT_GESENDET // Wir melden uns bald!',
        contact_error: '✗ FEHLER // Bitte versuchen Sie es erneut oder nutzen Sie Direct Email',
        contact_connect_via: '$ VERBINDEN_VIA.email || VERBINDEN_VIA.linkedin || VERBINDEN_VIA.github',
        contact_btn_email: 'DIREKT_EMAIL',
        contact_btn_linkedin: 'LINKEDIN',
        contact_btn_cv: 'LEBENSLAUF_LADEN',

        // Footer
        footer_tagline: 'Die Zukunft an der Schnittstelle von KI, Politik und Unternehmertum gestalten.',
        footer_nav: 'NAVIGATION.BAUM',
        footer_social: 'VERBINDEN.SOZIAL',
        footer_copyright: '© 2025 Pascal Dominik Freyer. Alle Rechte vorbehalten.',
        footer_built_with: '// Gebaut mit Cyberpunk-Ästhetik & Glassmorphismus',
    },
    en: {
        // Navigation
        nav_home: 'HOME',
        nav_about: 'ABOUT',
        nav_experience: 'EXPERIENCE',
        nav_projects: 'PROJECTS',
        nav_blog: 'BLOG',
        nav_testimonials: 'TESTIMONIALS',
        nav_achievements: 'ACHIEVEMENTS',
        nav_contact: 'CONTACT',
        nav_github: 'GITHUB',

        // Hero Section
        hero_status: 'SYSTEM.ACTIVE // UCSD',
        hero_tagline_1: 'Combining AI, Policy & Innovation',
        hero_tagline_2: 'Building Solutions for Education',
        hero_tagline_3: 'Automating Banking Workflows',
        hero_tagline_4: 'Bridging Tech & Public Policy',
        hero_btn_projects: 'EXPLORE_PROJECTS',
        hero_btn_contact: 'INIT_CONTACT',
        hero_btn_cv: 'DOWNLOAD_CV',
        hero_scroll: 'SCROLL_DOWN',

        // About Section
        about_title: 'SYSTEM.PROFILE',
        about_nationality: 'NATIONALITY',
        about_location: 'LOCATION',
        about_education: 'EDUCATION.LEVEL',
        about_education_value: 'B.A_IN_PROGRESS',
        about_languages: 'LANGUAGES.ARRAY',
        about_interests: 'INTERESTS.TAGS',
        about_narrative: 'NARRATIVE.STREAM',

        // Experience Section
        exp_title: 'EXPERIENCE.LOG',

        // Projects Section
        projects_title: 'PROJECTS.ARRAY',
        projects_subtitle: 'Building AI-driven solutions for real-world challenges',

        // Blog Section
        blog_title: 'INSIGHTS.BLOG',
        blog_subtitle: 'Thoughts on AI, policy, and innovation',
        blog_read_more: 'READ_MORE',
        blog_min_read: 'MIN READ',
        blog_view_all: 'VIEW_ALL_ARTICLES',

        // Testimonials Section
        testimonials_title: 'TESTIMONIALS.LOG',
        testimonials_subtitle: 'What colleagues and collaborators say',

        // Achievements Section
        achievements_title: 'ACHIEVEMENTS.ARRAY',
        achievements_subtitle: 'Certifications, Awards & Recognition',
        achievements_awards: 'AWARDS.LOG',
        achievements_certs: 'CERTIFICATES.STACK',
        achievements_view_cert: 'VIEW_CERT →',

        // Contact Section
        contact_title: 'INIT.CONTACT',
        contact_subtitle: 'Ready to collaborate on AI, policy, or innovation?',
        contact_opportunities: 'OPPORTUNITIES.OPEN',
        contact_exploring: 'EXPLORING.CURRENTLY',
        contact_get_in_touch: 'GET_IN_TOUCH',
        contact_name: 'NAME.INPUT',
        contact_email: 'EMAIL.INPUT',
        contact_message: 'MESSAGE.TEXT',
        contact_send: 'SEND_MESSAGE',
        contact_sending: 'SENDING...',
        contact_success: '✓ MESSAGE_SENT // We\'ll be in touch soon!',
        contact_error: '✗ ERROR // Please try again or use direct email',
        contact_connect_via: '$ CONNECT_VIA.email || CONNECT_VIA.linkedin || CONNECT_VIA.github',
        contact_btn_email: 'DIRECT_EMAIL',
        contact_btn_linkedin: 'LINKEDIN',
        contact_btn_cv: 'DOWNLOAD_CV',

        // Footer
        footer_tagline: 'Building the future at the intersection of AI, policy, and entrepreneurship.',
        footer_nav: 'NAVIGATION.TREE',
        footer_social: 'CONNECT.SOCIAL',
        footer_copyright: '© 2025 Pascal Dominik Freyer. All rights reserved.',
        footer_built_with: '// Built with cyberpunk aesthetics & glassmorphism',
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Check saved preference first
        const savedLang = localStorage.getItem('language');
        if (savedLang && (savedLang === 'de' || savedLang === 'en')) {
            return savedLang;
        }

        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;

        // If browser language is German, use German
        if (browserLang.startsWith('de')) {
            return 'de';
        }

        // Default to German as fallback (as requested)
        return 'de';
    }

    init() {
        // Apply initial language
        this.applyTranslations(this.currentLang);

        // Update language toggle buttons
        this.updateLanguageToggles();

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        const langToggles = document.querySelectorAll('[data-lang]');
        langToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = toggle.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang !== 'de' && lang !== 'en') return;

        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyTranslations(lang);
        this.updateLanguageToggles();

        // Update typewriter if it's running
        if (window.typeWriterInstance) {
            const texts = lang === 'de'
                ? [
                    'KI, Politik & Innovation vereinen',
                    'Lösungen für Bildung entwickeln',
                    'Banking-Workflows automatisieren',
                    'Tech & Public Policy verbinden'
                ]
                : [
                    'Combining AI, Policy & Innovation',
                    'Building Solutions for Education',
                    'Automating Banking Workflows',
                    'Bridging Tech & Public Policy'
                ];
            window.typeWriterInstance.texts = texts;
            window.typeWriterInstance.textIndex = 0;
            window.typeWriterInstance.charIndex = 0;
        }
    }

    applyTranslations(lang) {
        const trans = translations[lang];

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (trans[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = trans[key];
                } else {
                    element.textContent = trans[key];
                }
            }
        });
    }

    updateLanguageToggles() {
        document.querySelectorAll('[data-lang]').forEach(toggle => {
            const lang = toggle.getAttribute('data-lang');
            if (lang === this.currentLang) {
                toggle.classList.add('active-lang');
            } else {
                toggle.classList.remove('active-lang');
            }
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize language manager
const languageManager = new LanguageManager();

// ===================================
// Dark/Light Mode Theme Toggle
// ===================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeToggleMobile = document.getElementById('theme-toggle-mobile');
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        this.mobileText = document.getElementById('theme-toggle-mobile-text');

        this.init();
    }

    init() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }

        // Add event listeners
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (this.themeToggleMobile) {
            this.themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    this.setDarkMode();
                } else {
                    this.setLightMode();
                }
            }
        });
    }

    toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            this.setDarkMode();
            localStorage.setItem('theme', 'dark');
        } else {
            this.setLightMode();
            localStorage.setItem('theme', 'light');
        }
    }

    setLightMode() {
        document.body.classList.add('light-mode');
        if (this.lightIcon) this.lightIcon.classList.remove('hidden');
        if (this.darkIcon) this.darkIcon.classList.add('hidden');
        if (this.mobileText) this.mobileText.textContent = 'DARK MODE';
    }

    setDarkMode() {
        document.body.classList.remove('light-mode');
        if (this.darkIcon) this.darkIcon.classList.remove('hidden');
        if (this.lightIcon) this.lightIcon.classList.add('hidden');
        if (this.mobileText) this.mobileText.textContent = 'LIGHT MODE';
    }
}

// Initialize theme manager
new ThemeManager();

// ===================================
// Typewriter Effect
// ===================================

class TypeWriter {
    constructor(element, texts, speed = 50) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter with language support
const typingElement = document.getElementById('typing-text');
if (typingElement) {
    // Get initial language from language manager
    const initialLang = languageManager.getCurrentLanguage();
    const texts = initialLang === 'de'
        ? [
            'KI, Politik & Innovation vereinen',
            'Lösungen für Bildung entwickeln',
            'Banking-Workflows automatisieren',
            'Tech & Public Policy verbinden'
        ]
        : [
            'Combining AI, Policy & Innovation',
            'Building Solutions for Education',
            'Automating Banking Workflows',
            'Bridging Tech & Public Policy'
        ];
    window.typeWriterInstance = new TypeWriter(typingElement, texts, 80);
}

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link-cyber');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// ===================================
// Intersection Observer for Reveal Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all reveal elements
const revealElements = document.querySelectorAll('.reveal-element');
revealElements.forEach(el => observer.observe(el));

// ===================================
// Glitch Effect Trigger
// ===================================

function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-title');

    setInterval(() => {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        if (randomElement) {
            randomElement.style.animation = 'none';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 10);
        }
    }, 5000);
}

addGlitchEffect();

// ===================================
// Cursor Trail Effect (Optional)
// ===================================

class CursorTrail {
    constructor() {
        this.coords = [];
        this.cursor = null;
        this.init();
    }

    init() {
        // Create cursor element
        this.cursor = document.createElement('div');
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(0, 243, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(this.cursor);

        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            this.coords.push({ x: e.clientX, y: e.clientY });
            if (this.coords.length > 1) {
                this.coords.shift();
            }
            this.updateCursor();
        });
    }

    updateCursor() {
        if (this.coords.length > 0) {
            const { x, y } = this.coords[this.coords.length - 1];
            this.cursor.style.left = `${x - 10}px`;
            this.cursor.style.top = `${y - 10}px`;
        }
    }
}

// Uncomment to enable custom cursor
// new CursorTrail();

// ===================================
// 3D Card Tilt Effect
// ===================================

function add3DTiltEffect() {
    const cards = document.querySelectorAll('.project-card-3d, .holographic-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

add3DTiltEffect();

// ===================================
// Data Visualization Bars Animation
// ===================================

function animateDataBars() {
    const dataBars = document.querySelectorAll('.data-viz-bar');

    dataBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
            bar.style.opacity = '1';
        }, index * 200);
    });
}

// Trigger on load
window.addEventListener('load', animateDataBars);

// ===================================
// Stats Counter Animation
// ===================================

function animateStats() {
    const statFills = document.querySelectorAll('.stat-fill');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.transition = 'width 1.5s ease-out';
                    fill.style.width = width;
                }, 100);
                statsObserver.unobserve(fill);
            }
        });
    });

    statFills.forEach(fill => statsObserver.observe(fill));
}

animateStats();

// ===================================
// Console Easter Egg
// ===================================

console.log('%c███████╗ ██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ ██████╗ ██╗   ██╗███╗   ██╗██╗  ██╗', 'color: #00f3ff; font-weight: bold;');
console.log('%c██╔════╝ ╚██╗ ██╔╝██╔════╝██║  ██║██╔════╝██╔══██╗██╔══██╗██║   ██║████╗  ██║██║ ██╔╝', 'color: #b026ff; font-weight: bold;');
console.log('%c██║       ╚████╔╝ ██║     ███████║█████╗  ██████╔╝██████╔╝██║   ██║██╔██╗ ██║█████╔╝ ', 'color: #ff006e; font-weight: bold;');
console.log('%c██║        ╚██╔╝  ██║     ██╔══██║██╔══╝  ██╔══██╗██╔═══╝ ██║   ██║██║╚██╗██║██╔═██╗ ', 'color: #00f3ff; font-weight: bold;');
console.log('%c╚██████╗    ██║   ╚██████╗██║  ██║███████╗██║  ██║██║     ╚██████╔╝██║ ╚████║██║  ██╗', 'color: #b026ff; font-weight: bold;');
console.log('%c ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝', 'color: #ff006e; font-weight: bold;');
console.log('%c\n🚀 Welcome to Pascal Freyer\'s Digital Consciousness', 'color: #00f3ff; font-size: 14px; font-weight: bold;');
console.log('%cBuilt with: Cyberpunk Aesthetics + Glassmorphism + Particle Systems', 'color: #b026ff; font-size: 12px;');
console.log('%cInspired by: Blade Runner, Cyberpunk 2077, & The Matrix', 'color: #ff006e; font-size: 12px;');
console.log('%c\n💼 Interested in collaboration? Reach out!', 'color: #00f3ff; font-size: 12px;');

// ===================================
// Performance Monitor (Development)
// ===================================

function logPerformance() {
    if (performance.timing) {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00ff00; font-weight: bold;');
    }
}

window.addEventListener('load', logPerformance);

// ===================================
// Keyboard Shortcuts
// ===================================

document.addEventListener('keydown', (e) => {
    // Press 'h' to go home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        const homeSection = document.getElementById('home');
        if (homeSection && document.activeElement.tagName !== 'INPUT') {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 'g' to toggle grid visibility
    if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        const grid = document.querySelector('.cyber-grid');
        if (grid) {
            grid.style.opacity = grid.style.opacity === '0' ? '1' : '0';
        }
    }

    // Press 'p' to toggle particles
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        const particles = document.getElementById('particles-canvas');
        if (particles) {
            particles.style.opacity = particles.style.opacity === '0' ? '1' : '0';
        }
    }
});

// ===================================
// Random Glitch Text Effect
// ===================================

function glitchRandomText() {
    const glitchables = document.querySelectorAll('.glitch');

    setInterval(() => {
        if (Math.random() > 0.95) {
            const randomElement = glitchables[Math.floor(Math.random() * glitchables.length)];
            if (randomElement) {
                randomElement.classList.add('glitching');
                setTimeout(() => {
                    randomElement.classList.remove('glitching');
                }, 300);
            }
        }
    }, 1000);
}

glitchRandomText();

// ===================================
// Scroll Progress Indicator
// ===================================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00f3ff, #b026ff, #ff006e);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ===================================
// Button Click Effects
// ===================================

document.querySelectorAll('.cyber-button-primary, .cyber-button-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Analytics & Event Tracking
// ===================================

function trackEvent(category, action, label) {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    // Add your analytics code here (Google Analytics, Plausible, etc.)
}

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            trackEvent('Section', 'View', sectionId);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// Track button clicks
document.querySelectorAll('.cyber-button-primary, .cyber-button-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track card hovers
document.querySelectorAll('.project-card-3d').forEach(card => {
    let hoverTimeout;
    card.addEventListener('mouseenter', (e) => {
        const cardTitle = card.querySelector('h3').textContent;
        hoverTimeout = setTimeout(() => {
            trackEvent('Project Card', 'Hover', cardTitle);
        }, 1000);
    });
    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
    });
});

// ===================================
// Auto-update Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
document.querySelectorAll('footer').forEach(footer => {
    footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
});

// ===================================
// Accessibility: Skip to Content
// ===================================

function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 10px;
        background: #00f3ff;
        color: #000;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        z-index: 10000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

createSkipLink();

// ===================================
// Dynamic Copyright Year
// ===================================

console.log(`%c\n© ${currentYear} Pascal Dominik Freyer`, 'color: #00f3ff; font-size: 10px;');
console.log('%cAll systems operational. Welcome to the future.', 'color: #b026ff; font-size: 10px;');

// ===================================
// Contact Form Submission
// ===================================

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const statusEl = formStatus;

        // Show loading state
        statusEl.textContent = 'SENDING...';
        statusEl.className = 'text-center text-sm font-mono text-cyan-400';
        statusEl.classList.remove('hidden');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                statusEl.textContent = '✓ MESSAGE_SENT // We\'ll be in touch soon!';
                statusEl.className = 'text-center text-sm font-mono text-green-400';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    statusEl.classList.add('hidden');
                }, 5000);
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            statusEl.textContent = '✗ ERROR // Please try again or use direct email';
            statusEl.className = 'text-center text-sm font-mono text-red-400';
            console.error('Form submission error:', error);
        }
    });
}
