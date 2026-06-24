export const page = {
  html: `
    <div class="pressure-page">
      <style>
        .pressure-page {
          position: relative;
          width: 100%;
          color: #1C1C1E;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 10px 16px 110px;
        }

        /* Hero Header */
        .press-hero {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 24px;
        }

        .press-hero h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0f2c5a;
          margin: 0 0 4px 0;
        }

        .press-hero .sub {
          font-size: 0.95rem;
          color: rgba(15, 44, 90, 0.6);
          font-weight: 500;
        }

        /* iOS Glazen Kaart */
        .press-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
          margin-bottom: 20px;
        }

        .press-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(15, 44, 90, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 12px 4px;
          display: block;
        }

        /* Knoppen & Grid */
        .press-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 8px;
        }

        .press-btn-opt {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(15, 44, 90, 0.1);
          padding: 14px 10px;
          border-radius: 16px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f2c5a;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .press-btn-opt.active {
          background: #0f2c5a;
          color: white;
          border-color: #0f2c5a;
          box-shadow: 0 4px 12px rgba(15, 44, 90, 0.15);
        }

        /* Sliders */
        .press-slider-box {
          margin-bottom: 18px;
        }
        .press-slider-box:last-child {
          margin-bottom: 4px;
        }

        .press-slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f2c5a;
          margin-bottom: 8px;
          padding: 0 4px;
        }

        .press-slider-header span {
          background: rgba(15, 44, 90, 0.08);
          padding: 2px 8px;
          border-radius: 8px;
          font-weight: 700;
        }

        .press-input-range {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(15, 44, 90, 0.1);
          outline: none;
        }

        .press-input-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 3px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.1s;
        }
        .press-input-range::-webkit-slider-thumb:active {
          transform: scale(1.15);
        }

        /* Resultaat Blokken */
        .press-res-container {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .press-res-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 16px rgba(15, 44, 90, 0.02);
          border-radius: 20px;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .press-res-val {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f2c5a;
          line-height: 1.1;
        }

        .press-res-lbl-sub {
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(15, 44, 90, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
      </style>

      <div class="press-hero">
        <h1>Bandenspanning</h1>
        <span class="sub">Optimale druk voor jouw banden</span>
      </div>

      <div class="press-card">
        <span class="press-section-title">Type Rit</span>
        <div class="press-grid" id="press-style-grid">
          <div class="press-btn-opt active" data-value="1.0">🚲 Weg</div>
          <div class="press-btn-opt" data-value="0.92">🏜️ Gravel</div>
          <div class="press-btn-opt" data-value="0.82">🌲 MTB Trail</div>
          <div class="press-btn-opt" data-value="0.75">📉 Downhill</div>
        </div>
        
        <span class="press-section-title" style="margin-top: 16px;">Condities</span>
        <div class="press-grid" id="press-surf-grid">
          <div class="press-btn-opt active" data-value="1.0">☀️ Droog</div>
          <div class="press-btn-opt" data-value="0.92">🌧️ Nat</div>
        </div>
      </div>

      <div class="press-card">
        <div class="press-slider-box">
          <div class="press-slider-header">Systeemgewicht <span id="press-valW">85 kg</span></div>
          <input type="range" id="press-weightIn" class="press-input-range" min="40" max="140" value="85">
        </div>
        
        <div class="press-slider-box">
          <div class="press-slider-header">Bandbreedte <span id="press-valB">28 mm</span></div>
          <input type="range" id="press-brIn" class="press-input-range" min="23" max="65" value="28">
        </div>
      </div>

      <div class="press-res-container">
        <div class="press-res-box">
          <span class="press-res-val" id="press-resV">--</span>
          <span class="press-res-lbl-sub">Bar Voor</span>
        </div>
        <div class="press-res-box">
          <span class="press-res-val" id="press-resA">--</span>
          <span class="press-res-lbl-sub">Bar Achter</span>
        </div>
      </div>
    </div>
  `,

  init() {
    // Interne state voor deze pagina
    let tireStyle = 1.0;
    let tireSurf = 1.0;

    // DOM Elementen selecteren
    const weightSlider = document.getElementById('press-weightIn');
    const widthSlider = document.getElementById('press-brIn');
    const valWLabel = document.getElementById('press-valW');
    const valBLabel = document.getElementById('press-valB');
    const resVEl = document.getElementById('press-resV');
    const resAEl = document.getElementById('press-resA');
    
    const styleButtons = document.querySelectorAll('#press-style-grid .press-btn-opt');
    const surfButtons = document.querySelectorAll('#press-surf-grid .press-btn-opt');

    // 1. Oude opgeslagen waarden laden uit LocalStorage (indien aanwezig)
    const savedWeight = localStorage.getItem('weight');
    const savedWidth = localStorage.getItem('width');
    
    if (savedWeight) {
      weightSlider.value = savedWeight;
    }
    if (savedWidth) {
      widthSlider.value = savedWidth;
    }

    // 2. De Rekenkern-functie
    const updateTires = (saveToStorage = true) => {
      const w = parseInt(weightSlider.value);
      const b = parseInt(widthSlider.value);
      
      // Update labels
      valWLabel.innerText = `${w} kg`;
      valBLabel.innerText = `${b} mm`;
      
      if (saveToStorage) {
        localStorage.setItem('weight', w);
        localStorage.setItem('width', b);
      }

      // Berekening op basis van jouw formule
      let res = ((w / 16) * Math.pow(28 / b, 1.15) * tireStyle * tireSurf);
      
      // Resultaten wegschrijven (minimaal 0.8 bar)
      const rearPressure = Math.max(res, 0.8);
      const frontPressure = rearPressure * 0.92;

      resAEl.innerText = rearPressure.toFixed(1);
      resVEl.innerText = frontPressure.toFixed(1);
    };

    // 3. Klik-events toewijzen aan de Type Rit knoppen
    styleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tireStyle = parseFloat(btn.getAttribute('data-value'));
        updateTires(true);
      });
    });

    // 4. Klik-events toewijzen aan de Condities knoppen
    surfButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        surfButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tireSurf = parseFloat(btn.getAttribute('data-value'));
        updateTires(true);
      });
    });

    // 5. Input-events toewijzen aan de Sliders
    weightSlider.addEventListener('input', () => updateTires(true));
    widthSlider.addEventListener('input', () => updateTires(true));

    // Initialiseer eerste berekening bij het openen van de pagina
    updateTires(false);
  }
};