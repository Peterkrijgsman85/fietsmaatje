import { page as weer } from './pages/weer.js';
import { page as water } from './pages/water.js';
import { page as planner } from './pages/planner.js';
import { page as menu } from './pages/menu.js';

const pages = { weer, water, planner, menu };
const app = document.getElementById('app');
const buttons = document.querySelectorAll('.pill-nav button');

let currentCleanup = null;

async function navigate(name) {
  const page = pages[name];
  if (!page) return;

  // Cleanup vorige pagina als die een cleanup heeft
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Render pagina
  app.innerHTML = page.html;

  // Body/html-klasse voor de pagina-achtergrond achter de dynamic island/statusbar
  document.documentElement.classList.remove('page-weer', 'page-water', 'page-planner', 'page-menu');
  document.documentElement.classList.add(`page-${name}`);
  document.body.classList.remove('page-weer', 'page-water', 'page-planner', 'page-menu');
  document.body.classList.add(`page-${name}`);

  // Draai init() als de pagina die heeft
  if (typeof page.init === 'function') {
    currentCleanup = await page.init() ?? null;
  }

  // Update nav
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });

  // Sla actieve pagina op
  sessionStorage.setItem('activePage', name);
}

// Nav klikken
buttons.forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page));
});

// Start op de laatste pagina (of 'weer' als default)
const startPage = sessionStorage.getItem('activePage') ?? 'weer';
navigate(startPage);
