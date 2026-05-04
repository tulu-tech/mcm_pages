/* ========================================
   DECISION LEADERSHIP — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- SCROLL PROGRESS BAR --- */
  const progressBar = document.getElementById('progress-bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  };

  /* --- CHAPTER NAV VISIBILITY --- */
  const chapterNav = document.getElementById('chapter-nav');
  const heroSection = document.getElementById('section-00');
  const updateNav = () => {
    if (!heroSection) return;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    chapterNav.classList.toggle('visible', window.scrollY > heroBottom - 100);
  };

  /* --- ACTIVE NAV LINK --- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[data-chapter]');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('data-chapter');
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-target') === current);
    });
  };

  /* --- SCROLL EVENT --- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateNav();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* --- NAV CLICK --- */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.querySelector(`[data-chapter="${link.getAttribute('data-target')}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* --- REVEAL ON SCROLL --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  /* --- RESEARCH CARDS EXPAND --- */
  document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
      const toggle = card.querySelector('.rc-toggle');
      if (toggle) toggle.textContent = card.classList.contains('open') ? 'Collapse' : 'Read more';
    });
  });

  /* --- PRESENTER NOTES TOGGLE --- */
  document.querySelectorAll('.pn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      if (body) {
        body.classList.toggle('open');
        btn.querySelector('.pn-icon').textContent = body.classList.contains('open') ? '\u2212' : '+';
      }
    });
  });

  /* --- TABS --- */
  document.querySelectorAll('.tab-bar').forEach(bar => {
    const tabs = bar.querySelectorAll('.tab-btn');
    const parent = bar.parentElement;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const target = parent.querySelector(`#${tab.getAttribute('data-tab')}`);
        if (target) target.classList.add('active');
      });
    });
  });

  /* --- CHECKLIST --- */
  document.querySelectorAll('.checklist li').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked'));
  });

  /* --- INIT --- */
  updateProgress();
  updateNav();
});
