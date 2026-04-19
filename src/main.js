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
  setupProceso();
  setupCanvas();
  setupCursorGlow();
  setupCardTilt();
  setupMagnetic();
  setupCounters();
  setupNav();
  setupForm();
  setupKovaLive();
  setupSpeedRace();
  setupROI();
  setupDiag();
  if (window.onPageInit) window.onPageInit();
}

/* =====================
   HERO TIMELINE
   ===================== */
function heroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroTag', { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
    .to('#heroTitle', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('#heroSub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#heroCta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo('#heroFormCard', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .to('#scrollHint', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

  // Hide scroll hint on scroll
  window.addEventListener('scroll', () => {
    const hint = document.getElementById('scrollHint');
    if (hint) hint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
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

  // Chart bars grow on scroll
  ScrollTrigger.create({
    trigger: '.visual-chart',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to('.chart-bar', {
        scaleY: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        transformOrigin: 'bottom'
      });
    }
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
   PROCESO — PATH ANIMATION
   ===================== */
function setupProceso() {
  const path = document.getElementById('procesoPath');
  if (!path) return;

  // On mobile the SVG is hidden — skip GSAP and let CSS show the steps
  if (window.innerWidth <= 768) return;

  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.set(['.dot-group', '.paso'], { opacity: 0 });
  gsap.set('.paso', { y: 18 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.proceso__stage-wrap',
      start: 'top 80%',
      end: 'top 10%',
      scrub: 0.5
    }
  });

  tl
    // Path draws left → right
    .to(path, { strokeDashoffset: 0, ease: 'none', duration: 3 }, 0)
    // Dot 1 + Step 1 appear early
    .to('#dotGroup1', { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)
    .to('.paso--1',   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.2)
    // Dot 2 + Step 2 appear at mid-path
    .to('#dotGroup2', { opacity: 1, duration: 0.3, ease: 'power2.out' }, 1.35)
    .to('.paso--2',   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.45)
    // Dot 3 + Step 3 appear near end
    .to('#dotGroup3', { opacity: 1, duration: 0.3, ease: 'power2.out' }, 2.65)
    .to('.paso--3',   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.75);

  // Ghost numbers fade in on scroll enter
  gsap.from('.ghost-num', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.proceso__stage-wrap',
      start: 'top 80%'
    }
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
      ctx.fillStyle = `rgba(232, 80, 26, ${p.alpha * 0.7})`;
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
          ctx.strokeStyle = `rgba(232, 80, 26, ${0.10 * (1 - dist / 100)})`;
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
   KOVA LIVE
   ===================== */
function setupKovaLive() {
  const colIn  = document.getElementById('klIn');
  const colOut = document.getElementById('klOut');
  const countEl = document.getElementById('klCount');
  if (!colIn || !colOut || !countEl) return;

  const incoming = [
    { icon: '📩', text: 'Nuevo lead recibido' },
    { icon: '📋', text: 'Formulario completado' },
    { icon: '💬', text: 'Consulta en WhatsApp' },
    { icon: '📞', text: 'Llamada perdida' },
    { icon: '🛒', text: 'Carrito abandonado' },
    { icon: '📧', text: 'Email sin respuesta' },
    { icon: '📊', text: 'Reporte semanal pendiente' },
    { icon: '🔔', text: 'Alerta de vencimiento' },
    { icon: '👤', text: 'Nuevo registro de usuario' },
    { icon: '📱', text: 'Mensaje de Instagram' },
  ];

  const outgoing = [
    { icon: '✓', text: 'Bienvenida enviada' },
    { icon: '✓', text: 'Lead calificado y asignado' },
    { icon: '✓', text: 'Respuesta automática enviada' },
    { icon: '✓', text: 'Follow-up programado' },
    { icon: '✓', text: 'CRM actualizado' },
    { icon: '✓', text: 'Notificación Telegram enviada' },
    { icon: '✓', text: 'Reporte generado' },
    { icon: '✓', text: 'Factura emitida automáticamente' },
    { icon: '✓', text: 'Secuencia de emails iniciada' },
    { icon: '✓', text: 'Ticket de soporte creado' },
  ];

  let count = 0;
  const MAX_VISIBLE = 5;

  function addTask() {
    const idx = count % incoming.length;

    // Create IN chip
    const inChip = document.createElement('div');
    inChip.className = 'kl-task kl-task--in';
    inChip.innerHTML = `<span class="kl-task__icon">${incoming[idx].icon}</span>${incoming[idx].text}`;
    colIn.appendChild(inChip);

    // After short delay, add OUT chip
    setTimeout(() => {
      const outChip = document.createElement('div');
      outChip.className = 'kl-task kl-task--out';
      outChip.innerHTML = `<span class="kl-task__check">✓</span>${outgoing[idx].text}`;
      colOut.appendChild(outChip);

      // increment counter with animation
      count++;
      gsap.fromTo(countEl, { scale: 1.4, color: '#ffffff' }, { scale: 1, color: '#E8501A', duration: 0.35, ease: 'power2.out' });
      countEl.textContent = count;

      // remove oldest chips if too many
      const inChips  = colIn.querySelectorAll('.kl-task');
      const outChips = colOut.querySelectorAll('.kl-task');
      if (inChips.length > MAX_VISIBLE) {
        inChips[1].classList.add('kl-task--exit');
        setTimeout(() => inChips[1].remove(), 400);
      }
      if (outChips.length > MAX_VISIBLE) {
        outChips[1].classList.add('kl-task--exit');
        setTimeout(() => outChips[1].remove(), 400);
      }
    }, 600);
  }

  // Start only when visible
  ScrollTrigger.create({
    trigger: '.kova-live',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      // entrance animation
      gsap.from('.kl-header > *', { opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.kl-brain__core', { opacity: 0, scale: 0.7, duration: 0.8, ease: 'back.out(1.6)', delay: 0.3 });
      gsap.from('.kl-stat', { opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5 });
      gsap.from(['.kl-col__label'], { opacity: 0, duration: 0.5, delay: 0.4 });

      // kick off task loop
      addTask();
      setInterval(addTask, 1800);
    }
  });
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

  // Hero form submit
  const heroForm = document.getElementById('heroContactForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = heroForm.querySelector('button[type="submit"]');
      gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
      btn.textContent = '¡Te contactamos pronto!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Quiero empezar →';
        btn.style.background = '';
        btn.disabled = false;
        heroForm.reset();
      }, 3000);
    });
  }
}

/* =====================
   SPEED RACE ANIMATION
   ===================== */
function runRace() {
  const humanBar       = document.getElementById('raceHuman');
  const kovaBar        = document.getElementById('raceKova');
  const humanTime      = document.getElementById('raceTimeHuman');
  const kovaTime       = document.getElementById('raceTimeKova');
  if (!humanBar || !kovaBar) return;

  // Reset
  gsap.set([humanBar, kovaBar], { width: '0%' });
  gsap.set([humanTime, kovaTime], { opacity: 0, scale: 0.8 });
  kovaBar.classList.remove('done');

  const tl = gsap.timeline();

  // 1. Lanes slide in
  tl.from('.race-lane', { opacity: 0, x: -40, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, 0)
    .from('.race-label', { opacity: 0, duration: 0.3, stagger: 0.1 }, 0.2);

  // 2. KOVA bar: blazes instantly to 8% (2h out of 72h max)
  tl.fromTo(kovaBar,
    { width: '0%' },
    { width: '8%', duration: 0.45, ease: 'power4.out' },
    0.5
  );

  // 3. KOVA time pops in immediately
  tl.to(kovaTime, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0.85);

  // 4. KOVA bar pulse glow
  tl.call(() => { kovaBar.classList.add('done'); }, [], 0.95);

  // 5. Human bar: slowly crawls to 100% over 2.8s (painful)
  tl.fromTo(humanBar,
    { width: '0%' },
    { width: '100%', duration: 2.8, ease: 'power1.in' },
    0.6
  );

  // 6. Human time appears when bar finishes
  tl.to(humanTime, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 3.2);

  // 7. Task cards stagger in
  tl.from('.race-task', {
    opacity: 0, y: 28, scale: 0.95,
    duration: 0.55, stagger: 0.1, ease: 'power3.out'
  }, 0.8);

  // 8. Replay button fades in
  tl.from('#raceReplay', { opacity: 0, y: 10, duration: 0.4 }, 3.4);

  return tl;
}

window.replayRace = function() {
  const kovaBar = document.getElementById('raceKova');
  if (kovaBar) kovaBar.classList.remove('done');
  runRace();
};

function setupSpeedRace() {
  const humanBar = document.getElementById('raceHuman');
  if (!humanBar) return;

  // Initial state
  gsap.set('.race-lane', { opacity: 0 });
  gsap.set('#raceReplay', { opacity: 0 });

  // Also animate header in
  ScrollTrigger.create({
    trigger: '.speed-race',
    start: 'top 72%',
    once: true,
    onEnter: () => {
      gsap.from('.speed-race__header > *', {
        opacity: 0, y: 36, duration: 0.7, stagger: 0.15, ease: 'power3.out'
      });
      // start race after header animates
      setTimeout(runRace, 600);
    }
  });
}

/* =====================
   ROI CALCULATOR
   ===================== */
function setupROI() {
  const inputs = {
    personas: document.getElementById('roiPersonas'),
    horas:    document.getElementById('roiHoras'),
    costo:    document.getElementById('roiCosto')
  };
  const outputs = {
    personasVal: document.getElementById('roiPersonasVal'),
    horasVal:    document.getElementById('roiHorasVal'),
    costoVal:    document.getElementById('roiCostoVal'),
    total:       document.getElementById('roiTotal'),
    horasYear:   document.getElementById('roiHorasYear'),
    weekCost:    document.getElementById('roiWeekCost'),
    saving:      document.getElementById('roiSaving')
  };

  if (!inputs.personas) return;

  function fmt(n) {
    return n >= 1000 ? '$' + (n / 1000).toFixed(1).replace('.0','') + 'K' : '$' + n;
  }
  function fmtNum(n) {
    return n.toLocaleString('en-US');
  }

  function calc() {
    const p = parseInt(inputs.personas.value);
    const h = parseInt(inputs.horas.value);
    const c = parseInt(inputs.costo.value);

    const weeklyHours = p * h;
    const weeklyCost  = weeklyHours * c;
    const yearlyHours = weeklyHours * 52;
    const yearlyCost  = weeklyCost * 52;
    const saving      = Math.round(yearlyCost * 0.8);

    outputs.personasVal.textContent = p;
    outputs.horasVal.textContent    = h + 'h';
    outputs.costoVal.textContent    = '$' + c;
    outputs.total.textContent       = '$' + fmtNum(yearlyCost);
    outputs.horasYear.textContent   = fmtNum(yearlyHours);
    outputs.weekCost.textContent    = '$' + fmtNum(weeklyCost);
    outputs.saving.textContent      = '$' + fmtNum(saving) + '/año';

    // pulse animation on result
    gsap.fromTo(outputs.total, { scale: 1.04 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
  }

  Object.values(inputs).forEach(el => el.addEventListener('input', calc));

  // Trigger once visible
  ScrollTrigger.create({
    trigger: '.roi-calc',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.roi__control', { opacity: 0, x: -30, duration: 0.6, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.roi__result-card', { opacity: 0, x: 30, duration: 0.7, ease: 'power3.out', delay: 0.2 });
    }
  });
}


/* ============================================================
   DIAGNÓSTICO INTERACTIVO
   ============================================================ */
function setupDiag() {
  if (!document.getElementById('diagCard')) return;

  const AUTO = {
    leads:     { name: 'Nurturing de Leads',        desc: 'Secuencias automáticas que siguen cada lead hasta cerrar. Ningún prospecto se pierde.', hours: 8  },
    reportes:  { name: 'Dashboard Automático',       desc: 'Métricas de tu negocio actualizadas en tiempo real. Cero tiempo armando reportes.',    hours: 5  },
    onboarding:{ name: 'Onboarding Automático',      desc: 'Bienvenida, contratos y accesos entregados solos — sin que estés presente.',           hours: 6  },
    factura:   { name: 'Admin sin Fricción',          desc: 'Facturas, cobros y recordatorios que se ejecutan solos en el momento exacto.',         hours: 4  },
    contenido: { name: 'Pipeline de Contenido IA',   desc: 'Generá, programá y publicá en todas las redes con IA y cero esfuerzo manual.',         hours: 7  },
    atencion:  { name: 'Agente IA 24/7',             desc: 'Responde, califica y agenda sin que vos estés. Tu negocio nunca duerme.',              hours: 12 },
    crm:       { name: 'CRM Inteligente',            desc: 'Tu CRM actualizado, segmentado y con seguimientos automáticos en cada etapa.',          hours: 6  },
    captacion: { name: 'Captación Automatizada',     desc: 'Campañas que atraen, califican y registran leads sin intervención humana.',            hours: 9  },
    agenda:    { name: 'Agendamiento Inteligente',   desc: 'Reuniones coordinadas y confirmadas automáticamente. Sin idas y vueltas por email.',    hours: 3  }
  };

  const state = { tipo: null, problems: new Set(), mult: 1, factura: null };
  const $ = id => document.getElementById(id);

  function setProgress(pct, label) {
    $('diagProgFill').style.width = pct + '%';
    $('diagProgLabel').textContent = label;
  }

  function goTo(fromId, toId, dir) {
    dir = dir || 1; // 1 = forward, -1 = backward
    const fromEl = $(fromId);
    const toEl   = $(toId);
    if (!fromEl || !toEl) return;

    gsap.to(fromEl, {
      opacity: 0, x: dir * -50, duration: 0.28, ease: 'power2.in',
      onComplete: () => {
        fromEl.classList.add('diag__step--hidden');
        gsap.set(fromEl, { clearProps: 'all' });
        toEl.classList.remove('diag__step--hidden');
        gsap.fromTo(toEl,
          { opacity: 0, x: dir * 50 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        );
        // stagger children — only direct visible ones
        const kids = Array.from(toEl.querySelectorAll('.diag__opt, .diag__q, .diag__result-header, .diag__result-sub, .diag__result-cards, .diag__result-cta, .diag__back-btn, .diag__actions'));
        if (kids.length) {
          gsap.fromTo(kids,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.04, ease: 'power3.out', delay: 0.1 }
          );
        }
      }
    });
  }

  // Paso 1
  document.querySelectorAll('.diag__opt[data-step="1"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diag__opt[data-step="1"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.tipo = btn.dataset.val;
      setProgress(33, 'Paso 1 de 3 — listo ✓');
      setTimeout(() => { setProgress(66, 'Paso 2 de 3'); goTo('dStep1','dStep2', 1); }, 300);
    });
  });

  // Paso 2 — multi-select
  document.querySelectorAll('.diag__opt[data-step="2"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const v = btn.dataset.val;
      state.problems.has(v) ? state.problems.delete(v) : state.problems.add(v);
      $('diagNext2').disabled = state.problems.size === 0;
    });
  });

  $('diagNext2').addEventListener('click', () => {
    setProgress(66, 'Paso 2 de 3 — listo ✓');
    setTimeout(() => { setProgress(100, 'Paso 3 de 3'); goTo('dStep2','dStep3', 1); }, 200);
  });

  // Volver 2 → 1
  ['diagBack2','diagBack2b'].forEach(id => {
    const el = $(id); if (!el) return;
    el.addEventListener('click', () => {
      setProgress(33, 'Paso 1 de 3');
      goTo('dStep2', 'dStep1', -1);
    });
  });

  // Paso 3 — equipo (auto-avanza cuando eligen las dos)
  let teamSelected = false;
  let facturaSelected = false;

  function checkStep3Done() {
    if (teamSelected && facturaSelected) setTimeout(showResult, 320);
  }

  document.querySelectorAll('.diag__opt[data-step="3"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diag__opt[data-step="3"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.mult = parseInt(btn.dataset.mult);
      teamSelected = true;
      checkStep3Done();
    });
  });

  document.querySelectorAll('.diag__opt[data-step="3b"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diag__opt[data-step="3b"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.factura = btn.dataset.val;
      facturaSelected = true;
      checkStep3Done();
    });
  });

  // Volver 3 → 2
  const back3 = $('diagBack3');
  if (back3) back3.addEventListener('click', () => {
    teamSelected = false; facturaSelected = false;
    setProgress(66, 'Paso 2 de 3');
    goTo('dStep3', 'dStep2', -1);
  });

  // ── Mostrar resultado ─────────────────────────────────────
  function showResult() {
    const sorted = [...state.problems]
      .filter(v => AUTO[v])
      .map(v => ({ ...AUTO[v], key: v }))
      .sort((a,b) => b.hours - a.hours)
      .slice(0, 3);

    const fallbacks = ['leads','captacion','atencion','crm'].filter(v => !state.problems.has(v));
    while (sorted.length < 3 && fallbacks.length) sorted.push({ ...AUTO[fallbacks.shift()] });

    const totalHours = sorted.reduce((s,a) => s + a.hours, 0) * state.mult;

    const labels = { agencia:'agencia', ecommerce:'e-commerce', servicios:'empresa de servicios', saas:'producto SaaS', inmobiliaria:'inmobiliaria', salud:'clínica', educacion:'escuela de cursos', otro:'negocio' };
    $('diagResultTitle').innerHTML = 'Tu ' + (labels[state.tipo] || 'negocio') + ' puede recuperar <em>' + totalHours + 'h</em> semanales.';

    const container = $('diagResultCards');
    container.innerHTML = sorted.map((a,i) => `
      <div class="diag__rec-card" style="opacity:0;transform:translateY(24px)">
        <span class="diag__rec-num">0${i+1} — prioridad ${i===0?'alta':i===1?'media':'normal'}</span>
        <h4 class="diag__rec-name">${a.name}</h4>
        <p class="diag__rec-desc">${a.desc}</p>
        <div class="diag__rec-saving">
          <span class="diag__rec-saving-num">~${a.hours * state.mult}h</span>
          <span class="diag__rec-saving-lbl">&nbsp;/semana recuperadas</span>
        </div>
      </div>
    `).join('');

    setProgress(100, 'Diagnóstico listo ✓');
    goTo('dStep3', 'dResult', 1);

    setTimeout(() => {
      container.querySelectorAll('.diag__rec-card').forEach((c,i) => {
        gsap.to(c, { opacity:1, y:0, duration:0.5, delay: i*0.13, ease:'power3.out' });
      });
    }, 450);
  }

  // Reset
  $('diagReset').addEventListener('click', () => {
    state.tipo = null; state.problems.clear(); state.mult = 1; state.factura = null;
    teamSelected = false; facturaSelected = false;
    document.querySelectorAll('.diag__opt').forEach(b => b.classList.remove('selected'));
    $('diagNext2').disabled = true;
    setProgress(33, 'Paso 1 de 3');
    goTo('dResult', 'dStep1', -1);
  });

  // Entrada en pantalla
  ScrollTrigger.create({
    trigger: '.diag', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from('.diag__header > *', { opacity:0, y:36, duration:0.7, stagger:0.14, ease:'power3.out' });
      gsap.from('.diag__card', { opacity:0, y:48, scale:0.97, duration:0.8, ease:'power3.out', delay:0.3 });
    }
  });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function setupScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

