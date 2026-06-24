import { page as weer } from './pages/weer.js';
import { page as water } from './pages/water.js';
import { page as planner } from './pages/planner.js';
import { page as menu } from './pages/menu.js';
import { page as pressure } from './pages/pressure.js'; // 1. Importeer de nieuwe pagina

// 2. Voeg pressure toe aan de beschikbare pagina's
const pages = { weer, water, planner, menu, pressure }; 
const app = document.getElementById('app');
const buttons = document.querySelectorAll('.pill-nav button');

let currentCleanup = null;

async function navigate(name) {
  const page = pages[name];
  if (!page) return;

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Render direct de content
  app.innerHTML = page.html;

  if (typeof page.init === 'function') {
    currentCleanup = await page.init() ?? null;
  }

  // Update actieve knop
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });

  sessionStorage.setItem('activePage', name);
}

// 3. Maak de navigate functie globaal beschikbaar voor je subpagina's
window.navigate = navigate;

buttons.forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page));
});

const startPage = sessionStorage.getItem('activePage') ?? 'weer';
navigate(startPage);