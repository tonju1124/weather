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


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLocalTime(timezoneOffset) {
    const localTime = new Date(Date.now() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

searchBtn.addEventListener('click', () => {
    const location = searchBar.value.trim();
    if(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&unit=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            locationElement.textContent = data.name;
            timeElement.textContent = getLocalTime(data.timezone);
            temperatureElement.textContent = Math.round(data.main.temp - 273.15) + '°C';
            weatherDescription.textContent =  capitalizeFirstLetter(data.weather[0].description);
            windReading.textContent = data.wind.speed + ' m/s';
            humidityReading.textContent = data.main.humidity + ' %';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
    } else {
        alert('Location not found');
    }
});


    weatherImg.src = 'svg/sun-w-clouds.svg';
    weatherImg.alt = 'Sun with clouds';
