// --- Слайдер для "Умная вентиляция" только для мобильной версии ---
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.querySelector('.tech-photo-slider-mobile');
    if (!slider) return;
    var images = slider.querySelectorAll('.slider-image');
    var dots = slider.querySelectorAll('.slider-dot');
    var prevBtn = slider.querySelector('.slider-prev');
    var nextBtn = slider.querySelector('.slider-next');
    var current = 0;

    function showSlide(idx) {
        images.forEach(function(img, i) {
            img.classList.toggle('active', i === idx);
            img.style.display = i === idx ? 'block' : 'none';
        });
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    prevBtn.addEventListener('click', function() {
        var idx = (current - 1 + images.length) % images.length;
        showSlide(idx);
    });
    nextBtn.addEventListener('click', function() {
        var idx = (current + 1) % images.length;
        showSlide(idx);
    });
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() {
            showSlide(i);
        });
    });
    showSlide(0);
});
// --- Слайдер для "Центральное пылеудаление" только для мобильной версии ---
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.querySelector('.vacuum-photo-slider-mobile');
    if (!slider) return;
    var images = slider.querySelectorAll('.slider-image');
    var dots = slider.querySelectorAll('.slider-dot');
    var prevBtn = slider.querySelector('.slider-prev');
    var nextBtn = slider.querySelector('.slider-next');
    var current = 0;

    function showSlide(idx) {
        images.forEach(function(img, i) {
            img.classList.toggle('active', i === idx);
            img.style.display = i === idx ? 'block' : 'none';
        });
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    prevBtn.addEventListener('click', function() {
        var idx = (current - 1 + images.length) % images.length;
        showSlide(idx);
    });
    nextBtn.addEventListener('click', function() {
        var idx = (current + 1) % images.length;
        showSlide(idx);
    });
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() {
            showSlide(i);
        });
    });
    showSlide(0);
});

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

// --- Обработка формы обратной связи через PHP (fetch) ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("requestForm");
    if (!form) return;
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const phone = document.getElementById("userPhone").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const message = document.getElementById("userMessage").value.trim();
        const phoneError = document.getElementById("phoneError");
        const confirmationMessage = document.getElementById("confirmationMessage");

        // Простейшая валидация телефона
        if (!/^(\+7\d{10})$/.test(phone)) {
            phoneError.style.display = "block";
            return;
        } else {
            phoneError.style.display = "none";
        }

        fetch("send.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                name: name,
                phone: phone,
                email: email,
                message: message
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Ошибка отправки");
            return response.text();
        })
        .then(data => {
            confirmationMessage.style.display = "block";
            form.reset();
            setTimeout(() => confirmationMessage.style.display = "none", 5000);
        })
        .catch(error => {
            confirmationMessage.style.display = "none";
            alert("Ошибка при отправке. Попробуйте позже.");
        });
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

    // --- Добавить обработчик для слайдеров на мобильных (умная вентиляция и пылеудаление) ---
    document.querySelectorAll('.tech-photo-slider-mobile .slider-image, .vacuum-photo-slider-mobile .slider-image').forEach(img => {
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
