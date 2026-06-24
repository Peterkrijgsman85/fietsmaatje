export const page = {
  html: `
    <div class="log-page" style="
      position: relative;
      width: 100%;
      padding: 10px 16px 110px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2c5a;
    ">
      <div style="text-align: center; margin: 10px 0 24px 0;">
        <h1 style="font-size: 1.8rem; font-weight: 700; margin: 0 0 4px 0;">Weerbericht Generator</h1>
        <p style="font-size: 0.95rem; color: rgba(15, 44, 90, 0.6); font-weight: 500;">Voor je Strava of Komoot verslag</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 24px; padding: 18px; box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04); margin-bottom: 20px;">
        <span style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 12px; display: block;">Rit Type</span>
        <div class="log-grid-switch" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
          <div class="log-btn-opt active" data-mode="single">🔄 Rondje</div>
          <div class="log-btn-opt" data-mode="route">🏁 A naar B</div>
        </div>

        <input type="text" id="log-locA" placeholder="Startlocatie (bijv. Utrecht)..." style="width: 100%; box-sizing: border-box; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(15, 44, 90, 0.15); padding: 14px; border-radius: 14px; margin-bottom: 12px; font-size: 1rem;">
        
        <div id="log-routeFields" style="display:none;">
          <input type="text" id="log-locB" placeholder="Eindlocatie (bijv. Arnhem)..." style="width: 100%; box-sizing: border-box; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(15, 44, 90, 0.15); padding: 14px; border-radius: 14px; margin-bottom: 12px; font-size: 1rem;">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <input type="date" id="log-dateIn" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(15, 44, 90, 0.15); padding: 14px; border-radius: 14px; font-size: 1rem;">
          <input type="time" id="log-timeIn" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(15, 44, 90, 0.15); padding: 14px; border-radius: 14px; font-size: 1rem;">
        </div>

        <button id="log-generateBtn" style="width: 100%; background: #0f2c5a; color: white; border: none; padding: 16px; border-radius: 16px; font-size: 1rem; font-weight: 700; cursor: pointer;">Genereer Bericht ✨</button>
        <div id="log-loader" style="display: none; text-align: center; padding: 16px; color: rgba(15, 44, 90, 0.6); font-weight: 600;">Data ophalen... ☁️</div>
      </div>

      <div id="log-resultArea" style="display:none;">
        <span style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 12px; display: block;">Klik om te kopiëren</span>
        <div class="log-res-card" id="log-card-res1" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 18px; padding: 16px; margin-bottom: 12px; cursor: pointer;">
          <span style="font-size: 0.65rem; font-weight: 800; background: rgba(15, 44, 90, 0.08); padding: 3px 8px; border-radius: 6px; display: inline-block; margin-bottom: 8px;">KORT ⚡</span>
          <span id="log-res1" class="log-copy-t" style="display: block; font-size: 0.95rem; line-height: 1.5;"></span>
        </div>
        <div class="log-res-card" id="log-card-res2" style="background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 18px; padding: 16px; cursor: pointer;">
          <span style="font-size: 0.65rem; font-weight: 800; background: rgba(15, 44, 90, 0.08); padding: 3px 8px; border-radius: 6px; display: inline-block; margin-bottom: 8px;">UITGEBREID 📝</span>
          <span id="log-res2" class="log-copy-t" style="display: block; font-size: 0.95rem; line-height: 1.5;"></span>
        </div>
      </div>

      <style>
        .log-btn-opt { background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(15, 44, 90, 0.1); padding: 12px 10px; border-radius: 14px; font-size: 0.9rem; font-weight: 600; text-align: center; cursor: pointer; }
        .log-btn-opt.active { background: #0f2c5a; color: white; }
      </style>
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
      
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&start_date=${date}&end_date=${date}&timezone=auto`);
      const wd = await weatherRes.json();
      const hour = parseInt(time.split(':')[0]);
      
      const getBft = (kmh) => {
        if (kmh < 2) return 0; if (kmh < 6) return 1; if (kmh < 12) return 2;
        if (kmh < 20) return 3; if (kmh < 29) return 4; if (kmh < 39) return 5;
        if (kmh < 50) return 6; if (kmh < 62) return 7; return 8;
      };

      const calculateWBGT = (t, rh) => {
        return Math.round(0.567 * t + 0.393 * (rh / 100 * 6.105 * Math.exp(17.27 * t / (237.7 + t))) + 3.94);
      };

      const temp = wd.hourly.temperature_2m[hour];
      const rh = wd.hourly.relative_humidity_2m[hour];
      const kmh = Math.round(wd.hourly.wind_speed_10m[hour]);

      return {
        t: Math.round(temp),
        wbgt: calculateWBGT(temp, rh),
        c: wd.hourly.weather_code[hour],
        wKmh: kmh,
        bft: getBft(kmh),
        wd: ['N','NO','O','ZO','Z','ZW','W','NW'][Math.round(wd.hourly.wind_direction_10m[hour]/45)%8]
      };
    };

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
          r1 = `${getCondIcon(wA.c)} ${wA.t}°C (WBGT: ${wA.wbgt}°C) | 🌬️ Wind: ${wA.wd} ${wA.wKmh} km/u (${wA.bft} Bft)`;
          r2 = `📊 Ritverslag: ${getCondIcon(wA.c)} ${getCondStr(wA.c)}e rit bij ${wA.t}°C (gevoels/WBGT: ${wA.wbgt}°C). Er stond een windkracht van ${wA.bft} Bft uit ${windDirFull} (${wA.wKmh} km/u). 🚲`;
        
        } else {
          const locBVal = locBInput.value.trim();
          if (!locBVal) throw new Error("Vul een eindlocatie in");
          
          const wB = await fetchWeatherForLog(locBVal);
          const windDirFinish = windMap[wB.wd] || wB.wd;
          r1 = `${getCondIcon(wB.c)} ${locAVal} ➔ ${locBVal} | Temp: ${wA.t}°C ➔ ${wB.t}°C (WBGT: ${wB.wbgt}°C) | Wind: ${wB.wd} ${wB.wKmh} km/u (${wB.bft} Bft)`;
          r2 = `🏁 Van ${locAVal} naar ${locBVal}: Vertrokken met ${wA.t}°C en aangekomen met ${wB.t}°C (${getCondStr(wB.c).toLowerCase()}, WBGT: ${wB.wbgt}°C). Bij de finish waaide het ${wB.wKmh} km/u (${wB.bft} Bft) vanuit ${windDirFinish}.`;
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