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

  // 1. Update de theme-color meta tag (cruciaal voor de iOS statusbalk)
  const themeColors = {
    weer: '#d8f1ff',
    water: '#0a3d4a',
    planner: '#2d1a4a',
    menu: '#2d2f34'
  };
  const metaThemeColor = document.getElementById('theme-color-meta');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', themeColors[name]);
  }

  // 2. Cleanup de vorige pagina als die er is
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // 3. Forceer een schone lei voor de body en zet de nieuwe kleur-klasse
  document.body.className = ''; 
  document.body.classList.add(`page-${name}`);

  // 4. Render de nieuwe HTML content
  app.innerHTML = page.html;

  // 5. Draai de logica (init) van de nieuwe pagina
  if (typeof page.init === 'function') {
    currentCleanup = await page.init() ?? null;
  }

  // 6. Update de actieve status in de navigatiebalk
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });

  // 7. Sla de huidige pagina op in het geheugen
  sessionStorage.setItem('activePage', name);
}

// Luister naar klikken in de navigatiebalk
buttons.forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page));
});

// Start op de laatst bezochte pagina (of 'weer' als dit de eerste keer is)
const startPage = sessionStorage.getItem('activePage') ?? 'weer';
navigate(startPage);