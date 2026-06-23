export const page = {
  html: `
    <div style="
      position: fixed;
      inset: 0;
      background: linear-gradient(160deg, #0f2c5a, #1a4a8a);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    ">
      <div style="text-align: center; opacity: 0.35;">
        <div style="font-size: 72px; line-height: 1;">🌤</div>
        <div style="margin-top: 16px; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;">Weer</div>
      </div>
    </div>
  `,

  init() {
    // Hier komt straks de weer-logica
    // Geef een cleanup-functie terug als je bijv. een interval start:
    // const id = setInterval(...);
    // return () => clearInterval(id);
  }
};
