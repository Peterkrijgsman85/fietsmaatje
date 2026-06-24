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

      /* Knoppen en Sliders Styling */
      .press-btn-opt { background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(15, 44, 90, 0.1); padding: 14px 10px; border-radius: 16px; font-size: 0.9rem; font-weight: 600; color: #0f2c5a; text-align: center; cursor: pointer; }
      .press-btn-opt.active { background: #0f2c5a; color: white; }
      input[type=range]::-webkit-slider-thumb { appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #0f2c5a; cursor: pointer; }
    </style>

    <div class="pressure-page" style="
      position: relative;
      width: 100%;
      padding: 10px 16px 150px; /* HIER ZIT DE FIX: Verhoogd naar 150px voor ademruimte boven het menu */
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2c5a;
    ">
      <div style="text-align: center; margin: 10px 0 24px 0;">
        <h1 style="font-size: 1.8rem; font-weight: 700; color: #0f2c5a; margin: 0 0 4px 0;">Bandenspanning</h1>
        <p style="font-size: 0.95rem; color: rgba(15, 44, 90, 0.6); font-weight: 500;">Optimale druk voor jouw banden</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 24px; padding: 18px; box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04); margin-bottom: 20px;">
        <span style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 12px; display: block;">Type Rit</span>
        <div id="press-style-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
          <div class="press-btn-opt active" data-value="1.0">🚲 Weg</div>
          <div class="press-btn-opt" data-value="0.92">🏜️ Gravel</div>
          <div class="press-btn-opt" data-value="0.82">🌲 MTB</div>
          <div class="press-btn-opt" data-value="0.75">📉 Downhill</div>
        </div>
        
        <span style="font-size: 0.75rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); text-transform: uppercase; margin-bottom: 12px; display: block;">Condities</span>
        <div id="press-surf-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <div class="press-btn-opt active" data-value="1.0">☀️ Droog</div>
          <div class="press-btn-opt" data-value="0.92">🌧️ Nat</div>
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 24px; padding: 18px; box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04); margin-bottom: 20px;">
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">Systeemgewicht <span id="press-valW" style="background: rgba(15,44,90,0.08); padding: 2px 8px; border-radius: 8px;">85 kg</span></div>
          <input type="range" id="press-weightIn" style="width: 100%; height: 6px; background: rgba(15,44,90,0.1); border-radius: 3px; appearance: none;" min="40" max="140" value="85">
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">Bandbreedte <span id="press-valB" style="background: rgba(15,44,90,0.08); padding: 2px 8px; border-radius: 8px;">28 mm</span></div>
          <input type="range" id="press-brIn" style="width: 100%; height: 6px; background: rgba(15,44,90,0.1); border-radius: 3px; appearance: none;" min="23" max="65" value="28">
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <div style="flex: 1; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 20px; padding: 16px; text-align: center;">
          <div id="press-resV" style="font-size: 2rem; font-weight: 800;">--</div>
          <div style="font-size: 0.65rem; font-weight: 800; color: rgba(15,44,90,0.5); text-transform: uppercase;">Bar Voor</div>
        </div>
        <div style="flex: 1; background: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 20px; padding: 16px; text-align: center;">
          <div id="press-resA" style="font-size: 2rem; font-weight: 800;">--</div>
          <div style="font-size: 0.65rem; font-weight: 800; color: rgba(15,44,90,0.5); text-transform: uppercase;">Bar Achter</div>
        </div>
      </div>
    </div>
  `,

  init() {
    let tireStyle = 1.0;
    let tireSurf = 1.0;

    const weightSlider = document.getElementById('press-weightIn');
    const widthSlider = document.getElementById('press-brIn');
    const valWLabel = document.getElementById('press-valW');
    const valBLabel = document.getElementById('press-valB');
    const resVEl = document.getElementById('press-resV');
    const resAEl = document.getElementById('press-resA');
    
    const styleButtons = document.querySelectorAll('#press-style-grid .press-btn-opt');
    const surfButtons = document.querySelectorAll('#press-surf-grid .press-btn-opt');

    const savedWeight = localStorage.getItem('weight');
    const savedWidth = localStorage.getItem('width');
    
    if (savedWeight) {
      weightSlider.value = savedWeight;
    }
    if (savedWidth) {
      widthSlider.value = savedWidth;
    }

    const updateTires = (saveToStorage = true) => {
      const w = parseInt(weightSlider.value);
      const b = parseInt(widthSlider.value);
      
      valWLabel.innerText = `${w} kg`;
      valBLabel.innerText = `${b} mm`;
      
      if (saveToStorage) {
        localStorage.setItem('weight', w);
        localStorage.setItem('width', b);
      }

      let res = ((w / 16) * Math.pow(28 / b, 1.15) * tireStyle * tireSurf);
      
      const rearPressure = Math.max(res, 0.8);
      const frontPressure = rearPressure * 0.92;

      resAEl.innerText = rearPressure.toFixed(1);
      resVEl.innerText = frontPressure.toFixed(1);
    };

    styleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tireStyle = parseFloat(btn.getAttribute('data-value'));
        updateTires(true);
      });
    });

    surfButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        surfButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tireSurf = parseFloat(btn.getAttribute('data-value'));
        updateTires(true);
      });
    });

    weightSlider.addEventListener('input', () => updateTires(true));
    widthSlider.addEventListener('input', () => updateTires(true));

    updateTires(false);
  }
};