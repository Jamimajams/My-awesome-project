let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}
// Current weather update
function searchLocation(position) {
  let latitude = Math.round(position.coords.latitude * 100) / 100;
  let longitude = Math.round(position.coords.longitude * 100) / 100;
  let coordSearch = document.querySelector("h2");
  coordSearch.innerHTML = `Currently in your area: ${latitude}, ${longitude}`;
  let apiKey = `62231151ce343c4d68652e1617efc22f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

// Search Weather update

function searchWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
  let titleChange = document.querySelector("h2");
  titleChange.innerHTML = ` Currently in ${cityInput.value}`;
}
let searchBox = document.querySelector("#city-form");
searchBox.addEventListener("submit", searchWeather);

// Weather API call

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let dateChange = document.querySelector("#dateTime");
  dateChange.innerHTML = `${formatDate()}`;
  let degrees = document.querySelector(".number");
  degrees.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Windspeed: ${response.data.wind.speed}km/h`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("submit", searchWeather);

function searchCity(city) {
  console.log(city);

  let apiKey = `62231151ce343c4d68652e1617efc22f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
