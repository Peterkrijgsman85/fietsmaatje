import { page as weer } from './pages/weer.js';
import { page as water } from './pages/water.js';
import { page as planner } from './pages/planner.js';
import { page as menu } from './pages/menu.js';
import { page as pressure } from './pages/pressure.js';
import { page as ridelog } from './pages/ridelog.js';

const pages = { weer, water, planner, menu, pressure, ridelog };
const app = document.getElementById('app');
const buttons = document.querySelectorAll('.pill-nav button');

// --- PWA INSTALLATIE LOGICA ---
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('PWA: Installatie event opgevangen.');
});

// Maak deze functie beschikbaar voor je pagina's
window.getInstallPrompt = () => deferredPrompt;

// Service Worker registratie (essentieel voor PWA installatie)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker geregistreerd'))
    .catch((err) => console.log('SW registratie mislukt', err));
}
// ------------------------------

let currentCleanup = null;

async function navigate(name) {
  const page = pages[name];
  if (!page) return;

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  app.innerHTML = page.html;

  if (typeof page.init === 'function') {
    currentCleanup = await page.init() ?? null;
  }

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });

  sessionStorage.setItem('activePage', name);
}

window.navigate = navigate;

buttons.forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page));
});

const startPage = sessionStorage.getItem('activePage') ?? 'weer';
navigate(startPage);