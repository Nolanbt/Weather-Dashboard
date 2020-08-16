var cities = ["Houston"];
const keyAPI = "8070a1de01ef42e1b1b72c9614f183cf"

let currentCity = $("#currentCity");
let temp = $("#temp");
let humidity = $("#humidity");
let windSpeed = $("#windSpeed");

function displayWeatherInfo(event) {
    event.preventDefault();
    var city = $(this).data("name");
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`

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
        var a = $("<button>");
        a.addClass("addedCity");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#searchedCities").append(a);
    }
}

$(document).on("click", ".addedCity", displayWeatherInfo);

renderCityList();