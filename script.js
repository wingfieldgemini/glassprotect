/* ========== GLASS PROTECT v2 — Script ========== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Page Loader --- */
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2500);
  }

  /* --- Scroll Progress Bar --- */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* --- Nav scroll --- */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Back to Top --- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Mobile menu --- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    }));
  }

  /* --- Scroll Reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }

  /* --- Stats Counter --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString('fr-FR') + suffix;
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIO.observe(el));
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* --- Active nav link --- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* --- Contact form (demo) --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message envoyé ✓';
      btn.style.background = '#22c55e';
      setTimeout(() => { btn.textContent = 'Envoyer'; btn.style.background = ''; }, 3000);
    });
  }

  /* --- Parallax Hero --- */
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px) scale(1.05)';
      }
    }, { passive: true });
  }

  /* --- Lazy Image Loading --- */
  const lazyImages = document.querySelectorAll('img.lazy');
  if (lazyImages.length && 'IntersectionObserver' in window) {
    const lazyIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          if (img.complete) img.classList.add('loaded');
          lazyIO.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => lazyIO.observe(img));
  }

  /* --- Calendly booking function (global) --- */
  window.openCalendly = function() {
    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({ url: 'https://calendly.com/glassprotect' });
    }
    return false;
  };
});
