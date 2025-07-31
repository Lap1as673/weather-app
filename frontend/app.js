document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.getElementById('weather-card');
    const errorMessage = document.getElementById('error-message');

    // Настройки для бэкенда (будет меняться в k8s)
    const API_BASE_URL = window.location.origin.includes('localhost')
        ? 'http://localhost:8000'
        : '/api';

    searchBtn.addEventListener('click', getWeather);

    async function getWeather() {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (!response.ok) {
                showError(data.detail || 'Ошибка сервера');
                return;
            }

            displayWeather(data);
        } catch (err) {
            showError('Ошибка соединения с сервером');
        }
    }

    function displayWeather(data) {
        document.getElementById('city-name').textContent = data.city;
        document.getElementById('temperature').textContent = `${Math.round(data.temp)}°C`;
        document.getElementById('feels-like').textContent = `${Math.round(data.feels_like)}°C`;
        document.getElementById('weather-description').textContent = data.description;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('wind').textContent = `${data.wind} м/с`;

        // Иконка погоды
        const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;

        weatherCard.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        weatherCard.classList.add('hidden');
    }
});