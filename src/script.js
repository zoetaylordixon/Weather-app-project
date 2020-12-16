// current date

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

// conversion

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
}

let changeFahr = document.querySelector("#fahr")
changeFahr.addEventListener("click", convertToFahr);

let changeCels = document.querySelector("#cels")
changeCels.addEventListener("click", convertToCels);

let celsiusTemperature = null;

// search engine

function displayWeather(response) {
  let currentIcon = document.querySelector(".current-weather-icon");
  document.querySelector("#temp-val").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#condition").innerHTML = response.data.weather[0].description;
  currentIcon.setAttribute("src", `media/${response.data.weather[0].icon}.png`);
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`)
  celsiusTemperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(celsiusTemperature);
}

function displayForecast(response) {
let firstIcon = document.querySelector("#img-first");
let secondIcon = document.querySelector("#img-second");
let thirdIcon = document.querySelector("#img-third");
let fourthIcon = document.querySelector("#img-fourth");
let fifthIcon = document.querySelector("#img-fifth");
firstIcon.setAttribute("src", `media/${response.data.list[0].weather[0].icon}.png`);
firstIcon.setAttribute("alt", `${response.data.list[0].weather[0].description}`);
secondIcon.setAttribute("src", `media/${response.data.list[1].weather[0].icon}.png`);
secondIcon.setAttribute("alt", `${response.data.list[1].weather[0].description}`);
thirdIcon.setAttribute("src", `media/${response.data.list[2].weather[0].icon}.png`);
thirdIcon.setAttribute("alt", `${response.data.list[2].weather[0].description}`);
fourthIcon.setAttribute("src", `media/${response.data.list[3].weather[0].icon}.png`);
fourthIcon.setAttribute("alt", `${response.data.list[3].weather[0].description}`);
fifthIcon.setAttribute("src", `media/${response.data.list[4].weather[0].icon}.png`);
fifthIcon.setAttribute("alt", `${response.data.list[4].weather[0].description}`);
document.querySelector("#temp-first").innerHTML = `${Math.round(response.data.list[0].main.temp)}°`;
document.querySelector("#temp-second").innerHTML = `${Math.round(response.data.list[1].main.temp)}°`;
document.querySelector("#temp-third").innerHTML = `${Math.round(response.data.list[2].main.temp)}°`;
document.querySelector("#temp-fourth").innerHTML = `${Math.round(response.data.list[3].main.temp)}°`;
document.querySelector("#temp-fifth").innerHTML = `${Math.round(response.data.list[4].main.temp)}°`;

document.querySelector("#time-first").innerHTML = response.data.list[0].dt;
console.log(response);

}
  // ☑️ add ids to img temp time
  // ☑️ docquesel each image temp time on html
  // ☑️ img: replace src attribute w local img link to response.data.list[0].weather[0].icon png
  // ☑️ img: replace alt attribute w response.data.list[0].weather[0].description
  // ☑️ temp: replace innerhtml w response.data.list[0].main.temp rounded
  // time: replace innerhtml w response.data.list[0].dt converted to real time or dt_txt
  // add to conversion functions 

function searchCity(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/";
  let currentWeather = "weather";
  let forecastWeather = "forecast";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "69c91905cd6e11cf61e752d7ac98b13d";
  let apiUrl = `${apiEndpoint}${currentWeather}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
  //forecast
  apiUrl = `${apiEndpoint}${forecastWeather}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

// current location

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
