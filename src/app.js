apiKey = "abbaa4ac3af826a424d9c34cf8975be8";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;

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

  console.log(response.data);
}

axios.get(apiUrl).then(displayTemperature);
