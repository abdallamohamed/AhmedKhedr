// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initSmoothScrolling();
    initActiveNavigation();
    initSkillBars();
    initScrollAnimations();
    initThemeToggle();
    initProfileImage();
    
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
                }
            });
        });
    }
    
    // Active Navigation Highlighting
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        window.addEventListener('scroll', () => {
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
        });
    }
    
    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                const isVisible = bar.getBoundingClientRect().top < window.innerHeight;
                
                if (isVisible && bar.style.width === '') {
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                }
            });
        };
        
        // Initial check
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.timeline-item, .education-card, .internships-card, .projects-card, .equipment-item');
        
        const animateOnScroll = () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('fade-in', 'visible');
                }
            });
        };
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
    
    // Profile Image Enhancement
    function initProfileImage() {
        const profileImg = document.querySelector('.profile-img');
        const fallback = document.querySelector('.profile-img-fallback');
        
        if (profileImg) {
            // Add loading animation
            profileImg.style.opacity = '0';
            profileImg.style.transform = 'scale(0.8)';
            
            profileImg.addEventListener('load', function() {
                this.style.transition = 'all 0.6s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            profileImg.addEventListener('error', function() {
                this.style.display = 'none';
                if (fallback) {
                    fallback.style.display = 'flex';
                    fallback.style.animation = 'fadeInUp 0.6s ease';
                }
            });
        }
    }
    
    // Navbar Background on Scroll
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = element.getAttribute('data-speed') || 1;
            const delay = index * 0.5;
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${4 / speed}s`;
        });
    }
    
    // Initialize floating elements
    initFloatingElements();
    
    // Contact Form Enhancement (if needed in future)
    function initContactEnhancement() {
        const contactLinks = document.querySelectorAll('.contact-item a, .action-buttons a');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Initialize contact enhancements
    initContactEnhancement();
    
    // Performance Optimization: Throttle scroll events
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
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        initActiveNavigation();
        initSkillBars();
        initScrollAnimations();
        initNavbarScroll();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Console welcome message
    console.log('🚀 Ahmed Khedr Portfolio loaded successfully!');
    console.log('💼 Chemistry Professional Portfolio');
    console.log('📧 Contact: khedra57@gmail.com');
});

// Additional utility functions
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

// Export functions for potential future use
window.PortfolioUtils = {
    smoothScroll: function(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    animateElement: function(element, animation) {
        element.style.animation = animation;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    }
}; 