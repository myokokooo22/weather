const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.weather-temp p');
const weatherDesc = document.querySelector('.weather-desc p');
const windSpeed = document.querySelector('.wind-speed p');
const pinpoint = document.querySelector('.location p');

const weather = {};

const KELVIN = 273;
// API KEY
const key = "58ae3b92f39d00badee0c80eebfd674a";

const nav = navigator.geolocation.getCurrentPosition(setPosition);

function setPosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(latitude, longitude)
    getWeather(latitude,longitude);
}
 
function getWeather(latitude,longitude){
     let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
   // let api = 'https://api.openweathermap.org/data/2.5/weather?lat=16.8329216&lon=96.17408&appid=58ae3b92f39d00badee0c80eebfd674a';

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature = Math.floor(data.main.temp - KELVIN);
        weather.icon = data.weather[0].icon;
        weather.description = data.weather[0].description;
        weather.windspeed = data.wind.speed;
        weather.city =  data.name;
        weather.country = data.sys.country;

        // console.log(data.name, data.wind.speed);   
    })
    .then(function(){
        displayWeather();
    })
    .catch(function(error){
        console.log('Catch Inside:', error);
    })
};

function displayWeather(){
    weatherIcon.innerHTML = `<img src='./icons/${weather.icon}.png'/>`;
    weatherTemp.innerHTML = `${weather.temperature}°<span>C</span>`;
    weatherDesc.innerHTML = `${weather.description}`;
    windSpeed.innerHTML = `${weather.windspeed} <span>MPH</span>`;
    pinpoint.innerHTML = `${weather.city}, ${weather.country}`;
}
