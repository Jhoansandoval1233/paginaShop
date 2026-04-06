/* ============================================
   CLOUDKINGZ — main.js
   ============================================ */

// ---- AGE GATE ----
function enterSite() {
    const gate = document.getElementById('ageGate');
    gate.classList.add('hidden');
    setTimeout(() => gate.style.display = 'none', 500);
    sessionStorage.setItem('ageVerified', '1');
}

// Skip age gate if already verified this session
if (sessionStorage.getItem('ageVerified')) {
    const gate = document.getElementById('ageGate');
    if (gate) gate.style.display = 'none';
}

// ---- CUSTOM CURSOR ----
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

// Smooth ring follow
function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(animateRing);
}
animateRing();

const hoverEls = document.querySelectorAll('a, button, .cat-card, .prod-card, .why-item, .testi-card');
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2.5)';
        cursorRing.style.opacity = '0.9';
        cursorRing.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
        cursorRing.style.opacity = '0.5';
        cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.5)', '');
    });
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- MOBILE MENU ----
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
}

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay + i * 70);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ---- HERO IMAGE FALLBACK ----
// If hero image fails to load, show a gradient background
const heroImg = document.getElementById('heroImg');
if (heroImg) {
    heroImg.addEventListener('error', () => {
        heroImg.style.display = 'none';
    });
}

// ---- PRODUCT IMAGE FALLBACK ----
// Show emoji fallback if product image fails
document.querySelectorAll('.prod-card__img').forEach(img => {
    img.addEventListener('load', () => {
        const fallback = img.nextElementSibling;
        if (fallback && fallback.classList.contains('prod-card__icon-fallback')) {
            fallback.style.display = 'none';
        }
    });
    img.addEventListener('error', () => {
        img.style.display = 'none';
    });
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            closeMobileMenu();
            const offset = 72;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ---- COUNTER ANIMATION for stats ----
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const full = el.textContent;
            const match = full.match(/(\d+)(.*)/);
            if (match) {
                const num = parseInt(match[1]);
                const suffix = match[2];
                // Preserve the <span> element with suffix by just counting the number part
                const span = el.querySelector('span');
                if (span) {
                    animateCounter({ 
                        set textContent(v) { el.childNodes[0].nodeValue = v; } 
                    }, num, '');
                }
            }
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));
