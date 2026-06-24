export const page = {
  html: `
    <div style="
      position: relative;
      width: 100%;
      min-height: 100vh;
      padding: 32px 16px 120px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
          box-shadow: 0 4px 10px rgba(15, 44, 90, 0.02);
        ">
          <div style="font-size: 20px; line-height: 1;">≡</div>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;">Menu & Info</div>
        </div>

        <div style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #0f2c5a;">
            <span>🚴</span> Hoe werkt de Fietsscore?
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E;">
            De fietsscore (1 tot 10) berekent automatisch hoe comfortabel je rit wordt. We wegen factoren zoals de ideale temperatuur (rond de 21°C), windkracht, neerslagkans en het actuele weertype tegen elkaar af. Een 10 betekent perfect windstil terrasweer; een flinke plensbui of storm trekt de score direct omlaag.
          </p>
        </div>

        <div style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #0f2c5a;">
            <span>🌡️</span> Wat is de WBGT-waarde?
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E;">
            De <em>Wet Bulb Globe Temperature</em> meet de daadwerkelijke hittestress voor het menselijk lichaam. In tegenstelling tot de gewone gevoelstemperatuur houdt de WBGT intensief rekening met de combinatie van luchtvochtigheid, zonkracht en windkoeling. Zo weet je precies wanneer het te broeierig is en je het rustiger aan moet doen om oververhitting te voorkomen.
          </p>
        </div>

        <div style="
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #0f2c5a;">
            <span>✨</span> Over Fietsmaatje
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1C1C1E;">
            Fietsmaatje is jouw slimme fietscopilot. Geen ingewikkelde buien- of windapps meer ontcijferen voor vertrek: deze app vertelt je in één oogopslag exact hoe de vlag erbij hangt en welke kleding je moet aantrekken. Gemaakt vóór en dóór gepassioneerde fietsers.
          </p>
        </div>

      </div>
    </div>
  `,

  init() {
    // Toekomstige menu-logica kan hier worden toegevoegd.
  }
};