/* ─── script.js ───────────────────────────────────────────────────── */

/* 1. NAVBAR — scroll shrink + active link highlight */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const toggle   = document.getElementById('navToggle');
  const linkList = document.getElementById('navLinks');

  // Shrink on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    highlightNav();
  }, { passive: true });

  // Highlight active section
  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  // Mobile toggle
  toggle.addEventListener('click', () => {
    linkList.classList.toggle('open');
    // Animate hamburger lines
    const spans = toggle.querySelectorAll('span');
    if (linkList.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  linkList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      linkList.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


/* 2. SCROLL REVEAL — IntersectionObserver */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


/* 3. TYPED HERO TAG ROTATION */
(function initTagRotation() {
  const tags = ['FinTech', 'AI Research', 'Blockchain', 'Quant Finance', 'ML Engineer'];
  const tagEl = document.getElementById('tag-2'); // rotate the second tag
  if (!tagEl) return;

  let idx = 1;
  setInterval(() => {
    tagEl.style.opacity = '0';
    tagEl.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      tagEl.textContent = tags[idx % tags.length];
      tagEl.style.opacity = '1';
      tagEl.style.transform = 'translateY(0)';
      idx++;
    }, 350);
  }, 2800);

  // Apply transition
  tagEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
})();


/* 4. SMOOTH COUNT-UP for any element with data-count */
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const isFloat = String(target).includes('.');
    const decimals = isFloat ? String(target).split('.')[1].length : 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = isFloat ? current.toFixed(decimals) : Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* 5. PARALLAX on hero blobs */
(function initParallax() {
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 12;
      blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
})();


/* 6. PROJECT ACCORDION — expand / collapse on click */
(function initProjectAccordion() {
  const items = document.querySelectorAll('.proj-item');

  items.forEach(item => {
    const btn  = item.querySelector('.proj-header');
    const body = item.querySelector('.proj-body');
    if (!btn || !body) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const ob = other.querySelector('.proj-body');
          const obtn = other.querySelector('.proj-header');
          if (ob)   ob.setAttribute('hidden', '');
          if (obtn) obtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        body.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        body.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


/* 7. SKILL TAG hover shimmer */
(function initSkillShimmer() {
  document.querySelectorAll('.stag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.boxShadow = '0 0 12px rgba(56,182,255,0.25)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.boxShadow = '';
    });
  });
})();


/* 8. CURSOR GLOW (desktop only) */
(function initCursorGlow() {
  if (window.innerWidth <= 900) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(30,136,229,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();
