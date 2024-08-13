async function fetchWeather() {
    const apiKey = ''; // Replace with your OpenWeatherMap API key
    const location = document.getElementById('locationInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the location and try again.');
    }
}

function updateWeather(data) {
    if (!data || !data.main || !data.weather || !data.sys) {
        alert('Failed to retrieve complete weather data.');
        return;
    }

    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const otherDetails = document.getElementById('otherDetails');
    const weatherIcon = document.getElementById('weatherIcon');

    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;

    otherDetails.innerHTML = `
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    const weatherCode = data.weather[0].id;
    setWeatherIcon(weatherCode, weatherIcon);
}

function setWeatherIcon(weatherCode, iconElement) {
    if (weatherCode >= 200 && weatherCode < 300) {
        iconElement.className = 'fas fa-bolt';
        document.body.style.background = 'linear-gradient(to right, #373B44, #4286f4)';
    } else if (weatherCode >= 300 && weatherCode < 500) {
        iconElement.className = 'fas fa-cloud-rain';
        document.body.style.background = 'linear-gradient(to right, #4e54c8, #8f94fb)';
    } else if (weatherCode >= 500 && weatherCode < 600) {
        iconElement.className = 'fas fa-cloud-showers-heavy';
        document.body.style.background = 'linear-gradient(to right, #667db6, #0082c8, #667db6)';
    } else if (weatherCode >= 600 && weatherCode < 700) {
        iconElement.className = 'fas fa-snowflake';
        document.body.style.background = 'linear-gradient(to right, #83a4d4, #b6fbff)';
    } else if (weatherCode >= 700 && weatherCode < 800) {
        iconElement.className = 'fas fa-smog';
        document.body.style.background = 'linear-gradient(to right, #3e5151, #decba4)';
    } else if (weatherCode === 800) {
        iconElement.className = 'fas fa-sun';
        document.body.style.background = 'linear-gradient(to right, #f7b733, #fc4a1a)';
    } else if (weatherCode > 800) {
        iconElement.className = 'fas fa-cloud';
        document.body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
    }
}

// Fetch weather data based on user's location
async function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = ''; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                updateWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please check your location and try again.');
            }
        });
    }
}

// Fetch weather by user's location on page load
window.onload = fetchWeatherByLocation;
