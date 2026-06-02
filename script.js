
/* ══════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Mohammad Shahid
═══════════════════════════════════════════════════ */

// ── LOADING ──────────────────────────────────────
(function() {
  const bar = document.getElementById('loading-bar');
  const pct = document.getElementById('loading-pct');
  const screen = document.getElementById('loading-screen');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('hidden');
        setTimeout(() => { screen.style.display = 'none'; startAnimations(); }, 600);
      }, 250);
    }
    bar.style.width = Math.min(progress, 100) + '%';
    pct.textContent = Math.min(Math.floor(progress), 100) + '%';
  }, 80);
})();

function startAnimations() {
  startTypewriter();
  observeFadeUps();
  animateHeroStats();
}

// ── NAV SCROLL ───────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER ────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// ── PAGE ROUTING ─────────────────────────────────
function showPage(page) {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('contact-page').style.display = 'none';
  document.getElementById('thankyou-page').style.display = 'none';

  // Close mobile menu
  document.getElementById('mobile-menu').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'home') {
    document.getElementById('home-page').style.display = 'block';
  } else if (page === 'contact') {
    document.getElementById('contact-page').style.display = 'block';
    // reset form
    document.getElementById('contact-form').reset();
    clearErrors();
  } else if (page === 'thankyou') {
    document.getElementById('thankyou-page').style.display = 'flex';
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goSection(id) {
  // Make sure home page is shown
  if (document.getElementById('home-page').style.display === 'none') {
    showPage('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  document.getElementById('mobile-menu').classList.remove('open');
}

// ── TYPEWRITER ───────────────────────────────────
const ROLES = ['Full Stack Developer', 'Python Developer', 'AI Engineer', 'Backend Architect'];
let roleIdx = 0, charIdx = 0, deleting = false;

function startTypewriter() {
  typeStep();
}

function typeStep() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const word = ROLES[roleIdx];
  if (!deleting) {
    el.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeStep, 2400);
      return;
    }
  } else {
    el.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
    }
  }
  setTimeout(typeStep, deleting ? 42 : 76);
}

// ── SCROLL ANIMATIONS ────────────────────────────
function observeFadeUps() {
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-40px' });
  els.forEach(el => obs.observe(el));

  // Timeline dots
  const dots = document.querySelectorAll('.timeline-dot');
  const dotObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); dotObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  dots.forEach(d => dotObs.observe(d));
}

// ── COUNTERS ─────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1600, steps = 60;
  let step = 0;
  const t = setInterval(() => {
    step++;
    el.textContent = Math.round((step / steps) * target) + suffix;
    if (step >= steps) { el.textContent = target + suffix; clearInterval(t); }
  }, dur / steps);
}

function animateHeroStats() {
  const statEls = document.querySelectorAll('.hero-stat-val[data-count]');
  statEls.forEach(el => animateCounter(el));
}

// About section counters via IntersectionObserver
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.counter').forEach(c => animateCounter(c));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) counterObs.observe(aboutSection);
});

// ── FORM ─────────────────────────────────────────
function clearErrors() {
  ['name','email','msg'].forEach(k => {
    const e = document.getElementById('e-' + k);
    if (e) e.classList.remove('show');
  });
}


async function handleSubmit(ev) {
  ev.preventDefault();
  clearErrors();

  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const type = document.getElementById('f-type') ? document.getElementById('f-type').value : '';
  const msg = document.getElementById('f-msg').value.trim();

  let valid = true;

  if (!name) { document.getElementById('e-name').classList.add('show'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('e-email').classList.add('show'); valid = false; }
  if (!msg) { document.getElementById('e-msg').classList.add('show'); valid = false; }
  if (!valid) return;

  const btn = document.getElementById('submit-btn');
  const spinner = document.getElementById('spinner');
  const text = document.getElementById('submit-text');

  btn.disabled = true;
  if (spinner) spinner.style.display = 'block';
  if (text) text.textContent = 'Sending...';

  try {
    await emailjs.send(
      "service_c5gn85s",
      "template_pl9ymc8",
      {
        from_name: name,
        from_email: email,
        project_type: type || "Not specified",
        message: msg
      }
    );

    document.getElementById('ty-name').textContent = name;
    showPage('thankyou');

  } catch (err) {
    console.error('EmailJS Error:', err);
    alert('Failed to send message. Please try again.');

    btn.disabled = false;
    if (spinner) spinner.style.display = 'none';
    if (text) text.textContent = 'Send Message';
  }
}

// ── ANIMATIONS: CSS KEYFRAMES ─────────────────────
const style = document.createElement('style');
style.textContent = `
@keyframes fadeSlideIn {
  from { opacity:0; transform:translateX(-24px); }
  to { opacity:1; transform:translateX(0); }
}
@keyframes fadeSlideInR {
  from { opacity:0; transform:translateX(24px); }
  to { opacity:1; transform:translateX(0); }
}
`;
document.head.appendChild(style);
