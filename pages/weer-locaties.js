export const page = {
  html: `
    <style>
      /* --- Styling conform Weather Dashboard --- */
      #app::-webkit-scrollbar { display: none !important; }
      #app { -ms-overflow-style: none !important; scrollbar-width: none !important; -webkit-overflow-scrolling: touch; }
      
      .weather-page {
        position: relative;
        width: 100%;
        color: #1C1C1E;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        padding: 40px 16px 150px;
        box-sizing: border-box;
      }

      /* Banner voor statusmelding */
      .dev-notice {
        background: rgba(255, 149, 0, 0.15);
        color: #856404;
        padding: 12px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 149, 0, 0.2);
      }

      .card-container {
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 24px;
        padding: 18px;
        box-shadow: 0 8px 32px rgba(15, 44, 90, 0.04);
        margin-bottom: 20px;
        position: relative; /* Cruciaal voor autocomplete positionering */
      }

      .section-title {
        font-size: 0.75rem;
        font-weight: 700;
        color: rgba(15, 44, 90, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin: 0 0 14px 4px;
      }

      input[type="text"] {
        width: 100%;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid rgba(15, 44, 90, 0.2);
        font-size: 16px;
        outline: none;
        color: #0f2c5a;
        background: rgba(255, 255, 255, 0.6);
        box-sizing: border-box;
      }

      .btn-back {
        background: transparent;
        color: rgba(15, 44, 90, 0.6);
        border: 1px solid rgba(15, 44, 90, 0.2);
        padding: 14px 24px;
        border-radius: 14px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        text-align: center;
        transition: all 0.2s;
        margin-top: 20px;
      }
      .btn-back:active { background: rgba(15, 44, 90, 0.05); }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.35);
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin-bottom: 10px;
      }

      .delete-btn {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
      }

      /* Autocomplete lijst staat los van de container flow */
      #autocomplete-results {
        position: absolute;
        top: calc(100% + 10px);
        left: 18px;
        right: 18px;
        background: #ffffff;
        backdrop-filter: blur(10px);
        border-radius: 14px;
        border: 1px solid rgba(15, 44, 90, 0.2);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        z-index: 99999;
        display: none;
        max-height: 200px;
        overflow-y: auto;
      }
    </style>

    <div class="weather-page">
      <div style="font-size: 48px; margin-bottom: 20px; text-align: center;">📍</div> 
      <h1 style="font-size: 20px; margin-bottom: 10px; font-weight: 800; text-align: center; color: #0f2c5a;">Weer locaties</h1> 
      <p style="font-size: 14px; color: rgba(15, 44, 90, 0.6); margin-bottom: 24px; text-align: center;"> 
        Houd het weer bij op jouw favoriete plekken. Voeg locaties toe en bekijk deze in het weer overzicht.  
      </p>

      <div class="dev-notice">⚠️ Deze functie is momenteel in ontwikkeling. Opgeslagen locaties worden nog niet ingeladen in het hoofdoverzicht.</div>

      <div class="card-container">
        <div class="section-title">Zoek locatie</div>
        <input type="text" id="location-input" autocomplete="off" placeholder="Plaatsnaam..." />
        <div id="autocomplete-results"></div>
      </div>

      <div id="location-status" style="font-size: 13px; color: #dc2626; margin-bottom: 10px; padding-left: 4px; font-weight: 600; min-height: 18px;"></div>

      <div class="card-container">
        <div class="section-title">Jouw locaties</div>
        <div id="locations-list"></div>
      </div>
      
      <button id="btn-back" class="btn-back">Terug naar instellingen</button>
    </div>
  `,

  init() {
    document.getElementById('btn-back')?.addEventListener('click', () => window.navigate('menu'));

    const CACHE_KEY = 'weather_saved_locations';
    const inputEl = document.getElementById('location-input');
    const listEl = document.getElementById('locations-list');
    const statusEl = document.getElementById('location-status');
    const autocompleteEl = document.getElementById('autocomplete-results');

    let savedLocations = JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    let debounceTimer = null;

    const renderLocations = () => {
      if (!listEl) return;
      listEl.innerHTML = '';

      if (savedLocations.length === 0) {
        listEl.innerHTML = '<div style="text-align: center; color: rgba(15, 44, 90, 0.4); font-size: 13px; padding: 10px 0;">Geen favorieten toegevoegd.</div>';
        return;
      }

      savedLocations.forEach((loc, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
          <span style="font-size: 15px; font-weight: 600; color: #0f2c5a;">${loc.name}</span>
          <button class="delete-btn" data-index="${index}">✕</button>
        `;
        listEl.appendChild(item);
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.getAttribute('data-index'));
          savedLocations.splice(index, 1);
          localStorage.setItem(CACHE_KEY, JSON.stringify(savedLocations));
          renderLocations();
        });
      });
    };

    const saveLocationObject = (cityName, lat, lon) => {
      if (savedLocations.some(l => l.lat === lat && l.lon === lon)) {
        statusEl.innerText = 'Locatie al toegevoegd.';
      } else {
        savedLocations.push({ name: cityName, lat, lon });
        localStorage.setItem(CACHE_KEY, JSON.stringify(savedLocations));
        inputEl.value = '';
        statusEl.innerText = '';
        renderLocations();
      }
      autocompleteEl.style.display = 'none';
    };

    const fetchPlaces = async (query) => {
      if (query.length < 3) { autocompleteEl.style.display = 'none'; return; }
      try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lon=5.3&lat=52.1`);
        const data = await response.json();
        const results = (data.features || []).filter(f => ['city', 'town', 'village', 'suburb'].includes(f.properties.type));

        if (results.length > 0) {
          autocompleteEl.innerHTML = '';
          autocompleteEl.style.display = 'block';
          results.forEach(res => {
            const row = document.createElement('div');
            row.style.cssText = 'padding: 14px 16px; cursor: pointer; border-bottom: 1px solid rgba(15,44,90,0.05); font-size: 14px;';
            row.innerText = res.properties.name;
            row.onclick = () => saveLocationObject(res.properties.name, res.geometry.coordinates[1], res.geometry.coordinates[0]);
            autocompleteEl.appendChild(row);
          });
        } else {
          autocompleteEl.style.display = 'none';
        }
      } catch (e) {}
    };

    inputEl?.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fetchPlaces(e.target.value.trim()), 300);
    });

    document.addEventListener('click', (e) => {
      if (autocompleteEl && !inputEl.contains(e.target) && !autocompleteEl.contains(e.target)) {
        autocompleteEl.style.display = 'none';
      }
    });

    renderLocations();
  }
};