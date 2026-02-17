// Kost JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 25px rgba(139,69,19,0.5)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 15px rgba(139,69,19,0.3)';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Room Card Animation
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Facility Card Hover Effect
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Gallery Click Effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Close modal
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(44,24,16,0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 15px;
            box-shadow: 0 15px 50px rgba(139,69,19,0.6);
        }
        
        .modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            color: var(--cream);
            font-size: 45px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 300;
        }
        
        .modal-close:hover {
            transform: rotate(90deg);
            color: var(--white);
        }
    `;
    document.head.appendChild(style);

    // Parallax Effect
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.facility-card, .info-box, .rules-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // Price highlight effect
    const prices = document.querySelectorAll('.room-price .price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--light-brown)';
            this.style.transition = 'all 0.3s ease';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--brown)';
        });
    });

    // Rules list animation
    const rulesList = document.querySelectorAll('.rules-list li');
    
    const rulesObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    rulesList.forEach(rule => {
        rule.style.opacity = '0';
        rule.style.transform = 'translateX(-20px)';
        rule.style.transition = 'all 0.5s ease';
        rulesObserver.observe(rule);
    });

    // Mobile Menu Close
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
                background: rgba(255,255,255,0.5);
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

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('Kost-Kostan - Page Loaded Successfully');
});

// Utility Functions
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}