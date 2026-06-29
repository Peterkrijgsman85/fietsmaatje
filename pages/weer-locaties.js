export const page = {
  html: `
    <div style="
      padding: 40px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2c5a;
      text-align: center;
      max-width: 400px;
      margin: 0 auto;
    ">
      <div style="font-size: 48px; margin-bottom: 20px;">📍</div>
      <h1 style="font-size: 20px; margin-bottom: 10px;">Weer locaties</h1>
      <p style="font-size: 14px; color: rgba(15, 44, 90, 0.6); margin-bottom: 24px;">
        Voeg je favoriete fietslocaties toe om straks snel tussen het weer te kunnen swipen.
      </p>

      <div style="position: relative; margin-bottom: 12px; text-align: left;">
        <div style="display: flex; gap: 10px;">
          <input type="text" id="location-input" autocomplete="off" placeholder="Plaatsnaam (bijv. Aalten)" style="
            flex: 1;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid rgba(15, 44, 90, 0.2);
            font-size: 14px;
            outline: none;
            color: #0f2c5a;
            background: rgba(255, 255, 255, 0.6);
          " />
          <button id="btn-add-location" style="
            background: #0f2c5a;
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 14px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
          ">
            Voeg toe
          </button>
        </div>

        <div id="autocomplete-results" style="
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 14px;
          border: 1px solid rgba(15, 44, 90, 0.15);
          box-shadow: 0 10px 30px rgba(15, 44, 90, 0.15);
          z-index: 99999;
          display: none;
          max-height: 220px;
          overflow-y: auto;
        "></div>
      </div>

      <div id="location-status" style="
        font-size: 12px; 
        color: #dc2626; 
        margin-bottom: 20px; 
        min-height: 18px; 
        text-align: left; 
        padding-left: 4px;
        font-weight: 600;
      "></div>

      <div id="locations-list" style="
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 30px;
        text-align: left;
      "></div>
      
      <button id="btn-back" style="
        background: transparent;
        color: #0f2c5a;
        border: 1px solid rgba(15, 44, 90, 0.3);
        padding: 14px 24px;
        border-radius: 14px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
      ">
        Terug naar instellingen
      </button>
    </div>
  `,

  init() {
    document.getElementById('btn-back')?.addEventListener('click', () => window.navigate('menu'));

    const CACHE_KEY = 'weather_saved_locations';
    const inputEl = document.getElementById('location-input');
    const btnAdd = document.getElementById('btn-add-location');
    const listEl = document.getElementById('locations-list');
    const statusEl = document.getElementById('location-status');
    const autocompleteEl = document.getElementById('autocomplete-results');

    let savedLocations = [];
    let debounceTimer = null;

    try {
      savedLocations = JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } catch (e) {
      savedLocations = [];
    }

    const renderLocations = () => {
      if (!listEl) return;
      listEl.innerHTML = '';

      if (savedLocations.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; color: rgba(15, 44, 90, 0.4); font-size: 13px; padding: 24px 0; border: 1px dashed rgba(15, 44, 90, 0.15); border-radius: 14px;">
            Nog geen favoriete locaties toegevoegd.
          </div>
        `;
        return;
      }

      savedLocations.forEach((loc, index) => {
        const item = document.createElement('div');
        item.style.cssText = `
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 44, 90, 0.05);
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(15, 44, 90, 0.02);
        `;

        item.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 14px; font-weight: 700; color: #0f2c5a;">${loc.name}</span>
            <span style="font-size: 11px; color: rgba(15, 44, 90, 0.4);">Coördinaten: ${loc.lat.toFixed(2)}, ${loc.lon.toFixed(2)}</span>
          </div>
          <button class="btn-delete-location" data-index="${index}" style="
            background: rgba(239, 68, 68, 0.1);
            color: #dc2626;
            border: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            cursor: pointer;
            font-weight: bold;
          ">✕</button>
        `;

        listEl.appendChild(item);
      });

      document.querySelectorAll('.btn-delete-location').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.getAttribute('data-index'));
          savedLocations.splice(index, 1);
          localStorage.setItem(CACHE_KEY, JSON.stringify(savedLocations));
          renderLocations();
        });
      });
    };

    const saveLocationObject = (cityName, lat, lon) => {
      const isDuplicate = savedLocations.some(l => l.lat === lat && l.lon === lon);
      
      if (isDuplicate) {
        statusEl.style.color = '#dc2626';
        statusEl.innerText = 'Deze locatie staat al in je lijst!';
      } else {
        savedLocations.push({ name: cityName, lat, lon });
        localStorage.setItem(CACHE_KEY, JSON.stringify(savedLocations));
        inputEl.value = '';
        statusEl.innerText = '';
        renderLocations();
      }
      if (autocompleteEl) autocompleteEl.style.display = 'none';
    };

    const filterPhotonPlaces = (features) => {
      return features.filter(f => {
        const p = f.properties;
        if (!p) return false;

        // Photon deelt steden/dorpen/wijken zelf in onder deze types
        const isTownOrCity = ['city', 'town', 'village', 'suburb', 'locality'].includes(p.type);
        
        // Controleer of het resultaat in NL of BE ligt (ongeacht Engelse of Nederlandse benaming)
        const country = p.country ? p.country.toLowerCase() : '';
        const isNLorBE = country.includes('nederland') || 
                         country.includes('netherlands') || 
                         country.includes('belgië') || 
                         country.includes('belgium');

        return isTownOrCity && isNLorBE;
      });
    };

    const addLocationManual = async () => {
      const query = inputEl.value.trim();
      if (!query) return;

      statusEl.style.color = '#0f2c5a';
      statusEl.innerText = 'Locatie zoeken... 🔍';
      if (autocompleteEl) autocompleteEl.style.display = 'none';

      try {
        // Zonder &lang=nl parameter om de 400 Bad Request op te lossen
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=25&lon=5.3&lat=52.1`);
        const data = await response.json();
        const placeResults = filterPhotonPlaces(data.features || []);

        if (placeResults && placeResults.length > 0) {
          const result = placeResults[0];
          const cityName = result.properties.name;
          const lon = result.geometry.coordinates[0];
          const lat = result.geometry.coordinates[1];
          saveLocationObject(cityName, lat, lon);
        } else {
          statusEl.style.color = '#dc2626';
          statusEl.innerText = 'Plaats niet gevonden.';
        }
      } catch (err) {
        statusEl.style.color = '#dc2626';
        statusEl.innerText = 'Netwerkfout bij zoeken.';
      }
    };

    const fetchSuggestions = async (query) => {
      if (query.length < 3) {
        if (autocompleteEl) autocompleteEl.style.display = 'none';
        return;
      }

      try {
        // Zonder &lang=nl parameter om de 400 Bad Request op te lossen
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=25&lon=5.3&lat=52.1`);
        const data = await response.json();
        const placeResults = filterPhotonPlaces(data.features || []);

        if (!autocompleteEl) return;

        if (placeResults && placeResults.length > 0) {
          autocompleteEl.innerHTML = '';
          autocompleteEl.style.display = 'block';

          placeResults.slice(0, 5).forEach(result => {
            const mainName = result.properties.name;
            const subName = [result.properties.state, result.properties.country].filter(Boolean).join(', ');

            const row = document.createElement('div');
            row.style.cssText = `
              padding: 12px 16px;
              cursor: pointer;
              border-bottom: 1px solid rgba(15, 44, 90, 0.05);
              display: flex;
              flex-direction: column;
              gap: 2px;
              text-align: left;
              transition: background 0.2s;
            `;
            row.innerHTML = `
              <span style="font-size: 14px; font-weight: 700; color: #0f2c5a;">${mainName}</span>
              <span style="font-size: 11px; color: rgba(15, 44, 90, 0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${subName}</span>
            `;

            row.addEventListener('mouseenter', () => row.style.background = 'rgba(15, 44, 90, 0.05)');
            row.addEventListener('mouseleave', () => row.style.background = 'transparent');
            
            row.addEventListener('click', () => {
              const lon = result.geometry.coordinates[0];
              const lat = result.geometry.coordinates[1];
              saveLocationObject(mainName, lat, lon);
            });

            autocompleteEl.appendChild(row);
          });
        } else {
          autocompleteEl.style.display = 'none';
        }
      } catch (err) {
        console.error('Fout bij ophalen suggesties:', err);
      }
    };

    inputEl?.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      statusEl.innerText = ''; 
      
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
    });

    document.addEventListener('click', (e) => {
      if (autocompleteEl && !inputEl.contains(e.target) && !autocompleteEl.contains(e.target)) {
        autocompleteEl.style.display = 'none';
      }
    });

    btnAdd?.addEventListener('click', addLocationManual);
    inputEl?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addLocationManual();
    });

    renderLocations();
  }
};