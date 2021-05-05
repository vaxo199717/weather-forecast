const dropBtn = document.querySelector('#dropBtn');
const header = document.querySelector('.header');
const searchBtn = document.querySelector('.searchBtn');
const searchBar = document.querySelector('.search-bar');
const input = document.querySelector('.inputForCities');
const cityName = document.querySelector('.name');
const weatherImage = document.querySelector('.weather-image')
const mainDegrees = document.querySelector('.degrees');
const weatherStatus = document.querySelector('.status');
const degreesRange = document.querySelector('.degrees-range');
const localTime = document.querySelector('.local-time');
const fullDay = document.querySelector('.full-day');
const days = document.querySelector('.days');
const feelsLike = document.querySelector('#feels-like');
const airPressure = document.querySelector('#air-pressure');
const visibility = document.querySelector('#visibility');
const uv = document.querySelector('#uv');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const loader = document.querySelector('.loader-container');
const weatherContainer = document.querySelector('.container');


//dropdown button
dropBtn.addEventListener('click', () => {
    showSearchBox();
})
//dropdown button

//search box display block
function showSearchBox() {
    searchBar.style.display = 'flex';
    header.style.display = 'none';
}
//search box display block

// search new city
searchBtn.addEventListener('click', () => {
    loader.style.display = 'flex';
    weatherContainer.style.display = 'none';
    setTimeout(() => {
        loader.style.display = 'none';
        weatherContainer.style.display = 'block';
    }, 1000);
    fullDay.innerHTML = '';
    displayElements();
    getWeatherInfo();
    input.value = '';
})
// search new city

//header display block
function displayElements() {
    searchBar.style.display = 'none';
    header.style.display = 'flex';
}
//header display block