/* ============================================================
   HERO TAG — CYCLING TYPEWRITER
   ============================================================ */
function setupHeroTypewriter() {
  const tag = document.getElementById('heroTag');
  if (!tag) return;
  const words = ['Marketing Digital', 'RRSS & Algoritmo', 'SEO & Posicionamiento', 'Marca Personal', 'Automatización & IA'];
  let i = 0;
  tag.textContent = words[0];
  setInterval(() => {
    gsap.to(tag, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in', onComplete: () => {
      i = (i + 1) % words.length;
      tag.textContent = words[i];
      gsap.to(tag, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
    }});
  }, 2200);
}

/* ============================================================
   DESAFÍO TABS — Interactive selector
   ============================================================ */
function setupDesafioTabs() {
  const tabs   = document.querySelectorAll('.dtab');
  const panels = document.querySelectorAll('.dpanel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const current = document.querySelector('.dpanel.active');
      const next = document.querySelector(`.dpanel[data-panel="${target}"]`);
      if (!next || next === current) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      gsap.to(current, { opacity: 0, x: -20, duration: 0.22, ease: 'power2.in', onComplete: () => {
        current.classList.remove('active');
        next.classList.add('active');
        gsap.fromTo(next, { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' });
      }});
    });
  });

  // Animate in on scroll
  ScrollTrigger.create({
    trigger: '.desafio', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from('.desafio__header > *', { opacity: 0, y: 32, duration: 0.7, stagger: 0.12, ease: 'power3.out' });
      gsap.from('.desafio__layout', { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    }
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function setupFAQ() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq__trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  // Animate in
  ScrollTrigger.create({
    trigger: '.faq', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from('.faq__sticky > *', { opacity: 0, x: -32, duration: 0.7, stagger: 0.12, ease: 'power3.out' });
      gsap.from('.faq__item', { opacity: 0, y: 24, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
    }
  });
}

/* ============================================================
   RESULTADOS — Scroll animations
   ============================================================ */
function setupResultados() {
  ScrollTrigger.create({
    trigger: '.resultados', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from('.resultados .section__header > *', { opacity: 0, y: 32, duration: 0.7, stagger: 0.12, ease: 'power3.out' });
      gsap.from('.res-card', { opacity: 0, y: 60, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
    }
  });
}

/* ============================================================
   PLANES — Scroll animations
   ============================================================ */
function setupPlanes() {
  ScrollTrigger.create({
    trigger: '.planes', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from('.planes .section__title, .planes .section__sub', { opacity: 0, y: 32, duration: 0.7, stagger: 0.12, ease: 'power3.out' });
      gsap.from('.plan-card', { opacity: 0, y: 60, scale: 0.96, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
    }
  });
}

/* ============================================================
   INIT — hook into existing initAnimations via onPageInit
   ============================================================ */
setupScrollProgress(); // scroll bar runs immediately, no loader needed

window.onPageInit = function() {
  setupHeroTypewriter();
  setupDesafioTabs();
  setupFAQ();
  setupResultados();
  setupPlanes();
};

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function setupHamburger() {
  const btn  = document.getElementById('navHamburger');
  const menu = document.getElementById('navMobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close on any link click inside the menu
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });
}

setupHamburger();
