const apiKey = "af60d6b681c5a3d2b78f92d51dd87a87";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const weatherCard = document.querySelector(".card");
const icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    button.disabled = true;
    button.textContent = "Searching...";
    weatherCard.style.display = "block";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        icon.src = "clouds.png";
        break;
      case "Clear":
        icon.src = "clear.png";
        break;
      case "Rain":
        icon.src = "rain.png";
        break;
      case "Drizzle":
        icon.src = "drizzle.png";
        break;
      case "Mist":
        icon.src = "mist.png";
        break;
      case "Snow":
        icon.src = "snow.png";
        break;
      default:
        icon.src = "default.png"; // default icon for other weather types
        break;
    }

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    alert("Enter correct city");
  } finally {
    button.disabled = false;
    button.textContent = "Search";
  }
}

button.addEventListener("click", () => {
  checkWeather(input.value);
});
