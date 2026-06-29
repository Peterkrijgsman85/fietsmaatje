export const page = {
  html: `
    <div style="
      padding: 40px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2c5a;
      text-align: center;
    ">
      <div style="font-size: 48px; margin-bottom: 20px;">📍</div>
      <h1 style="font-size: 20px; margin-bottom: 10px;">Weer locaties</h1>
      <p style="font-size: 14px; color: rgba(15, 44, 90, 0.6); line-height: 1.5; max-width: 300px; margin: 0 auto;">
        Hier kun je straks je favoriete fietslocaties toevoegen en beheren. 
        <br><br>
        De pagina is in aanbouw!
      </p>
      
      <button id="btn-back" style="
        margin-top: 30px;
        background: #0f2c5a;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
      ">
        Terug naar instellingen
      </button>
    </div>
  `,

  init() {
    document.getElementById('btn-back')?.addEventListener('click', () => window.navigate('menu'));
  }
};