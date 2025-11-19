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

// Initialize typewriter
const typingElement = document.getElementById('typing-text');
if (typingElement) {
    const texts = [
        'Combining AI, Policy & Innovation',
        'Building Solutions for Education',
        'Automating Banking Workflows',
        'Bridging Tech & Public Policy'
    ];
    new TypeWriter(typingElement, texts, 80);
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
