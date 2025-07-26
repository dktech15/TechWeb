// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add staggered animation for cards
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('review-card')) {
                const cards = entry.target.parentElement.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .stat, .review-card, .contact-item, .value-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced Button Click Animations with Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Advanced Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h3');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Floating Cards Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
});

// Service Category Tabs with Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    // Initialize: Show all cards by default
    serviceCards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.classList.add('animate');
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Enhanced show/hide animation for service cards
            serviceCards.forEach((card, index) => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.animation = 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.classList.add('animate');
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate');
                }
            });
        });
    });
});

// Enhanced Form Submission with Better UX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Enhanced validation with visual feedback
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4444';
                input.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
                isValid = false;
            } else {
                input.style.borderColor = '#00ff88';
                input.style.boxShadow = '0 0 0 3px rgba(0, 255, 136, 0.1)';
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const emailInput = this.querySelector('input[type="email"]');
            emailInput.style.borderColor = '#ff4444';
            emailInput.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
            isValid = false;
        }
        
        if (!isValid) {
            showNotification('Please fill in all fields correctly', 'error');
            return;
        }
        
        // Enhanced form submission with loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call with better UX
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Reset input styles
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                input.style.boxShadow = 'none';
            });
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
        }
        
        .notification-success {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
        }
        
        .notification-error {
            background: linear-gradient(135deg, #ff4444, #cc3333);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #00ccff, #0099cc);
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(notificationStyle);
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Enhanced Scroll Animations with Staggered Effects
const scrollAnimations = {
    init() {
        this.observeElements();
        this.addScrollEffects();
    },
    
    observeElements() {
        const elements = document.querySelectorAll('.service-card, .review-card, .stat, .contact-item, .value-item');
        
        elements.forEach((el, index) => {
            // Check if element is already in viewport
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            // Only hide elements that are not in the initial viewport
            if (!isInView) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            } else {
                // Elements in initial viewport should be visible
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('animate');
            }
            
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(el);
        });
    },
    
    addScrollEffects() {
        // Add scroll-triggered animations for different sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            }, { threshold: 0.3 });
            
            sectionObserver.observe(section);
        });
    }
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations.init();
    
    // Ensure hero section and important content is always visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.visibility = 'visible';
    }
    
    // Ensure services and reviews sections are visible
    const servicesSection = document.querySelector('.services');
    const reviewsSection = document.querySelector('.reviews');
    
    if (servicesSection) {
        servicesSection.style.display = 'block';
        servicesSection.style.visibility = 'visible';
        servicesSection.style.opacity = '1';
    }
    
    if (reviewsSection) {
        reviewsSection.style.display = 'block';
        reviewsSection.style.visibility = 'visible';
        reviewsSection.style.opacity = '1';
    }
    
    // Ensure all service cards are visible
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    });
    
    // Ensure all review cards are visible
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    });
    
    // Ensure content is visible after page loads
    setTimeout(() => {
        const allElements = document.querySelectorAll('.service-card, .review-card, .stat, .contact-item, .value-item');
        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('animate');
            }
        });
        
        // Force visibility of important sections
        const importantSections = document.querySelectorAll('.hero, .about, .services, .reviews, .contact');
        importantSections.forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.display = 'block';
        });
    }, 100);
});

// Enhanced Hover Effects for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to review cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Smooth Scroll to Top Button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00ff88, #00ccff);
        color: #000000;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px) scale(1.1)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Enhanced Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add CSS for enhanced animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section-visible {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .floating-card:hover {
        transform: translateY(-10px) scale(1.05);
    }
    
    .stat:hover {
        transform: translateY(-5px);
    }
    
    .contact-item:hover {
        transform: translateX(10px);
    }
    
    .review-card:hover {
        transform: translateY(-10px);
    }
    
    .value-item:hover {
        transform: translateY(-5px);
    }
`;
document.head.appendChild(enhancedStyles); 