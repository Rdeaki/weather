var inputEl = document.getElementById("city-input");
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-history");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");4
var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history"); 
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory)

var apiKey = "e128c304dce0ed805b85466358ba3039";

var getCurrentWeather = function(cityName) {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e128c304dce0ed805b85466358ba3039" + cityName + "&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        });
    });
};

var displayWeather = function(data, cityName) {
    var currentDate = moment().format("MMMM Do, YYYY");
    nameEl.textContent = cityName + " " + currentDate;
};


var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName);
        inputEl.value = "";
        localStorage.setItem("cityname", cityName);

    } else {
        alert("please enter a City Name");
    }
};

searchEl.addEventListener("click", formSubmitHandler);