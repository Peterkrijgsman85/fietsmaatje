export function renderWeather(container) {
    container.innerHTML = `
        <div class="h-full w-full bg-orange-200 p-6 flex flex-col items-center justify-center">
            <h1 class="text-4xl font-bold text-orange-900">🌤️ Weer</h1>
            <p class="text-orange-800">Pagina geladen: Oranje</p>
        </div>
    `;
}
