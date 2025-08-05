// Dark Mode Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateToggleIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation effect
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    updateToggleIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animation Observer
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.service-card, .project-card, .about-card, .contact-card, .feature-item');
        this.init();
    }

    init() {
        // Add animation class to elements
        this.animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });

        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Navbar Scroll Effect
class NavbarEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        this.typingElement = document.querySelector('.typing-text');
        this.text = 'One User at a Time';
        this.index = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.typingElement) {
            this.typingElement.textContent = '';
            this.type();
        }
    }

    type() {
        const current = this.index;
        const fullText = this.text;

        if (!this.isDeleting) {
            this.typingElement.textContent = fullText.substring(0, current + 1);
            this.index++;

            if (this.index === fullText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, 2000);
                return;
            }
        } else {
            this.typingElement.textContent = fullText.substring(0, current - 1);
            this.index--;

            if (this.index === 0) {
                this.isDeleting = false;
            }
        }

        const typeSpeed = this.isDeleting ? 50 : 100;
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Floating Cards Animation
class FloatingCards {
    constructor() {
        this.cards = document.querySelectorAll('.floating-cards .card');
        this.init();
    }

    init() {
        this.cards.forEach((card, index) => {
            // Add mouse move effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.05)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) scale(1)';
            });

            // Add random floating animation
            this.addFloatingAnimation(card, index);
        });
    }

    addFloatingAnimation(card, index) {
        const randomDelay = Math.random() * 2000;
        const randomDuration = 3000 + Math.random() * 2000;

        setTimeout(() => {
            card.style.animation = `float ${randomDuration}ms ease-in-out infinite`;
        }, randomDelay);
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.form = document.querySelector('.form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });

            // Add input animations
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.style.transform = 'scale(1.02)';
                });

                input.addEventListener('blur', () => {
                    input.parentElement.style.transform = 'scale(1)';
                });
            });
        }
    }

    async handleSubmit() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(this.form);

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;

        try {
            // Prepare email data
            const emailData = {
                to: 'invotechng@gmail.com',
                subject: `New Contact Form Submission from ${formData.get('name')}`,
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company') || 'Not specified',
                message: formData.get('message')
            };

            // For demo purposes, we'll simulate email sending
            // In production, this would connect to your email service
            await this.simulateEmailSending(emailData);

            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            submitBtn.style.background = 'var(--gradient-accent)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--gradient-primary)';
                this.form.reset();
            }, 2000);

        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Error Sending</span>';
            submitBtn.style.background = '#ef4444';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--gradient-primary)';
            }, 2000);
        }
    }

    async simulateEmailSending(emailData) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Email would be sent to:', emailData.to);
                console.log('Email data:', emailData);
                resolve();
            }, 1500);
        });
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (this.button) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    this.button.classList.add('visible');
                } else {
                    this.button.classList.remove('visible');
                }
            });

            // Smooth scroll to top when clicked
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggleMenu();
                }
            });
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '70px';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = 'var(--bg-primary)';
            this.navMenu.style.padding = '2rem';
            this.navMenu.style.boxShadow = '0 4px 20px var(--shadow-medium)';
            this.navMenu.style.borderTop = '1px solid var(--border-color)';
            
            // Animate hamburger
            const spans = this.hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.navMenu.style.display = 'none';
            
            // Reset hamburger
            const spans = this.hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// Parallax Effect for Hero Background
class ParallaxEffect {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.shapes = document.querySelectorAll('.floating-shapes .shape');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (this.heroSection) {
                this.shapes.forEach((shape, index) => {
                    const speed = 0.2 + (index * 0.1);
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }
}

// Button Ripple Effect
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Counter Animation for Statistics
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            counter.textContent = Math.floor(current);

            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple CSS to document
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    // Initialize all components
    new ThemeManager();
    new SmoothScroll();
    new ScrollAnimations();
    new NavbarEffects();
    new TypingAnimation();
    new FloatingCards();
    new FormHandler();
    new BackToTop();
    new MobileMenu();
    new ParallaxEffect();
    new RippleEffect();
    new CounterAnimation();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

// Error handling for animations
window.addEventListener('error', (e) => {
    console.warn('Animation error:', e.error);
});

// Add custom cursor effect for interactive elements
class CustomCursor {
    constructor() {
        this.cursor = this.createCursor();
        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            this.cursor.style.opacity = '0.5';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '0.5';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .project-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.background = 'var(--secondary-color)';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'var(--primary-color)';
            });
        });
    }
}

// Initialize custom cursor on desktop devices
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', () => {
        new CustomCursor();
    });
}

