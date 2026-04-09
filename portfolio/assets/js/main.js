/* =========================================================
   STAR CANVAS
   ========================================================= */
const canvas = document.getElementById('star-canvas');
const ctx    = canvas.getContext('2d');
let stars = [], W = 0, H = 0;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initStars() {
  stars = [];
  for (let i = 0; i < 220; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.12 + 0.015,
      phase: Math.random() * Math.PI * 2
    });
  }
}
initStars();

let rafId;
function drawStars() {
  rafId = requestAnimationFrame(drawStars);
  if (document.documentElement.dataset.theme === 'light') {
    ctx.clearRect(0, 0, W, H);
    return;
  }
  ctx.clearRect(0, 0, W, H);
  const t = Date.now() * 0.001;
  stars.forEach(s => {
    const a = s.alpha * (0.55 + 0.45 * Math.sin(s.phase + t));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 220, 255, ${a})`;
    ctx.fill();
    s.y += s.speed;
    if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
  });
}
drawStars();

/* =========================================================
   METEORS
   ========================================================= */
function spawnMeteor() {
  if (document.documentElement.dataset.theme === 'light') return;
  const m   = document.createElement('div');
  m.className = 'meteor';
  const len = Math.random() * 110 + 70;
  const dur = (Math.random() * 0.9 + 0.7).toFixed(2);
  m.style.cssText = `
    left:${Math.random() * W * 0.75}px;
    top:${Math.random() * H * 0.45}px;
    width:${len}px;
    animation-duration:${dur}s;
  `;
  document.body.appendChild(m);
  m.addEventListener('animationend', () => m.remove());
}
setInterval(() => { if (Math.random() < 0.55) spawnMeteor(); }, 2400);

/* =========================================================
   CUSTOM CURSOR
   ========================================================= */
const dot  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  document.getElementById('spotlight').style.left = mx + 'px';
  document.getElementById('spotlight').style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.project-card,.stat-card,.social-link,.skill-cat').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width  = '18px'; dot.style.height = '18px';
    ring.style.width = '50px'; ring.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width  = '10px'; dot.style.height = '10px';
    ring.style.width = '34px'; ring.style.height = '34px';
  });
});

/* =========================================================
   SCROLL PROGRESS
   ========================================================= */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById('progress').style.width = (pct * 100) + '%';
  const hint = document.getElementById('scroll-hint');
  hint.style.opacity = window.scrollY > 50 ? '0' : '';
}, { passive: true });

setTimeout(() => {
  document.getElementById('scroll-hint').classList.add('visible');
}, 1800);

/* =========================================================
   THEME TOGGLE
   ========================================================= */
const themeBtn = document.getElementById('theme-btn');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeBtn.textContent = dark ? '🌙' : '☀️';
});

/* =========================================================
   HAMBURGER
   ========================================================= */
document.getElementById('hamburger-btn').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

/* =========================================================
   TYPEWRITER
   ========================================================= */
const roles = [
  'Chief Engineer, MOCI Spacecraft',
  'Computer Systems Engineer',
  'Machine Learning Developer',
  'Embedded Systems Builder',
  'Full-Stack Engineer',
];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('tw-text');

function type() {
  const cur = roles[ri];
  if (!del) {
    tw.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(type, 2200); return; }
  } else {
    tw.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 38 : 68);
}
setTimeout(type, 1200);

/* =========================================================
   INTERSECTION OBSERVER (reveal + skills + counters)
   ========================================================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');

    e.target.querySelectorAll('.skill-fill').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 150);
    });

    e.target.querySelectorAll('.stat-number[data-count]').forEach(animCounter);

    io.unobserve(e.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* =========================================================
   COUNTER ANIMATION
   ========================================================= */
function animCounter(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  let v = 0;
  const dur = 1600;
  const step = target / (dur / 16);
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + suffix;
    if (v >= target) clearInterval(t);
  }, 16);
}

/* =========================================================
   NAV ACTIVE LINK
   ========================================================= */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) cur = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* =========================================================
   CONTACT FORM — EmailJS
   ========================================================= */
const EMAILJS_PUBLIC_KEY  = '5_-VtiumdcRkN-hNJ';   // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_m4ditzo';   // Email Services tab
const EMAILJS_TEMPLATE_ID = 'template_ym6i0y6';  // Email Templates tab

emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn     = this.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');

  btn.textContent = '⏳ Sending…';
  btn.disabled    = true;
  success.style.display = 'none';
  error.style.display   = 'none';

  const templateParams = {
    from_name:  this.name.value,
    from_email: this.email.value,
    subject:    this.subject.value,
    message:    this.message.value,
    to_email:   'arthurnengr@gmail.com',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      success.style.display = 'block';
      this.reset();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      error.style.display = 'block';
    })
    .finally(() => {
      btn.textContent = '🚀 Send Message';
      btn.disabled    = false;
    });
});