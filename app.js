import { page as weer } from './pages/weer.js';
import { page as water } from './pages/water.js';
import { page as planner } from './pages/planner.js';
import { page as menu } from './pages/menu.js';
import { page as pressure } from './pages/pressure.js';
import { page as ridelog } from './pages/ridelog.js';

const pages = { weer, water, planner, menu, pressure, ridelog };
const app = document.getElementById('app');
const buttons = document.querySelectorAll('.pill-nav button');

// --- PWA INSTALLATIE STATE ---
let deferredPrompt = null;

// Service Worker registratie (essentieel voor PWA installatie)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker geregistreerd'))
    .catch((err) => console.log('SW registratie mislukt', err));
}

// --- NAVIGATIE LOGICA ---
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

// Startpagina bepalen
const startPage = sessionStorage.getItem('activePage') ?? 'weer';
navigate(startPage);


// --- PWA INSTALLATIE BANNER LOGICA ---
document.addEventListener('DOMContentLoaded', () => {
  const installBanner = document.getElementById('install-banner');
  const installBtn = document.getElementById('install-btn');
  const bannerText = document.querySelector('.banner-text p');
  
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  // Check of de gebruiker op een iOS apparaat zit (iPhone/iPad)
  const isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isInstalled) {

    // 1. ANDROID / DESKTOP LOGICA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      console.log('PWA: Android/Chrome installatie event opgevangen.');
      if (installBanner) installBanner.style.display = 'block';
    });

    installBtn?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (installBanner) installBanner.style.display = 'none';
    });

    // 2. iOS DETECTIE & WORKAROUND
    // Als het Apple is, en de app draait in de browser, toon dan een instructie-banner
    if (isApple && installBanner) {
      console.log('PWA: iOS gedetecteerd. Toon handmatige instructie.');
      
      // Pas de tekst aan naar iOS-specifieke instructies
      if (bannerText) {
        bannerText.innerHTML = 'Tik op de <strong>Deel-knop</strong> (pijltje omhoog) onderin en kies <strong>"Zet op beginscherm"</strong>.';
      }
      // Verberg de grote oranje knop, want die doet niks op iOS
      if (installBtn) {
        installBtn.style.display = 'none'; 
      }
      
      // Toon de banner direct (aangezien beforeinstallprompt op iOS niet bestaat)
      installBanner.style.display = 'block';
    }
  }
});