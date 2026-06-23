import { renderWeather } from './modules/weather.js';
import { renderWater } from './modules/water.js';
import { renderPlanner } from './modules/planner.js';

const routes = {
    weather: renderWeather,
    water: renderWater,
    planner: renderPlanner
};

window.router = {
    navigate: (page) => {
        const container = document.getElementById('main-content');
        container.innerHTML = ''; // Maak leeg
        routes[page](container);  // Roep de functie van de module aan
    }
};

// Start de app op de weer-pagina
window.addEventListener('DOMContentLoaded', () => {
    window.router.navigate('weather');
});
