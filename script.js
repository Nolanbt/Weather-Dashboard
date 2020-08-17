var cities = [];
const keyAPI = "8070a1de01ef42e1b1b72c9614f183cf"
let lat;
let lon;

let currentCity = $("#currentCity");
let temp = $("#temp");
let humidity = $("#humidity");
let windSpeed = $("#windSpeed");

function displayWeatherInfo(event) {
    event.preventDefault();
    var city = $(this).data("name");
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`
    // Current Weather
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let tempK = (response.main.temp)
        let tempF = (tempK - 273.15) * 1.80 + 32;
        currentCity.text(`City: ${response.name}`)
        temp.text(`Temperature: ${tempF.toFixed(2)} F`);
        humidity.text(`Humidity: ${response.main.humidity}`);
        windSpeed.text(`Wind Speed: ${response.wind.speed} MPH`);
        lat = response.coord.lat;
        lon = response.coord.lon;
    });

    var query2URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyAPI}`
    // 5 Day Forecast
    $.ajax({
        url: query2URL,
        method: "GET"
    }).then(function (response2) {
        for (let i = 0; i < 5; i++) {
            let tempK = (response2.list[i].main.temp);
            let tempF = (tempK - 273.15) * 1.80 + 32;
            let forecastDay = $("<div>");
            forecastDay.text(`Day ${i+1}`)
            let forecastTemp = $("<p>");
            forecastTemp.text(`Temperature ${tempF.toFixed(2)} F`);
            forecastDay.append(forecastTemp);
            $("#forecast").append(forecastDay);
        }
    });
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();
    let $city = $("#newCity").val().trim()
    cities.push($city);
    renderCityList();
})

function renderCityList() {
    $("#searchedCities").empty();
    for (let i = 0; i < cities.length; i++) {
        var a = $("<li>");
        a.addClass("addedCity");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#searchedCities").append(a);
    }
}

$(document).on("click", ".addedCity", displayWeatherInfo);

renderCityList();
