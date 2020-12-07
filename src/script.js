let todaysDate = new Date();

function displayDate(date) {

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = weekday[date.getDay()];
let currentDate = (`0${date.getDate()}`).slice(-2);
let currentMonth = date.getMonth()+1;
let currentYear = date.getFullYear();
let currentHour = date.getHours();
let currentMins = (`0${date.getMinutes()}`).slice(-2);

return(`Last updated ${currentDay} ${currentDate}/${currentMonth}/${currentYear} ${currentHour}:${currentMins}`);
}

let dateHeader = document.querySelector("#todays-date");
dateHeader.innerHTML = displayDate(todaysDate);

//

function convertToFahr(event) {
  event.preventDefault();
  let fahrTemperature = Math.round((celsiusTemperature * 9/5) + 32);
  document.querySelector("#temp-val").innerHTML = `${fahrTemperature}`;
  document.querySelector("#fahr").innerHTML = ` °F`;
  document.querySelector("#cels").innerHTML = ` C`;
  changeFahr.classList.remove("inactive");
  changeFahr.classList.add("active");
  changeCels.classList.remove("active");
  changeCels.classList.add("inactive");

}


function convertToCels(event) {
  event.preventDefault();
  document.querySelector("#temp-val").innerHTML = `${celsiusTemperature}`;
  document.querySelector("#cels").innerHTML = ` °C`;
  document.querySelector("#fahr").innerHTML = ` F`;
  changeCels.classList.remove("inactive");
  changeCels.classList.add("active");
  changeFahr.classList.remove("active");
  changeFahr.classList.add("inactive");

let changeFahr = document.querySelector("#fahr")
changeFahr.addEventListener("click", convertToFahr);

let changeCels = document.querySelector("#cels")
changeCels.addEventListener("click", convertToCels);

let celsiusTemperature = null;

//

function displayWeather(response) {
  let currentIcon = document.querySelector(".current-weather-icon");
  document.querySelector("#temp-val").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML = response.data.weather[0].description;
  currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  // currentIcon.setAttribute("src", `media/${response.data.weather[0].icon}.png`);

  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`)
  celsiusTemperature = Math.round(response.data.main.temp);
  console.log(celsiusTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "69c91905cd6e11cf61e752d7ac98b13d";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

function searchLocation(position) {
 let latitude = position.coords.latitude;
 let longitude = position.coords.longitude;
 let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
 let units = "metric";
 let apiKey = "69c91905cd6e11cf61e752d7ac98b13d";
 let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
 axios.get(apiUrl).then(displayWeather);
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocationWeather);
