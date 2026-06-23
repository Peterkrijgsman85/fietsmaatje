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

        .weather-hero-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 32px 20px 24px;
          text-align: center;
          flex-shrink: 0;
        }

        .weather-location-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 1.1rem;
          opacity: 0.92;
        }

        .weather-icon-display {
          font-size: 6rem;
          line-height: 1;
          margin: 8px 0;
        }

        .weather-temp-display {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1;
        }

        .weather-description-text {
          font-size: 0.95rem;
          opacity: 0.88;
          letter-spacing: 0.02em;
        }

        .weather-stats-row {
          display: flex;
          justify-content: space-around;
          gap: 12px;
          width: 100%;
          padding: 0 12px;
        }

        .stat-item {
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 14px 12px;
          text-align: center;
          min-width: 0;
        }

        .stat-label {
          font-size: 0.75rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
          display: block;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          display: block;
          word-break: break-word;
        }

        .weather-sections {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 0 16px;
          flex: 1;
        }

        .weather-section-title {
          font-size: 0.95rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0;
          padding: 0 4px;
          margin-top: 12px;
        }

        .hourly-scroll {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 100px;
          gap: 10px;
          overflow-x: auto;
          padding: 4px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .hourly-card {
          scroll-snap-align: start;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 12px;
          display: grid;
          gap: 8px;
          text-align: center;
          min-width: 100px;
        }

        .hourly-time {
          font-size: 0.75rem;
          opacity: 0.7;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .hourly-score {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .hourly-icon {
          font-size: 1.8rem;
        }

        .hourly-wind {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .advice-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .advice-item {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 14px;
          font-size: 0.95rem;
          line-height: 1.4;
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
          font-size: 0.9rem;
          opacity: 0.85;
          max-width: 280px;
          line-height: 1.5;
        }

        .error-note {
          color: #ffd7a9;
          opacity: 0.95;
        }
      </style>

      <div class="weather-hero-main">
        <div class="weather-location-header">
          <span>📍</span>
          <span id="weather-location">Locatie laden...</span>
        </div>
        <div class="weather-icon-display" id="weather-icon">⏳</div>
        <div class="weather-temp-display" id="temperature">–°C</div>
        <div class="weather-description-text" id="weather-caption">Weer laden...</div>
      </div>

      <div class="weather-stats-row">
        <div class="stat-item">
          <span class="stat-label">Fietscijfer</span>
          <span class="stat-value" id="bike-score">–</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Gevoel</span>
          <span class="stat-value" id="feels-like">–</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Hitte-index</span>
          <span class="stat-value" id="wbgt">–</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Wind</span>
          <span class="stat-value" id="wind-info">–</span>
        </div>
      </div>

      <div class="weather-sections">
        <div id="weather-loading" class="loading-overlay">
          <div>🌦️ Weerdata ophalen…</div>
          <p>Gebaseerd op Open-Meteo & ECMWF. Even geduld…</p>
        </div>

        <div id="hourly-section" style="display: none;">
          <h2 class="weather-section-title">Komend 24 uur</h2>
          <div class="hourly-scroll" id="hourly-scroll"></div>
        </div>

        <div id="advice-section" style="display: none;">
          <h2 class="weather-section-title">Kledingadvies</h2>
          <div class="advice-container" id="advice-list"></div>
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
      const lines = [];
      if (temperature <= 8) lines.push('Lange thermo + winddichte jas');
      else if (temperature <= 14) lines.push('Lange mouwen en een licht jack');
      else if (temperature <= 20) lines.push('Korte mouwen met een licht vest');
      else lines.push('Korte mouwen en korte broek');

      if (windspeed >= 30) lines.push('Let op wind: kies een lagere versnelling');
      if (precipitation_probability >= 40) lines.push('Regenkleding of spatborden aan');
      if (feels_like < temperature - 3) lines.push('Neem een extra laag mee');
      if ([95,96,99].includes(weathercode)) lines.push('Paarse flags: blijf binnen indien mogelijk');
      return lines.length ? lines : ['Een frisse, sportieve rit zit erin.'];
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
            <time class="hourly-time">${formatTime(time)}</time>
            <div class="hourly-score">${value}/10</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-wind">${dir} ${bft}Bft</div>
          </article>
        `;
      });
    };

    const renderAdvice = advice => {
      const list = document.getElementById('advice-list');
      const section = document.getElementById('advice-section');
      if (!list) return;
      list.innerHTML = advice.map(line => `<div class="advice-item">${line}</div>`).join('');
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
      
      return Math.round(Math.max(T - 10, adjustedWbgt));
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
        setText('bike-score', `${score}/10`);
        setText('temperature', `${Math.round(current.temperature)}°C`);
        setText('feels-like', `${Math.round(feelsLike)}°C`);
        setText('wbgt', `${wbgtValue}°C`);
        setText('wind-info', `${windDir} ${bft}Bft`);

        renderHourly(weather);
        renderAdvice(advice);

        const loader = document.getElementById('weather-loading');
        if (loader) loader.style.display = 'none';
      } catch (error) {
        console.error(error);
        showFetchError('Kon het weer niet laden. Controleer je internetverbinding.');
      }
    };

    updateWeather();

    return () => {
      isCancelled = true;
    };
  }
};
