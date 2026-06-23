export const page = {
  html: `
    <div style="
      position: fixed;
      inset: 0;
      background: linear-gradient(160deg, #2d1a4a 0%, #2d1a4a 22%, #4a1a8a 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      padding: 32px;
    ">
      <div style="max-width: 420px; width: 100%; margin: 0 auto;">
        <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.08); padding: 10px 16px; border-radius: 999px;">
          <div style="font-size: 20px;">≡</div>
          <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Menu</div>
        </div>

        <div style="margin-top: 28px; display: grid; gap: 16px;">
          <a href="#" style="display: block; padding: 18px 20px; border-radius: 24px; background: rgba(255,255,255,0.1); color: white; text-decoration: none; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);">Profielinstellingen</a>
          <a href="#" style="display: block; padding: 18px 20px; border-radius: 24px; background: rgba(255,255,255,0.08); color: white; text-decoration: none; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);">Notificaties</a>
          <a href="#" style="display: block; padding: 18px 20px; border-radius: 24px; background: rgba(255,255,255,0.06); color: white; text-decoration: none; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);">Privacy</a>
          <a href="#" style="display: block; padding: 18px 20px; border-radius: 24px; background: rgba(255,255,255,0.06); color: white; text-decoration: none; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);">Over Fietsmaatje</a>
        </div>

        <div style="margin-top: 32px; padding: 18px 20px; border-radius: 24px; background: rgba(0,0,0,0.12); color: rgba(255,255,255,0.8); font-size: 13px; line-height: 1.7;">
          Deze pagina bevat minder belangrijke instellingen en extra opties. Houd hem open voor dingen die niet direct in het hoofdmenu horen.
        </div>
      </div>
    </div>
  `,

  init() {
    // Toekomstige menu-logica kan hier worden toegevoegd.
  }
};
