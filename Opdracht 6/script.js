"use strict";

// Global variables
let weatherIcons = null;

// Initialize application when DOM is loaded
window.onload = initGlobal;

function initGlobal() {
    // Event listeners
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('locationBtn').addEventListener('click', handleLocation);
    
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

function handleSearch() {
    const cityInput = document.getElementById('locationInput').value.trim();
    console.log('Searching for:', cityInput);  // Debug log
    if (cityInput) {
        getLocationCoordinates(cityInput).then(data => {
            console.log('Location data received:', data);  // Debug log
            if (data && data.results && data.results.length > 0) {
                const lat = data.results[0].latitude;
                const lon = data.results[0].longitude;
                console.log('Coordinates:', lat, lon);  // Debug log
                fetchAndDisplayWeather(lat, lon);
            } else {
                console.log('No results found for:', cityInput);  // Debug log
                showError('Plaats niet gevonden. Probeer een andere plaats.');
            }
        }).catch(error => {
            console.error('Error fetching location:', error);
            showError('Fout bij het opzoeken van de plaats.');
        });
    } else {
        showError('Voer een plaatsnaam in.');
    }
}

function handleLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchAndDisplayWeather(lat, lon);
            },
            error => {
                console.warn('Geolocation not available or denied:', error);
                showError('Kon huidige locatie niet ophalen.');
            }
        );
    } else {
        showError('Geolocatie wordt niet ondersteund door uw browser.');
    }
}

