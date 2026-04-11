/* ─────────────────────────────────────────────────────────────
   DRA. RUT VICTORIA · Medicina Estética · main.js
   ───────────────────────────────────────────────────────────── */

/* ─── ROUTER ─────────────────────────────────────────────────── */

/**
 * showPage(id)
 * Muestra la página con id="page-{id}", oculta las demás
 * y actualiza el estado activo en el navbar.
 */
function showPage(id) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Mostrar la página objetivo
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Actualizar enlaces del navbar
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  // Scroll al top de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── FAQ ACCORDION ──────────────────────────────────────────── */

/**
 * toggleFaq(btn)
 * Abre/cierra el ítem FAQ correspondiente al botón pulsado.
 * Cierra cualquier otro ítem abierto antes de abrir el nuevo.
 */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Cerrar todos
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Abrir el actual si estaba cerrado
  if (!isOpen) item.classList.add('open');
}

/* ─── NAVBAR SCROLL SHADOW ───────────────────────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(94,78,68,0.08)'
    : 'none';
});

/* ─── FORM SUBMIT (demo) ─────────────────────────────────────── */

/**
 * handleFormSubmit(e)
 * Previene el submit real y muestra confirmación visual.
 * Conectar con backend o servicio de formularios (Formspree, Netlify Forms, etc.)
 */
function handleFormSubmit(e) {
  if (e) e.preventDefault();

  const btn = document.querySelector('.form-submit');
  if (!btn) return;

  const originalText = btn.textContent;
  btn.textContent = '✓ Mensaje enviado — te contactamos pronto';
  btn.style.background = '#4CAF50';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */

/**
 * Intersection Observer para animar elementos al hacer scroll.
 * Añade la clase 'visible' a los elementos con [data-reveal]
 * cuando entran en el viewport.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function initReveal() {
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar reveal si hay elementos marcados
  initReveal();

  // Vincular form submit si existe el formulario
  const form = document.querySelector('.contact-form form');
  if (form) form.addEventListener('submit', handleFormSubmit);

  // Mobile: menú hamburguesa (si se añade en el futuro)
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.toggle('open');
    });
  }
});
