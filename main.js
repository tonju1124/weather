import "./index.css";

// const apiKey = import.meta.env.VITE_API_KEY
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=Banting&appid=${apiKey}&unit=metric`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error fetching the weather data:', error);
//     });

const weatherImg = document.querySelector('.weather-img img.weather-icon');

weatherImg.src = 'svg/sun-w-clouds.svg';
weatherImg.alt = 'Sun with clouds';
