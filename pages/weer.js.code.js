export const page = {
  html: `
    <div class="weather-page">
      <style>
        .weather-page {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(160deg, #0f2c5a 0%, #0f2c5a 24%, #1a4a8a 100%);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 0;
          padding-top: env(safe-area-inset-top, 0);
          padding-bottom: calc(env(safe-area-inset-bottom, 0) + 100px);
        }

        .weather-hero-section {
          display: flex;
          justify-content: center;
          padding: 18px 12px;
          flex-shrink: 0;
        }

        .weather-main-card {
          width: min(100%, 760px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 28px;
          padding: 16px;
          display: grid;
          grid-template-columns: 1fr minmax(140px, 260px);
          gap: 12px;
          align-items: center;
          position: relative;
          backdrop-filter: blur(12px);
        }

        .score-badge {
          display: inline-block;
          background: #ff5a00;
          color: white;
          font-weight: 800;
          border-radius: 12px;
          padding: 6px 10px;
          font-size: 0.95rem;
          box-shadow: 0 6px 18px rgba(255,90,0,0.18);
          margin-bottom: 8px;
        }

        .weather-left-panel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          text-align: left;
          padding-left: 8px;
        }

        .weather-location {
          font-size: 0.85rem;
          opacity: 0.85;
          letter-spacing: 0.05em;
        }

        .weather-icon-large {
          font-size: 4.2rem;
          line-height: 1;
          margin: 0 0 6px 0;
        }

        .weather-temp-main {
          font-size: 2.4rem;
          font-weight: 900;
          line-height: 1;
        }

        .weather-description {
          font-size: 0.8rem;
          opacity: 0.82;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        

        .weather-stats-card {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          padding: 14px 16px;
          display: grid;
          gap: 10px;
          backdrop-filter: blur(10px);
        }

        .stat-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .stat-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .stat-emoji {
          font-size: 1rem;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .weather-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 0 16px;
          flex: 1;
        }

        .section-title {
          font-size: 0.85rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0;
          padding: 0;
          margin-top: 8px;
        }

        .hourly-scroll {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 90px;
          gap: 8px;
          overflow-x: auto;
          padding: 2px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .hourly-card {
          position: relative;
          scroll-snap-align: start;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 11px 10px;
          display: grid;
          gap: 6px;
          text-align: center;
          min-width: 90px;
          font-size: 0.8rem;
        }
        

        .hourly-score-pill {
          display: inline-block;
          background: #ff5a00;
          color: white;
          font-weight: 800;
          border-radius: 10px;
          padding: 6px 8px;
          font-size: 0.88rem;
          box-shadow: 0 6px 12px rgba(255,90,0,0.12);
          margin: 4px auto 0 auto;
        }

        .hourly-time {
          opacity: 0.65;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hourly-score {
          font-size: 1rem;
          font-weight: 700;
        }

        .hourly-icon {
          font-size: 1.6rem;
        }

        .hourly-detail {
          opacity: 0.8;
          font-size: 0.7rem;
        }

        .advice-item {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 13px;
          font-size: 0.92rem;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .advice-emoji {
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .advice-text {
          flex: 1;
        }

        .loading-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-direction: column;
          text-align: center;
          padding: 40px 20px;
          opacity: 0.95;
        }

        .loading-overlay p {
          font-size: 0.85rem;
          opacity: 0.8;
          max-width: 280px;
          line-height: 1.5;
        }

        .error-note {
          color: #ffd7a9;
          opacity: 0.95;
        }
      </style>

      <div class="weather-hero-section">
        <div class="weather-main-card">
          <div class="weather-left-panel">
            <div class="weather-location">📍 <span id="weather-location">Locatie laden...</span></div>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="weather-icon-large" id="weather-icon">⏳</div>
              <div>
                <div class="weather-temp-main" id="temperature">–°</div>
                <div class="weather-description" id="weather-caption">Weer laden...</div>
              </div>
            </div>
          </div>

          <div>
              <div style="display:flex; justify-content:flex-end;">
                <div class="score-badge" id="bike-score-badge">🚴 <span id="bike-score-display">–</span></div>
              </div>
              <div class="weather-stats-card">
              <div class="stat-line">
                <span class="stat-label">
                  <span class="stat-emoji">🌡</span>
                    Gevoel
                </span>
                <span class="stat-value" id="feels-like">–</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">
                  <span class="stat-emoji">🔥</span>
                    WBGT
                </span>
                <span class="stat-value" id="wbgt">–</span>
              </div>
              <div class="stat-line">
                <span class="stat-label">
                  <span class="stat-emoji">💨</span>
                  Wind
                </span>
                <span class="stat-value" id="wind-info">–</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="weather-sections">
        <div id="weather-loading" class="loading-overlay">
          <div style="font-size: 2.4rem;">🌦️</div>
          <p>Even geduld, je weer wordt opgehaald…</p>
        </div>

        <div id="hourly-section" style="display: none;">
          <h2 class="section-title">⏰ Komend 24 uur</h2>
          <div class="hourly-scroll" id="hourly-scroll"></div>
        </div>

        <div id="advice-section" style="display: none;">
          <h2 class="section-title">👕 Kledingadvies</h2>
          <div id="advice-list" style="display: grid; gap: 10px;"></div>
        </div>
      </div>
    </div>
  `,

  init() {
    let isCancelled = false;

    const icons = {
      0: ['☀️', 'Zonnig'],
      1: ['🌤', 'Grotendeels zonnig'],
      2: ['⛅️', 'Half bewolkt'],
      3: ['☁️', 'Bewolkt'],
      45: ['🌫', 'Mistig'],
      48: ['🌫', 'Dichte mist'],
      51: ['🌦', 'Lichte motregen'],
      53: ['🌦', 'Motregen'],
      55: ['🌧', 'Dikke motregen'],
      56: ['🌧', 'IJzige motregen'],
      57: ['🌧', 'IJzige motregen'],
      61: ['🌦', 'Lichte regen'],
      63: ['🌧', 'Regen'],
      65: ['🌧', 'Zware regen'],
      66: ['🌧', 'IJzige regen'],
      67: ['🌧', 'IJzige regen'],
      71: ['🌨', 'Sneeuw'],
      73: ['🌨', 'Zware sneeuw'],
      75: ['🌨', 'Sneeuwval'],
      77: ['🌨', 'Sneeuwkorrels'],
      80: ['⛈', 'Buien'],
      81: ['⛈', 'Stevige buien'],
      82: ['⛈', 'Zware buien'],
      85: ['❄️', 'Sneeuwbuien'],
      86: ['❄️', 'Zware sneeuwbuien'],
      95: ['🌩', 'Onweer'],
      96: ['⛈', 'Onweer met hagel'],
      99: ['⛈', 'Ernstig onweer']
    };

    const adviceEmojis = {
      thermo: '❄️',
      long: '👕',
      short: '👖',
      wind: '💨',
      rain: '🌧',
      windchill: '❄️',
      storm: '⚠️',
      default: '✨'
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
      score -= Math.max(0, Math.abs(temperature - 18) / 4);
      score -= Math.min(3, windspeed / 14);
      score -= Math.min(2, precipitation_probability / 15);
      return Math.max(1, Math.round(score));
    };

    const getAdvice = ({ temperature, feels_like, windspeed, weathercode, precipitation_probability }) => {
      const advice = [];
      
      if (temperature <= 8) {
        advice.push({ emoji: adviceEmojis.thermo, text: 'Lange thermo + winddichte jas' });
      } else if (temperature <= 14) {
        advice.push({ emoji: adviceEmojis.long, text: 'Lange mouwen en een licht jack' });
      } else if (temperature <= 20) {
        advice.push({ emoji: adviceEmojis.short, text: 'Korte mouwen met een licht vest' });
      } else {
        advice.push({ emoji: adviceEmojis.short, text: 'Korte mouwen en korte broek' });
      }

      if (windspeed >= 30) {
        advice.push({ emoji: adviceEmojis.wind, text: 'Let op wind: lagere versnelling kiezen' });
      }
      if (precipitation_probability >= 40) {
        advice.push({ emoji: adviceEmojis.rain, text: 'Regenkleding of spatborden aan' });
      }
      if (feels_like < temperature - 3) {
        advice.push({ emoji: adviceEmojis.windchill, text: 'Extra laag mee nemen' });
      }
      if ([95,96,99].includes(weathercode)) {
        advice.push({ emoji: adviceEmojis.storm, text: 'Paarse flags: uitstel aanbevolen' });
      }
      
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
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=nl`);
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length) {
            const place = data.results[0];
            return cleanName(place.name || place.address?.city || place.address?.town || place.address?.village || place.address?.county);
          }
        }
      } catch (e) {
        // fallback
      }

      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=nl`;
        const response = await fetch(url, { headers: { 'User-Agent': 'Fietsmaatje/1.0' } });
        if (response.ok) {
          const data = await response.json();
          const display = data.display_name || '';
          return cleanName(display.split(',')[0]);
        }
      } catch (e) {
        // fallback
      }

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
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Weather fetch failed: ${response.status} ${body}`);
      }
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
        container.innerHTML += `
          <article class="hourly-card">
            <div class="hourly-time">${formatTime(time)}</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-score-pill">${value}</div>
            <div class="hourly-detail">${dir} ${bft}Bft</div>
          </article>
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
      
      const activityMultiplier = {
        'rest': 0.4,
        'light': 0.8,
        'moderate': 1.0,
        'cycling': 1.2,
        'vigorous': 1.5
      }[activity] || 1.0;

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
        loader.style.display = 'flex';
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
        const windDir = windDirection(current.winddirection);
        const bft = bftFromKmh(current.windspeed);
        const score = getScore({
          weathercode: code,
          temperature: current.temperature,
          windspeed: current.windspeed,
          precipitation_probability: weather.hourly.precipitation_probability[weather.hourly.time.indexOf(weather.current_weather.time)] ?? 0
        });
        const currentIndex = weather.hourly.time.indexOf(weather.current_weather.time);
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
        setText('bike-score-display', score);
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

    return () => {
      isCancelled = true;
    };
  }
};
