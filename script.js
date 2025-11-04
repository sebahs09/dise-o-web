// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all plan cards and showcase sections
document.querySelectorAll('.plan-card, .showcase-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to browser mockups
document.querySelectorAll('.browser-mockup').forEach(mockup => {
    mockup.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    mockup.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Animate plan cards on hover
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.plan-icon').style.transform = 'scale(1.2) rotate(10deg)';
        this.querySelector('.plan-icon').style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.plan-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Category buttons interaction (Shop theme)
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add to cart animation
document.querySelectorAll('.demo-btn-small').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create success feedback
        const originalText = this.textContent;
        this.textContent = '✓ Agregado';
        this.style.background = '#10b981';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate floating elements
document.querySelectorAll('.floating-element').forEach((element, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 4 + Math.random() * 4;
    element.style.animationDelay = `${randomDelay}s`;
    element.style.animationDuration = `${randomDuration}s`;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-plan, .demo-btn').forEach(button => {
    button.addEventListener('click', function(e) {
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.product-image, .room-image, .gallery-item').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

// Console message
console.log('%c🎨 Sebastián Martínez - Diseño Web Profesional', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cDiseño total entregado • Archivos finales en formato .rar', 'font-size: 14px; color: #764ba2;');

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

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Scroll handlers here
}, 10);

window.addEventListener('scroll', debouncedScroll);
