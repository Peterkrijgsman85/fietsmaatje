export const page = {
  html: `
    <div style="
      position: relative;
      width: 100%;
      min-height: 100vh;
      padding: 10px 16px 110px;
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
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f2c5a; display: flex; align-items: center; gap: 8px;">
            <span>🚴</span> Hoe werkt de Fietsscore?
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
            De fietsscore (1-10) berekent automatisch je comfort. We wegen temperatuur, wind, neerslag en weertype. Een 10 is perfect terrasweer; storm of regen trekken de score omlaag.
          </p>
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
            <span>🌡️</span> Wat is WBGT?
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E; opacity: 0.8;">
            De <em>Wet Bulb Globe Temperature</em> meet hittestress. Het houdt rekening met luchtvochtigheid, zon en wind. Zo zie je direct of het te broeierig is voor een intensieve rit.
          </p>
        </div>

      </div>
    </div>
  `,

  init() {
    document.getElementById('menu-btn-pressure')?.addEventListener('click', () => window.navigate('pressure'));
    document.getElementById('menu-btn-ridelog')?.addEventListener('click', () => window.navigate('ridelog'));
  }
};