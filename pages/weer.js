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
        -webkit-overflow-scrolling: touch; /* Zorgt voor die vloeiende momentum scroll */
      }

      /* Basis Layout */
      .weather-page {
        position: relative;
        width: 100%;
        color: #1C1C1E;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        padding: 0px 16px 150px; 
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

      /* Glazen Kaart Containers */
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

      /* --- MEERDAAGSE VERWACHTING HORIZONTAAL SCROLLBAAR --- */
      .daily-scroll {
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .daily-scroll::-webkit-scrollbar { display: none; }

      .daily-container {
        min-width: 450px; /* Geoptimaliseerd voor 7 kolommen */
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .daily-flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }

      .daily-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        text-align: center;
      }

      /* Headers: Dag, Datum, Icon */
      .daily-name { font-size: 0.85rem; font-weight: 700; color: #0f2c5a; line-height: 1.2; }
      .daily-date { font-size: 0.65rem; color: rgba(15, 44, 90, 0.6); font-weight: 600; margin-bottom: 2px; }
      .daily-icon { font-size: 1.5rem; line-height: 1; }

      /* Grafiek Sectie */
      .daily-graph-container {
        position: relative;
        width: 100%;
        height: 90px;
        margin-top: 8px;
      }
      
      .daily-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }

      .temp-dot {
        position: absolute;
        left: 50%;
        width: 6px;
        height: 6px;
        background: #FFF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .dot-max { border: 2px solid #FF9500; }
      .dot-min { border: 2px solid #007AFF; }
      
      .temp-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.65rem;
        font-weight: 700;
      }
      .text-max { color: #0f2c5a; margin-top: -18px; }
      .text-min { color: rgba(15, 44, 90, 0.6); margin-top: 8px; }

      /* Nieuwe Verticale Regenstaafjes (Onder grafiek) */
      .daily-rain-container-v {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;
        width: 100%;
        height: 38px;
      }
      .daily-rain-text { font-size: 0.6rem; font-weight: 700; color: #007AFF; line-height: 1; }
      .rain-bar-bg-v { width: 6px; height: 18px; background: rgba(0, 122, 255, 0.1); border-radius: 3px; display: flex; align-items: flex-end; }
      .rain-bar-fill-v { width: 100%; background: #007AFF; border-radius: 3px; transition: height 0.3s ease; }

      /* Wind onderaan de footer */
      .daily-wind { font-size: 0.65rem; font-weight: 600; color: rgba(15, 44, 90, 0.7); margin-top: 2px; white-space: nowrap; }

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
          <div class="stat-item" style="position: relative;">
  <span class="stat-label" style="display: flex; align-items: center; justify-content: center; gap: 4px;">
    WBGT
    <span id="wbgt-info-btn" style="cursor: pointer; font-size: 0.6rem; border: 1px solid rgba(15,44,90,0.2); border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; color: rgba(15,44,90,0.4); background: rgba(255,255,255,0.8);">i</span>
  </span>
  <span class="stat-val" id="wbgt">–</span>
  
  <div id="wbgt-tooltip" class="tooltip-fade" style="display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; width: 190px; background: rgba(15, 44, 90, 0.95); color: #fff; padding: 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 500; text-align: left; box-shadow: 0 8px 24px rgba(15, 44, 90, 0.2); z-index: 50; line-height: 1.4;">
    <div id="wbgt-tooltip-text">Laden...</div>
    <div style="content: ''; position: absolute; bottom: -4px; left: 50%; margin-left: -4px; width: 8px; height: 8px; background: rgba(15, 44, 90, 0.95); transform: rotate(45deg);"></div>
  </div>
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

      <div id="daily-section" class="card-container" style="display: none;">
        <div class="section-title">📅 7-daagse verwachting</div>
        <div class="daily-scroll">
          <div class="daily-container" id="daily-list"></div>
        </div>
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

    const getWbgtAdviceText = (wbgt) => {
  if (wbgt < 18) return '<b style="color: #34C759;">🟢 Laag risico</b><br>Geen restricties.';
  if (wbgt < 23) return '<b style="color: #FFCC00;">🟡 Matig risico</b><br>Let op bij intensieve, langdurige inspanning; extra hydratatie.';
  if (wbgt < 28) return '<b style="color: #FF9500;">🟠 Hoog risico</b><br>Risico stijgt. Verkort trainingsduur, frequente pauzes, meer drinken.';
  if (wbgt <= 30) return '<b style="color: #FF3B30;">🔴 Zeer hoog risico</b><br>Groot risico. Zeer intensieve inspanning beperken. Risicogroepen stoppen.';
  return '<b style="color: #A200FF;">🟣 Extreem risico</b><br>Advies: Sportactiviteiten staken/afgelasten.';
};

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
        
        await updateWeather(true);
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
      if (!navigator.geolocation) { resolve({ latitude: 52.3676, longitude: 4.9041, label: 'Amsterdam' }); return; }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve({ latitude: 52.3676, longitude: 4.9041, label: 'Amsterdam' }),
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
      // TOEGEVOEGD: shortwave_radiation
      url.searchParams.set('hourly', 'temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,relativehumidity_2m,precipitation_probability,shortwave_radiation');
      url.searchParams.set('daily', 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant');
      url.searchParams.set('current_weather', 'true');
      url.searchParams.set('timezone', timezone);
      url.searchParams.set('forecast_days', '7');
      url.searchParams.set('model', 'knmi_seamless');
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Weather fetch failed');
      return response.json();
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

    // ==========================================
    // BIJGEWERKT: 7-DAAGSE VERWACHTING
    // ==========================================
    const renderDaily = (weather) => {
      const container = document.getElementById('daily-list');
      if (!container || !weather.daily) return;
      container.innerHTML = '';
      const section = document.getElementById('daily-section');
      if (section) section.style.display = 'block';

      const daysOfWeek = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      const totalRows = 7; // AANGEPAST NAAR 7 DAGEN

      const times = weather.daily.time.slice(0, totalRows);
      const maxs = weather.daily.temperature_2m_max.slice(0, totalRows);
      const mins = weather.daily.temperature_2m_min.slice(0, totalRows);
      const rainSums = weather.daily.precipitation_sum.slice(0, totalRows);

      // Schaalberekeningen voor de temperatuurgrafiek
      const graphHeight = 90;
      const padding = 20; 
      const drawHeight = graphHeight - (padding * 2);

      let globalMin = Math.min(...mins);
      let globalMax = Math.max(...maxs);
      if (globalMin === globalMax) { globalMin -= 1; globalMax += 1; }
      const maxRain = Math.max(...rainSums) || 1;

      let headersHtml = '<div class="daily-flex-row">';
      let graphColsHtml = '';
      let rainHtml = '<div class="daily-flex-row" style="margin-top: 8px;">'; // NIEUWE RIJ VOOR REGEN
      let footersHtml = '<div class="daily-flex-row" style="align-items: flex-start; margin-top: 8px;">';
      
      let maxPath = '';
      let minPath = '';

      for (let i = 0; i < totalRows; i++) {
        const dateObj = new Date(times[i]);
        const dayName = daysOfWeek[dateObj.getDay()];
        const dateStr = `${dateObj.getDate()}-${dateObj.getMonth() + 1}`;
        const code = weather.daily.weathercode[i];
        const icon = icons[code] ? icons[code][0] : '❔';
        
        const rain = rainSums[i] ?? 0;
        const rainStr = rain > 0 ? `${rain.toFixed(1)} mm` : '0 mm';
        const rainPercent = Math.min(100, (rain / maxRain) * 100);

        // 1. Header (Alleen Dag, Datum, Icoon)
        headersHtml += `
          <div class="daily-col">
            <span class="daily-name">${dayName}</span>
            <span class="daily-date">${dateStr}</span>
            <span class="daily-icon">${icon}</span>
          </div>
        `;

        // Y-coördinaten berekenen
        const yMax = padding + ((globalMax - maxs[i]) / (globalMax - globalMin)) * drawHeight;
        const yMin = padding + ((globalMax - mins[i]) / (globalMax - globalMin)) * drawHeight;
        
        // X-coördinaten berekenen (nu gebaseerd op 7 stappen in plaats van 10)
        const stepWidth = 100 / totalRows;
        const xPercent = (i * stepWidth) + (stepWidth / 2);
        maxPath += `${i === 0 ? 'M' : 'L'} ${xPercent} ${yMax} `;
        minPath += `${i === 0 ? 'M' : 'L'} ${xPercent} ${yMin} `;

        // 2. Grafiek Kolom (Stippen en Tekst)
        graphColsHtml += `
          <div class="daily-col" style="position: relative;">
            <div class="temp-dot dot-max" style="top: ${yMax}px;"></div>
            <div class="temp-text text-max" style="top: ${yMax}px;">${Math.round(maxs[i])}°</div>
            <div class="temp-dot dot-min" style="top: ${yMin}px;"></div>
            <div class="temp-text text-min" style="top: ${yMin}px;">${Math.round(mins[i])}°</div>
          </div>
        `;

        // 3. Verticale Regenstaafjes (Onder de grafiek)
        rainHtml += `
          <div class="daily-col">
            <div class="daily-rain-container-v">
              <div class="daily-rain-text" style="opacity: ${rain > 0 ? 1 : 0.4};">${rainStr}</div>
              <div class="rain-bar-bg-v">
                <div class="rain-bar-fill-v" style="height: ${rainPercent}%;"></div>
              </div>
            </div>
          </div>
        `;

        // 4. Footer (Windrichting en bft)
        const windSpeed = weather.daily.windspeed_10m_max[i] ?? 0;
        const windDirDeg = weather.daily.winddirection_10m_dominant[i] ?? 0;
        
        footersHtml += `
          <div class="daily-col">
            <div class="daily-wind">${windDirection(windDirDeg)} ${bftFromKmh(windSpeed)}</div>
          </div>
        `;
      }
      
      headersHtml += '</div>';
      rainHtml += '</div>';
      footersHtml += '</div>';
      
      const svgHtml = `
        <svg class="daily-svg" viewBox="0 0 100 ${graphHeight}" preserveAspectRatio="none">
          <path d="${maxPath}" fill="none" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
          <path d="${minPath}" fill="none" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        </svg>
      `;

      container.innerHTML = `
        ${headersHtml}
        <div class="daily-graph-container">
          ${svgHtml}
          <div class="daily-flex-row" style="height: 100%;">
            ${graphColsHtml}
          </div>
        </div>
        ${rainHtml}
        ${footersHtml}
      `;
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

    const formatWbgt = (temperature, humidity, windspeed, radiation) => {
      const T = temperature;
      const RH = Math.max(0, Math.min(100, humidity));
      // Wind km/u naar m/s. Minimum 0.5 m/s om delen door (bijna) nul te voorkomen
      const v = Math.max(0.5, windspeed / 3.6); 

      // 1. Wet Bulb (Tw) - Zeer nauwkeurige empirische formule (Stull, 2011)
      const Tw = T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) + 
                 Math.atan(T + RH) - Math.atan(RH - 1.676331) + 
                 (0.00391838 * Math.pow(RH, 1.5)) * Math.atan(0.023101 * RH) - 4.686035;

      // 2. Globe Temperature (Tg) - Nu mét zonnestraling (W/m2)
      // De straling verwarmt de bol, de wind zorgt voor convectieve afkoeling
      const Tg = T + (radiation * 0.04) / Math.sqrt(v); 

      // 3. Officiële WBGT Formule (0.7 Tw + 0.2 Tg + 0.1 T)
      const wbgt = 0.7 * Tw + 0.2 * Tg + 0.1 * T;
      
      return wbgt.toFixed(1);
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
          console.log('🔄 Live weer en locatie ophalen via API...');
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
        const radiation = weather.hourly.shortwave_radiation[currentIndex] ?? 0; // NIEUW
        
        // Geef de straling mee in plaats van de oude 'cycling' string
        const wbgtValue = formatWbgt(current.temperature, humidity, current.windspeed, radiation);
        
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

        // VOEG DIT TOE: Update de tooltip tekst
const tooltipTextEl = document.getElementById('wbgt-tooltip-text');
if (tooltipTextEl) {
  tooltipTextEl.innerHTML = getWbgtAdviceText(parseFloat(wbgtValue));
}

        renderHourly(weather);
        renderDaily(weather);
        renderAdvice(advice);

        if (loader) loader.style.display = 'none';
      } catch (error) {
        console.error(error);
        showFetchError('Kon het weer niet laden. Check je internetverbinding of locatie-instellingen.');
      }
    };

    // WBGT Tooltip klik logica
const wbgtBtn = document.getElementById('wbgt-info-btn');
const wbgtTooltip = document.getElementById('wbgt-tooltip');

if (wbgtBtn && wbgtTooltip) {
  wbgtBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Voorkom dat de klik direct wordt opgevangen door het window
    const isVisible = wbgtTooltip.style.display === 'block';
    
    // Optioneel: verberg andere open tooltips als je er meerdere hebt
    document.querySelectorAll('.tooltip-fade').forEach(el => el.style.display = 'none');
    
    wbgtTooltip.style.display = isVisible ? 'none' : 'block';
  });

  // Zorg dat de tooltip sluit als je ergens anders op het scherm klikt
  document.addEventListener('click', (e) => {
    if (!wbgtTooltip.contains(e.target) && e.target !== wbgtBtn) {
      wbgtTooltip.style.display = 'none';
    }
  });
}

    updateWeather();
  }
};