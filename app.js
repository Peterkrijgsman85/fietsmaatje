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
// We wachten tot de DOM volledig geladen is, zodat de elementen 'install-banner' en 'install-btn' bestaan
document.addEventListener('DOMContentLoaded', () => {
  const installBanner = document.getElementById('install-banner');
  const installBtn = document.getElementById('install-btn');
  
  // Controleer of de app al standalone draait (geïnstalleerd is op homescreen)
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  // Maak deze functie ook eventueel beschikbaar voor losse pagina's
  window.getInstallPrompt = () => deferredPrompt;

  // Alleen als de app NOG NIET geïnstalleerd is, gaan we luisteren naar het installatie-event
  if (!isInstalled) {
    
    window.addEventListener('beforeinstallprompt', (e) => {
      // Voorkom dat de browser zelf al met een native pop-up komt
      e.preventDefault();
      // Sla het event op zodat we het later kunnen triggeren via onze eigen knop
      deferredPrompt = e;
      
      console.log('PWA: Installatie event opgevangen. Banner wordt getoond.');
      
      // Toon onze eigen aangepaste installatiebanner
      if (installBanner) {
        installBanner.style.display = 'block';
      }
    });

    // Koppel de klik-actie aan onze installatieknop
    installBtn?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      
      // Toon de officiële browser installatie-dialoog
      deferredPrompt.prompt();
      
      // Wacht op de keuze van de gebruiker
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Gebruiker koos voor installatie: ${outcome}`);
      
      // Wis de opgeslagen prompt, deze kan maar één keer gebruikt worden
      deferredPrompt = null;
      
      // Verberg onze banner weer
      if (installBanner) {
        installBanner.style.display = 'none';
      }
    });
  }
});