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
var cityStoredList = [];


var apiKey = "e128c304dce0ed805b85466358ba3039";

var getCurrentWeather = function(cityName) {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var cityName = data.name;
            displayWeather(data, cityName)
            storeCity(cityName);
        });
    });
};

var displayWeather = function(data, cityName) {
    var currentDate = moment().format("MMMM Do, YYYY");
    nameEl.textContent = cityName + " " + currentDate;
};

var displayForecast = function (cityName) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?q=" + cityName + "&exclude=minutely,houry,alerts&appid=" + apiKey;

    fetch(forecastURL)
    .then(response => response.json())
    .then(response => console.log(response));
};

var storeCity = function(saveName) {
    cityStoredList.push(saveName);
    localStorage.setItem("cityList", JSON.stringify(cityStoredList));
    cityStoredList = JSON.parse(localStorage.getItem("cityList"));
    console.log(cityStoredList);
};

function init() {
    if(JSON.parse(localStorage.getItem("cityList")) !== null) {
        cityStoredList= JSON.parse(localStorage.getItem("cityList"));
    } else {
        localStorage.setItem("cityList", json.stringify([]));
    }
}


var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName);
        inputEl.value = "";
    }

    else {
        alert("please enter a City Name");
    }
};

searchEl.addEventListener("click", formSubmitHandler);
init();