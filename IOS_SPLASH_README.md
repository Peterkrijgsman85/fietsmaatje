Wat te doen voor iOS fullscreen (Home Screen)

1) Icons
- Plaats je app-icoon op:
  - `/icons/apple-touch-icon.png` (180x180 aanbevolen)
  - `/icons/icon-192.png` en `/icons/icon-512.png` voor de manifest

2) Splash screens (optioneel maar aanbevolen)
- iOS gebruikt `apple-touch-startup-image` link-tags voor splash screens. Je kunt voor moderne iPhones meerdere formaten toevoegen. Voor eenvoud kun je eerst een enkele placeholder toevoegen of gebruik een service om splash images te genereren.

3) Belangrijke meta-tags (reeds aanwezig)
- `viewport-fit=cover` in de viewport meta
- `apple-mobile-web-app-capable=yes`
- `apple-mobile-web-app-status-bar-style=black-translucent`
- Gebruik `env(safe-area-inset-top)` en `env(safe-area-inset-bottom)` in CSS (er is al CSS in `index.html`)

4) Manifest
- `manifest.json` is toegevoegd met `display: standalone` en icon-paden. Zorg dat de icon-bestanden bestaan.

5) iPhone viewport simuleren
- Safari (aanbevolen): Open Safari -> Develop -> Enter Responsive Design Mode -> kies een iPhone en schakel "Standalone" niet direct te simuleren; voor standalone test: voeg de site toe aan Home Screen op een echte iPhone.
- Chrome: Open DevTools (Cmd+Option+I) -> Toggle device toolbar (Cmd+Shift+M) -> kies iPhone model -> zorg dat de viewport is ingesteld op `Responsive` en stel dimensies

6) Test op echt iOS-apparaat
- Voor Home Screen fullscreen-gedrag moet je testen op een echte iPhone: voeg de site toe aan Home Screen (delen -> Add to Home Screen) en open vanaf het icoon.

7) Problemen oplossen
- Als de app nog niet fullscreen is, controleer of je site via HTTPS draait en dat `index.html` vanaf root (`/index.html`) bereikbaar is.
- Controleer dat `apple-touch-icon.png` aanwezig is en geen 404 geeft.

