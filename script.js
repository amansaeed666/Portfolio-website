/* ═══════════════════════════════════════════════════════
   AMAN SAEED — PORTFOLIO  |  script.js
═══════════════════════════════════════════════════════ */

/* ── Typed Text Effect ──────────────────────────────── */
const roles = [
  'Network Engineer',
  'Cybersecurity Enthusiast',
  'Ethical Hacker',
  'Penetration Tester',
  'Web Developer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 600);
});

/* ── Navbar Scroll & Active Link ────────────────────── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
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

/* ── Mobile Hamburger Menu ──────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.setAttribute('aria-expanded',
    navLinksEl.classList.contains('open').toString()
  );
});

// Close on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});

/* ── Scroll Reveal Animation ────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

/* ── Contact Form ───────────────────────────────────── */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.className = 'form-note error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formNote.textContent = 'Please enter a valid email address.';
    formNote.className = 'form-note error';
    return;
  }

  // Compose mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:amansaeed931@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client...';
  formNote.className = 'form-note success';

  setTimeout(() => {
    form.reset();
    formNote.textContent = '';
    formNote.className = 'form-note';
  }, 3000);
});