async function fetchAndDisplayWeather(latitude, longitude) {
    showLoading();
    try {
        const weatherData = await getWeatherData(latitude, longitude);
        if (weatherData) {
            renderWeather(weatherData);
        } else {
            showError('Kon weerdata niet ophalen.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Fout bij het ophalen van weerdata.');
    }
}

async function getLocationCoordinates(city) {
    // Ophalen locatie data: stad locatie, 
    // getSearchedCity(city:string)
    const apiUri = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    try {
        const response = await fetch(apiUri);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;  // Re-throw so caller's .catch() handles it
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

function showLoading() {
    const weatherDisplay = document.querySelector('.weather-display');
    weatherDisplay.innerHTML = '<div class="loading">Weerdata wordt opgehaald...</div>';
    
    // Clear existing content
    const currentWeather = document.getElementById('current-weather');
    if (currentWeather) currentWeather.innerHTML = '';
    
    const hourlyWeather = document.getElementById('hourly-weather');
    if (hourlyWeather) hourlyWeather.innerHTML = '';
    
    const weatherGraph = document.getElementById('weather-graph');
    if (weatherGraph) weatherGraph.innerHTML = '';
}

function showError(message) {
    const weatherDisplay = document.querySelector('.weather-display');
    weatherDisplay.innerHTML = `<div class="error">${message}</div>`;
    
    // Clear existing content
    const currentWeather = document.getElementById('current-weather');
    if (currentWeather) currentWeather.innerHTML = '';
    
    const hourlyWeather = document.getElementById('hourly-weather');
    if (hourlyWeather) hourlyWeather.innerHTML = '';
    
    const weatherGraph = document.getElementById('weather-graph');
    if (weatherGraph) weatherGraph.innerHTML = '';
}

function renderWeather(data) {
    // Clear display
    const weatherDisplay = document.querySelector('.weather-display');
    weatherDisplay.innerHTML = '';
    
    // Recreate containers
    const currentWeatherDiv = document.createElement('div');
    currentWeatherDiv.id = 'current-weather';
    weatherDisplay.appendChild(currentWeatherDiv);
    
    const hourlyWeatherDiv = document.createElement('div');
    hourlyWeatherDiv.id = 'hourly-weather';
    weatherDisplay.appendChild(hourlyWeatherDiv);
    
    const weatherGraphDiv = document.createElement('div');
    weatherGraphDiv.id = 'weather-graph';
    weatherDisplay.appendChild(weatherGraphDiv);
    
    // Current weather
    const current = data.current;
    const currentTime = new Date(current.time);
    const isDay = current.is_day === 1;
    
    // Get weather icon and description
    const weatherCode = current.weather_code.toString();
    const iconInfo = getWeatherIconInfo(weatherCode, isDay);
    
    // Build current weather HTML
    currentWeatherDiv.innerHTML = `
        <img id="current-weercode" src="${iconInfo.image}" alt="${iconInfo.description}" width="80">
        <div>
            <div id="current-temp">${Math.round(current.temperature_2m)}°C</div>
            <div id="current-details">
                <p id="current-feelslike-label">Gevoels Temperatuur: <span id="current-feelslike">${Math.round(current.apparent_temperature)}°C</span></p>
                <p id="current-precip-label">Neerslag: <span id="current-precip">${current.precipitation} mm</span></p>
                <p id="current-description">${iconInfo.description}</p>
            </div>
        </div>
    `;
    
    // Hourly forecast (next 6 hours)
    const hourly = data.hourly;
    const hourlyTimes = hourly.time;
    const hourlyTemps = hourly.temperature_2m;
    const hourlyPrecipProb = hourly.precipitation_probability;
    const hourlyCodes = hourly.weather_code;
    
    // Find index of current hour
    const now = new Date();
    const currentHourIndex = hourlyTimes.findIndex(time => {
        const timeDate = new Date(time);
        return timeDate.getHours() === now.getHours() && 
               timeDate.toDateString() === now.toDateString();
    });
    
    // Get next 6 hours (including current if within next 6)
    const hourlyHTML = `
        <h3>Uurverwachting</h3>
        <div class="hourly-items-container">
            ${getNextHoursHTML(hourlyTimes, hourlyTemps, hourlyPrecipProb, hourlyCodes, hourly, 6, currentHourIndex)}
        </div>
    `;
    
    hourlyWeatherDiv.innerHTML = hourlyHTML;
    
    // Render weekly chart
    renderWeeklyChart(data.daily);
}

function getNextHoursHTML(times, temps, precipProb, precip, codes, count, startIndex) {
    let html = '';
    let added = 0;
    let index = startIndex !== -1 ? startIndex : 0;
    
    // If startIndex is -1 (current hour not found), start from beginning
    if (startIndex === -1) {
        index = 0;
    }
    
    while (added < count && index < times.length) {
        const time = new Date(times[index]);
        const hour = time.getHours();
        const isDay = hour >= 6 && hour < 20; // Simple day/night determination
        const weatherCode = codes[index].toString();
        const iconInfo = getWeatherIconInfo(weatherCode, isDay);
        
        html += `
            <div class="hourly-item">
                <div class="hourly-time">${hour}:00</div>
                <img src="${iconInfo.image}" alt="${iconInfo.description}" width="40">
                <div class="hourly-temp">${Math.round(temps[index])}°C</div>
                <div class="hourly-precip">${precipProb[index]}% neerslag</div>
            </div>
        `;
        
        added++;
        index++;
    }
    
    return html;
}

function getWeatherIconInfo(code, isDay) {
    // Default icon (sunny)
    const defaultIcon = {
        day: {
            description: "Sunny",
            image: "http://openweathermap.org/img/wn/01d@2x.png"
        },
        night: {
            description: "Clear",
            image: "http://openweathermap.org/img/wn/01n@2x.png"
        }
    };
    
    if (weatherIcons && weatherIcons[code]) {
        const period = isDay ? 'day' : 'night';
        if (weatherIcons[code][period]) {
            return weatherIcons[code][period];
        }
    }
    
    // Fallback to default
    return isDay ? defaultIcon.day : defaultIcon.night;
}

function renderWeeklyChart(dailyData) {
    const ctx = document.createElement('canvas').getContext('2d');
    const chartContainer = document.getElementById('weather-graph');
    chartContainer.innerHTML = ''; // Clear previous content
    chartContainer.appendChild(ctx.canvas);
    
    // Destroy existing chart if any
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }
    
    // Prepare data for chart (next 7 days)
    const labels = dailyData.time.slice(0, 7).map(dateString => {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric' };
        return date.toLocaleDateString('nl-NL', options);
    });
    
    const maxTemps = dailyData.temperature_2m_max.slice(0, 7);
    const minTemps = dailyData.temperature_2m_min.slice(0, 7);
    
    window.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Max Temperatuur',
                    data: maxTemps,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Min Temperatuur',
                    data: minTemps,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
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
                        text: 'Datum'
                    }
                }
            }
        }
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

