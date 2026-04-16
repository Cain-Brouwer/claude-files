"use strict";

// Global variables
let weatherIcons = null;

// Initialize application when DOM is loaded
window.onload = initGlobal;

function initGlobal() {
    // Fetch weather icons first
    getWeatherIcons().then(icons => {
        weatherIcons = icons;
        
        // Then initialize the app with location data
        getLocationCoordinates("Utrecht").then(function(data) {
            getWeatherData(data.results[0].latitude, data.results[0].longitude).then(function(data) {
                renderData(data);
            });
        });
    }).catch(error => {
        console.error('Error loading weather icons:', error);
        // Still try to initialize app without icons
        weatherIcons = {};
        
        getLocationCoordinates("Utrecht").then(function(data) {
            getWeatherData(data.results[0].latitude, data.results[0].longitude).then(function(data) {
                renderData(data);
            });
        });
    });
}

/*
    Functies voor het ophalen van data
*/

async function getLocationCoordinates(city) {
    // Ophalen locatie data: stad locatie, 
    // getSearchedCity(city:string)
    const apiUri = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    try {
        const response = await fetch(apiUri);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
}

async function getWeatherData(latitude, longitude) {
    // Ophalen weer data: locatie coordinaten 
    // getWeatherData(latitude:number, longitude:number)
    const apiUri = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`;
    try {
        const response = await fetch(apiUri);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getWeatherIcons() {
    // Ophalen externe data: Weather icons
    // Deze data wordt gebruikt om de juiste iconen te tonen en current.descr te vullen
    const url = `descriptions.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
}

/*
    Weergeven data.
*/

async function renderData(data) {
    // we gaan hier de data weergeven op de pagina. 
    // om het overzichtelijk te houden gebruiken we hier verschillende functies voor de verschillende onderdelen.
    console.log(data);

    // current weather
    displayCurrentWeather(data.current, weatherIcons)

    // hourly weather
    displayHourlyWeather(data.hourly);

    // daily weather (met behulp van chart.js)
    const chartContainer = document.getElementById('weather-graph');
    createChart(data.daily, chartContainer);
}

/*
    Weergeven huidige gegevens.
*/
function displayCurrentWeather(data, iconData) {
    // Haal het juiste icoon op basis van de dag/nacht status
    let weatherIcon;
    if (data.is_day) {
        weatherIcon = iconData[data.weather_code.toString()].day.image;
    } else {
        weatherIcon = iconData[data.weather_code.toString()].night.image;
    }

    // Vul de DOM met de juiste data
    document.getElementById('current-weercode').src = weatherIcon;
    document.getElementById('current-weercode').setAttribute('alt', iconData[data.weather_code.toString()].day.description);
    document.getElementById('current-temp').textContent = Math.round(data.temperature_2m) + '°C';
    document.getElementById('current-feelslike').textContent = Math.round(data.apparent_temperature) + '°C';
    document.getElementById('current-precip').textContent = data.precipitation + ' mm';
    document.getElementById('current-description').textContent = iconData[data.weather_code.toString()][data.is_day ? 'day' : 'night'].description;
}

/*
    Weergeven gegevens per uur.
*/
function displayHourlyWeather(data) {
    // Maak een container voor de uurgegevens als deze nog niet bestaat
    let hourlyContainer = document.getElementById('hourly-container');
    if (!hourlyContainer) {
        hourlyContainer = document.createElement('div');
        hourlyContainer.id = 'hourly-container';
        document.getElementById('hourly-weather').appendChild(hourlyContainer);
    }
    
    // Wis vorige inhoud
    hourlyContainer.innerHTML = '';
    
    // Voeg titel toe
    const title = document.createElement('h3');
    title.textContent = 'Uurverwachting';
    hourlyContainer.appendChild(title);
    
    // Maak een container voor de uuritems
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'hourly-items-container';
    hourlyContainer.appendChild(itemsContainer);
    
    // Loop door de data en maak voor elk uur een element aan. (komende 5 uur)
    const hoursToShow = Math.min(5, data.time.length);
    for (let i = 0; i < hoursToShow; i++) {
        // Bepaal of het dag of nacht is voor dit uur
        const time = new Date(data.time[i]);
        const isDay = time.getHours() >= 6 && time.getHours() < 20; // Simpele dag/nacht bepaling
        
        // Maak uur-element aan
        const hourElement = document.createElement('div');
        hourElement.className = 'hourly-item';
        
        // Tijd
        const timeElement = document.createElement('div');
        timeElement.className = 'hourly-time';
        timeElement.textContent = time.getHours().toString().padStart(2, '0') + ':00';
        hourElement.appendChild(timeElement);
        
        // Icoon
        const iconElement = document.createElement('img');
        iconElement.className = 'hourly-icon';
        const weatherCode = data.weather_code[i].toString();
        if (weatherIcons && weatherIcons[weatherCode]) {
            iconElement.src = weatherIcons[weatherCode][isDay ? 'day' : 'night'].image;
            iconElement.alt = weatherIcons[weatherCode][isDay ? 'day' : 'night'].description;
        } else {
            // Fallback
            iconElement.src = isDay ? 'http://openweathermap.org/img/wn/01d@2x.png' : 'http://openweathermap.org/img/wn/01n@2x.png';
            iconElement.alt = isDay ? 'Sunny' : 'Clear';
        }
        hourElement.appendChild(iconElement);
        
        // Temperatuur
        const tempElement = document.createElement('div');
        tempElement.className = 'hourly-temp';
        tempElement.textContent = Math.round(data.temperature_2m[i]) + '°C';
        hourElement.appendChild(tempElement);
        
        // Neerslagkans
        const precipElement = document.createElement('div');
        precipElement.className = 'hourly-precip';
        precipElement.textContent = data.precipitation_probability[i] + '%';
        hourElement.appendChild(precipElement);
        
        // Voeg toe aan container
        itemsContainer.appendChild(hourElement);
    }
}

/*
    Weergeven gegevens per dag.
*/
function createChart(data, element) {
    // Maak hier een grafiek met de data en het element.
    // Gebruik chart.js om minimale en maximale temperaturen per dag uit de data te laten zien zoals in opdracht 1 beschreven.
    
    // Controleer of Chart.js beschikbaar is
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Verwijder bestaande canvas en maak nieuwe aan
    element.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'weekly-chart';
    element.appendChild(canvas);
    
    // Bereid data voor (maximaal 7 dagen)
    const daysToShow = Math.min(7, data.time.length);
    const labels = data.time.slice(0, daysToShow).map(dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL', { weekday: 'short' });
    });
    
    const maxTemps = data.temperature_2m_max.slice(0, daysToShow);
    const minTemps = data.temperature_2m_min.slice(0, daysToShow);
    
    // Maak de chart
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Maximale Temperatuur',
                    data: maxTemps,
                    borderColor: '#ff6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    fill: false,
                    borderWidth: 2
                },
                {
                    label: 'Minimale Temperatuur',
                    data: minTemps,
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1,
                    fill: false,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperatuurverloop komende dagen'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperatuur (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Dag'
                    }
                }
            }
        }
    });
}