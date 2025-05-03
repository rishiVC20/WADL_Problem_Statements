// // Modern Class-based Approach (ES6+)
// class WeatherApp {
//     constructor() {
//         this.cityInput = document.getElementById('cityInput');
//         this.searchBtn = document.getElementById('searchBtn');
//         this.weatherInfo = document.getElementById('weatherInfo');
//         this.errorMessage = document.getElementById('errorMessage');
        
//         this.init();
//     }

//     init() {
//         // Add event listeners
//         this.searchBtn.addEventListener('click', () => this.searchWeather());
//         this.cityInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') this.searchWeather();
//         });
//     }

//     async searchWeather() {
//         const city = this.cityInput.value.trim().toLowerCase();
//         if (!city) {
//             this.showError('Please enter a city name');
//             return;
//         }

//         try {
//             const response = await fetch('weather-data.json');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch weather data');
//             }

//             const data = await response.json();
//             this.displayWeather(city, data);
//         } catch (error) {
//             this.showError('Error fetching weather data. Please try again.');
//             console.error('Error:', error);
//         }
//     }

//     displayWeather(city, data) {
//         if (!data[city]) {
//             this.showError('City not found in our database');
//             return;
//         }

//         const weather = data[city];
        
//         // Update the UI with weather information
//         document.getElementById('cityName').textContent = city.charAt(0).toUpperCase() + city.slice(1);
//         document.getElementById('temperature').textContent = `${weather.temperature}°C`;
//         document.getElementById('humidity').textContent = `${weather.humidity}%`;
//         document.getElementById('conditions').textContent = weather.conditions;

//         // Clear any error message
//         this.errorMessage.textContent = '';
        
//         // Show the weather card
//         this.weatherInfo.style.display = 'block';
//     }

//     showError(message) {
//         this.errorMessage.textContent = message;
//         this.weatherInfo.style.display = 'none';
//     }
// }

// Traditional JavaScript Approach (ES5)

// Global variables
var cityInput = document.getElementById('cityInput');
var searchBtn = document.getElementById('searchBtn');
var weatherInfo = document.getElementById('weatherInfo');
var errorMessage = document.getElementById('errorMessage');

// Initialize the app
function initWeatherApp() {
    // Add event listeners
    searchBtn.addEventListener('click', searchWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchWeather();
    });
}

// Search weather function
function searchWeather() {
    var city = cityInput.value.trim().toLowerCase();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // Using traditional XMLHttpRequest instead of fetch
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'weather-data.json', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            displayWeather(city, data);
        } else {
            showError('Error fetching weather data. Please try again.');
            console.error('Error:', xhr.statusText);
        }
    };
    
    xhr.onerror = function() {
        showError('Error fetching weather data. Please try again.');
        console.error('Error:', xhr.statusText);
    };
    
    xhr.send();
}

// Display weather function
function displayWeather(city, data) {
    if (!data[city]) {
        showError('City not found in our database');
        return;
    }

    var weather = data[city];
    
    // Update the UI with weather information
    document.getElementById('cityName').textContent = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById('temperature').textContent = weather.temperature + '°C';
    document.getElementById('humidity').textContent = weather.humidity + '%';
    document.getElementById('conditions').textContent = weather.conditions;

    // Clear any error message
    errorMessage.textContent = '';
    
    // Show the weather card
    weatherInfo.style.display = 'block';
}

// Show error function
function showError(message) {
    errorMessage.textContent = message;
    weatherInfo.style.display = 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initWeatherApp);


// Initialize the weather app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
}); 