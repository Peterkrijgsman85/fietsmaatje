export const page = {
  html: `
    <div style="
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    ">
      <div id="water-map" style="position: absolute; inset: 0; width: 100%; height: 100%; background: #e5e7eb;"></div>

      <div id="water-loading" style="
        position: absolute;
        inset: 0;
        background: rgba(15, 44, 90, 0.4);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 100005;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: opacity 0.3s ease;
      ">
        <div style="font-size: 56px; margin-bottom: 12px; animation: water-bounce 1s infinite alternate;">💧</div>
        <p style="font-size: 14px; font-weight: 600; letter-spacing: 0.05em; text-align: center; padding: 0 20px;">Waterpunten inladen...</p>
      </div>

      <div id="water-zoom-warning" style="
        position: absolute;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: #0f2c5a;
        font-size: 12px;
        font-weight: 700;
        padding: 8px 16px;
        border-radius: 999px;
        box-shadow: 0 8px 24px rgba(15, 44, 90, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.5);
        pointer-events: none;
        display: none;
        transition: all 0.3s ease;
      ">
        🔍 Zoom in om waterpunten te zien
      </div>

      <button id="water-btn-legend" style="
        position: absolute;
        top: 20px;
        left: 16px;
        z-index: 99999;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 6px 20px rgba(15, 44, 90, 0.1);
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      ">ℹ️</button>

      <button id="water-btn-filter" style="
        position: absolute;
        top: 20px;
        right: 16px;
        z-index: 99999;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 6px 20px rgba(15, 44, 90, 0.1);
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      ">🔎</button>

      <button id="water-btn-location" style="
        position: absolute;
        bottom: 180px; 
        right: 16px;
        z-index: 99999;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 6px 20px rgba(15, 44, 90, 0.1);
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      ">🛰️</button>

      <div id="water-details-sheet" style="
        position: absolute;
        bottom: 180px; 
        left: 16px;
        right: 16px;
        z-index: 99999;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 24px;
        padding: 20px;
        box-shadow: 0 12px 40px rgba(15, 44, 90, 0.25);
        display: none;
        flex-direction: column;
        gap: 12px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      ">
        <button id="water-details-close" style="
          position: absolute;
          top: 14px;
          right: 14px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          border: none;
          color: #0f2c5a;
          font-weight: bold;
          font-size: 11px;
          cursor: pointer;
        ">✕</button>

        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(15, 44, 90, 0.08); padding-bottom: 8px; margin-right: 20px;">
          <h3 id="water-details-distance" style="margin: 0; font-size: 18px; font-weight: 800; color: #0f2c5a; display: flex; align-items: center; gap: 6px;">
            <span id="water-details-emoji">💧</span> <span id="water-details-dist-txt">0.0 km</span>
          </h3>
          <span id="water-details-badge" style="margin-left: auto; font-size: 10px; font-weight: 800; text-transform: uppercase; tracking-wider; padding: 4px 8px; border-radius: 8px;"></span>
        </div>

        <div id="water-details-city" style="font-size: 11px; font-weight: 700; color: #0f2c5a; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;"></div>
        
        <p id="water-details-desc" style="margin: 0; font-size: 13px; line-height: 1.5; color: #1C1C1E; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);"></p>

        <a id="water-details-route" href="#" target="_blank" style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #0f2c5a;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          padding: 14px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(15, 44, 90, 0.2);
          text-align: center;
        ">
          <span>🚴</span> Route starten
        </a>
      </div>

      <div id="water-legend-modal" style="
        position: absolute;
        inset: 0;
        background: rgba(15, 44, 90, 0.3);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        z-index: 100006;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      ">
        <div style="
          width: 100%;
          max-width: 360px;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.4);
          display: flex;
          flex-direction: column;
          gap: 16px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(15, 44, 90, 0.08); padding-bottom: 12px;">
            <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f2c5a; display: flex; align-items: center; gap: 8px;">
              <span>ℹ️</span> Legenda & Info
            </h4>
            <button id="water-legend-close" style="
              width: 26px;
              height: 26px;
              border-radius: 50%;
              background: rgba(0,0,0,0.05);
              border: none;
              color: #0f2c5a;
              font-weight: bold;
              cursor: pointer;
            ">✕</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 12px; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.2);">
              <span style="font-size: 24px;">💧</span>
              <div>
                <h5 style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #0f2c5a;">Beschikbaar Tappunt</h5>
                <p style="margin: 0; font-size: 11px; color: #1C1C1E; line-height: 1.4;">Volledig operationeel en direct gekoppeld aan de database.</p>
              </div>
            </div>

            <div style="display: flex; gap: 12px; background: rgba(255, 255, 255, 0.4); padding: 10px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.2);">
              <span style="font-size: 24px;">🩸</span>
              <div>
                <h5 style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #0f2c5a; opacity: 0.6;">Storing / Buiten Gebruik</h5>
                <p style="margin: 0; font-size: 11px; color: #1C1C1E; line-height: 1.4;">Winterafsluiting, onderhoud of bekende storing.</p>
              </div>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(15, 44, 90, 0.08); padding-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            <h5 style="margin: 8px 0 2px 0; font-size: 10px; font-weight: 800; color: #0f2c5a; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em;">Bediening</h5>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #1C1C1E;"><span style="font-size: 16px;">🛰️</span> Kaart centreren op je GPS locatie.</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #1C1C1E;"><span style="font-size: 16px;">🔎</span> Storingsfilter: tik om defecte kranen te verbergen.</div>
          </div>
        </div>
      </div>
    </div>

    <style>
      @keyframes water-bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }
      .water-user-marker { background: none; border: none; }
      .water-emoji-icon { background: none; border: none; }
    </style>
  `,

  init() {
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => this.setupWaterMap();
      document.head.appendChild(script);
    } else {
      this.setupWaterMap();
    }
  },

  setupWaterMap() {
    const BASE_BOTTOM = 180;      
    const GPS_OPEN_OFFSET = 220;  

    const loadingEl = document.getElementById('water-loading');
    const zoomWarningEl = document.getElementById('water-zoom-warning');
    const btnLegend = document.getElementById('water-btn-legend');
    const btnFilter = document.getElementById('water-btn-filter');
    const btnLocation = document.getElementById('water-btn-location');
    
    const sheetEl = document.getElementById('water-details-sheet');
    const sheetClose = document.getElementById('water-details-close');
    const sheetEmoji = document.getElementById('water-details-emoji');
    const sheetDistTxt = document.getElementById('water-details-dist-txt');
    const sheetBadge = document.getElementById('water-details-badge');
    const sheetCity = document.getElementById('water-details-city');
    const sheetDesc = document.getElementById('water-details-desc');
    const sheetRoute = document.getElementById('water-details-route');

    const modalLegend = document.getElementById('water-legend-modal');
    const modalLegendClose = document.getElementById('water-legend-close');

    sheetEl.style.bottom = `${BASE_BOTTOM}px`;
    btnLocation.style.bottom = `${BASE_BOTTOM}px`;

    let map = null;
    let userMarker = null;
    let userCoords = [52.0907, 5.1214];
    
    // rawData bevat nu de AFGESLANKTE objecten, geen logge GeoJSON meer
    let rawData = []; 
    let hideStorings = false;
    const activeMarkers = new Map();
    let debounceTimer = null;

    // v3 is extreem belangrijk: hiermee negeren we de oude, zware cache van de gebruiker!
    const CACHE_KEY = 'rivm_water_points_data_v3';
    const CACHE_TTL = 24 * 60 * 60 * 1000;

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const getNavigationLink = (lat, lon) => {
      const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      return isApple ? `maps://?q=Drinkwaterpunt&ll=${lat},${lon}` : `http://maps.google.com/?q=${lat},${lon}&nav=1`;
    };

    const showSheet = (point) => {
      sheetEmoji.innerText = point.isStoring ? '🩸' : '💧';
      sheetDistTxt.innerText = point.distanceLabel;
      sheetCity.innerText = point.city;
      sheetDesc.innerText = point.desc;
      sheetRoute.href = getNavigationLink(point.lat, point.lon);

      if (point.isStoring) {
        sheetBadge.innerText = point.type;
        sheetBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        sheetBadge.style.color = '#dc2626';
      } else {
        sheetBadge.innerText = 'Operationeel';
        sheetBadge.style.background = 'rgba(15, 44, 90, 0.1)';
        sheetBadge.style.color = '#0f2c5a';
      }

      sheetEl.style.display = 'flex';
      btnLocation.style.bottom = `${BASE_BOTTOM + GPS_OPEN_OFFSET}px`; 
      setTimeout(() => {
        sheetEl.style.transform = 'translateY(0)';
        sheetEl.style.opacity = '1';
      }, 10);
    };

    const hideSheet = () => {
      sheetEl.style.transform = 'translateY(20px)';
      sheetEl.style.opacity = '0';
      btnLocation.style.bottom = `${BASE_BOTTOM}px`; 
      setTimeout(() => { sheetEl.style.display = 'none'; }, 300);
    };

    const updateVisibleMarkers = () => {
      if (!map) return;

      const currentZoom = map.getZoom();
      if (currentZoom < 11) {
        zoomWarningEl.style.display = 'block';
        activeMarkers.forEach(marker => map.removeLayer(marker));
        activeMarkers.clear();
        return;
      }
      zoomWarningEl.style.display = 'none';

      if (rawData.length === 0) return;

      const mapCenter = map.getCenter();
      const bounds = map.getBounds();
      
      const south = bounds.getSouth();
      const north = bounds.getNorth();
      const west = bounds.getWest();
      const east = bounds.getEast();

      // Filteren op de schone 'point' objecten in plaats van complexe GeoJSON features
      const visiblePoints = rawData.filter(point => {
        if (point.lat < south || point.lat > north || point.lon < west || point.lon > east) return false;

        if (hideStorings) {
          const typeLower = point.type.toLowerCase();
          if (typeLower.includes('storing') || typeLower.includes('buiten gebruik')) {
            return false;
          }
        }
        return true;
      });

      const pointsToDisplay = visiblePoints
        .map(point => {
          const isStoring = point.type.toLowerCase().includes('storing') || point.type.toLowerCase().includes('buiten gebruik');
          const distToCenter = calculateDistance(mapCenter.lat, mapCenter.lng, point.lat, point.lon);
          const id = `${point.lat}_${point.lon}`;
          return { point, id, isStoring, distToCenter };
        })
        .sort((a, b) => a.distToCenter - b.distToCenter)
        .slice(0, 65); 

      const targetIds = new Set(pointsToDisplay.map(p => p.id));

      activeMarkers.forEach((marker, id) => {
        if (!targetIds.has(id)) {
          map.removeLayer(marker);
          activeMarkers.delete(id);
        }
      });

      pointsToDisplay.forEach((item) => {
        if (activeMarkers.has(item.id)) return; 

        const markerEmoji = item.isStoring ? '🩸' : '💧';
        const marker = L.marker([item.point.lat, item.point.lon], {
          icon: L.divIcon({
            className: 'water-emoji-icon',
            html: `<div style="font-size: 26px; text-align: center; line-height: 32px; filter: drop-shadow(0 2px 5px rgba(15,44,90,0.25));">${markerEmoji}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          })
        }).addTo(map);

        marker.on('click', () => {
          const distanceToUser = calculateDistance(userCoords[0], userCoords[1], item.point.lat, item.point.lon);
          showSheet({
            city: item.point.city,
            desc: item.point.desc,
            type: item.point.type,
            isStoring: item.isStoring,
            lat: item.point.lat,
            lon: item.point.lon,
            distanceLabel: `${distanceToUser.toFixed(1)} km`
          });
          map.panTo([item.point.lat, item.point.lon]);
        });

        activeMarkers.set(item.id, marker);
      });
    };

    const fetchWaterPoints = async () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data?.length > 0) {
            rawData = parsed.data;
            loadingEl.style.opacity = '0';
            setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
            updateVisibleMarkers();
            return;
          }
        } catch (e) {
          console.warn('Cache defect of oude versie, herstarten live download...');
        }
      }

      try {
        const response = await fetch('https://data.rivm.nl/geo/alo/wfs?request=GetFeature&service=WFS&version=1.1.0&outputFormat=application%2Fjson&typeName=alo:rivm_drinkwaterkranen_actueel');
        const rawJson = await response.json();
        
        // HET DATA DIEET: Meteen fileren voordat het de opslag in gaat
        rawData = (rawJson.features || []).map(f => {
          const props = f.properties || {};
          return {
            lat: props.latitude,
            lon: props.longitude,
            city: props.plaats || 'Onbekende locatie',
            desc: props.beschrijvi || props.beschrijving || 'Geen beschrijving beschikbaar',
            type: props.type || 'Regulier'
          };
        }).filter(p => p.lat && p.lon); // Zorg dat we geen lege coördinaten opslaan
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: rawData
        }));
      } catch (err) {
        console.error('RIVM data laden mislukt:', err);
      } finally {
        loadingEl.style.opacity = '0';
        setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
        updateVisibleMarkers();
      }
    };

    const initMapInstance = () => {
      map = L.map('water-map', { zoomControl: false, maxZoom: 18, minZoom: 6 }).setView(userCoords, 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO'
      }).addTo(map);

      userMarker = L.marker(userCoords, {
        icon: L.divIcon({
          className: 'water-user-marker',
          html: `<div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
                  <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #007AFF; animation: water-bounce 1s infinite alternate; opacity: 0.4;"></div>
                  <div style="position: relative; width: 12px; height: 12px; border-radius: 50%; background: #007AFF; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin: 4px;"></div>
                 </div>`
        })
      }).addTo(map);

      const handleMapMove = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateVisibleMarkers, 150);
      };

      map.on('moveend', handleMapMove);
      map.on('zoomend', handleMapMove);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          userCoords = [pos.coords.latitude, pos.coords.longitude];
          userMarker.setLatLng(userCoords);
          map.setView(userCoords, 14);
          fetchWaterPoints();
        }, () => {
          fetchWaterPoints();
        });
      } else {
        fetchWaterPoints();
      }
    };

    btnLocation.addEventListener('click', () => {
      if (map) map.setView(userCoords, 14, { animate: true });
    });

    btnFilter.addEventListener('click', () => {
      hideStorings = !hideStorings;
      if (hideStorings) {
        btnFilter.style.background = '#0f2c5a';
        btnFilter.style.color = '#ffffff';
      } else {
        btnFilter.style.background = 'rgba(255, 255, 255, 0.65)';
        btnFilter.style.color = '#000000';
      }
      updateVisibleMarkers();
    });

    btnLegend.addEventListener('click', () => {
      modalLegend.style.pointerEvents = 'auto';
      modalLegend.style.opacity = '1';
    });

    modalLegendClose.addEventListener('click', () => {
      modalLegend.style.pointerEvents = 'none';
      modalLegend.style.opacity = '0';
    });

    sheetClose.addEventListener('click', hideSheet);

    initMapInstance();
  }
};