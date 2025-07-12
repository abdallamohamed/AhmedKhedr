// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components with error handling
    try {
        initSmoothScrolling();
        initActiveNavigation();
        initSkillBars();
        initScrollAnimations();
        initThemeToggle();
        initProfileImage();
        initNavbarScroll();
        initFloatingElements();
        initContactEnhancement();
    } catch (error) {
        console.error('Error initializing portfolio components:', error);
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Active Navigation Highlighting with Intersection Observer
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -80% 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute('id');
                        
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${currentId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => observer.observe(section));
        } else {
            // Fallback for older browsers
            window.addEventListener('scroll', throttle(() => {
                let current = '';
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }, 100));
        }
    }
    
    // Skill Bars Animation with Intersection Observer
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillItems = document.querySelectorAll('.skill-item');
        
        if (skillBars.length === 0) return;
        
        // Reset all skill bars to 0 width initially
        skillBars.forEach(bar => {
            bar.style.width = '0%';
            bar.classList.remove('animate');
        });
        
        // Reset skill items
        skillItems.forEach(item => {
            item.classList.remove('visible');
        });
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.getAttribute('data-width');
                        const skillItem = bar.closest('.skill-item');
                        
                        if (bar.style.width === '0%') {
                            // Animate the skill item first
                            if (skillItem) {
                                skillItem.classList.add('visible');
                            }
                            
                            // Add animation class for shimmer effect
                            bar.classList.add('animate');
                            
                            // Calculate delay based on position for staggered effect
                            const index = Array.from(skillBars).indexOf(bar);
                            const delay = 500 + (index * 150);
                            
                            // Animate the width with a staggered delay for better visual effect
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, delay);
                        }
                    }
                });
            }, { 
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });
            
            skillBars.forEach(bar => observer.observe(bar));
        } else {
            // Fallback animation for older browsers
            const animateSkillBars = () => {
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    const rect = bar.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    const skillItem = bar.closest('.skill-item');
                    
                    if (isVisible && bar.style.width === '0%') {
                        if (skillItem) {
                            skillItem.classList.add('visible');
                        }
                        bar.classList.add('animate');
                        
                        // Calculate delay based on position for staggered effect
                        const delay = 500 + (index * 150);
                        
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, delay);
                    }
                });
            };
            
            animateSkillBars();
            window.addEventListener('scroll', throttle(animateSkillBars, 100));
        }
    }
    
    // Scroll Animations with Intersection Observer
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.timeline-item, .education-card, .internships-card, .projects-card, .equipment-item');
        
        if (elements.length === 0) return;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in', 'visible');
                    }
                });
            }, { threshold: 0.1 });
            
            elements.forEach(element => observer.observe(element));
        } else {
            // Fallback animation
            const animateOnScroll = () => {
                elements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('fade-in', 'visible');
                    }
                });
            };
            
            animateOnScroll();
            window.addEventListener('scroll', throttle(animateOnScroll, 100));
        }
    }
    
    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        if (!themeToggle) return;
        
        // Check for saved theme preference or default to light theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        updateAriaPressed(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme);
            updateAriaPressed(newTheme);
        });
        
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        
        function updateAriaPressed(theme) {
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }
    }
    
    // Profile Image Loading and Error Handling
    function initProfileImage() {
        const profileImages = document.querySelectorAll('.profile-img, .hero-profile-image');
        
        profileImages.forEach(img => {
            // Add loading class initially
            img.classList.add('loading');
            
            // Handle successful load
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            // Handle load error
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.style.display = 'none';
                
                // Show fallback if available
                const fallback = this.nextElementSibling;
                if (fallback && fallback.classList.contains('profile-img-fallback')) {
                    fallback.style.display = 'block';
                }
            });
            
            // If image is already loaded (cached)
            if (img.complete) {
                img.classList.remove('loading');
                img.classList.add('loaded');
            }
        });
    }
    
    // Navbar Scroll Effect
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        
        if (!navbar) return;
        
        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        updateNavbar();
        window.addEventListener('scroll', throttle(updateNavbar, 100));
    }
    
    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.equipment-item, .project-item');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Contact Enhancement
    function initContactEnhancement() {
        const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add a small delay to allow the default action
                setTimeout(() => {
                    // Track contact interaction if analytics is available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'contact_click', {
                            'event_category': 'engagement',
                            'event_label': this.href
                        });
                    }
                }, 100);
            });
        });
    }
    
    // Utility Functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
});

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}