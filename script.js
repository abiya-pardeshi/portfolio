/* script.js — Abiya Pardeshi Portfolio */

// ===== CUSTOM CURSOR =====
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mx = -100, my = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  cursorRing.style.left = mx + 'px';
  cursorRing.style.top  = my + 'px';
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
  cursor.style.display     = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
}, { passive: true });

// ===== HAMBURGER =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1600) {
  const isFloat = String(target).includes('.');
  const start   = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = eased * target;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  }

  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-n');
const heroSection = document.getElementById('hero');
let countersRun = false;

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersRun) {
      countersRun = true;
      setTimeout(() => {
        statNums.forEach(el => {
          animateCounter(el, parseFloat(el.dataset.target));
        });
      }, 500);
    }
  });
}, { threshold: 0.4 });

heroObserver.observe(heroSection);

// ===== SCROLL REVEAL =====
const revealTargets = document.querySelectorAll(
  '.section > *, .tl-item, .skill-group, .project-card, .cert-item, .pub-card, .certs-block, .edu-card'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  const delay = (i % 4) * 0.07;
  if (delay > 0) el.style.transitionDelay = delay + 's';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.dataset.width;
      setTimeout(() => { entry.target.style.width = w + '%'; }, 150);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ===== TIMELINE CLICK TO EXPAND =====
const tlItems = document.querySelectorAll('.tl-item');

tlItems.forEach(item => {
  item.addEventListener('click', () => {
    tlItems.forEach(ti => ti.classList.remove('active'));
    item.classList.add('active');
  });

  // keyboard accessible
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tlItems.forEach(ti => ti.classList.remove('active'));
      item.classList.add('active');
    }
  });
});

// ===== ACTIVE NAV HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) {
      current = s.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.style.color = isActive ? 'var(--copper)' : '';
  });
}

// ===== SUBTLE SKILL GROUP HOVER RADIAL =====
document.querySelectorAll('.skill-group').forEach(group => {
  group.addEventListener('mousemove', e => {
    const rect = group.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    group.style.background = `radial-gradient(ellipse at ${x}px ${y}px, rgba(200,133,74,0.06), var(--surface2) 72%)`;
  });
  group.addEventListener('mouseleave', () => {
    group.style.background = '';
  });
});

// ===== TICKER: pause on hover =====
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  const tickerWrap = document.querySelector('.ticker-wrap');
  tickerWrap.addEventListener('mouseenter', () => {
    tickerTrack.style.animationPlayState = 'paused';
  });
  tickerWrap.addEventListener('mouseleave', () => {
    tickerTrack.style.animationPlayState = 'running';
  });
}
