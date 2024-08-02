import "./index.css";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Banting&appid=${process.env.API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
    });