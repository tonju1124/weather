import "./index.css";

const apiKey = import.meta.env.VITE_API_KEY
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector(".search-button")
const weatherImg = document.querySelector('.weather-img img.weather-icon');
const locationElement = document.querySelector('.location');
const timeElement = document.querySelector('.hour');
const temperatureElement = document.querySelector('.temp-readings');
const weatherDescription = document.querySelector('.weather');
const windReading = document.querySelector(".wind-speed-reading")
const humidityReading = document.querySelector(".humidity-percentage")

searchBtn.addEventListener('click', () => {
    const location = searchBar.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Location not found');
    }
});

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const location = searchBar.value;
        if (location) {
            fetchWeatherData(location);
            searchBar.value = '';
        } else {
            alert('Location not found');
        }
    }
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLocalTime(timezoneOffset) {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    return localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&unit=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            locationElement.textContent = data.name;
            const timezoneOffset = data.timezone;
            timeElement.textContent = getLocalTime(timezoneOffset);
            temperatureElement.textContent = Math.round(data.main.temp - 273.15) + '°C';
            weatherDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
            windReading.textContent = data.wind.speed + ' m/s';
            humidityReading.textContent = data.main.humidity + ' %';
            const hours = new Date(Date.now() + timezoneOffset * 1000).getUTCHours();
            const isNight = hours >= 20 || hours < 7;
            const iconPrefix = isNight ? 'night' : 'day';
            weatherImg.src = `svg/${iconPrefix}-${data.weather[0].icon}.svg`;
            weatherImg.alt = data.weather[0].description;


        })
        .catch(error => {
            alert("Location not found");
            console.error('Error fetching the weather data:', error);
            locationElement.textContent = 'Location not found';
            timeElement.textContent = '--:--';
            weatherDescription.textContent = '-';
            windReading.textContent = '-';
            humidityReading.textContent = '-';
            weatherImg.src = 'svg/azusa.svg';
            weatherImg.alt = 'ᓀ‸ᓂ';
        });
}

weatherImg.src = 'svg/day-01d.svg';
weatherImg.alt = 'Sun with clouds';
