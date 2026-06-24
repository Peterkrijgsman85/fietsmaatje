# Fietsmaatje - Elke rit begint hier

Fietsmaatje is een lichtgewicht, mobielvriendelijke webapplicatie speciaal ontworpen voor wielrenners en gravelbikers. De app combineert live weersinformatie, slimme calculators en een interactieve kaart om je optimaal voor te bereiden op je volgende rit en je ritverslagen achteraf te automatiseren.

## 🚀 Kenmerken

### Live Weer & Fiets-Score
* **Actuele Weerdata:** Direct inzicht in temperatuur, gevoelstemperatuur, windrichting en windsnelheid (in km/u en Bft) op basis van je live GPS-locatie via de *Open-Meteo API*.
* **Fiets-Score:** Een algoritme dat het actuele weer beoordeelt met een cijfer van 1 tot 10, strak afgesteld op de elementen waar je als fietser mee te maken krijgt (zoals tegenwind en neerslag).
* **WBGT Sportwaarde:** Live berekening van de *WetBulb Globe Temperature* ( outdoor sportindex) die rekening houdt met luchtvochtigheid, zonnestraling en windkoeling voor een veilige inschatting bij warme dagen.

### Drinkwaterpunten Kaart
* Een interactieve, rustige kaartstijl (*CartoDB Voyager* via *Leaflet.js*) die je live GPS-locatie (blauwe stip) toont.
* Laadt realtime duizenden RIVM-drinkwaterpunten in en filtert automatisch de **15 dichtstbijzijnde tappunten** om vastlopers op je telefoon te voorkomen.
* Inclusief handige "Open in Maps"-knop per kaartje om direct de navigatie te starten.

### Voedings- & Hydratatieplanner
* Voer de geplande ritduur in en krijg direct een gericht advies voor je energie-innname.
* Berekent de totale hoeveelheid benodigde koolhydraten (KH) en het aantal bidons.
* Biedt een concrete verdeling in herkenbare sportvoeding: bananen, krentenbollen, energierepen of gels.

### Dynamisch Kledingadvies
* Geeft direct aan of je kunt vertrekken in een **Zomerkit**, **Mid-season** kleding of volledige **Winterkleding**.
* Inclusief slimme indicators die je waarschuwen wanneer het verstandig is om een extra windjack mee te nemen tegen een frisse wind.

### Bandenspanningscalculator
* Berekent nauwkeurig de optimale druk voor je voor- en achterband.
* Houdt rekening met je totale gewicht, de exacte bandbreedte (in mm), het type band en de ondergrond (bijv. asfalt of gravel).

### Ritverslag Generator (Strava Logs)
* **Single Mode & Route Mode:** Genereer een weer-update voor een vaste locatie of een route van A naar B.
* Haalt de historische/actuele weerdata op voor de gekozen datum en starttijd.
* Maakt direct twee kant-en-klare verslagen (kort en uitgebreid) die je met één klik naar je klembord kopieert om direct in **Strava** of je trainingslogboek te plakken.

## 🛠️ Technologieën

Dit project is gebouwd als een snelle, serverloze statische webpagina:

* **HTML5 / CSS3** (met flexibele grid- & kaartindelingen)
* **JavaScript (Vanilla ES6+)** (asynchrone API-afhandeling, geolocatie en state-management)
* **Leaflet.js** (open-source interactieve kaarten)
* **Open-Meteo API** (gratis, nauwkeurige weersvoorspellingen zonder API-key)
* **Nominatim OpenStreetMap API** (voor reverse geocoding van je huidige plaatsnaam)

## 📂 Databronnen

* De drinkwaterpunten zijn afkomstig van het RIVM.
* Bron Drinkwaterpunten: https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/55b7cf89-9f51-4775-8343-b7626ecfd3dc
