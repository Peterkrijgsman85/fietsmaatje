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

  // Definieer de kleuren per pagina
  const themeColors = {
    weer: '#d8f1ff',
    water: '#0a3d4a',
    planner: '#2d1a4a',
    menu: '#2d2f34'
  };

  // Update de theme-color meta tag
  const metaThemeColor = document.getElementById('theme-color-meta');
  metaThemeColor.setAttribute('content', themeColors[name]);

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // 1. ZET DE KLASSE EERST (dit zet de kleur op de body)
  document.documentElement.className = `page-${name}`;
  document.body.className = `page-${name}`;

  // 2. Render de content
  app.innerHTML = page.html;

  // 3. Init...
  if (typeof page.init === 'function') {
    currentCleanup = await page.init() ?? null;
  }

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
