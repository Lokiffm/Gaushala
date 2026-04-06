/* =============================================
   SHREE GAU DHAM GAUSHALA – JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL BEHAVIOUR ──────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── HAMBURGER MENU ──────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? animateBurger(spans, true)
      : animateBurger(spans, false);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      animateBurger(hamburger.querySelectorAll('span'), false);
    });
  });

  function animateBurger(spans, open) {
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  // ── SMOOTH ACTIVE NAV LINK ───────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── STAT COUNTER ANIMATION ───────────────────
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(c => countObserver.observe(c));

  function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const steps    = Math.ceil(duration / step);
    let   current  = 0;
    let   frame    = 0;

    const timer = setInterval(() => {
      frame++;
      // ease-out
      current = Math.round(target * (1 - Math.pow(1 - frame / steps, 3)));
      el.textContent = current.toLocaleString('en-IN');
      if (frame >= steps) {
        el.textContent = target.toLocaleString('en-IN');
        clearInterval(timer);
      }
    }, step);
  }

  // ── DONATION AMOUNT BUTTONS ──────────────────
  const amountBtns   = document.querySelectorAll('.amount-btn');
  const customAmount = document.getElementById('customAmount');
  let   selectedAmt  = 2000;

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmt = parseInt(btn.dataset.amount, 10);
      customAmount.value = '';
    });
  });

  customAmount.addEventListener('input', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    selectedAmt = parseInt(customAmount.value, 10) || 0;
  });

  // ── DONATE BUTTON ────────────────────────────
  const donateBtn  = document.getElementById('donateBtn');
  const modal      = document.getElementById('donateModal');
  const modalClose = document.getElementById('modalClose');
  const modalOk    = document.getElementById('modalOk');

  donateBtn.addEventListener('click', () => {
    const amount = selectedAmt || parseInt(customAmount.value, 10) || 0;
    if (amount < 1) {
      showToast('Please select or enter a donation amount.', 'error');
      return;
    }
    // ─────────────────────────────────────────────
    // TO INTEGRATE PAYMENT:
    // 1. Razorpay: Add their checkout.js script and call Razorpay({...}).open()
    // 2. PayU / CCAvenue: Redirect to payment page with form POST
    // 3. PayTM / PhonePe: Use their SDK
    // For now we show a thank-you modal:
    // ─────────────────────────────────────────────
    openModal();
  });

  function openModal()  { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

  modalClose.addEventListener('click', closeModal);
  modalOk.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Close modal on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── CONTACT FORM ─────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // Replace with your backend / formspree / emailjs integration
      showToast('Thank you! We will get back to you soon. 🙏', 'success');
      contactForm.reset();
    });
  }

  // ── TOAST NOTIFICATION ───────────────────────
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '2rem',
      right:        '2rem',
      background:   type === 'success' ? '#4A7C59' : '#C4520E',
      color:        '#fff',
      padding:      '1rem 1.5rem',
      borderRadius: '12px',
      fontWeight:   '600',
      fontSize:     '0.95rem',
      boxShadow:    '0 8px 30px rgba(0,0,0,0.25)',
      zIndex:       '99999',
      maxWidth:     '360px',
      lineHeight:   '1.5',
      transform:    'translateY(20px)',
      opacity:      '0',
      transition:   'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ── SCROLL REVEAL ANIMATIONS ─────────────────
  const revealEls = document.querySelectorAll(
    '.mission-card, .testimonial-card, .bank-card, .gallery-item, .contact-item'
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.dataset.delay = i % 6;
    revealObserver.observe(el);
  });

  // ── GALLERY LIGHTBOX (simple) ─────────────────
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.gi-overlay span')?.textContent || '';
      // Simple alert placeholder — replace with a real lightbox library if needed
      // e.g. Fancybox, GLightbox, PhotoSwipe
      console.log('Gallery item clicked:', label);
    });
  });

  // ── FLOATING DONATE BUTTON (appears after scroll) ──
  const floatBtn = document.createElement('a');
  floatBtn.href      = '#donate';
  floatBtn.className = 'float-donate-btn';
  floatBtn.innerHTML = '🙏 Donate';
  Object.assign(floatBtn.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   'var(--saffron)',
    color:        '#fff',
    padding:      '0.8rem 1.6rem',
    borderRadius: '50px',
    fontWeight:   '700',
    fontSize:     '0.95rem',
    boxShadow:    '0 6px 24px rgba(232,101,26,0.5)',
    zIndex:       '998',
    display:      'none',
    transition:   'all 0.3s ease',
    textDecoration: 'none',
  });
  document.body.appendChild(floatBtn);

  window.addEventListener('scroll', () => {
    const donateSection = document.getElementById('donate');
    const rect = donateSection?.getBoundingClientRect();
    const pastHero = window.scrollY > window.innerHeight * 0.6;
    const nearDonate = rect && rect.top < window.innerHeight && rect.bottom > 0;

    floatBtn.style.display = (pastHero && !nearDonate) ? 'block' : 'none';
  });

});
