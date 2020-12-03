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
let currentDate = date.getDate();
let currentMonth = date.getMonth()+1;
let currentYear = date.getFullYear();
let currentHour = date.getHours();
let currentMins = (`0${date.getMinutes()}`).slice(-2);

return(`${currentDay} ${currentDate}/${currentMonth}/${currentYear} ${currentHour}:${currentMins}`);
}

let dateHeader = document.querySelector("#todays-date");
dateHeader.innerHTML = displayDate(todaysDate);

//

function convertToFahr() {
  let fahr = document.querySelector("#fahr");
  let cels = document.querySelector("#cels");
  let tempValue = document.querySelector("#temp-val");
  fahr.innerHTML = `<span style='color:#45a5f2'>°F</span>`;
  cels.innerHTML = `<span style='color:grey'>C</span>`;
  tempValue.innerHTML = `54`;
}

let changeFahr = document.querySelector("#fahr")
changeFahr.addEventListener("click", convertToFahr);

function convertToCels() {
  let cels = document.querySelector("#cels");
  let fahr = document.querySelector("#fahr");
  let tempValue = document.querySelector("#temp-val");
  cels.innerHTML = `<span style='color:#45a5f2'>°C</span>`;
  fahr.innerHTML = `<span style='color:grey'>F</span>`;
  tempValue.innerHTML = `12`;
}

let changeCels = document.querySelector("#cels")
changeCels.addEventListener("click", convertToCels);

//

function displayWeather(response) {
  document.querySelector("#temp-val").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
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