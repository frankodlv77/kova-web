// KOVA — main.js v2 (GSAP + ScrollTrigger)

gsap.registerPlugin(ScrollTrigger);

/* =====================
   PAGE LOADER
   ===================== */
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader__fill');
const loaderLogo = document.querySelector('.loader__logo');

gsap.to(loaderFill, {
  width: '100%',
  duration: 1.2,
  ease: 'power2.inOut',
  onComplete: () => {
    gsap.timeline()
      .to(loaderLogo, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initAnimations();
        }
      });
  }
});

/* =====================
   INIT ANIMATIONS (after loader)
   ===================== */
function initAnimations() {
  heroAnimation();
  orbsIn();
  navIn();
  setupScrollAnimations();
  setupCanvas();
  setupCursorGlow();
  setupCardTilt();
  setupMagnetic();
  setupCounters();
  setupNav();
  setupForm();
}

/* =====================
   HERO TIMELINE
   ===================== */
function heroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroTag', { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
    .to('#heroTitle', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('#heroSub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#heroCta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
}

/* =====================
   ORBS IN
   ===================== */
function orbsIn() {
  gsap.to('.orb', {
    opacity: 1,
    duration: 2,
    stagger: 0.3,
    ease: 'power2.out',
    delay: 0.5
  });
}

/* =====================
   NAV IN
   ===================== */
function navIn() {
  gsap.to('#nav', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.3
  });
}

/* =====================
   SCROLL ANIMATIONS
   ===================== */
function setupScrollAnimations() {
  // Stats
  gsap.from('.stat', {
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // Section titles & subtitles
  document.querySelectorAll('.reveal-text').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Cards stagger
  gsap.from('.card', {
    scrollTrigger: {
      trigger: '.cards',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out'
  });

  // Steps stagger
  gsap.from('.step', {
    scrollTrigger: {
      trigger: '.steps',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });

  gsap.from('.step__arrow', {
    scrollTrigger: {
      trigger: '.steps',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    duration: 0.4,
    stagger: 0.15,
    delay: 0.3,
    ease: 'power2.out'
  });

  // Form
  gsap.from('.input-wrap, .form .btn', {
    scrollTrigger: {
      trigger: '.form',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out'
  });
}

/* =====================
   ANIMATED COUNTERS
   ===================== */
function setupCounters() {
  document.querySelectorAll('.stat__num').forEach(el => {
    const target = parseInt(el.dataset.count);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val);
          }
        });
      }
    });
  });
}

/* =====================
   NAV SCROLL EFFECT
   ===================== */
function setupNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

/* =====================
   CURSOR GLOW
   ===================== */
function setupCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* =====================
   CARD TILT + GLOW
   ===================== */
function setupCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
      card.style.setProperty('--mx', `${pctX}%`);
      card.style.setProperty('--my', `${pctY}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform'
      });
    });
  });
}

/* =====================
   MAGNETIC BUTTONS
   ===================== */
function setupMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/* =====================
   HERO CANVAS (particles)
   ===================== */
function setupCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 140, 255, ${p.alpha})`;
      ctx.fill();
    });

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* =====================
   FORM SUBMIT
   ===================== */
function setupForm() {
  const form = document.getElementById('contactoForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    btn.textContent = '¡Mensaje enviado!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
