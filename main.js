// Main JavaScript - Koperasi Raya Abadi Saudara

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or for modals
            if (href === '#' || this.getAttribute('data-bs-toggle')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Set Beranda active when at top
        if (scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const berandaLink = document.querySelector('.nav-link[href="index.html"]');
            if (berandaLink) berandaLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveNav);

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.backgroundPositionY = parallax + 'px';
        });
    }

    // Counter Animation for Stats (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Hover effect for cards
    const cards = document.querySelectorAll('.service-card, .program-card, .unit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Unit Card Click Effect
    const unitCards = document.querySelectorAll('.unit-card.other-unit');
    unitCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Lazy Loading Images
    const images = document.querySelectorAll('img[src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 300px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                
                img.addEventListener('load', () => {
                    img.classList.remove('loading');
                });
                
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Form Validation (if forms are added later)
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Tooltip Initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Modal Event Listeners
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            document.body.style.overflow = 'hidden';
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            document.body.style.overflow = 'auto';
        });
    });

    // Preloader (optional)
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });

    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Koperasi Raya Abadi Saudara - Website Loaded Successfully');
});

// Utility Functions

// Format Currency (Indonesian Rupiah)
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Debounce Function for Performance
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

// Smooth Scroll to Top Button (can be added)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}