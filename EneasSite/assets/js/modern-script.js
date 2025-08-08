// ========================================
// MODERN JAVASCRIPT FOR DR. ENÉAS SITE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initHeaderScroll();
    initAnimations();
    initContactForm();
    initPalestrasToggle();
    
    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        if (savedTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        } else {
            body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-moon';
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (newTheme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Add smooth transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
    
    // Mobile Menu Functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (navMenu.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = '';
                        span.style.opacity = '';
                    }
                });
            });
            
            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                });
            });
        }
    }
    
    // Smooth Scroll for Navigation Links
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId);
                }
            });
        });
    }
    
    // Update Active Navigation Link
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Header Scroll Effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(26, 54, 93, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(26, 54, 93, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            // Update active section based on scroll position
            updateActiveSectionOnScroll();
            
            lastScroll = currentScroll;
        });
    }
    
    // Update Active Section on Scroll
    function updateActiveSectionOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = '#' + section.getAttribute('id');
                updateActiveNavLink(sectionId);
            }
        });
    }
    
    // Initialize Scroll Animations
    function initAnimations() {
        // Create Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Add animation styles and observe elements
        const animatedElements = document.querySelectorAll('.carreira-card, .quote-card, .contribution-card, .palestra-card, .timeline-card');
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Validate form
                if (validateForm(formObject)) {
                    // Show success message
                    showNotification('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
                    this.reset();
                } else {
                    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                }
            });
        }
    }
    
    // Form Validation
    function validateForm(data) {
        return data.nome && data.email && data.assunto && data.mensagem && 
               isValidEmail(data.email);
    }
    
    // Email Validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show Notifications
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Palestras Toggle Functionality
    function initPalestrasToggle() {
        // Hide palestras beyond the first 6 initially
        const allPalestras = document.querySelectorAll('.palestra-card');
        allPalestras.forEach((palestra, index) => {
            if (index >= 6) {
                palestra.classList.add('hidden');
            }
        });
        
        const toggleBtn = document.querySelector('.ver-todas-palestras .btn');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                togglePalestras();
            });
        }
    }
    
    // Toggle Palestras Function (referenced in HTML)
    window.togglePalestras = function() {
        const hiddenPalestras = document.querySelectorAll('.palestra-card.hidden');
        const toggleBtn = document.querySelector('#toggle-text');
        const icon = document.querySelector('.ver-todas-palestras .btn i');
        
        if (hiddenPalestras.length > 0) {
            // Show all hidden palestras
            hiddenPalestras.forEach((palestra, index) => {
                setTimeout(() => {
                    palestra.classList.remove('hidden');
                    palestra.style.opacity = '0';
                    palestra.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        palestra.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        palestra.style.opacity = '1';
                        palestra.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            
            toggleBtn.textContent = 'Mostrar Menos Palestras';
            icon.className = 'fas fa-chevron-up';
        } else {
            // Hide palestras beyond the first 6
            const allPalestras = document.querySelectorAll('.palestra-card');
            allPalestras.forEach((palestra, index) => {
                if (index >= 6) {
                    palestra.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    palestra.style.opacity = '0';
                    palestra.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        palestra.classList.add('hidden');
                        palestra.style.transition = '';
                        palestra.style.opacity = '';
                        palestra.style.transform = '';
                    }, 300);
                }
            });
            
            toggleBtn.textContent = 'Ver Todas as Palestras';
            icon.className = 'fas fa-chevron-down';
            
            // Scroll to palestras section smoothly
            setTimeout(() => {
                const palestrasSection = document.querySelector('.palestras-section');
                if (palestrasSection) {
                    palestrasSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 400);
        }
    };
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        }
    });
    
    // Preload critical images
    function preloadImages() {
        const criticalImages = [
            'assets/img/_97216064_eneas_prona (1).jpg',
            'assets/img/Eneas.jpg',
            'assets/img/pixelcut-export.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Performance optimization: Lazy load non-critical images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        document.head.appendChild(script);
    }
    
    // Add custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .carreira-card, .quote-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Add subtle hover effects for cards
    const cards = document.querySelectorAll('.carreira-card, .timeline-card, .quote-card, .palestra-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('🇧🇷 Site do Dr. Enéas carregado com sucesso! Meu nome é Enéas!');
});
