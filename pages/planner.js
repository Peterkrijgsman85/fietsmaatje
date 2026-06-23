export const page = {
  html: `
    <div style="
      position: fixed;
      inset: 0;
      background: linear-gradient(160deg, #2d1a4a 0%, #2d1a4a 22%, #4a1a8a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    ">
      <div style="text-align: center; opacity: 0.92;">
        <div style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 999px; background: rgba(255,255,255,0.12); color: white; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 24px;">STRAVA</div>
        <div style="font-size: 84px; line-height: 1;">📅</div>
        <div style="margin-top: 18px; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700;">Planner</div>
      </div>
    </div>
  `,

  init() {
    // Hier komt straks de planner-logica
  }
};
