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

      /* --- FAQ ACCORDION STYLING --- */
      .faq-item {
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 24px;
        padding: 18px;
        box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        overflow: hidden;
      }
      .faq-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      .faq-title {
        margin: 0; 
        font-size: 14px; 
        font-weight: 700; 
        color: #0f2c5a; 
        display: flex; 
        align-items: center; 
        gap: 8px;
      }
      .faq-chevron {
        font-size: 18px;
        color: rgba(15, 44, 90, 0.4);
        transition: transform 0.3s ease;
      }
      .faq-content {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .faq-item.open .faq-content {
        max-height: 800px; /* Groot genoeg om de tekst te tonen */
        opacity: 1;
        margin-top: 12px;
      }
      .faq-item.open .faq-chevron {
        transform: rotate(90deg);
      }
    </style>

    <div style="
      position: relative;
      width: 100%;
      min-height: 100vh;
      padding: 10px 16px 150px; /* Ademruimte boven het menu */
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1C1C1E;
    ">
      <div style="max-width: 420px; width: 100%; margin: 0 auto; display: grid; gap: 20px;">
        
        

        <div style="
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 10px 16px;
          border-radius: 999px;
          justify-self: start;
          color: #0f2c5a;
        ">
          <div style="font-size: 20px; line-height: 1;">≡</div>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;">Menu & Info</div>
        </div>

        <div style="
          margin: 10px 0 -5px 5px; 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: rgba(15, 44, 90, 0.6);
        ">
          Overige functionaliteiten
        </div>

        <div id="menu-btn-pressure" style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="font-size: 24px; background: rgba(255,255,255,0.6); padding: 8px; border-radius: 14px;">🚲</span>
            <div>
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f2c5a;">Bandenspanning Calculator</h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: rgba(15, 44, 90, 0.6); font-weight: 500;">Optimale druk voor je rit</p>
            </div>
          </div>
          <span style="font-size: 18px; color: rgba(15, 44, 90, 0.4);">›</span>
        </div>

        <div id="menu-btn-ridelog" style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="font-size: 24px; background: rgba(255,255,255,0.6); padding: 8px; border-radius: 14px;">📝</span>
            <div>
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f2c5a;">Weerbericht Generator</h3>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: rgba(15, 44, 90, 0.6); font-weight: 500;">Strava data in één klik</p>
            </div>
          </div>
          <span style="font-size: 18px; color: rgba(15, 44, 90, 0.4);">›</span>
        </div>

        <div style="
          margin: 10px 0 -5px 5px; 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: rgba(15, 44, 90, 0.6);
        ">
          Instellingen
        </div>

        <div id="menu-btn-locations" style="
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 18px;
  box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
">
  <div style="display: flex; align-items: center; gap: 14px;">
    <span style="font-size: 24px; background: rgba(255,255,255,0.6); padding: 8px; border-radius: 14px;">📍</span>
    <div>
      <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f2c5a;">Weer locaties</h3>
      <p style="margin: 2px 0 0 0; font-size: 12px; color: rgba(15, 44, 90, 0.6); font-weight: 500;">Beheer je vaste plekken</p>
    </div>
  </div>
  <span style="font-size: 18px; color: rgba(15, 44, 90, 0.4);">›</span>
</div>

        <div style="
          margin: 10px 0 -5px 5px; 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: rgba(15, 44, 90, 0.6);
        ">
          Over Fietsmaatje
        </div>

        <div style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f2c5a; display: flex; align-items: center; gap: 8px;">
            <span>📱</span> Over Fietsmaatje
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
            Fietsmaatje is jouw ultieme digitale ploegleider. Of je nu wilt weten of je een kort of lang shirt aan moet (Fietsscore), hoeveel krentenbollen er mee moeten (Voeding Planner), hoe hard je banden moeten staan (Bandenspanning), of hoe je achteraf indruk maakt op Strava (Weerbericht Generator): deze app regelt het voor je ritten. Nooit meer onvoorbereid op de pedalen!
          </p>
        </div>

        <div style="
          margin: 10px 0 -5px 5px; 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: rgba(15, 44, 90, 0.6);
        ">
          Veelgestelde vragen
        </div>

        <div class="faq-item" id="faq-weatherdata">
          <div class="faq-header" id="header-weatherdata">
            <h3 class="faq-title"><span>📊</span> Waar komt de weerdata vandaan?</h3>
            <span class="faq-chevron">›</span>
          </div>
          <div class="faq-content">
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
              Fietsmaatje maakt gebruik van real-time, ultra-lokale meteorologische data via geavanceerde open-weermodellen (waaronder Open-Meteo, ECMWF en KNMI-data). Op basis van de exacte GPS-coördinaten van je locatie halen we elk uur de meest actuele voorspellingen op. Variabelen zoals temperatuur, neerslagintensiteit, luchtvochtigheid, windvectoren en directe zonnestraling worden continu verwerkt om jouw Fietsscore, WBGT-index en de geavanceerde grafieken nauwkeurig te berekenen.
            </p>
          </div>
        </div>

        <div class="faq-item" id="faq-fietsscore">
          <div class="faq-header" id="header-fietsscore">
            <h3 class="faq-title"><span>🚴</span> Hoe berekent de Fietsscore?</h3>
            <span class="faq-chevron">›</span>
          </div>
          <div class="faq-content">
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
              De score start bij een perfecte 10 en wordt via een algoritme stapsgewijs afgebouwd. <strong>Temperatuur</strong> vormt de basis: de sweet spot ligt tussen 17°C en 23°C. Daarbuiten (kou óf extreme hitte) kost dit direct punten. Vervolgens passen we harde aftrekken toe voor <strong>neerslag</strong> (tot -5 punten op basis van mm/u) en <strong>windkracht</strong> (vanaf 4 Bft kost elke extra Beaufort 1 tot 1.5 punt). Tot slot weegt de <strong>bewolking</strong> mee: een onbewolkte lucht houdt de score maximaal, terwijl een grauwe, grijze lucht een extra straffractie oplevert.
            </p>
          </div>
        </div>

        <div class="faq-item" id="faq-wbgt">
          <div class="faq-header" id="header-wbgt">
            <h3 class="faq-title"><span>🌡️</span> Hoe wordt de WBGT bepaald?</h3>
            <span class="faq-chevron">›</span>
          </div>
          <div class="faq-content">
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
              De Wet Bulb Globe Temperature meet de daadwerkelijke hittestress op het menselijk lichaam, wat wezenlijk anders is dan de gewone schaduwtemperatuur. De formule weegt drie specifieke meteorologische componenten:
              <br><br>
              • <strong>70% Natteboltemperatuur (Luchtvochtigheid):</strong> Bepaalt hoe effectief jouw zweet nog kan verdampen om je lichaam te koelen. Bij een hoge vochtigheid schiet deze waarde omhoog.<br>
              • <strong>20% Zwarteboltemperatuur (Straling):</strong> Simuleert de directe impact van zonnestraling op je (vaak donkere) fietskleding en huid.<br>
              • <strong>10% Droge luchttemperatuur:</strong> De traditionele luchttemperatuur in de schaduw.<br><br>
              <strong>De invloed van wind:</strong> Windkracht fungeert hierin als de cruciale koelfactor. Een stevige bries versnelt de verdamping op de natte bol en trekt de WBGT omlaag. Is het daarentegen windstil én vochtig? Dan kruiped de WBGT angstaanjagend dicht tegen de echte temperatuur aan en raakt je lichaam de hitte niet kwijt.
            </p>
          </div>
        </div>

      </div>
    </div>
  `,

  init() {
    // Bestaande navigatie
    document.getElementById('menu-btn-pressure')?.addEventListener('click', () => window.navigate('pressure'));
    document.getElementById('menu-btn-ridelog')?.addEventListener('click', () => window.navigate('ridelog'));
    document.getElementById('menu-btn-locations')?.addEventListener('click', () => window.navigate('weer-locaties'));

    // FAQ Toggle logica
    const setupFaqToggle = (headerId, itemId) => {
      const header = document.getElementById(headerId);
      const item = document.getElementById(itemId);
      
      if (header && item) {
        header.addEventListener('click', () => {
          // Optioneel: sluit de andere als je er één opent. 
          document.querySelectorAll('.faq-item').forEach(el => {
            if (el.id !== itemId) el.classList.remove('open');
          });
          
          item.classList.toggle('open');
        });
      }
    };

    setupFaqToggle('header-weatherdata', 'faq-weatherdata');
    setupFaqToggle('header-fietsscore', 'faq-fietsscore');
    setupFaqToggle('header-wbgt', 'faq-wbgt');
    
  }
};