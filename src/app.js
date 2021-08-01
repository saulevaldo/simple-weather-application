function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
        <div class="forecast-date">
               ${formatDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" 
        alt=""
        width="40">
        <div class="forecast-temps">
            <span class="forecast-max">
                   ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="forecast-min">
                   ${Math.round(forecastDay.temp.min)}°
            </span>
           </div>
       </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "abbaa4ac3af826a424d9c34cf8975be8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionOfCondition = document.querySelector("#description");
  descriptionOfCondition.innerHTML = response.data.weather[0].description;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = response.data.main.humidity;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = displayDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

search("Oslo");