// get and output weather info
function weatherData(city) {
    let currentWeatherUrl = 'http://api.weatherapi.com/v1/forecast.json?key=16a4770361204d6095b110641210305&q=' + city + '&days=10&aqi=no&alerts=no';
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            let weather = data.current.condition.text
            let isDay = data.current.is_day
            cityName.innerHTML = data.location.name;
            mainDegrees.innerHTML = data.current.temp_c + '°C';
            if (data.current.condition.text.length >= 14) {
                weatherStatus.innerHTML = data.current.condition.text.substr(0, 14) + '...';
            } else {
                weatherStatus.innerHTML = data.current.condition.text
            }
            feelsLike.innerHTML = data.current.feelslike_c + ' °C';
            visibility.innerHTML = data.current.vis_km + ' km';
            airPressure.innerHTML = data.current.pressure_mb;
            uv.innerHTML = data.current.uv;
            humidity.innerHTML = data.current.humidity + ' %';
            windSpeed.innerHTML = data.current.wind_kph + ' km/h';

            // main image conditions
            if (weather === 'Sunny') {
                imageCode = 'day.svg'
            } else if (weather === 'Clear') {
                imageCode = 'night.svg'
            } else if (weather === 'Partly cloudy' && isDay) {
                imageCode = 'cloudy-day-3.svg'
            } else if (weather === 'Partly cloudy') {
                imageCode = 'cloudy-night-3.svg'
            } else if (weather === 'Cloudy' || weather === 'Overcast' || weather === 'Mist' || weather === 'Fog' || weather === 'Freezing fog') {
                imageCode = 'cloudy.svg'
            } else if ((weather === 'Patchy rain possible' || weather === 'Patchy light rain' ||
                weather === 'Moderate rain at times' || weather === 'Light rain shower' || weather === 'Light rain' ||
                weather === 'Moderate rain') && isDay) {
                imageCode = 'rainy-2.svg'
            } else if (weather === 'Patchy rain possible' || weather === 'Patchy light rain' ||
                weather === 'Moderate rain at times' || weather === 'Light rain shower' || weather === 'Light rain' ||
                weather === 'Moderate rain') {
                imageCode = 'rainy-4.svg'
            } else if ((weather === 'Heavy rain at times' || weather === 'Heavy rain shower' ||
                weather === 'Moderate or heavy rain shower' || weather === 'Heavy rain') && isDay) {
                imageCode = 'rainy-3.svg'
            } else if (weather === 'Heavy rain at times' || weather === 'Heavy rain shower' ||
                weather === 'Moderate or heavy rain shower' || weather === 'Heavy rain' || weather === 'Light drizzle') {
                imageCode = 'rainy-5.svg'
            } else if (weather === 'Light freezing rain' || weather === 'Moderate or heavy freezing rain' ||
                weather === 'Torrential rain shower' || weather === 'Patchy freezing drizzle possible' || weather === 'Patchy light drizzle' ||
                weather === 'Freezing drizzle' || weather === 'Heavy freezing drizzle') {
                imageCode = 'rainy-6.svg'
            } else if (weather === 'Patchy light rain with thunder' || weather === 'Moderate or heavy rain with thunder' ||
                weather === 'Patchy light snow with thunder' || weather === 'Moderate or heavy snow with thunder' || weather === 'Thundery outbreaks possible' || weather === 'Patchy light snow with thunder' ||
                weather === 'Moderate or heavy snow with thunder') {
                imageCode = 'thunder.svg'
            } else if ((weather === 'Patchy snow possible' || weather === 'Patchy sleet possible' || weather === 'Patchy light snow' || weather === 'Patchy moderate snow' || weather === 'Light snow showers') && isDay) {
                imageCode = 'snowy-2.svg'
            } else if (weather === 'Patchy snow possible' || weather === 'Patchy sleet possible' || weather === 'Patchy light snow' || weather === 'Patchy moderate snow' || weather === 'Light snow showers') {
                imageCode = 'snowy-4.svg'
            } else if (weather === 'Blowing snow' || weather === 'Moderate snow' || weather === 'Patchy heavy snow' || weather === 'Heavy snow' || weather === 'Moderate or heavy snow showers' || weather === 'Blizzard') {
                imageCode = 'snowy-5.svg'
            } else if (weather === 'Ice pellets' || weather === 'Moderate or heavy showers of ice pellets') {
                imageCode = 'rainy-7.svg'
            } else if (weather === 'Light showers of ice pellets') {
                imageCode = 'rainy-6.svg'
            }
            weatherImage.innerHTML = `<img class="dynamic-image" src="/images/animated/${imageCode}" alt="">`
            // main image conditions 

            degreesRange.innerHTML = data.forecast.forecastday[0].day.maxtemp_c + '°C / ' + data.forecast.forecastday[0].day.mintemp_c + '°C ';
            localTime.innerHTML = data.location.localtime.substr(data.location.localtime.length - 5);

            //hourly weather
            let forI = parseInt(data.location.localtime.substr(10, 3));
            let iCount = 24 - forI;
            if (iCount >= 4) {
                for (let i = forI; i < forI + 4; i++) {
                    let hourDiv = document.createElement('div');
                    let hourlyTime = document.createElement('div');
                    let hourlyImage = document.createElement('div');
                    let hourlyStatus = document.createElement('div');
                    let hourlyDegrees = document.createElement('div');
                    hourDiv.className = 'hour';
                    let hourly = data.forecast.forecastday[0].hour[i].time
                    hourlyTime.textContent = hourly.substr(hourly.length - 5)
                    hourlyImage.innerHTML = `<img class="static-image" src="${data.forecast.forecastday[0].hour[i].condition.icon}" alt="">`
                    if (data.forecast.forecastday[0].hour[i].condition.text.length >= 11) {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text.substr(0, 11) + '..'
                    } else {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text
                    }
                    hourlyDegrees.textContent = data.forecast.forecastday[0].hour[i].temp_c + '°C'
                    hourDiv.appendChild(hourlyTime);
                    hourDiv.appendChild(hourlyImage);
                    hourDiv.appendChild(hourlyStatus);
                    hourDiv.appendChild(hourlyDegrees);
                    fullDay.appendChild(hourDiv);
                }
            } else {
                for (let i = forI; i < forI + iCount; i++) {
                    let hourDiv = document.createElement('div');
                    let hourlyTime = document.createElement('div');
                    let hourlyImage = document.createElement('div');
                    let hourlyStatus = document.createElement('div');
                    let hourlyDegrees = document.createElement('div');
                    hourDiv.className = 'hour';
                    let hourly = data.forecast.forecastday[0].hour[i].time
                    hourlyTime.textContent = hourly.substr(hourly.length - 5)
                    hourlyImage.innerHTML = `<img class="static-image" src="${data.forecast.forecastday[0].hour[i].condition.icon}" alt="">`
                    if (data.forecast.forecastday[0].hour[i].condition.text.length >= 11) {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text.substr(0, 11) + '..'
                    } else {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text
                    }
                    hourlyDegrees.textContent = data.forecast.forecastday[0].hour[i].temp_c + '°C'
                    hourDiv.appendChild(hourlyTime);
                    hourDiv.appendChild(hourlyImage);
                    hourDiv.appendChild(hourlyStatus);
                    hourDiv.appendChild(hourlyDegrees);
                    fullDay.appendChild(hourDiv);
                }
                for (let i = 0; i < 4 - iCount; i++) {
                    let hourDiv = document.createElement('div');
                    let hourlyTime = document.createElement('div');
                    let hourlyImage = document.createElement('div');
                    let hourlyStatus = document.createElement('div');
                    let hourlyDegrees = document.createElement('div');
                    hourDiv.className = 'hour';
                    let hourly = data.forecast.forecastday[0].hour[i].time
                    hourlyTime.textContent = hourly.substr(hourly.length - 5)
                    hourlyImage.innerHTML = `<img class="static-image" src="${data.forecast.forecastday[0].hour[i].condition.icon}" alt="">`
                    if (data.forecast.forecastday[0].hour[i].condition.text.length >= 11) {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text.substr(0, 11) + '..'
                    } else {
                        hourlyStatus.textContent = data.forecast.forecastday[0].hour[i].condition.text
                    }
                    hourlyDegrees.textContent = data.forecast.forecastday[0].hour[i].temp_c + '°C'
                    hourDiv.appendChild(hourlyTime);
                    hourDiv.appendChild(hourlyImage);
                    hourDiv.appendChild(hourlyStatus);
                    hourDiv.appendChild(hourlyDegrees);
                    fullDay.appendChild(hourDiv);
                }
            }
            //hourly weather

        })
}
// get and output weather info

//for default city
weatherData('tbilisi');
function getWeatherInfo() {
    weatherData(input.value)
}
//for default city
