export const page = {
  html: `
    <div class="weather-page">
      <style>
        /* Basis Layout */
        .weather-page {
          background: linear-gradient(160deg, #d8f1ff 0%, #9edcff 40%, #67c7ff 100%);
          color: #1C1C1E;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 20px 16px 80px 16px;
          min-height: 100vh;
        }

        /* Hero Sectie (Direct op de achtergrond) */
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 32px;
        }

        .score-badge {
          background: #8E8E93; /* Standaard grijs, wordt overschreven via JS */
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }

        .location-title {
          font-size: 1.8rem;
          font-weight: 400;
          letter-spacing: 0.02em;
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
          font-weight: 200; /* Typisch iOS: dunne letters voor grote temperaturen */
          letter-spacing: -2px;
          margin-left: 4px;
        }

        .hero-desc {
          font-size: 1.1rem;
          font-weight: 500;
          opacity: 0.8;
          margin-top: -8px;
        }

        /* Horizontale Stats Rij */
        .stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
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
          background-color: #D1D1D6;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #8E8E93;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .stat-val {
          font-size: 1rem;
          font-weight: 600;
        }

        /* Kaart Containers voor de lijsten */
        .card-container {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #8E8E93;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 16px 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 24-uurs overzicht */
        .hourly-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .hourly-scroll::-webkit-scrollbar { display: none; }

        .hourly-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;
          gap: 10px;
        }

        .hourly-time { font-size: 0.85rem; font-weight: 500; }
        .hourly-icon { font-size: 1.8rem; line-height: 1; }
        
        /* De nieuwe vierkant-afgeronde badge voor het cijfer in de lijst */
        .hourly-score-pill { 
          font-weight: 700; 
          color: #FFFFFF; 
          font-size: 0.95rem; 
          padding: 4px 10px; /* Vierkantere verhouding */
          border-radius: 8px; /* Afgeronde hoekjes i.p.v. een pil-vorm */
        }
        
        .hourly-detail { font-size: 0.7rem; color: #8E8E93; font-weight: 500; }

        /* Advies overzicht */
        .advice-list {
          display: flex;
          flex-direction: column;
        }

        .advice-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #E5E5EA;
        }
        .advice-item:last-child {
          border-bottom: none;
          padding-bottom: 4px;
        }

        .advice-emoji { font-size: 1.5rem; }
        .advice-text { font-size: 0.95rem; font-weight: 500; }

        /* Laders */
        .loading-overlay { text-align: center; padding: 40px 20px; color: #8E8E93; font-weight: 500; }
        .error-note { color: #FF453A; }
      </style>

      <div class="hero-section">
        <div class="score-badge" id="top-score-badge">
          🚴 Weer ophalen...
        </div>
        
        <div class="location-title" id="weather-location">Locatie laden...</div>
        
        <div class="hero-center">
          <div class="hero-icon" id="weather-icon">〰️</div>
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

    // De geüpdatete score logica
    const getScore = ({ weathercode, temperature, windspeed, precipitation_probability }) => {
      let score = 10;
      
      if ([51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(weathercode)) score -= 3;
      if ([71,73,75,85,86].includes(weathercode)) score -= 3;

      if (temperature > 24) {
        score -= (temperature - 24) / 3;
      } else if (temperature < 19) {
        score -= (19 - temperature) / 4;
      }

      score -= Math.min(4, windspeed / 12);
      score -= Math.min(3, precipitation_probability / 20);

      return Math.max(1, Math.min(10, Math.round(score)));
    };

    // Hulpscript voor tekst en kleuren
    const getScoreInfo = (score) => {
      if (score >= 9) return { text: 'Ideaal fietsweer', color: '#34C759' }; // Groen
      if (score >= 7) return { text: 'Prima fietsweer', color: '#34C759' }; // Groen
      if (score >= 5) return { text: 'Redelijk te doen', color: '#FF9500' }; // Oranje
      if (score >= 3) return { text: 'Matig fietsweer', color: '#FF9500' }; // Oranje
      return { text: 'Beter binnen blijven', color: '#FF3B30' }; // Rood
    };

    const getAdvice = ({ temperature, feels_like, windspeed, weathercode, precipitation_probability }) => {
      const advice = [];
      if (temperature <= 8) advice.push({ emoji: adviceEmojis.thermo, text: 'Lange thermo + winddichte jas' });
      else if (temperature <= 14) advice.push({ emoji: adviceEmojis.long, text: 'Lange mouwen en een licht jack' });
      else if (temperature <= 20) advice.push({ emoji: adviceEmojis.short, text: 'Korte mouwen met een licht vest' });
      else advice.push({ emoji: adviceEmojis.short, text: 'Korte mouwen en korte broek' });

      if (windspeed >= 30) advice.push({ emoji: adviceEmojis.wind, text: 'Let op wind: lagere versnelling kiezen' });
      if (precipitation_probability >= 40) advice.push({ emoji: adviceEmojis.rain, text: 'Regenkleding of spatborden aan' });
      if (feels_like < temperature - 3) advice.push({ emoji: adviceEmojis.windchill, text: 'Extra laag mee nemen' });
      if ([95,96,99].includes(weathercode)) advice.push({ emoji: adviceEmojis.storm, text: 'Paarse flags: uitstel aanbevolen' });
      
      return advice.length ? advice : [{ emoji: adviceEmojis.default, text: 'Frisse rit! Let wel op het verkeer.' }];
    };

    const formatTime = time => {
      const date = new Date(time);
      return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    };

    const setText = (selector, text) => {
      const el = document.getElementById(selector);
      if (el) el.textContent = text;
    };

    const getLocation = () => new Promise(resolve => {
      if (!navigator.geolocation) {
        resolve({ latitude: 52.3676, longitude: 4.9041, label: 'Amsterdam' });
        return;
      }
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
            return cleanName(place.name || place.address?.city || place.address?.town || place.address?.village || place.address?.county);
          }
        }
      } catch (e) {}

      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=nl`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Fietsmaatje/1.0' } });
        if (res.ok) {
          const data = await res.json();
          return cleanName((data.display_name || '').split(',')[0]);
        }
      } catch (e) {}

      return 'Onbekende locatie';
    };

    const fetchWeather = async (lat, lon, timezone) => {
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.searchParams.set('latitude', lat);
      url.searchParams.set('longitude', lon);
      url.searchParams.set('hourly', 'temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,relativehumidity_2m,precipitation_probability');
      url.searchParams.set('current_weather', 'true');
      url.searchParams.set('timezone', timezone);
      url.searchParams.set('model', 'ecmwf_ifs');
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
        const wind = weather.hourly.windspeed_10m[idx];
        const dir = windDirection(weather.hourly.winddirection_10m[idx]);
        const bft = bftFromKmh(wind);
        const value = Math.max(1, getScore({
          weathercode: code,
          temperature: weather.hourly.temperature_2m[idx],
          windspeed: wind,
          precipitation_probability: weather.hourly.precipitation_probability[idx]
        }));
        
        const info = getScoreInfo(value);
        
        container.innerHTML += `
          <div class="hourly-item">
            <div class="hourly-time">${formatTime(time)}</div>
            <div class="hourly-icon">${icon}</div>
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

    const updateWeather = async () => {
      try {
        const location = await getLocation();
        if (isCancelled) return;

        const placeName = location.label || await reverseGeo(location.latitude, location.longitude);
        if (isCancelled) return;
        setText('weather-location', placeName);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Amsterdam';
        const weather = await fetchWeather(location.latitude, location.longitude, timezone);
        if (isCancelled) return;

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

        // Top Badge bijwerken met tekst en kleur!
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

        const loader = document.getElementById('weather-loading');
        if (loader) loader.style.display = 'none';
      } catch (error) {
        console.error(error);
        showFetchError('Kon het weer niet laden. Check je verbinding.');
      }
    };

    updateWeather();

    return () => { isCancelled = true; };
  }
};