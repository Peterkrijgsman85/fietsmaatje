export function renderWeather(container) {
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">Weerbericht</h1>
        <div class="bg-white p-6 rounded-2xl shadow-sm">
            <p>Hier komt de API call naar OpenMeteo.</p>
        </div>
    `;
    
    // Voeg hier je specifieke logica toe (bijv. fetch aanroep)
    console.log("Weer module gerenderd");
}
