"use strict";

/*
    Initialisatie van de applicatie 
    op het moment dat de DOM geladen is
*/

window.onload = initGlobal();

function initGlobal() {
    // eventuele event listeners; volgen hier (denk aan on clicks)
    // document.getElementById("voorbeeld").addEventListener("click", function() {
    //      logica hier...
    // })

    // data bij initialisatie; volgt hier
    getLocationCoordinates("Utrecht").then(function (data) {
        getWeatherData(data.results[0].latitude, data.results[0].longitude).then(function (data) {
            //renderData(data);
            console.log(data);
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
    const url = `weathericons.json`;
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