import "./index.css";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Banting&appid=12e4c81e2939f4c8a9eb65e8985c439a&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
    });