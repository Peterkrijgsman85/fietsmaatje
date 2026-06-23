export const page = {
  html: `
    <div class="weather-page">
      <style>
        .weather-page {
          position: fixed;
          inset: 0;
          overflow: auto;
          background: linear-gradient(160deg, #0f2c5a 0%, #0f2c5a 24%, #1a4a8a 100%);
          color: white;
          padding: 24px 16px 120px;
          display: flex;
          justify-content: center;
        }

        .weather-screen {
          width: min(100%, 820px);
          display: grid;
          gap: 20px;
          align-content: start;
        }

        .weather-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          padding: 22px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.18);
        }

        .weather-hero {
          display: grid;
          gap: 18px;
        }

        .weather-headline {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
        }

        .weather-title {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .weather-title small {
          font-size: 12px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .weather-title h1 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 0.9;
          margin: 0;
        }

        .weather-hero-grid {
          display: grid;
          grid-template-columns: minmax(180px, 1.1fr) minmax(240px, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .weather-icon-panel {
          display: grid;
          gap: 10px;
          justify-items: center;
          align-content: center;
          padding: 28px 24px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          text-align: center;
        }

        .weather-icon-large {
          font-size: clamp(4.2rem, 9vw, 6.8rem);
          line-height: 0.9;
        }

        .weather-temp {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1;
        }

        .weather-caption {
          opacity: 0.78;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .weather-stats-card {
          display: grid;
          gap: 12px;
          padding: 22px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
        }

        .stat-row span {
          opacity: 0.8;
          font-size: 0.92rem;
        }

        .stat-row strong {
          font-size: 1.05rem;
          line-height: 1.2;
        }

        .summary-item span {
          font-size: 0.82rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .weather-score {
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 800;
          line-height: 0.95;
        }

        .weather-type {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          font-weight: 700;
          letter-spacing: 0.05em;
        }


        .hourly-section {
          display: grid;
          gap: 16px;
        }

        .hourly-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .hourly-label h2 {
          margin: 0;
          font-size: 1rem;
          opacity: 0.88;
        }

        .hourly-scroll {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(120px, 1fr);
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          scroll-snap-type: x mandatory;
        }

        .hourly-card {
          scroll-snap-align: start;
          min-width: 120px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 16px;
          display: grid;
          gap: 10px;
        }

        .hourly-card time {
          font-size: 0.82rem;
          opacity: 0.75;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hourly-card strong {
          font-size: 1.1rem;
          display: block;
        }

        .hourly-card .small {
          font-size: 0.82rem;
          opacity: 0.78;
          line-height: 1.4;
        }

        .advice-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 22px;
          display: grid;
          gap: 16px;
        }

        .advice-card h2 {
          margin: 0;
          font-size: 1rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .advice-list {
          display: grid;
          gap: 12px;
        }

        .advice-pill {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          min-height: 56px;
          padding: 16px 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .advice-pill strong {
          display: block;
          font-size: 0.98rem;
          line-height: 1.2;
        }

        .advice-pill span {
          opacity: 0.78;
          font-size: 0.87rem;
        }

        .loading-overlay {
          display: grid;
          justify-items: center;
          gap: 12px;
          text-align: center;
          padding: 32px 0;
          opacity: 0.95;
        }

        .loading-overlay p {
          max-width: 520px;
          opacity: 0.82;
          line-height: 1.7;
        }

        .error-note {
          color: #ffd7a9;
          opacity: 0.95;
        }
      </style>

      <div class="weather-screen">
        <section class="weather-card weather-hero">
          <div class="weather-headline">
            <div class="weather-title">
              <small>Fietsmaatje weer</small>
              <h1 id="weather-location">Locatie laden...</h1>
            </div>
          </div>

          <div class="weather-hero-grid">
            <div class="weather-icon-panel">
              <div class="weather-icon-large" id="weather-icon">⏳</div>
              <div class="weather-temp" id="temperature">–°C</div>
              <div class="weather-caption" id="weather-caption">Weer laden</div>
            </div>
            <div class="weather-stats-card">
              <div class="stat-row">
                <span>Fietscijfer</span>
                <strong id="bike-score">–</strong>
              </div>
              <div class="stat-row">
                <span>Gevoel</span>
                <strong id="feels-like">–</strong>
              </div>
              <div class="stat-row">
                <span>WBGT</span>
                <strong id="wbgt">–</strong>
              </div>
              <div class="stat-row">
                <span>Wind</span>
                <strong id="wind-info">–</strong>
              </div>
            </div>
          </div>

          <div class="loading-overlay" id="weather-loading">
            <div>🌦️ Weerdata ophalen…</div>
            <p>Het weer wordt geladen op basis van je GPS-locatie en Open-Meteo. Even geduld, dan zie je straks het fiets-cijfer, wind en een kledingadvies.</p>
          </div>
        </section>

        <section class="weather-card hourly-section">
          <div class="hourly-label">
            <h2>Komend 24 uur</h2>
            <span id="hourly-note">Scroll om te zien</span>
          </div>
          <div class="hourly-scroll" id="hourly-scroll"></div>
        </section>

        <section class="weather-card advice-card">
          <h2>Wielren kledingadvies</h2>
          <div class="advice-list" id="advice-list">
            <div class="advice-pill">
              <strong>Even wachten...</strong>
              <span>Advies verschijnt hier.</span>
            </div>
          </div>
        </section>
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

    const reverseGeo = async (lat, lon) => {
      const cleanName = name => (name || 'Onbekende locatie').replace(/,\s*[A-Z]{2,3}$/i, '').trim();

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
      const response = await fetch(url.toString());
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Weather fetch failed: ${response.status} ${body}`);
      }
      return response.json();
    };

    const renderHourly = (weather, score) => {
      const container = document.getElementById('hourly-scroll');
      if (!container) return;
      container.innerHTML = '';
      const now = new Date();
      const baseIndex = weather.hourly.time.findIndex(t => new Date(t).getTime() >= now.getTime());
      const startIndex = baseIndex >= 0 ? baseIndex : 0;
      const slice = weather.hourly.time.slice(startIndex, startIndex + 24);
      slice.forEach((time, offset) => {
        const idx = startIndex + offset;
        const code = weather.hourly.weathercode[idx];
        const icon = icons[code] ? icons[code][0] : '❔';
        const desc = icons[code] ? icons[code][1] : 'Onbekend weer';
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
            <time>${formatTime(time)}</time>
            <strong>${value}/10</strong>
            <span class="small">${icon} ${desc}</span>
            <span class="small">${dir} ${bft} Bft</span>
          </article>
        `;
      });
    };

    const renderAdvice = advice => {
      const list = document.getElementById('advice-list');
      if (!list) return;
      list.innerHTML = advice.map(line => `
        <div class="advice-pill">
          <strong>${line}</strong>
          <span>Tip</span>
        </div>
      `).join('');
    };

    const formatWbgt = (temperature, humidity) => {
      const T = temperature;
      const RH = Math.max(0, Math.min(100, humidity));
      const gamma = Math.log(RH / 100) + (17.62 * T) / (243.12 + T);
      const dewPoint = 243.12 * gamma / (17.62 - gamma);
      const tw = T * Math.atan(0.151977 * Math.sqrt(RH + 8.313659)) +
        Math.atan(T + RH) -
        Math.atan(RH - 1.676331) +
        0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
        4.686035;
      const wbgt = 0.7 * tw + 0.3 * T;
      return Math.round(wbgt);
    };

    const showFetchError = message => {
      const loader = document.getElementById('weather-loading');
      if (loader) {
        loader.innerHTML = `<div class="error-note">⚠️ ${message}</div>`;
        loader.style.display = 'grid';
      }
    };

    const updateWeather = async () => {
      try {
        const location = await getLocation();
        if (isCancelled) return;

        const placeName = location.label || await reverseGeo(location.latitude, location.longitude);
        if (isCancelled) return;
        setText('weather-location', `📍 ${placeName}`);
        setText('geo-name', placeName);

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
      const wbgtValue = formatWbgt(current.temperature, humidity);
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
      setText('wind-info', `${windDir} · ${Math.round(current.windspeed)} km/h · ${bft} Bft`);
      setText('weather-description', description);
      setText('short-advice', advice[0]);

      renderHourly(weather, score);
      renderAdvice(advice);

      const loader = document.getElementById('weather-loading');
      if (loader) loader.style.display = 'none';
    } catch (error) {
      console.error(error);
      showFetchError('Kon het weer niet laden. Controleer je internetverbinding of probeer later opnieuw.');
    }
  };

    updateWeather();

    return () => {
      isCancelled = true;
    };
  }
};
