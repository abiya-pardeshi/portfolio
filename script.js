/* script.js — Abiya Pardeshi Data Portfolio */

// ===== NAV SCROLL SHADOW =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'var(--border)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}

if (mobileClose && mobileMenu) {
  mobileClose.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1400) {
  const isFloat = String(target).includes('.');
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  }

  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-n');
const heroSection = document.getElementById('hero');
let countersRun = false;

if (heroSection && statNums.length > 0) {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersRun) {
        countersRun = true;
        statNums.forEach(el => {
          const val = parseFloat(el.dataset.target);
          if (!isNaN(val)) animateCounter(el, val);
        });
      }
    });
  }, { threshold: 0.3 });

  heroObserver.observe(heroSection);
}

// ===== TIMELINE SELECTION =====
const tlItems = document.querySelectorAll('.tl-item');
tlItems.forEach(item => {
  item.addEventListener('click', () => {
    tlItems.forEach(ti => ti.classList.remove('active'));
    item.classList.add('active');
  });
});
