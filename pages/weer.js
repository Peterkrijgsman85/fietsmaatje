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
        -webkit-overflow-scrolling: touch; 
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
        justify-content: space-between; /* Toegevoegd voor toggles naast titel */
        gap: 6px;
      }

      /* --- 24-UURS OVERZICHT --- */
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

      /* Uurlijkse regenstaafjes */
      .hourly-rain-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 44px;
        width: 100%;
        margin-top: 2px;
      }
      .hourly-rain-bg { 
        width: 6px; 
        height: 16px; 
        background: rgba(0, 122, 255, 0.1); 
        border-radius: 3px; 
        display: flex; 
        align-items: flex-end; 
      }
      .hourly-rain-fill { width: 100%; background: #007AFF; border-radius: 3px; }

      /* --- NIEUW: NEERSLAGGRAFIEK (BUIENALARM STIJL) --- */
      .precip-toggles {
        display: flex;
        gap: 4px;
        background: rgba(15, 44, 90, 0.08);
        padding: 4px;
        border-radius: 12px;
      }
      .precip-btn {
        background: transparent;
        border: none;
        font-size: 0.65rem;
        font-weight: 700;
        color: rgba(15, 44, 90, 0.5);
        padding: 4px 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .precip-btn.active {
        background: #FFFFFF;
        color: #0f2c5a;
        box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      }
      .precip-graph-container {
        height: 130px; 
        width: 100%; 
        position: relative; 
        margin-top: 10px;
        margin-bottom: 24px;
        display: flex; 
        align-items: flex-end; 
        gap: 2px; 
      }
      .precip-bar-wrapper {
        flex: 1; 
        height: 100%; 
        display: flex; 
        flex-direction: column; 
        justify-content: flex-end; 
        align-items: center;
        position: relative; 
      }
      .precip-bar-showers { width: 80%; background: #5E5CE6; border-radius: 2px 2px 0 0; transition: height 0.3s ease; }
      .precip-bar-rain { width: 80%; background: #007AFF; transition: height 0.3s ease; }
      .precip-bar-total { width: 80%; background: #007AFF; border-radius: 2px 2px 0 0; transition: height 0.3s ease; } 
      .precip-time-label { 
        font-size: 0.55rem; 
        color: rgba(15,44,90,0.6); 
        font-weight: 600;
        text-align: center; 
        position: absolute; 
        bottom: -20px; 
        width: 100%; 
      }
      .precip-axis-label { 
        position: absolute; 
        left: 0; 
        font-size: 0.55rem; 
        color: rgba(15,44,90,0.4); 
        border-bottom: 1px dashed rgba(15,44,90,0.15); 
        width: 100%; 
        text-align: left; 
        padding-bottom: 2px; 
        z-index: 0; 
        pointer-events: none;
      }
      .precip-legend {
        display: flex; 
        gap: 16px; 
        font-size: 0.65rem; 
        font-weight: 600;
        color: rgba(15,44,90,0.6); 
        margin-top: 8px; 
        justify-content: center;
      }

      /* --- MEERDAAGSE VERWACHTING --- */
      .daily-scroll { overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
      .daily-scroll::-webkit-scrollbar { display: none; }
      .daily-container { min-width: 450px; display: flex; flex-direction: column; gap: 12px; }
      .daily-flex-row { display: flex; flex-direction: row; justify-content: space-between; width: 100%; }
      .daily-col { flex: 1; display: flex; flex-direction: column; align-items: center; z-index: 1; text-align: center; }
      .daily-name { font-size: 0.85rem; font-weight: 700; color: #0f2c5a; line-height: 1.2; }
      .daily-date { font-size: 0.65rem; color: rgba(15, 44, 90, 0.6); font-weight: 600; margin-bottom: 2px; }
      .daily-icon { font-size: 1.5rem; line-height: 1; }

      /* Grafiek Sectie Daily */
      .daily-graph-container { position: relative; width: 100%; height: 90px; margin-top: 8px; }
      .daily-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
      .temp-dot { position: absolute; left: 50%; width: 6px; height: 6px; background: #FFF; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .dot-max { border: 2px solid #FF9500; }
      .dot-min { border: 2px solid #007AFF; }
      .temp-text { position: absolute; left: 50%; transform: translateX(-50%); font-size: 0.65rem; font-weight: 700; }
      .text-max { color: #0f2c5a; margin-top: -18px; }
      .text-min { color: rgba(15, 44, 90, 0.6); margin-top: 8px; }

      .daily-rain-container-v { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 3px; width: 100%; height: 38px; }
      .rain-bar-bg-v { width: 6px; height: 18px; background: rgba(0, 122, 255, 0.1); border-radius: 3px; display: flex; align-items: flex-end; }
      .rain-bar-fill-v { width: 100%; background: #007AFF; border-radius: 3px; }
      .daily-wind { font-size: 0.65rem; font-weight: 600; color: rgba(15, 44, 90, 0.7); margin-top: 2px; white-space: nowrap; }

      /* Advies overzicht */
      .advice-list { display: flex; flex-direction: column; gap: 8px; }
      .advice-item { display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: rgba(255, 255, 255, 0.35); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 16px; }
      .advice-emoji { font-size: 1.4rem; background: rgba(255, 255, 255, 0.6); padding: 6px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
      .advice-text { font-size: 0.9rem; font-weight: 600; color: #0f2c5a; }

      .loading-overlay { text-align: center; padding: 40px 20px; color: #8E8E93; font-weight: 500; }
      .error-note { color: #FF453A; }

      /* --- UITGEBREIDE 24-UURS DASHBOARD --- */
      .date-selector-container { 
        display: flex; gap: 4px; overflow-x: auto; padding: 4px; margin-bottom: 16px; scrollbar-width: none; -webkit-overflow-scrolling: touch; 
        background: rgba(15, 44, 90, 0.08); border-radius: 12px;
      }
      .date-selector-container::-webkit-scrollbar { display: none; }
      .date-btn { 
        flex: 0 0 auto; background: transparent; border: none; font-size: 0.7rem; font-weight: 700; color: rgba(15, 44, 90, 0.5); 
        padding: 6px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
      }
      .date-btn.active { 
        background: #FFFFFF; color: #0f2c5a; box-shadow: 0 2px 6px rgba(0,0,0,0.06); 
      }

      .graphs-interactive-wrapper { position: relative; overflow: visible; width: 100%; display: flex; flex-direction: column; gap: 14px; padding-top: 10px; }
      .graph-row { display: flex; flex-direction: column; gap: 4px; }
      .graph-label { font-size: 0.7rem; font-weight: 700; color: rgba(15, 44, 90, 0.8); text-transform: uppercase; display: flex; justify-content: space-between; }
      .graph-val-dynamic { color: #007AFF; font-weight: 800; }
      .graph-svg-container { position: relative; width: 100%; height: 65px; background: rgba(255, 255, 255, 0.25); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.4); }
      .graph-svg { width: 100%; height: 100%; overflow: visible; }
      
      .grid-line { stroke: rgba(15, 44, 90, 0.15); stroke-width: 1; stroke-dasharray: 2, 2; }
      .grid-line { stroke: rgba(15, 44, 90, 0.15); stroke-width: 1; stroke-dasharray: 2, 2; }
      
      /* Nieuwe stijl voor onvervormde labels */
      .x-axis-label { position: absolute; bottom: 2px; font-size: 0.55rem; color: rgba(15, 44, 90, 0.5); font-weight: 700; transform: translateX(-50%); pointer-events: none; }
      .y-axis-label { position: absolute; left: 4px; font-size: 0.55rem; color: rgba(15, 44, 90, 0.6); font-weight: 700; pointer-events: none; background: rgba(255,255,255,0.7); padding: 0 4px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.8); }
      .y-max { top: 4px; }
      .y-min { bottom: 14px; }

      .crosshair-line { position: absolute; top: 0; bottom: 0; width: 1px; background: transparent; border-left: 1.5px dashed #0f2c5a; pointer-events: none; z-index: 999999; transform: translateX(-50%); }
      .crosshair-tooltip { position: absolute; top: -25px; transform: translateX(-50%); background: #0f2c5a; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; pointer-events: none; white-space: nowrap; z-index: 1000000; box-shadow: 0 4px 12px rgba(15, 44, 90, 0.2); }

    </style>

    <div id="ptr-indicator" class="ptr-container">
      <div class="ptr-content" id="ptr-content">
        <span class="ptr-icon">⬇️</span> Trek om te vernieuwen
      </div>
    </div>

    <div class="weather-page">
      <button id="weer-btn-locations" style="position: absolute; top: 12px; right: 16px; background: none; border: none; cursor: pointer; z-index: 999; padding: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

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
        <div class="section-title"><span>⏰ Komende 24 uur</span></div>
        <div class="hourly-scroll" id="hourly-scroll"></div>
      </div>

      <div id="precip-section" class="card-container" style="display: none;">
        <div class="section-title">
          <span>☔️ Buienradar</span>
          <div class="precip-toggles">
            <button class="precip-btn active" data-hours="3">3u</button>
            <button class="precip-btn" data-hours="8">8u</button>
            <button class="precip-btn" data-hours="24">24u</button>
            <button class="precip-btn" data-hours="48">48u</button>
          </div>
        </div>
        <div class="precip-graph-container" id="precip-graph-container">
          </div>
        <div class="precip-legend">
          <span style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; background: #007AFF; border-radius: 2px;"></span> Continue regen
          </span>
          <span style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; background: #5E5CE6; border-radius: 2px;"></span> Buien
          </span>
        </div>
      </div>

      <div id="daily-section" class="card-container" style="display: none;">
        <div class="section-title"><span>📅 7-daagse verwachting</span></div>
        <div class="daily-scroll">
          <div class="daily-container" id="daily-list"></div>
        </div>
      </div>

      <div id="detailed-graphs-section" class="card-container" style="display: none;">
        <div class="section-title"><span>📊 Dagverloop & Details</span></div>
        
        <div class="date-selector-container" id="graph-date-selector">
          </div>

        <div class="graphs-interactive-wrapper" id="graphs-wrapper">
          <div class="graph-row">
            <div class="graph-label">Gevoelstemp. (°C) <span class="graph-val-dynamic" id="lbl-feels"></span></div>
            <div class="graph-svg-container" id="graph-feels"></div>
          </div>
          <div class="graph-row">
            <div class="graph-label">Neerslag (mm) <span class="graph-val-dynamic" id="lbl-precip"></span></div>
            <div class="graph-svg-container" id="graph-precip-detail"></div>
          </div>
          <div class="graph-row">
            <div class="graph-label">Wind (km/u) <span class="graph-val-dynamic" id="lbl-wind"></span></div>
            <div class="graph-svg-container" id="graph-wind"></div>
          </div>
          <div class="graph-row">
            <div class="graph-label">Bewolking (%) <span class="graph-val-dynamic" id="lbl-clouds"></span></div>
            <div class="graph-svg-container" id="graph-clouds"></div>
          </div>
          <div class="graph-row">
            <div class="graph-label">UV Index <span class="graph-val-dynamic" id="lbl-uv"></span></div>
            <div class="graph-svg-container" id="graph-uv"></div>
          </div>
          <div class="crosshair-line" id="crosshair-line" style="display: none;"></div>
          <div class="crosshair-tooltip" id="crosshair-tooltip" style="display: none;"></div>
        </div>
      </div>

      <div id="advice-section" class="card-container" style="display: none;">
        <div class="section-title"><span>👕 Kledingadvies</span></div>
        <div id="advice-list" class="advice-list"></div>
      </div>

    </div>
  `,

  init() {
    let isCancelled = false;
    let currentWeatherData = null; // Globaal binnen init om data vast te houden voor de grafiek knoppen
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
        if (pullDistance > 55) ptrContent.innerHTML = '<span class="ptr-icon">↻</span> Laat los om te vernieuwen';
        else ptrContent.innerHTML = '<span class="ptr-icon">⬇️</span> Trek om te vernieuwen';
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

    const adviceEmojis = { thermo: '❄️', long: '👕', short: '👖', wind: '💨', rain: '🌧', windchill: '❄️', storm: '⚠️', default: '✨' };

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


    // Grafiek overzicht 7 dagen
    let currentDetailedDayOffset = 0;

    const renderDetailedDashboard = (weather, dayOffset) => {
      const section = document.getElementById('detailed-graphs-section');
      if (!section) return;
      section.style.display = 'block';

      const now = new Date();
      const currentHour = now.getHours();
      const isToday = dayOffset === 0;

      // 1. Datum Selector Renderen
      // 1. Datum Selector Renderen
      const dateSelector = document.getElementById('graph-date-selector');
      let dateHtml = '';
      const daysOfWeek = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      
      for(let i = 0; i < 7; i++) {
        const timeString = weather.daily.time[i]; 
        const d = new Date(timeString);
        const isCurrentDay = i === 0;
        const btnText = isCurrentDay ? 'Vandaag' : `${daysOfWeek[d.getDay()]} ${d.getDate()}`;
        
        dateHtml += `
          <button class="date-btn ${i === dayOffset ? 'active' : ''}" data-offset="${i}">
            ${btnText}
          </button>
        `;
      }
      dateSelector.innerHTML = dateHtml;

      document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          currentDetailedDayOffset = parseInt(e.currentTarget.dataset.offset);
          renderDetailedDashboard(weather, currentDetailedDayOffset);
        });
      });

      // 2. Data ophalen voor de gekozen dag (24 uur)
      const startIndex = dayOffset * 24;
      const endIndex = startIndex + 24;
      const h = weather.hourly;
      
      const sliceD = (arr) => arr.slice(startIndex, endIndex);
      const dataFeels = sliceD(h.apparent_temperature);
      const dataPrecip = sliceD(h.precipitation);
      const dataWind = sliceD(h.windspeed_10m);
      const dataClouds = sliceD(h.cloudcover);
      const dataUV = sliceD(h.uv_index);

      // SVG Teken Functie (Met dynamische schaling en stippellijn-logica)
      // SVG Teken Functie (Met dynamische schaling, Y-as en stippellijn-logica)
      const drawGraph = (containerId, dataArr, color, fillArea = false, secDataArr = null) => {
        const container = document.getElementById(containerId);
        if(!container) return;

        // Filter null/undefined eruit zodat de min/max berekening niet faalt op lege API data (zoals UV 's nachts)
        const validData = dataArr.filter(v => v !== null && v !== undefined);
        let min = validData.length ? Math.min(...validData) : 0;
        let max = validData.length ? Math.max(...validData) : 1;
        
        if (secDataArr) {
           const validSec = secDataArr.filter(v => v !== null && v !== undefined);
           if (validSec.length) {
             min = Math.min(min, ...validSec);
             max = Math.max(max, ...validSec);
           }
        }
        if (min === max) { min -= 1; max += 1; }
        const range = max - min;
        min -= range * 0.1; max += range * 0.1;

        const w = 100, hgt = 65;
        const getXY = (val, i) => ({ x: (i / 23) * w, y: hgt - (((val - min) / (max - min)) * hgt) });
        
        const makePath = (arr, start, end) => {
          if(start >= end) return '';
          return arr.slice(start, end + 1).map((val, i) => {
            const safeVal = val ?? 0; // Voorkom crashes bij ontbrekende data
            const {x, y} = getXY(safeVal, start + i);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ');
        };

        let svg = `<svg class="graph-svg" viewBox="0 0 ${w} ${hgt}" preserveAspectRatio="none">`;
        
        // Rasterlijnen (alleen de lijnen, tekst doen we in HTML)
        [0, 6, 12, 18].forEach(hour => {
          const x = (hour / 23) * w;
          svg += `<line x1="${x}" y1="0" x2="${x}" y2="${hgt}" class="grid-line" />`;
        });

        if (fillArea) {
          const path = makePath(dataArr, 0, 23);
          svg += `<path d="${path} L ${w} ${hgt} L 0 ${hgt} Z" fill="${color}" opacity="0.15" />`;
        }

        if (secDataArr) {
          svg += `<path d="${makePath(secDataArr, 0, 23)}" fill="none" stroke="#A200FF" stroke-width="1.2" stroke-dasharray="2,2" vector-effect="non-scaling-stroke"/>`;
        }

        if (isToday) {
          const past = makePath(dataArr, 0, currentHour);
          const future = makePath(dataArr, currentHour, 23);
          if(past) svg += `<path d="${past}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="2,2" vector-effect="non-scaling-stroke" opacity="0.6"/>`;
          if(future) svg += `<path d="${future}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
          
          const nowXY = getXY(dataArr[currentHour] ?? 0, currentHour);
          svg += `<circle cx="${nowXY.x}" cy="${nowXY.y}" r="1.5" fill="${color}" />`;
        } else {
          const isPastDay = dayOffset < 0; 
          svg += `<path d="${makePath(dataArr, 0, 23)}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="${isPastDay ? '2,2' : 'none'}" vector-effect="non-scaling-stroke"/>`;
        }
        svg += '</svg>';

        // HTML Overlays (Dit zorgt voor strakke tekst en Y-as waarden)
        let overlaysHtml = '';
        
        // Bepaal opmaak Y-as waarden (geen decimalen voor grote getallen zoals luchtdruk)
        const formatY = (val) => val > 100 ? Math.round(val) : val.toFixed(1);
        overlaysHtml += `<div class="y-axis-label y-max">${formatY(max)}</div>`;
        overlaysHtml += `<div class="y-axis-label y-min">${formatY(min)}</div>`;
        
        // X-as labels netjes positioneren
        [0, 6, 12, 18].forEach(hour => {
           const xPercent = (hour / 23) * 100;
           overlaysHtml += `<div class="x-axis-label" style="left: ${xPercent}%;">${hour}u</div>`;
        });

        container.innerHTML = svg + overlaysHtml;
      };

      drawGraph('graph-feels', dataFeels, '#FF9500');
      drawGraph('graph-precip-detail', dataPrecip, '#007AFF', true);
      drawGraph('graph-wind', dataWind, '#5AC8FA');
      drawGraph('graph-clouds', dataClouds, '#8E8E93', true);
      drawGraph('graph-uv', dataUV, '#FFCC00');

      // 3. Crosshair & Sync Logic
      const wrapper = document.getElementById('graphs-wrapper');
      if (!wrapper) return;

      // Opnieuw binden (verwijder eerst oude listeners om stapelen te voorkomen)
      const newWrapper = wrapper.cloneNode(true);
      wrapper.parentNode.replaceChild(newWrapper, wrapper);

      // FIX: Haal de actieve elementen op uit de NIEUWE wrapper die zojuist in de DOM geplaatst is
      const crosshair = newWrapper.querySelector('#crosshair-line');
      const tooltip = newWrapper.querySelector('#crosshair-tooltip');
      const lblFeels = newWrapper.querySelector('#lbl-feels');
      const lblPrecip = newWrapper.querySelector('#lbl-precip');
      const lblWind = newWrapper.querySelector('#lbl-wind');
      const lblClouds = newWrapper.querySelector('#lbl-clouds');
      const lblUv = newWrapper.querySelector('#lbl-uv');

      const clearLabels = () => {
        [lblFeels, lblPrecip, lblWind, lblClouds, lblUv].forEach(el => {
          if (el) el.textContent = '';
        });
      };

      const handleMove = (e) => {
        const rect = newWrapper.getBoundingClientRect();
        if (rect.width === 0) return;

        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        
        let hour = Math.round((x / rect.width) * 23);
        if (isNaN(hour) || hour < 0 || hour > 23) return;

        const lockedX = (hour / 23) * rect.width;

        if (crosshair) {
          crosshair.style.display = 'block'; 
          crosshair.style.left = `${lockedX}px`;
        }
        if (tooltip) {
          tooltip.style.display = 'block'; 
          tooltip.style.left = `${lockedX}px`; 
          tooltip.innerHTML = `${hour.toString().padStart(2, '0')}:00`;
        }
        
        // Veilige fallbacks voor als Open-Meteo 'null' stuurt
        const safeUv = dataUV[hour] ?? 0;
        const safePrecip = dataPrecip[hour] ?? 0;
        const safeFeels = dataFeels[hour] ?? 0;
        const safeWind = dataWind[hour] ?? 0;
        const safeClouds = dataClouds[hour] ?? 0;

        if (lblPrecip) {
          lblPrecip.style.color = safePrecip >= 2 ? '#FF3B30' : '#007AFF';
          lblPrecip.textContent = `${safePrecip.toFixed(1)} mm`;
        }

        if (lblFeels) lblFeels.textContent = `${Math.round(safeFeels)}°`;
        if (lblWind) lblWind.textContent = `${Math.round(safeWind)} km/u`;
        if (lblClouds) lblClouds.textContent = `${Math.round(safeClouds)}%`;
        if (lblUv) lblUv.textContent = safeUv.toFixed(1);
      };

      const handleLeave = () => {
        if (crosshair) crosshair.style.display = 'none'; 
        if (tooltip) tooltip.style.display = 'none'; 
        clearLabels();
      };

      newWrapper.addEventListener('mousemove', handleMove);
      newWrapper.addEventListener('touchmove', handleMove, {passive: true});
      newWrapper.addEventListener('mouseleave', handleLeave);
      newWrapper.addEventListener('touchend', handleLeave);
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
      if (!navigator.geolocation) { resolve({ latitude: 51.91, longitude: 4.34, label: 'Vlaardingen' }); return; }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve({ latitude: 51.91, longitude: 4.34, label: 'Vlaardingen' }),
        { timeout: 7000 }
      );
    });

    const cleanName = name => (name || 'Onbekende locatie').replace(/,\s*[A-Z]{2,3}$/i, '').trim();
    const reverseGeo = async (lat, lon) => {
      // 1. Probeer eerst Open-Meteo
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=nl`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length) {
            const place = data.results[0];
            // Pak de eerste beschikbare naam-bron
            const name = place.name || place.address?.city || place.address?.town || place.address?.village || place.address?.county;
            if (name && isNaN(name)) return cleanName(name);
          }
        }
      } catch (e) {
        console.warn('Open-Meteo reverse geo mislukt, fallback naar Nominatim...');
      }

      // 2. Fallback naar Nominatim (OpenStreetMap) als Open-Meteo faalt of niets teruggeeft
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=nl`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Fietsmaatje/1.0' } });
        if (res.ok) {
          const data = await res.json();
          if (data.address) {
            const town = data.address.city || data.address.town || data.address.village || data.address.municipality;
            if (town) return cleanName(town);
          }
          if (data.display_name) return cleanName(data.display_name.split(',')[0]);
        }
      } catch (e) {
        console.error('Nominatim reverse geo ook mislukt:', e);
      }

      return 'Je locatie';
    };

    // ==========================================
    // API AANROEP (OPTIMAAL GESPLITST: KNMI + GERMAN ICON FALLBACKS)
    // ==========================================
    const fetchWeather = async (lat, lon, timezone) => {
      // 1. KNMI: Basis data + Luchtdruk (voor 7 dagen)
      const knmiUrl = new URL('https://api.open-meteo.com/v1/forecast');
      knmiUrl.searchParams.set('latitude', lat);
      knmiUrl.searchParams.set('longitude', lon);
      knmiUrl.searchParams.set('hourly', 'temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,shortwave_radiation,dewpoint_2m,cloudcover,surface_pressure');
      knmiUrl.searchParams.set('daily', 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant');
      knmiUrl.searchParams.set('timezone', timezone);
      knmiUrl.searchParams.set('forecast_days', '7');
      knmiUrl.searchParams.set('models', 'knmi_seamless');

      // 2. Best Match: UV Index (Dit model garandeert UV-data voor de volledige 7 dagen)
      const uvUrl = new URL('https://api.open-meteo.com/v1/forecast');
      uvUrl.searchParams.set('latitude', lat);
      uvUrl.searchParams.set('longitude', lon);
      uvUrl.searchParams.set('hourly', 'uv_index');
      uvUrl.searchParams.set('timezone', timezone);
      uvUrl.searchParams.set('forecast_days', '7');
      uvUrl.searchParams.set('models', 'best_match');

      // 3. ICON: Alleen voor de 15-minuten neerslag (de buienradar voor 3 uur)
      const iconUrl = new URL('https://api.open-meteo.com/v1/forecast');
      iconUrl.searchParams.set('latitude', lat);
      iconUrl.searchParams.set('longitude', lon);
      iconUrl.searchParams.set('minutely_15', 'precipitation');
      iconUrl.searchParams.set('timezone', timezone);
      iconUrl.searchParams.set('forecast_days', '1'); 
      iconUrl.searchParams.set('models', 'icon_seamless');

      // Voer alle aanroepen parallel uit
      const [knmiRes, uvRes, iconRes] = await Promise.all([
        fetch(knmiUrl.toString()),
        fetch(uvUrl.toString()),
        fetch(iconUrl.toString())
      ]);

      if (!knmiRes.ok || !uvRes.ok || !iconRes.ok) {
        throw new Error('Weather fetch failed in one of the data sources');
      }

      const knmiData = await knmiRes.json();
      const uvData = await uvRes.json();
      const iconData = await iconRes.json();

      // Vlecht de extra data in de hoofdset
      // UV index uit de Best Match dataset
      knmiData.hourly.uv_index = uvData.hourly.uv_index;
      
      // 15-minuten neerslag: alleen de eerste 12 datapunten (3 uur)
      if (iconData.minutely_15) {
          knmiData.minutely_15 = {
              time: iconData.minutely_15.time ? iconData.minutely_15.time.slice(0, 12) : [],
              precipitation: iconData.minutely_15.precipitation ? iconData.minutely_15.precipitation.slice(0, 12) : []
          };
      }

      return knmiData;
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
        const windDirDeg = weather.hourly.winddirection_10m[idx];
        const windRotation = windDirDeg + 180;
        const bft = bftFromKmh(wind);
        const dir = windDirection(weather.hourly.winddirection_10m[idx]);
        
        const value = Math.max(1, getScore({ weathercode: code, temperature: weather.hourly.temperature_2m[idx], windspeed: wind, precipitation_probability: weather.hourly.precipitation_probability[idx] }));
        const info = getScoreInfo(value);
        
        const rainMm = weather.hourly.precipitation[idx] ?? 0;
        const rainProb = weather.hourly.precipitation_probability[idx] ?? 0;
        
        let mmText = '0 mm';
        let textOpacity = 0.4;

        // Bepaal de tekstinhoud
        if (rainMm >= 0.1) {
          mmText = `${rainMm.toFixed(1)} mm`;
        } else if (rainProb > 0) {
          mmText = '<0.1 mm';
        }

        // Bepaal de opacity: als er neerslag is (gemeten of kans), dan volle zichtbaarheid
        if (rainMm >= 0.1 || rainProb > 0) {
          textOpacity = 1;
        }
        
        const rainPercent = Math.min(100, (rainMm / 10) * 100);
        
        const rainHtml = `
          <div class="hourly-rain-container">
            <div style="font-size: 0.6rem; font-weight: 700; color: rgba(0, 122, 255, 0.8); margin-bottom: 2px; min-height: 10px; display: flex; align-items: flex-end; opacity: ${textOpacity};">${mmText}</div>
            <div class="hourly-rain-bg">
              <div class="hourly-rain-fill" style="height: ${rainPercent}%;"></div>
            </div>
            <div style="margin-top: 3px; font-size: 0.6rem; font-weight: 700; color: rgba(0, 122, 255, 0.8); opacity: ${textOpacity};">${rainProb}%</div>
          </div>
        `;

        container.innerHTML += `
          <div class="hourly-item">
            <div class="hourly-time">${formatTime(time)}</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-temp">${hourlyTemp}°</div>
            <div class="hourly-score-pill" style="background-color: ${info.color};">${value}</div>
            ${rainHtml}
            <div class="hourly-detail" style="display: flex; align-items: center; justify-content: center; gap: 3px;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="transform: rotate(${windRotation}deg); opacity: 0.8;">
                <path d="M12 2L22 22L12 18L2 22L12 2Z" />
              </svg>
              ${dir} ${bft}
            </div>
          </div>
        `;
      });
    };

    // ==========================================
    // NIEUW: RENDER NEERSLAG GRAFIEK
    // ==========================================
    const renderPrecipGraph = (hours) => {
      if (!currentWeatherData) return;
      const container = document.getElementById('precip-graph-container');
      const section = document.getElementById('precip-section');
      if (!container || !section) return;
      
      section.style.display = 'block';
      container.innerHTML = '';
      
      const now = new Date().getTime();
      let dataPoints = [];
      
      if (hours === 3 && currentWeatherData.minutely_15) {
        // Gebruik hoge resolutie data (per kwartier) voor 3 uur weergave
        const times = currentWeatherData.minutely_15.time;
        const precips = currentWeatherData.minutely_15.precipitation;
        
        let startIndex = times.findIndex(t => new Date(t).getTime() >= now);
        if (startIndex === -1) startIndex = 0;
        
        // 3 uur = 12 kwartieren
        for(let i = 0; i < 12; i++) {
          if (times[startIndex + i]) {
            dataPoints.push({
              time: times[startIndex + i],
              total: precips[startIndex + i] || 0,
              isMinutely: true
            });
          }
        }
      } else {
        // Gebruik KNMI Seamless (per uur) voor langere termijnen
        const times = currentWeatherData.hourly.time;
        const precips = currentWeatherData.hourly.precipitation;
        const rains = currentWeatherData.hourly.rain;
        const showers = currentWeatherData.hourly.showers;
        
        let startIndex = times.findIndex(t => new Date(t).getTime() >= now);
        if (startIndex > 0) startIndex -= 1; // Pak het lopende uur mee
        if (startIndex === -1) startIndex = 0;
        
        for(let i = 0; i < hours; i++) {
          if (times[startIndex + i]) {
            dataPoints.push({
              time: times[startIndex + i],
              total: precips[startIndex + i] || 0,
              rain: rains[startIndex + i] || 0,
              showers: showers[startIndex + i] || 0,
              isMinutely: false
            });
          }
        }
      }
      
      // Bepaal de maximale Y-waarde voor de grafiek schaal.
      const maxPrecip = Math.max(2, ...dataPoints.map(d => d.total));
      
      // Achtergrond lijnen & Labels (Y-as)
      const axisHtml = `
        <div class="precip-axis-label" style="bottom: 100%;"><span>${maxPrecip.toFixed(1)} mm</span></div>
        <div class="precip-axis-label" style="bottom: 50%;"><span>${(maxPrecip/2).toFixed(1)} mm</span></div>
        <div class="precip-axis-label" style="bottom: 0;"></div>
      `;
      
      let barsHtml = '';
      dataPoints.forEach((dp, index) => {
        let timeLabel = '';
        if (hours === 3 && index % 4 === 0) { timeLabel = formatTime(dp.time); }
        if (hours === 8 && index % 2 === 0) { timeLabel = formatTime(dp.time); }
        if (hours === 24 && index % 4 === 0) { timeLabel = formatTime(dp.time); }
        if (hours === 48 && index % 8 === 0) { timeLabel = formatTime(dp.time); }
        
        if (dp.isMinutely) {
           const percent = (dp.total / maxPrecip) * 100;
           barsHtml += `
             <div class="precip-bar-wrapper">
               <div class="precip-bar-total" style="height: ${percent}%; opacity: ${dp.total > 0 ? 1 : 0};"></div>
               ${timeLabel ? `<div class="precip-time-label">${timeLabel}</div>` : ''}
             </div>
           `;
        } else {
           const rainPercent = (dp.rain / maxPrecip) * 100;
           const showersPercent = (dp.showers / maxPrecip) * 100;
           barsHtml += `
             <div class="precip-bar-wrapper">
               <div class="precip-bar-showers" style="height: ${showersPercent}%; opacity: ${dp.showers > 0 ? 1 : 0};"></div>
               <div class="precip-bar-rain" style="height: ${rainPercent}%; opacity: ${dp.rain > 0 ? 1 : 0};"></div>
               ${timeLabel ? `<div class="precip-time-label">${timeLabel}</div>` : ''}
             </div>
           `;
        }
      });
      
      container.innerHTML = axisHtml + barsHtml;
    };

    // Koppel click-events aan de Neerslag knoppen
    const precipBtns = document.querySelectorAll('.precip-btn');
    precipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        precipBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const hours = parseInt(e.target.dataset.hours, 10);
        renderPrecipGraph(hours);
      });
    });

    const renderDaily = (weather) => {
      const container = document.getElementById('daily-list');
      if (!container || !weather.daily) return;
      container.innerHTML = '';
      const section = document.getElementById('daily-section');
      if (section) section.style.display = 'block';

      const daysOfWeek = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
      const totalRows = 7; 

      const times = weather.daily.time.slice(0, totalRows);
      const maxs = weather.daily.temperature_2m_max.slice(0, totalRows);
      const mins = weather.daily.temperature_2m_min.slice(0, totalRows);
      const rainSums = weather.daily.precipitation_sum.slice(0, totalRows);

      const graphHeight = 90;
      const padding = 20; 
      const drawHeight = graphHeight - (padding * 2);

      let globalMin = Math.min(...mins);
      let globalMax = Math.max(...maxs);
      if (globalMin === globalMax) { globalMin -= 1; globalMax += 1; }
      const maxRain = Math.max(...rainSums) || 1;

      let headersHtml = '<div class="daily-flex-row">';
      let graphColsHtml = '';
      let rainHtml = '<div class="daily-flex-row" style="margin-top: 8px;">'; 
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

        headersHtml += `<div class="daily-col"><span class="daily-name">${dayName}</span><span class="daily-date">${dateStr}</span><span class="daily-icon">${icon}</span></div>`;

        const yMax = padding + ((globalMax - maxs[i]) / (globalMax - globalMin)) * drawHeight;
        const yMin = padding + ((globalMax - mins[i]) / (globalMax - globalMin)) * drawHeight;
        const stepWidth = 100 / totalRows;
        const xPercent = (i * stepWidth) + (stepWidth / 2);
        maxPath += `${i === 0 ? 'M' : 'L'} ${xPercent} ${yMax} `;
        minPath += `${i === 0 ? 'M' : 'L'} ${xPercent} ${yMin} `;

        graphColsHtml += `
          <div class="daily-col" style="position: relative;">
            <div class="temp-dot dot-max" style="top: ${yMax}px;"></div>
            <div class="temp-text text-max" style="top: ${yMax}px;">${Math.round(maxs[i])}°</div>
            <div class="temp-dot dot-min" style="top: ${yMin}px;"></div>
            <div class="temp-text text-min" style="top: ${yMin}px;">${Math.round(mins[i])}°</div>
          </div>
        `;

        rainHtml += `
          <div class="daily-col">
            <div class="daily-rain-container-v">
              <div class="daily-rain-text" style="font-size: 0.6rem; font-weight: 700; color: #007AFF; opacity: ${rain > 0 ? 1 : 0.4};">${rainStr}</div>
              <div class="rain-bar-bg-v">
                <div class="rain-bar-fill-v" style="height: ${rainPercent}%;"></div>
              </div>
            </div>
          </div>
        `;

        const windSpeed = weather.daily.windspeed_10m_max[i] ?? 0;
        const windDirDeg = weather.daily.winddirection_10m_dominant[i] ?? 0;
        const windRotation = windDirDeg + 180;
        const bft = bftFromKmh(windSpeed);
        const dirText = windDirection(windDirDeg); 
        
        footersHtml += `
          <div class="daily-col">
            <div class="daily-wind" style="display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.75rem;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="transform: rotate(${windRotation}deg); opacity: 0.8;">
                <path d="M12 2L22 22L12 18L2 22L12 2Z" />
              </svg>
              ${dirText} ${bft}
            </div>
          </div>
        `;
      }
      
      headersHtml += '</div>'; rainHtml += '</div>'; footersHtml += '</div>';
      
      const svgHtml = `
        <svg class="daily-svg" viewBox="0 0 100 ${graphHeight}" preserveAspectRatio="none">
          <path d="${maxPath}" fill="none" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
          <path d="${minPath}" fill="none" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        </svg>
      `;

      container.innerHTML = `
        ${headersHtml}
        <div class="daily-graph-container">${svgHtml}<div class="daily-flex-row" style="height: 100%;">${graphColsHtml}</div></div>
        ${rainHtml}${footersHtml}
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
      const v = Math.max(0.5, windspeed / 3.6); 

      const Tw = T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) + 
                 Math.atan(T + RH) - Math.atan(RH - 1.676331) + 
                 (0.00391838 * Math.pow(RH, 1.5)) * Math.atan(0.023101 * RH) - 4.686035;

      const Tg = T + (radiation * 0.04) / Math.sqrt(v); 
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
        const CACHE_TTL = 15 * 60 * 1000;

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

        currentWeatherData = weather; // Sla op in state voor de grafiekknoppen
        setText('weather-location', placeName);

        const nowTime = Date.now();
        let currentIndex = weather.hourly.time.findIndex(t => new Date(t).getTime() > nowTime);
        if (currentIndex > 0) currentIndex -= 1; 
        else if (currentIndex === -1) currentIndex = 0;

        const currentTemp = weather.hourly.temperature_2m[currentIndex];
        const currentWindspeed = weather.hourly.windspeed_10m[currentIndex];
        const code = weather.hourly.weathercode[currentIndex];
        const feelsLike = weather.hourly.apparent_temperature[currentIndex] ?? currentTemp;
        const humidity = weather.hourly.relative_humidity_2m[currentIndex] ?? 0;
        const radiation = weather.hourly.shortwave_radiation[currentIndex] ?? 0;
        const precipProb = weather.hourly.precipitation_probability[currentIndex] ?? 0;

        const icon = icons[code] ? icons[code][0] : '❔';
        const description = icons[code] ? icons[code][1] : 'Onbekend weer';
        const bft = bftFromKmh(currentWindspeed);

        const score = getScore({ weathercode: code, temperature: currentTemp, windspeed: currentWindspeed, precipitation_probability: precipProb });
        const scoreInfo = getScoreInfo(score);
        
        const topBadge = document.getElementById('top-score-badge');
        if (topBadge) {
          topBadge.textContent = '🚴 ' + scoreInfo.text;
          topBadge.style.backgroundColor = scoreInfo.color;
        }

        const wbgtValue = formatWbgt(currentTemp, humidity, currentWindspeed, radiation);
        const advice = getAdvice({ temperature: currentTemp, feels_like: feelsLike, windspeed: currentWindspeed, weathercode: code, precipitation_probability: precipProb });

        setText('weather-icon', icon);
        setText('weather-caption', description);
        setText('temperature', `${Math.round(currentTemp)}°`);
        setText('feels-like', `${Math.round(feelsLike)}°`);
        setText('wbgt', `${wbgtValue}°C`);
        setText('wind-info', `${Math.round(currentWindspeed)} km/u · ${bft} Bft`);

        const tooltipTextEl = document.getElementById('wbgt-tooltip-text');
        if (tooltipTextEl) tooltipTextEl.innerHTML = getWbgtAdviceText(parseFloat(wbgtValue));

        renderHourly(weather);
        
        // --- RENDERING VAN DE NIEUWE NEERSLAGGRAFIEK ---
        const activeBtn = document.querySelector('.precip-btn.active');
        const defaultHours = activeBtn ? parseInt(activeBtn.dataset.hours, 10) : 3;
        renderPrecipGraph(defaultHours);

        renderDaily(weather);
        renderDetailedDashboard(weather, currentDetailedDayOffset);
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
        e.stopPropagation(); 
        const isVisible = wbgtTooltip.style.display === 'block';
        document.querySelectorAll('.tooltip-fade').forEach(el => el.style.display = 'none');
        wbgtTooltip.style.display = isVisible ? 'none' : 'block';
      });
      document.addEventListener('click', (e) => {
        if (!wbgtTooltip.contains(e.target) && e.target !== wbgtBtn) {
          wbgtTooltip.style.display = 'none';
        }
      });
    }

    updateWeather();

    // Vernieuw automatisch als de app terugkeert naar de voorgrond
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // We roepen updateWeather(false) aan. 
    // Omdat je in updateWeather zelf checkt of de data "fresh" is, 
    // zal hij alleen echt fetchen als die 15 minuten voorbij zijn.
    updateWeather(false); 
  }
});
   
    // In je init() functie:
document.getElementById('weer-btn-locations')?.addEventListener('click', () => window.navigate('weer-locaties'));
}


  
};