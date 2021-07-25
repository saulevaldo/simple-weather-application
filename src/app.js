function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = Math.round(celsius);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionOfCondition = document.querySelector("#description");
  descriptionOfCondition.innerHTML = response.data.weather[0].description;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = response.data.main.humidity;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = Math.round(response.data.wind.speed);

  celsius = response.data.main.temp;

  let date = document.querySelector("#date");
  date.innerHTML = displayDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "abbaa4ac3af826a424d9c34cf8975be8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  search(cityInput.value);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

function changeToFahrenheit(event) {
  event.preventDefault();
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function changeToCelsius(event) {
  event.preventDefault();
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsius);
}

let celsius = null;

let showFahrenheit = document.querySelector("#fahrenheit");
showFahrenheit.addEventListener("click", changeToFahrenheit);

let showCelsius = document.querySelector("#celsius");
showCelsius.addEventListener("click", changeToCelsius);

search("Oslo");
