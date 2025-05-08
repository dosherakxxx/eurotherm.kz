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

// Smooth scroll for all interactive elements
document.querySelectorAll('.nav-link, .cta-button, .detail-button, .more-btn, .nav-cta-button').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Active state for navigation items
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');

    navItems.forEach((item, index) => {
        if (item.style.animation) {
            item.style.animation = '';
        } else {
            item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Telegram bot integration
const TOKEN = '7673379870:AAETekzDpO7UldDW8VcXTSGlu9xJqSg6e8g';
const CHAT_ID = '7520366041';
const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

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

    const text = `
📥 Новая заявка:
👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email}
💬 Сообщение: ${message || 'Нет'}
`;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        document.getElementById('confirmationMessage').style.display = 'block';
        document.getElementById('requestForm').reset();
        document.getElementById('userPhone').value = '+7';
    })
    .catch(err => {
        alert('Ошибка отправки. Проверьте настройки бота.');
        console.error('Telegram error:', err);
    });
});
