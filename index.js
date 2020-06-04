const p = document.querySelector('p');
const img = document.querySelector('img');
const formSent = document.querySelector('button');
const formInput = document.querySelector('input');
const weatherBox = document.querySelector('.weather-output');
const errorBox = document.querySelector('.error');

formSent.addEventListener('click', displayData);

function displayData(event) {
  event.preventDefault();
  const city = formInput.value;
  getWeatherData(city).catch(() => {
    errorBox.innerText = 'Please enter valid city'
    weatherBox.innerHTML = '';
  })
  formInput.value = '';
}

async function getWeatherData (city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6115fdd62dedddc82703f97f9c8a89f`);
  const data = await response.json();
  const {
    main: { 
      temp: temperature, 
      feels_like: feelsLike
    },
    weather: {
      0: {
        icon: iconID,
        description
      }
    },
    sys: {
      country
    }
  } = data;
  weatherOutput(temperature, city, country, feelsLike, description, iconID)
}


const weatherOutput = function(temperature, city, country, feelsLike, description, iconID) {
  errorBox.innerHTML = ''
  weatherBox.innerHTML = '';
  const weatherElement = createDom('div', 'box', '')
  const cityElement = createDom('p', 'city', city.toUpperCase());
  const temperatureElement = createDom('p', 'temperature', `${toCelcius(temperature)}${String.fromCharCode(176)}C`)
  const descElement = createDom('p', 'desc', description);
  const countryElement = createDom('p', 'country', country);
  const weatherImage = createDom('img', 'weather-pic', '');

  weatherImage.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`

  weatherElement.appendChild(cityElement);
  weatherElement.appendChild(countryElement);
  weatherElement.appendChild(temperatureElement);
  weatherElement.appendChild(weatherImage);
  weatherElement.appendChild(descElement);

  weatherBox.appendChild(weatherElement);
}

const createDom = function(type, className, text) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.innerText = text;
  return element
}

const toCelcius = function(kelvin) {
  return Math.round(kelvin - 273)
}