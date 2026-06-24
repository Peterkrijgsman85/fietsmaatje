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
      }
    </style>

    <div class="fuel-page" style="
      position: relative;
      width: 100%;
      min-height: 100vh;
      padding: 10px 16px 150px; /* HIER ZIT DE FIX: Verhoogd naar 150px voor ademruimte boven het menu */
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2c5a;
    ">
      <div style="max-width: 420px; width: 100%; margin: 0 auto;">
        
        <div style="text-align: center; margin: 20px 0 24px 0;">
          <h1 style="font-size: 1.8rem; font-weight: 700; margin: 0;">Voeding Planner</h1>
          <p style="font-size: 0.95rem; color: rgba(15, 44, 90, 0.6); font-weight: 500; margin-top: 4px;">Wat neem je mee voor je rit?</p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 24px; padding: 20px; box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);">
          
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 0.85rem; font-weight: 700; color: rgba(15, 44, 90, 0.6);">Geplande duur</span>
              <span style="font-weight: 800; font-size: 1.1rem;"><b id="valDur">2.0</b> uur</span>
            </div>
            <input type="range" id="durIn" min="0.5" max="8" step="0.5" value="2" style="width: 100%; accent-color: #0f2c5a;">
          </div>

          <div style="display:flex; gap:12px; margin-bottom: 20px;">
            <div style="flex:1; background:rgba(255,255,255,0.6); padding:16px; border-radius:18px; text-align:center; border: 1px solid rgba(15,44,90,0.05);">
              <div id="resCarbs" style="font-weight:800; font-size: 1.4rem;">--</div>
              <div style="font-size: 0.65rem; font-weight: 700; color:rgba(15,44,90,0.5); letter-spacing: 0.5px;">GRAM KH</div>
            </div>
            <div style="flex:1; background:rgba(255,255,255,0.6); padding:16px; border-radius:18px; text-align:center; border: 1px solid rgba(15,44,90,0.05); position: relative;">
  
              <span style="position: absolute; top: 10px; right: 10px; cursor: help; font-size: 0.6rem; border: 1px solid rgba(15,44,90,0.2); border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; color: rgba(15,44,90,0.4);" title="Berekening gebaseerd op een standaard bidon van 650ml">i</span>

              <div id="resBottles" style="font-weight:800; font-size: 1.4rem;">--</div>
              <div style="display: flex; justify-content: center; align-items: center; gap: 4px;">
                <div id="bottleSub" style="font-size: 0.65rem; font-weight: 700; color:rgba(15,44,90,0.5); letter-spacing: 0.5px;">BIDONS</div>
              </div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 8px;">Eet-Strategie</div>
            <div id="fuelTimeline" style="font-size: 0.85rem; color: #0f2c5a; background: rgba(15, 44, 90, 0.05); padding: 14px; border-radius: 16px; line-height: 1.5;"></div>
          </div>

          <div style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 8px;">Voorraad (Mix naar smaak)</div>
          <ul id="fuelBreakdown" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;"></ul>
        </div>
      </div>
    </div>
  `,

  init() {
    const durIn = document.getElementById('durIn');
    const valDur = document.getElementById('valDur');
    const resCarbs = document.getElementById('resCarbs');
    const resBottles = document.getElementById('resBottles');
    const bottleSub = document.getElementById('bottleSub');
    const fuelTimeline = document.getElementById('fuelTimeline');
    const fuelBreakdown = document.getElementById('fuelBreakdown');

    // === Temperatuur ophalen uit de cache van weer.js ===
    let currentTemp = 20; 
    const cachedWeather = localStorage.getItem('fietsmaatje_weather_cache');
    
    if (cachedWeather) {
      try {
        const parsed = JSON.parse(cachedWeather);
        if (parsed.weather && parsed.weather.current_weather) {
          currentTemp = Math.round(parsed.weather.current_weather.temperature);
          console.log(`Planner: Gebruik actuele temperatuur van ${currentTemp}°C`);
        }
      } catch (e) {
        console.warn('Kon cache niet lezen, standaard temp 20°C');
      }
    }

    const getHydrationFactor = (temp) => {
      if (temp > 25) return 1.5;
      if (temp > 20) return 1.25;
      return 1.0;
    };

    const updateFuel = () => {
      const dur = parseFloat(durIn.value);
      valDur.innerText = dur.toFixed(1);
      
      let totalCarbs = 0;
      let timelineHtml = "";

      if (dur <= 1.0) {
        totalCarbs = 0;
        timelineHtml = "<b>0-60 min:</b> Geen extra voeding nodig, blijf goed drinken.";
      } else if (dur <= 2.0) {
        totalCarbs = Math.round((dur - 1) * 30);
        timelineHtml = "<b>0-60 min:</b> Water drinken.<br><b>60 min+:</b> Start met 30g koolhydraten per uur (reep of banaan).";
      } else {
        totalCarbs = 30 + Math.round((dur - 2) * 40);
        timelineHtml = "<b>0-60 min:</b> Water drinken.<br><b>60-120 min:</b> 30g koolhydraten (reep/krentenbol).<br><b>120 min+:</b> Verhoog naar 40g per uur (voeg gel toe indien nodig).";
      }

      const mlPerHour = 500;
      const factor = getHydrationFactor(currentTemp);
      const totalVolumeMl = dur * mlPerHour * factor;
      const bottles = Math.ceil(totalVolumeMl / 650);

      resCarbs.innerText = totalCarbs;
      resBottles.innerText = bottles;
      bottleSub.innerText = `BIDONS (bij ${currentTemp}°C)`;
      fuelTimeline.innerHTML = timelineHtml;

      if (totalCarbs > 0) {
        const bananen = Math.ceil(totalCarbs / 25);
        const krent = Math.ceil(totalCarbs / 25);
        const repen = Math.ceil(totalCarbs / 30);
        const gels = Math.ceil(totalCarbs / 25);

        fuelBreakdown.innerHTML = [
          {n: '🍌 Bananen', v: bananen},
          {n: '🍞 Krentenbollen', v: krent},
          {n: '🍫 Energierepen', v: repen},
          {n: '🧪 Gels', v: gels}
        ].map(item => `
          <li style="display:flex; justify-content:space-between; background:rgba(255,255,255,0.4); padding:10px 14px; border-radius:10px; font-size: 0.9rem;">
            <span>${item.n}</span>
            <b style="color: #0f2c5a;">${item.v} stuks</b>
          </li>
        `).join('');
      } else {
        fuelBreakdown.innerHTML = `<li style="padding:10px; text-align:center; color:rgba(15,44,90,0.5);">Geen extra voeding nodig.</li>`;
      }
    };

    durIn.addEventListener('input', updateFuel);
    updateFuel();
  }
};