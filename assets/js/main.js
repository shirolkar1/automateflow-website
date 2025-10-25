// Main JavaScript for Automation Anywhere Clone

document.addEventListener('DOMContentLoaded', function() {
    
    const sharedFormspreeEndpoint = 'https://formspree.io/f/xjkpblpj';
    const defaultFormspreeConfig = {
        contactSales: sharedFormspreeEndpoint,
        contactGeneral: sharedFormspreeEndpoint,
        productDemo: sharedFormspreeEndpoint,
        liveDemo: sharedFormspreeEndpoint
    };
    const formspreeConfig = Object.assign({}, defaultFormspreeConfig, window.formspreeConfig || {});
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Industry Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // Cookie Banner Functionality
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const cookieSettingsBtn = document.getElementById('cookieSettings');
    
    // Show cookie banner if no preference is saved
    if (!localStorage.getItem('cookiePreference')) {
        cookieBanner.classList.add('show');
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiePreference', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }
    
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            // In a real implementation, this would open a settings modal
            alert('Cookie settings would open here');
        });
    }
    
    // Navbar Scroll Effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Logo Grid Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .logo-item, .hero-logos');
    animatedElements.forEach(el => observer.observe(el));
    
    // Form Validation and Submission
    async function submitToFormspree(form, endpoint) {
        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            
            if (response.ok) {
                return { ok: true };
            }
            
            const errorData = await response.json().catch(() => null);
            const message = errorData && errorData.errors
                ? errorData.errors.map(error => error.message).join(', ')
                : 'Submission failed. Please try again.';
            
            return { ok: false, message };
        } catch (error) {
            console.error('Formspree submission failed:', error);
            return { ok: false, message: 'Network error. Please try again shortly.' };
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText || 'Submit';
            }
        }
    }
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            let firstErrorField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                    if (!firstErrorField) {
                        firstErrorField = field;
                    }
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        field.classList.add('error');
                        isValid = false;
                        if (!firstErrorField) {
                            firstErrorField = field;
                        }
                    }
                }
            });
            
            if (!isValid) {
                // Focus on first error field
                if (firstErrorField) {
                    firstErrorField.focus();
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            const formspreeKey = form.dataset.formspreeKey;
            const formspreeEndpoint = form.dataset.formspreeEndpoint || (formspreeKey ? formspreeConfig[formspreeKey] : null);
            
            if (formspreeEndpoint) {
                const submissionResult = await submitToFormspree(form, formspreeEndpoint);
                if (!submissionResult.ok) {
                    showNotification(submissionResult.message || 'Submission failed. Please try again.', 'error');
                    return;
                }
            } else if (formspreeKey) {
                console.warn(`No Formspree endpoint configured for key: ${formspreeKey}`);
            }
            
            showNotification('Thank you for your submission! We\'ll be in touch soon.', 'success');
            form.reset();
            
            if (form.id === 'demoForm') {
                setTimeout(() => {
                    showNotification('Redirecting to calendar booking...', 'info');
                }, 2000);
            }
        });
        
        // Real-time validation
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                // Email validation on blur
                if (this.type === 'email' && this.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value.trim())) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                }
            });
            
            // Remove error on input
            field.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    });
    
    // Search Functionality
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a search modal
            const searchTerm = prompt('Enter search term:');
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Perform search
            }
        });
    }
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Dropdown Menu Functionality
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown');
    dropdownToggles.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-link');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Initialize counter animation when elements come into view
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counterElements.forEach(el => counterObserver.observe(el));
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals and dropdowns
        if (e.key === 'Escape') {
            // Close mobile menu
            navbarMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Close dropdowns
            const activeDropdowns = document.querySelectorAll('.nav-item.dropdown.active');
            activeDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            
            // Close cookie banner
            cookieBanner.classList.remove('show');
        }
    });
    
    // Initialize tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
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
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Any scroll-based functionality can be added here
    }, 16);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    console.log('Automation Anywhere clone loaded successfully!');
});

// Additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
