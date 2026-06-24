export const page = {
  html: `
    <div class="log-page">
      <style>
        .log-page {
          position: relative;
          width: 100%;
          color: #1C1C1E;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 10px 16px 110px;
        }

        /* Hero Header */
        .log-hero {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 24px;
        }

        .log-hero h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0f2c5a;
          margin: 0 0 4px 0;
        }

        .log-hero .sub {
          font-size: 0.95rem;
          color: rgba(15, 44, 90, 0.6);
          font-weight: 500;
        }

        /* iOS Glazen Kaart */
        .log-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
          margin-bottom: 16px;
        }

        .log-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(15, 44, 90, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 12px 4px;
          display: block;
        }

        /* Modus Knoppen Grid */
        .log-grid-switch {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .log-btn-opt {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(15, 44, 90, 0.1);
          padding: 12px 10px;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f2c5a;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .log-btn-opt.active {
          background: #0f2c5a;
          color: white;
          border-color: #0f2c5a;
        }

        /* Inputs */
        .log-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(15, 44, 90, 0.15);
          padding: 14px;
          border-radius: 14px;
          font-size: 1rem;
          color: #0f2c5a;
          outline: none;
          margin-bottom: 12px;
          font-family: inherit;
        }
        .log-input::placeholder {
          color: rgba(15, 44, 90, 0.4);
        }

        .log-inline-route {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Actieknop */
        .log-action-btn {
          width: 100%;
          background: #fc4c02; /* Strava Oranje */
          color: white;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(252, 76, 2, 0.25);
          transition: all 0.2s ease;
        }
        .log-action-btn:active {
          transform: scale(0.98);
          opacity: 0.9;
        }

        /* Loader */
        .log-loader-text {
          display: none;
          text-align: center;
          padding: 16px;
          color: rgba(15, 44, 90, 0.6);
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Resultaat kaarten */
        .log-res-card {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 18px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          position: relative;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .log-res-card:active {
          background: rgba(255, 255, 255, 0.8);
        }

        .log-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          background: rgba(15, 44, 90, 0.08);
          color: #0f2c5a;
          padding: 3px 8px;
          border-radius: 6px;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .log-copy-t {
          display: block;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #1C1C1E;
        }

        .log-tip {
          text-align: center;
          font-size: 0.75rem;
          color: rgba(15, 44, 90, 0.4);
          font-weight: 600;
          margin-top: 4px;
        }
      </style>

      <div class="log-hero">
        <h1>Weerbericht Generator</h1>
        <span class="sub">Voor je Strava of Komoot verslag</span>
      </div>

      <div class="log-card">
        <span class="log-section-title">Rit Type</span>
        <div class="log-grid-switch">
          <div class="log-btn-opt active" data-mode="single">Rondje 🔄</div>
          <div class="log-btn-opt" data-mode="route">A naar B 🏁</div>
        </div>

        <span class="log-section-title">Details</span>
        <input type="text" id="log-locA" class="log-input" placeholder="Startlocatie (bijv. Utrecht)... 📡">
        
        <div id="log-routeFields" style="display:none;">
          <input type="text" id="log-locB" class="log-input" placeholder="Eindlocatie (bijv. Arnhem)... 📍">
        </div>

        <div class="log-inline-route">
          <input type="date" id="log-dateIn" class="log-input">
          <input type="time" id="log-timeIn" class="log-input">
        </div>

        <button id="log-generateBtn" class="log-action-btn">Genereer Bericht ✨</button>
        <div id="log-loader" class="log-loader-text">Data ophalen... ☁️</div>
      </div>

      <div id="log-resultArea" style="display:none;">
        <span class="log-section-title">Klik op een kaart om te kopiëren</span>
        
        <div class="log-res-card" id="log-card-res1">
          <div class="log-badge">KORT ⚡</div>
          <span id="log-res1" class="log-copy-t"></span>
        </div>
        
        <div class="log-res-card" id="log-card-res2">
          <div class="log-badge">UITGEBREID 📝</div>
          <span id="log-res2" class="log-copy-t"></span>
        </div>

        <div class="log-tip">Gekopieerd? Plak hem direct in je activiteit! 🙌</div>
      </div>
    </div>
  `,

  init() {
    let logMode = 'single';

    // Elementen
    const styleButtons = document.querySelectorAll('.log-grid-switch .log-btn-opt');
    const routeFields = document.getElementById('log-routeFields');
    const locAInput = document.getElementById('log-locA');
    const locBInput = document.getElementById('log-locB');
    const dateInput = document.getElementById('log-dateIn');
    const timeInput = document.getElementById('log-timeIn');
    const generateBtn = document.getElementById('log-generateBtn');
    const loader = document.getElementById('log-loader');
    const resultArea = document.getElementById('log-resultArea');
    const res1 = document.getElementById('log-res1');
    const res2 = document.getElementById('log-res2');
    const cardRes1 = document.getElementById('log-card-res1');
    const cardRes2 = document.getElementById('log-card-res2');

    // Sla automatische tijden op (Nu en Vandaag)
    const now = new Date();
    dateInput.value = now.toISOString().split('T')[0];
    timeInput.value = now.toTimeString().split(' ')[0].substring(0, 5);

    // Helpers
    const getCondStr = c => {
      if (c === 0) return "Onbewolkt";
      if (c <= 3) return "Licht bewolkt";
      if (c <= 67) return "Regenachtig";
      return "Bewolkt";
    };

    const getCondIcon = c => {
      if (c === 0) return "☀️";
      if (c <= 3) return "🌤️";
      if (c <= 67) return "🌧️";
      return "☁️";
    };

    const setupCopy = card => {
      card.addEventListener('click', () => {
        const text = card.querySelector('.log-copy-t').innerText;
        navigator.clipboard.writeText(text);
        
        // Strava Oranje visual flash effect
        card.style.borderColor = "#fc4c02";
        card.style.backgroundColor = "rgba(252, 76, 2, 0.05)";
        setTimeout(() => {
          card.style.borderColor = "rgba(255, 255, 255, 0.5)";
          card.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
        }, 800);
      });
    };

    setupCopy(cardRes1);
    setupCopy(cardRes2);

    // Modus switch (Rondje vs A naar B)
    styleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        logMode = btn.getAttribute('data-mode');
        routeFields.style.display = logMode === 'route' ? 'block' : 'none';
      });
    });

    const fetchWeatherForLog = async (loc) => {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc)}&count=1&language=nl&format=json`);
      const gd = await geoRes.json();
      if (!gd.results || !gd.results.length) throw new Error("Locatie niet gevonden: " + loc);
      
      const { latitude: lat, longitude: lon } = gd.results[0];
      const date = dateInput.value;
      const time = timeInput.value;
      
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&start_date=${date}&end_date=${date}&timezone=auto`);
      const wd = await weatherRes.json();
      const hour = parseInt(time.split(':')[0]);
      
      return {
        t: Math.round(wd.hourly.temperature_2m[hour]),
        c: wd.hourly.weather_code[hour],
        w: Math.round(wd.hourly.wind_speed_10m[hour]),
        wd: ['N','NO','O','ZO','Z','ZW','W','NW'][Math.round(wd.hourly.wind_direction_10m[hour]/45)%8]
      };
    };

    // Genereer logica
    generateBtn.addEventListener('click', async () => {
      const locAVal = locAInput.value.trim();
      if (!locAVal) return alert("Vul een startlocatie in");

      loader.style.display = 'block';
      resultArea.style.display = 'none';

      try {
        const wA = await fetchWeatherForLog(locAVal);
        const windMap = { 'N': 'het noorden', 'NO': 'het noordoosten', 'O': 'het oosten', 'ZO': 'het zuidoosten', 'Z': 'het zuiden', 'ZW': 'het zuidwesten', 'W': 'het westen', 'NW': 'het noordwesten' };

        let r1, r2;
        if (logMode === 'single') {
          const windDirFull = windMap[wA.wd] || wA.wd;
          r1 = `${getCondIcon(wA.c)} ${wA.t}°C, ${getCondStr(wA.c).toLowerCase()}. 🌬️ Wind: ${wA.wd} ${wA.w} km/u.`;
          r2 = `📊 Ritverslag: Een ${getCondStr(wA.c).toLowerCase()}e rit bij ${wA.t}°C. Er stond een windje uit ${windDirFull} (${wA.w} km/u). 🚲`;
        } else {
          const locBVal = locBInput.value.trim();
          if (!locBVal) throw new Error("Vul een eindlocatie in");
          
          const wB = await fetchWeatherForLog(locBVal);
          const windDirFinish = windMap[wB.wd] || wB.wd;
          r1 = `${getCondIcon(wB.c)} ${locAVal} ➔ ${locBVal} | ${wA.t}°C ➔ ${wB.t}°C. 🌬️ Wind: ${wB.wd} ${wB.w} km/u.`;
          r2 = `🏁 Van ${locAVal} naar ${locBVal}: Temperatuur liep van ${wA.t}°C naar ${wB.t}°C. Bij aankomst waaide het vanuit ${windDirFinish}.`;
        }

        res1.innerText = r1;
        res2.innerText = r2;
        resultArea.style.display = 'block';
      } catch (e) {
        alert(e.message);
      } finally {
        loader.style.display = 'none';
      }
    });
  }
};