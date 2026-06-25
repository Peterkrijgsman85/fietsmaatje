export const page = {
  html: `
    <style>
      /* --- FIX VOOR SCROLL & SCROLLBALK --- */
      #app::-webkit-scrollbar {
        display: none !important;
      }
      #app {
        -ms-overflow-style: none !important; 
        scrollbar-width: none !important;
        -webkit-overflow-scrolling: touch;
      }

      /* Basis Layout */
      .weather-page {
        position: relative;
        width: 100%;
        color: #1C1C1E;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        padding: 0px 16px 150px; 
      }

      /* --- KNMI WEERWAARSCHUWING BANNER --- */
      .alert-banner {
        background: rgba(255, 149, 0, 0.15); /* Fallback */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 149, 0, 0.4);
        border-radius: 20px;
        padding: 14px 16px;
        margin-top: 14px;
        margin-bottom: -4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        gap: 4px;
        animation: fadeInAlert 0.4s ease-out;
      }
      @keyframes fadeInAlert {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .alert-heading {
        font-size: 0.95rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .alert-body {
        font-size: 0.85rem;
        font-weight: 500;
        color: #0f2c5a;
        line-height: 1.4;
      }

      /* --- PULL TO REFRESH STYLING --- */
      .ptr-container {
        width: 100%;
        height: 0px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 0;
        font-size: 0.85rem;
        font-weight: 600;
        color: rgba(15, 44, 90, 0.6);
        background-color: transparent;
      }
      .ptr-content {
        display: flex;
        align-items: center;
        gap: 6px;
        padding-bottom: 12px;
      }
      .ptr-icon {
        font-size: 1.1rem;
        display: inline-block;
      }
      .refresh-spin {
        animation: spin 1s linear infinite;
      }
      @keyframes spin { 100% { transform: rotate(360deg); } }

      /* Hero Sectie */
      .hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 32px;
      }

      .score-badge {
        background: #8E8E93;
        color: white;
        font-weight: 700;
        font-size: 0.85rem;
        padding: 6px 14px;
        border-radius: 20px;
        margin-bottom: 16px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        transition: background-color 0.3s ease;
      }

      .location-title {
        font-size: 1.8rem;
        font-weight: 500;
        letter-spacing: -0.01em;
        color: #0f2c5a;
        margin-bottom: 4px;
      }

      .hero-center {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .hero-icon {
        font-size: 3.5rem;
        line-height: 1;
      }

      .hero-temp {
        font-size: 5.5rem;
        font-weight: 200;
        letter-spacing: -2px;
        color: #0f2c5a;
        margin-left: 4px;
      }

      .hero-desc {
        font-size: 1.1rem;
        font-weight: 600;
        color: rgba(15, 44, 90, 0.7);
        margin-top: -6px;
      }

      /* Horizontale Stats Rij */
      .stats-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 24px;
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }

      .stat-divider {
        width: 1px;
        height: 24px;
        background-color: rgba(15, 44, 90, 0.15);
      }

      .stat-label {
        font-size: 0.7rem;
        color: rgba(15, 44, 90, 0.6);
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
      }

      .stat-val {
        font-size: 1rem;
        font-weight: 600;
        color: #0f2c5a;
      }

      /* Containers */
      .card-container {
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 24px;
        padding: 18px;
        box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        margin-bottom: 20px;
      }

      .section-title {
        font-size: 0.75rem;
        font-weight: 700;
        color: rgba(15, 44, 90, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin: 0 0 14px 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* 24-uurs overzicht */
      .hourly-scroll {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding-bottom: 4px;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .hourly-scroll::-webkit-scrollbar { display: none; }

      .hourly-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 58px;
        gap: 6px;
        background: rgba(255, 255, 255, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 12px 6px;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
      }

      .hourly-time { font-size: 0.75rem; font-weight: 600; color: rgba(15, 44, 90, 0.7); }
      .hourly-icon { font-size: 1.6rem; line-height: 1; margin: 2px 0; }
      .hourly-temp { font-size: 1rem; font-weight: 700; color: #0f2c5a; }
      .hourly-score-pill { font-weight: 800; color: #FFFFFF; font-size: 0.75rem; padding: 2px 8px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); }
      .hourly-detail { font-size: 0.65rem; color: rgba(15, 44, 90, 0.6); font-weight: 700; letter-spacing: -0.01em; }

      /* Advies overzicht */
      .advice-list { display: flex; flex-direction: column; gap: 8px; }
      .advice-item { display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: rgba(255, 255, 255, 0.35); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 16px; }
      .advice-emoji { font-size: 1.4rem; background: rgba(255, 255, 255, 0.6); padding: 6px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
      .advice-text { font-size: 0.9rem; font-weight: 600; color: #0f2c5a; }

      /* Laders */
      .loading-overlay { text-align: center; padding: 40px 20px; color: #8E8E93; font-weight: 500; }
      .error-note { color: #FF453A; }
    </style>

    <div id="ptr-indicator" class="ptr-container">
      <div class="ptr-content" id="ptr-content">
        <span class="ptr-icon">⬇️</span> Trek om te vernieuwen
      </div>
    </div>

    <div class="weather-page">
      <div id="alert-container"></div>

      <div class="hero-section">
        <div class="score-badge" id="top-score-badge">
          🚴 Weer ophalen...
        </div>
        
        <div class="location-title" id="weather-location">Locatie laden...</div>
        
        <div class="hero-center">
          <div class="hero-icon" id="weather-icon">–</div>
          <div class="hero-temp" id="temperature">–°</div>
        </div>
        
        <div class="hero-desc" id="weather-caption">Weer laden...</div>

        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-label">Gevoel</span>
            <span class="stat-val" id="feels-like">–</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">WBGT</span>
            <span class="stat-val" id="wbgt">–</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">Wind</span>
            <span class="stat-val" id="wind-info">–</span>
          </div>
        </div>
      </div>

      <div id="weather-loading" class="loading-overlay">
        Even geduld, je weer wordt opgehaald…
      </div>

      <div id="hourly-section" class="card-container" style="display: none;">
        <div class="section-title">⏰ Komende 24 uur</div>
        <div class="hourly-scroll" id="hourly-scroll"></div>
      </div>

      <div id="advice-section" class="card-container" style="display: none;">
        <div class="section-title">👕 Kledingadvies</div>
        <div id="advice-list" class="advice-list"></div>
      </div>

    </div>
  `,

  init() {
    let isCancelled = false;
    const appContainer = document.getElementById('app');

    // ==========================================
    // 1. PULL TO REFRESH LOGICA
    // ==========================================
    let startY = 0;
    let isPulling = false;
    const ptrIndicator = document.getElementById('ptr-indicator');
    const ptrContent = document.getElementById('ptr-content');

    const handleTouchStart = (e) => {
      if (appContainer.scrollTop <= 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
        ptrIndicator.style.transition = 'none';
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling) return;
      const currentY = e.touches[0].clientY;
      const dy = currentY - startY;

      if (dy > 0 && appContainer.scrollTop <= 0) {
        if (e.cancelable) e.preventDefault();
        
        const pullDistance = Math.min(dy * 0.4, 80);
        ptrIndicator.style.height = `${pullDistance}px`;
        
        if (pullDistance > 55) {
          ptrContent.innerHTML = '<span class="ptr-icon">↻</span> Laat los om te vernieuwen';
        } else {
          ptrContent.innerHTML = '<span class="ptr-icon">⬇️</span> Trek om te vernieuwen';
        }
      } else {
        isPulling = false;
        ptrIndicator.style.height = '0px';
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;
      isPulling = false;
      
      const currentHeight = parseInt(ptrIndicator.style.height || '0', 10);
      ptrIndicator.style.transition = 'height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
      
      if (currentHeight > 55) {
        ptrIndicator.style.height = '50px';
        ptrContent.innerHTML = '<span class="ptr-icon refresh-spin">↻</span> Weer updaten...';
        
        // Alleen wachten op het hoofdweer (gaat super snel), waarschuwing loopt mee op de achtergrond
        await updateWeather(true);
        getWeerWaarschuwing(true);
        
        ptrIndicator.style.height = '0px';
      } else {
        ptrIndicator.style.height = '0px';
      }
    };

    appContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    appContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    appContainer.addEventListener('touchend', handleTouchEnd, { passive: true });


    // ==========================================
    // 2. WEER LOGICA EN DATAVERWERKING
    // ==========================================
    const icons = {
      0: ['☀️', 'Zonnig'], 1: ['🌤', 'Grotendeels zonnig'], 2: ['⛅️', 'Half bewolkt'],
      3: ['☁️', 'Bewolkt'], 45: ['🌫', 'Mistig'], 48: ['🌫', 'Dichte mist'],
      51: ['🌦', 'Lichte motregen'], 53: ['🌦', 'Motregen'], 55: ['🌧', 'Dikke motregen'],
      56: ['🌧', 'IJzige motregen'], 57: ['🌧', 'IJzige motregen'], 61: ['🌦', 'Lichte regen'],
      63: ['🌧', 'Regen'], 65: ['🌧', 'Zware regen'], 66: ['🌧', 'IJzige regen'],
      67: ['🌧', 'IJzige regen'], 71: ['🌨', 'Sneeuw'], 73: ['🌨', 'Zware sneeuw'],
      75: ['🌨', 'Sneeuwval'], 77: ['🌨', 'Sneeuwkorrels'], 80: ['⛈', 'Buien'],
      81: ['⛈', 'Stevige buien'], 82: ['⛈', 'Zware buien'], 85: ['❄️', 'Sneeuwbuien'],
      86: ['❄️', 'Zware sneeuwbuien'], 95: ['🌩', 'Onweer'], 96: ['⛈', 'Onweer met hagel'],
      99: ['⛈', 'Ernstig onweer']
    };

    const adviceEmojis = {
      thermo: '❄️', long: '👕', short: '👖', wind: '💨',
      rain: '🌧', windchill: '❄️', storm: '⚠️', default: '✨'
    };

    const windDirection = deg => {
      const directions = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'];
      return directions[Math.round(deg / 45) % 8];
    };

    const bftFromKmh = kmh => {
      const thresholds = [1, 6, 12, 20, 29, 39, 50, 62, 75];
      const idx = thresholds.findIndex(limit => kmh <= limit);
      return idx === -1 ? 12 : idx;
    };

    const getScore = ({ weathercode, temperature, windspeed, precipitation_probability }) => {
      let score = 10;
      if ([51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(weathercode)) score -= 3;
      if ([71,73,75,85,86].includes(weathercode)) score -= 3;

      if (temperature > 26) score -= (temperature - 26) / 3;
      else if (temperature < 19) score -= (19 - temperature) / 4;

      score -= Math.min(4, windspeed / 12);
      score -= Math.min(3, precipitation_probability / 20);

      return Math.max(1, Math.min(10, Math.round(score)));
    };

    const getScoreInfo = (score) => {
      if (score >= 9) return { text: 'Ideaal fietsweer', color: '#34C759' };
      if (score >= 7) return { text: 'Prima fietsweer', color: '#34C759' };
      if (score >= 5) return { text: 'Redelijk te doen', color: '#FF9500' };
      if (score >= 3) return { text: 'Matig fietsweer', color: '#FF9500' };
      return { text: 'Beter binnen blijven', color: '#FF3B30' };
    };

    const getAdvice = ({ temperature, feels_like, windspeed, weathercode, precipitation_probability }) => {
      const advice = [];
      const bft = bftFromKmh(windspeed);

      if (temperature >= 22) advice.push({ emoji: '☀️', text: 'Heerlijk zomerweer: korte broek en korte mouwen!' });
      else if (temperature >= 18) advice.push({ emoji: '🌤', text: 'Mooie temperatuur voor korte mouwen.' });
      else if (temperature >= 14) advice.push({ emoji: '👕', text: 'Lange mouwen of armstukken aanbevolen.' });
      else advice.push({ emoji: '🧥', text: 'Fris! Een licht fietsjack of warme basislaag.' });

      if (bft >= 5) advice.push({ emoji: '💨', text: `Stevige wind (Bft ${bft}): strak windjack aanbevolen.` });
      else if (bft >= 3) advice.push({ emoji: '🌬️', text: `Matige bries (Bft ${bft}): bodywarmer of licht windjack is fijn.` });

      if ([95,96,99].includes(weathercode)) advice.push({ emoji: adviceEmojis.storm, text: 'Kans op onweer: rit uitstellen aanbevolen.' });
      else if (precipitation_probability >= 40) advice.push({ emoji: adviceEmojis.rain, text: `Kans op nattigheid (${precipitation_probability}%): neem een regenjack mee.` });
      else if (temperature >= 20 && ![3, 45, 48].includes(weathercode)) advice.push({ emoji: '🕶️', text: 'Vergeet je zonnebril niet tegen de zon en vliegjes!' });

      if (feels_like < temperature - 3) advice.push({ emoji: adviceEmojis.windchill, text: 'Gevoelstemperatuur ligt een stuk lager, extra laag mee.' });
      
      return advice.length ? advice : [{ emoji: adviceEmojis.default, text: 'Frisse rit! Let goed op het verkeer.' }];
    };

    const formatTime = time => new Date(time).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    const setText = (selector, text) => { const el = document.getElementById(selector); if (el) el.textContent = text; };

    const getLocation = () => new Promise(resolve => {
      if (!navigator.geolocation) { resolve({ latitude: 51.9125, longitude: 4.3417, label: 'Vlaardingen' }); return; }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve({ latitude: 51.9125, longitude: 4.3417, label: 'Vlaardingen' }),
        { timeout: 7000 }
      );
    });

    const cleanName = name => (name || 'Onbekende locatie').replace(/,\s*[A-Z]{2,3}$/i, '').trim();

    const reverseGeo = async (lat, lon) => {
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=nl`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length) {
            const place = data.results[0];
            const name = place.name || place.address?.city || place.address?.town || place.address?.village || place.address?.county;
            if (name && isNaN(name)) return cleanName(name);
          }
        }
      } catch (e) {}

      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=nl`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Fietsmaatje/1.0' } });
        if (res.ok) {
          const data = await res.json();
          if (data.address) {
            const town = data.address.city || data.address.town || data.address.village || data.address.municipality;
            if (town) return cleanName(town);
          }
          return cleanName((data.display_name || '').split(',')[0]);
        }
      } catch (e) {}

      return 'Je locatie';
    };

    const fetchWeather = async (lat, lon, timezone) => {
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.searchParams.set('latitude', lat);
      url.searchParams.set('longitude', lon);
      url.searchParams.set('hourly', 'temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,relativehumidity_2m,precipitation_probability');
      url.searchParams.set('current_weather', 'true');
      url.searchParams.set('timezone', timezone);
      url.searchParams.set('model', 'knmi_seamless');
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Weather fetch failed');
      return response.json();
    };

    // ==========================================
    // DYNAMISCH EN ROBUUST WEERWAARSCHUWING PARSEN
    // ==========================================
    const renderAlert = (alert) => {
      const container = document.getElementById('alert-container');
      if (!container) return;
      
      if (alert && alert.heading) {
        const headingLower = alert.heading.toLowerCase();
        let bg = 'rgba(255, 149, 0, 0.15)'; // Oranje standaard
        let border = 'rgba(255, 149, 0, 0.4)';
        let text = '#D57A00';
        
        // Dynamische kleurafstemming gebaseerd op KNMI kleurcode
        if (headingLower.includes('geel')) {
          bg = 'rgba(255, 204, 0, 0.15)';
          border = 'rgba(255, 204, 0, 0.4)';
          text = '#A08000';
        } else if (headingLower.includes('oranje')) {
          bg = 'rgba(255, 149, 0, 0.15)';
          border = 'rgba(255, 149, 0, 0.4)';
          text = '#D57A00';
        } else if (headingLower.includes('rood') || headingLower.includes('weeralarm')) {
          bg = 'rgba(255, 59, 48, 0.15)';
          border = 'rgba(255, 59, 48, 0.4)';
          text = '#FF3B30';
        }

        container.innerHTML = `
          <div class="alert-banner" style="background: ${bg}; border-color: ${border};">
            <div class="alert-heading" style="color: ${text};">⚠️ ${alert.heading}</div>
            <div class="alert-body">${alert.body || 'Zie KNMI website voor details.'}</div>
          </div>
        `;
      } else {
        container.innerHTML = '';
      }
    };

    const getWeerWaarschuwing = async (forceRefresh = false) => {
      const CACHE_KEY = 'knmi_alert';
      const CACHE_TIME_KEY = 'knmi_alert_time';
      const CACHE_DURATION = 15 * 60 * 1000; // 15 minuten cache

      const cachedData = localStorage.getItem(CACHE_KEY);
      const lastFetch = localStorage.getItem(CACHE_TIME_KEY);
      
      if (!forceRefresh && cachedData && lastFetch && (Date.now() - lastFetch < CACHE_DURATION)) {
        const parsed = JSON.parse(cachedData);
        if (parsed && !parsed.noAlert) {
          renderAlert(parsed);
        } else {
          renderAlert(null);
        }
        return;
      }

      try {
        const targetUrl = 'https://www.knmi.nl/nederland-nu/weer/waarschuwingen';
        let htmlContent = null;

        // --- PROXY POGING 1: Corsproxy.io (Snelle, directe HTML stream) ---
        try {
          const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
          if (res.ok) {
            htmlContent = await res.text();
          }
        } catch (e) {
          console.warn("Proxy 1 (corsproxy.io) geblokkeerd of offline, proberen volgende...");
        }

        // --- PROXY POGING 2: Codetabs (Directe HTML fallback) ---
        if (!htmlContent) {
          try {
            const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`);
            if (res.ok) {
              htmlContent = await res.text();
            }
          } catch (e) {
            console.warn("Proxy 2 (codetabs) geblokkeerd of offline, proberen volgende...");
          }
        }

        // --- PROXY POGING 3: AllOrigins (Oude fallback via JSON wrapper) ---
        if (!htmlContent) {
          try {
            const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
            if (res.ok) {
              const data = await res.json();
              htmlContent = data.contents;
            }
          } catch (e) {
            console.warn("Proxy 3 (allorigins) ook gefaald.");
          }
        }

        // Als alle drie de wegen doodlopen, gooien we een error op de achtergrond
        if (!htmlContent) {
          throw new Error('Alle beschikbare CORS-proxies zijn momenteel geblokkeerd door KNMI/Cloudflare.');
        }

        if (isCancelled) return;
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Selecteer de waarschuwingselementen
        const headingEl = doc.querySelector('.alert__heading, .alert_heading, [class*="alert__heading"]');
        const bodyEl = doc.querySelector('.alert__description, .alert_description, [class*="alert__description"]');
        
        if (headingEl) {
          const headingText = headingEl.innerText.trim();
          const bodyText = bodyEl ? bodyEl.innerText.trim() : '';
          
          // Filter 'Code Groen' of 'Geen waarschuwingen' eruit
          if (headingText.toLowerCase().includes('groen') || headingText.toLowerCase().includes('geen waarschuwing')) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ noAlert: true }));
            localStorage.setItem(CACHE_TIME_KEY, Date.now());
            renderAlert(null);
          } else {
            const alertData = { heading: headingText, body: bodyText };
            localStorage.setItem(CACHE_KEY, JSON.stringify(alertData));
            localStorage.setItem(CACHE_TIME_KEY, Date.now());
            renderAlert(alertData);
          }
        } else {
          // Geen elementen gevonden betekent momenteel geen weeralarm actief
          localStorage.setItem(CACHE_KEY, JSON.stringify({ noAlert: true }));
          localStorage.setItem(CACHE_TIME_KEY, Date.now());
          renderAlert(null);
        }
      } catch (error) {
        console.error("Kon waarschuwing niet ophalen:", error);
        // Bij een fout vallen we terug op wat we nog in de cache hadden staan
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (!parsed.noAlert) renderAlert(parsed);
        }
      }
    };

    const renderHourly = (weather) => {
      const container = document.getElementById('hourly-scroll');
      if (!container) return;
      container.innerHTML = '';
      const section = document.getElementById('hourly-section');
      if (section) section.style.display = 'block';

      const now = new Date();
      const baseIndex = weather.hourly.time.findIndex(t => new Date(t).getTime() >= now.getTime());
      const startIndex = baseIndex >= 0 ? baseIndex : 0;
      const slice = weather.hourly.time.slice(startIndex, startIndex + 24);
      
      slice.forEach((time, offset) => {
        const idx = startIndex + offset;
        const code = weather.hourly.weathercode[idx];
        const icon = icons[code] ? icons[code][0] : '❔';
        const hourlyTemp = Math.round(weather.hourly.temperature_2m[idx]);
        const wind = weather.hourly.windspeed_10m[idx];
        const dir = windDirection(weather.hourly.winddirection_10m[idx]);
        const bft = bftFromKmh(wind);
        const value = Math.max(1, getScore({ weathercode: code, temperature: weather.hourly.temperature_2m[idx], windspeed: wind, precipitation_probability: weather.hourly.precipitation_probability[idx] }));
        const info = getScoreInfo(value);
        
        container.innerHTML += `
          <div class="hourly-item">
            <div class="hourly-time">${formatTime(time)}</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-temp">${hourlyTemp}°</div>
            <div class="hourly-score-pill" style="background-color: ${info.color};">${value}</div>
            <div class="hourly-detail">${dir} ${bft}Bft</div>
          </div>
        `;
      });
    };

    const renderAdvice = advice => {
      const list = document.getElementById('advice-list');
      const section = document.getElementById('advice-section');
      if (!list) return;
      list.innerHTML = advice.map(item => `
        <div class="advice-item">
          <span class="advice-emoji">${item.emoji}</span>
          <span class="advice-text">${item.text}</span>
        </div>
      `).join('');
      if (section) section.style.display = 'block';
    };

    const formatWbgt = (temperature, humidity, windspeed, activity = 'cycling') => {
      const T = temperature;
      const RH = Math.max(0, Math.min(100, humidity));
      const v = Math.max(0.5, windspeed / 3.6);
      const activityMultiplier = { 'rest': 0.4, 'light': 0.8, 'moderate': 1.0, 'cycling': 1.2, 'vigorous': 1.5 }[activity] || 1.0;
      const dewPointSimple = T - ((100 - RH) / 5);
      const Tw = dewPointSimple * 0.6 + T * 0.4;
      const Tg = T + 14 * Math.sqrt(v) * (RH / 100 - 0.5);
      const wbgt = 0.7 * Tw + 0.2 * Tg + 0.1 * T;
      const adjustedWbgt = wbgt + (activityMultiplier - 1.0) * 3;
      return (Math.max(T - 10, adjustedWbgt)).toFixed(1);
    };

    const showFetchError = message => {
      const loader = document.getElementById('weather-loading');
      if (loader) {
        loader.innerHTML = `<div class="error-note">⚠️ ${message}</div>`;
        loader.style.display = 'block';
      }
    };

    const updateWeather = async (forceRefresh = false) => {
      try {
        const loader = document.getElementById('weather-loading');
        if (loader && !forceRefresh) loader.style.display = 'block';

        // ASYNCHROON: weerswaarschuwing wordt nu parallel aangeroepen (en niet ge-awaited)
        // Hierdoor laadt Open-Meteo direct zonder te wachten op de allorigins proxy.
        if (!forceRefresh) {
          getWeerWaarschuwing(false);
        }

        const location = await getLocation();
        if (isCancelled) return;

        const CACHE_KEY = 'fietsmaatje_weather_cache';
        const CACHE_TTL = 5 * 60 * 1000;

        let placeName;
        let weather;
        let useCache = false;

        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!forceRefresh && cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            const isFresh = (Date.now() - parsed.timestamp) < CACHE_TTL;
            const isSameLocation = Math.round(parsed.lat * 100) === Math.round(location.latitude * 100) &&
                                   Math.round(parsed.lon * 100) === Math.round(location.longitude * 100);

            if (isFresh && isSameLocation) {
              placeName = parsed.placeName;
              weather = parsed.weather;
              useCache = true;
            }
          } catch (e) {
            console.warn('Weercache defect, live gegevens ophalen...');
          }
        }

        if (!useCache) {
          placeName = location.label || await reverseGeo(location.latitude, location.longitude);
          if (isCancelled) return;

          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Amsterdam';
          weather = await fetchWeather(location.latitude, location.longitude, timezone);
          if (isCancelled) return;

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            lat: location.latitude,
            lon: location.longitude,
            placeName: placeName,
            weather: weather
          }));
        }

        setText('weather-location', placeName);

        const current = weather.current_weather;
        const code = current.weathercode;
        const icon = icons[code] ? icons[code][0] : '❔';
        const description = icons[code] ? icons[code][1] : 'Onbekend weer';
        const bft = bftFromKmh(current.windspeed);
        
        const currentIndex = weather.hourly.time.indexOf(weather.current_weather.time);
        
        const score = getScore({
          weathercode: code,
          temperature: current.temperature,
          windspeed: current.windspeed,
          precipitation_probability: weather.hourly.precipitation_probability[currentIndex] ?? 0
        });

        const scoreInfo = getScoreInfo(score);
        const topBadge = document.getElementById('top-score-badge');
        if (topBadge) {
          topBadge.textContent = '🚴 ' + scoreInfo.text;
          topBadge.style.backgroundColor = scoreInfo.color;
        }

        const feelsLike = weather.hourly.apparent_temperature[currentIndex] ?? current.temperature;
        const humidity = weather.hourly.relativehumidity_2m[currentIndex] ?? 0;
        const wbgtValue = formatWbgt(current.temperature, humidity, current.windspeed, 'cycling');
        
        const advice = getAdvice({
          temperature: current.temperature,
          feels_like: feelsLike,
          windspeed: current.windspeed,
          weathercode: code,
          precipitation_probability: weather.hourly.precipitation_probability[currentIndex] ?? 0
        });

        setText('weather-icon', icon);
        setText('weather-caption', description);
        setText('temperature', `${Math.round(current.temperature)}°`);
        setText('feels-like', `${Math.round(feelsLike)}°`);
        setText('wbgt', `${wbgtValue}°C`);
        setText('wind-info', `${Math.round(current.windspeed)} km/u · ${bft} Bft`);

        renderHourly(weather);
        renderAdvice(advice);

        if (loader) loader.style.display = 'none';
      } catch (error) {
        console.error(error);
        showFetchError('Kon het weer niet laden. Check je verbinding.');
      }
    };
    
    // Beide onafhankelijk starten bij initialisatie
    updateWeather();
    getWeerWaarschuwing();

    // ==========================================
    // 3. CLEANUP
    // ==========================================
    return () => { 
      isCancelled = true; 
      appContainer.removeEventListener('touchstart', handleTouchStart);
      appContainer.removeEventListener('touchmove', handleTouchMove);
      appContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }
};