// Property JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 5px 30px rgba(0,31,63,0.6)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0,31,63,0.4)';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || this.classList.contains('btn')) return;
            
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

    // Service Card Animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Property Card Hover Effects
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Detail Properti Button Click
    const detailButtons = document.querySelectorAll('.property-card .btn-navy');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const propertyCard = this.closest('.property-card');
            const propertyName = propertyCard.querySelector('h5').textContent;
            const propertyPrice = propertyCard.querySelector('.property-price').textContent;
            
            // Show alert or modal with property details
            const message = `Tertarik dengan ${propertyName}?\nHarga: ${propertyPrice}\n\nSilakan hubungi kami untuk informasi lebih lanjut.`;
            
            if (confirm(message)) {
                // Redirect to WhatsApp or contact form
                const phoneNumber = '6281298765432';
                const text = encodeURIComponent(`Halo, saya tertarik dengan properti: ${propertyName}`);
                window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
            }
        });
    });

    // Advantage Card Animation
    const advantageCards = document.querySelectorAll('.advantage-card');
    
    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    advantageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        advantageObserver.observe(card);
    });

    // Contact Box Animation
    const contactBoxes = document.querySelectorAll('.contact-box');
    
    contactBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            box.style.transition = 'all 0.6s ease';
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, index * 200);
    });

    // Parallax Effect
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Property Card Stagger Animation on Scroll
    const propertyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.property-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 150);
                });
                propertyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const propertySection = document.querySelector('#properti .row');
    if (propertySection) {
        propertyCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s ease';
        });
        propertyObserver.observe(propertySection);
    }

    // Number Counter Animation for Prices
    function animateNumber(element) {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (!numericValue) return;
        
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                clearInterval(counter);
            } else {
                element.textContent = 'Rp ' + Math.floor(currentValue).toLocaleString('id-ID');
            }
        }, stepTime);
    }

    // Trigger price animation on scroll
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.property-price').forEach(price => {
        priceObserver.observe(price);
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

    // Filter Properties (simple example)
    function filterProperties(type) {
        const properties = document.querySelectorAll('.property-card');
        
        properties.forEach(property => {
            const badge = property.querySelector('.property-badge');
            const badgeText = badge.textContent.toLowerCase();
            
            if (type === 'all' || badgeText.includes(type)) {
                property.parentElement.style.display = 'block';
                setTimeout(() => {
                    property.style.opacity = '1';
                    property.style.transform = 'translateY(0)';
                }, 100);
            } else {
                property.style.opacity = '0';
                property.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    property.parentElement.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add button ripple effect
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

    console.log('BHP Property - Page Loaded Successfully');
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

// Calculate mortgage (example utility)
function calculateMortgage(price, downPayment, years, interestRate) {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
}