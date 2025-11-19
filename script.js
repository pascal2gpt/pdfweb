// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

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

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

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
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
fadeElements.forEach(el => observer.observe(el));

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('footer p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Optional: Add typing effect to a specific element
// Uncomment below to enable
/*
window.addEventListener('load', () => {
    const heroSubtext = document.querySelector('#home p');
    if (heroSubtext) {
        const originalText = heroSubtext.textContent;
        typeWriter(heroSubtext, originalText, 30);
    }
});
*/

// ===================================
// Scroll Progress Indicator (Optional)
// ===================================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0ea5e9, #14b8a6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Uncomment to enable scroll progress indicator
// createScrollProgress();

// ===================================
// Parallax Effect for Hero Background (Optional)
// ===================================

function parallaxEffect() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = heroSection.querySelectorAll('.absolute');

        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Uncomment to enable parallax effect
// parallaxEffect();

// ===================================
// Email Protection (Simple obfuscation)
// ===================================

function protectEmail() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Optional: Add analytics tracking here
            console.log('Email link clicked');
        });
    });
}

protectEmail();

// ===================================
// Lazy Loading for Images (if added later)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Performance: Debounce Scroll Events
// ===================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events if needed
const debouncedHighlight = debounce(highlightNavigation, 50);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// Dark Mode Toggle (Optional - Prepared)
// ===================================

function initDarkMode() {
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Uncomment to enable dark mode
// initDarkMode();

// Add dark mode toggle button if needed:
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌓';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #14b8a6);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
`;
darkModeToggle.addEventListener('click', toggleDarkMode);
darkModeToggle.addEventListener('mouseenter', () => {
    darkModeToggle.style.transform = 'scale(1.1) rotate(180deg)';
});
darkModeToggle.addEventListener('mouseleave', () => {
    darkModeToggle.style.transform = 'scale(1) rotate(0deg)';
});
document.body.appendChild(darkModeToggle);
*/

// ===================================
// Console Easter Egg
// ===================================

console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #0ea5e9;');
console.log('%cInterested in how this site was built?', 'font-size: 14px; color: #64748b;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript + Tailwind CSS', 'font-size: 12px; color: #94a3b8;');
console.log('%cFeel free to reach out: contact@pascalfreyer.com', 'font-size: 12px; color: #0d9488;');

// ===================================
// Analytics Preparation (Google Analytics, etc.)
// ===================================

function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // Implement with Google Analytics, Plausible, or your preferred analytics tool
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const linkUrl = e.target.href;
        trackEvent('External Link', 'Click', linkUrl);
    });
});

// ===================================
// Performance: Log Page Load Time
// ===================================

window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ===================================
// Accessibility: Skip to Content Link
// ===================================

function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: #0ea5e9;
        color: white;
        padding: 0.5rem 1rem;
        z-index: 10000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Uncomment to add skip link for accessibility
// createSkipLink();

// ===================================
// Form Validation (if contact form is added)
// ===================================

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Add to contact form if implemented:
// const contactForm = document.querySelector('#contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         if (validateForm(contactForm)) {
//             // Submit form
//         }
//     });
// }
