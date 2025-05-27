// Add logo click handler
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-up').forEach((element) => {
    observer.observe(element);
});

// Smooth scroll for nav-link only (not all buttons)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Active state for navigation items
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// Mobile menu functionality with animation and body scroll lock
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    navItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(40px)';
    });
}

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        document.body.classList.add('menu-open');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + index * 60);
        });
    } else {
        closeMobileMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target) &&
        navLinks.classList.contains('active')
    ) {
        closeMobileMenu();
    }
});

// Close menu when clicking a nav-link or nav-cta-button (on mobile only)
document.querySelectorAll('.nav-link, .nav-cta-button').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            closeMobileMenu();
        }
    });
});

// EmailJS integration
// 1. Вставьте в <head> вашего HTML: 
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
// 2. Получите userID, serviceID, templateID на emailjs.com
// 3. Вставьте их ниже вместо YOUR_USER_ID, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID

emailjs.init('YOUR_USER_ID'); // <-- вставьте свой userID

document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const message = document.getElementById('userMessage').value.trim();
    const phonePattern = /^\+7\d{10}$/;
    const phoneError = document.getElementById('phoneError');
    
    if (!phonePattern.test(phone)) {
        phoneError.style.display = 'block';
        return;
    }
    
    phoneError.style.display = 'none';

    // Параметры для шаблона EmailJS
    const templateParams = {
        user_name: name,
        user_phone: phone,
        user_email: email,
        user_message: message || 'Нет'
    };

    // Вставьте свои serviceID и templateID
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            document.getElementById('confirmationMessage').style.display = 'block';
            document.getElementById('requestForm').reset();
            document.getElementById('userPhone').value = '+7';
        }, function(error) {
            alert('Ошибка отправки. Проверьте настройки EmailJS.');
            console.error('EmailJS error:', error);
        });
});

// Image Viewer functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.querySelector('.image-viewer');
    const viewerImg = viewer.querySelector('img');
    const closeBtn = viewer.querySelector('.close-viewer');
    
    // Add click handlers to all images in galleries and air-ducts
    const galleryImages = document.querySelectorAll('.gallery-item img, .tech-photo-grid img, .gallery-image');
    
    galleryImages.forEach(img => {
        if (img.classList.contains('ducts-logo')) return; // Пропускаем лого
        
        img.addEventListener('click', function() {
            viewerImg.src = this.src;
            viewer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close on clicking X button
    closeBtn.addEventListener('click', function() {
        viewer.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Close on clicking outside image
    viewer.addEventListener('click', function(e) {
        if (e.target === viewer) {
            viewer.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && viewer.style.display === 'flex') {
            viewer.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
