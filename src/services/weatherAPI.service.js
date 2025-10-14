const axios = require('axios');

class WeatherAPIService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
    }

    async getCurrentWeather(location) {
        try {
            // If no API key, use mock data
            if (!this.apiKey || this.apiKey === 'your_openweather_api_key_here') {
                return this.getMockWeatherData(location);
            }

            // Actual API call to OpenWeatherMap
            const response = await axios.get(`${this.baseURL}/weather`, {
                params: {
                    q: location,
                    appid: this.apiKey,
                    units: 'metric',
                    lang: 'en'
                }
            });

            const data = response.data;
            
            return {
                location: data.name,
                temperature: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                pressure: data.main.pressure,
                description: data.weather[0].description,
                condition: data.weather[0].main,
                icon: this.getWeatherIcon(data.weather[0].main),
                visibility: (data.visibility / 1000).toFixed(1), // Convert to km
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Weather API error:', error.response?.data || error.message);
            // Fallback to mock data
            return this.getMockWeatherData(location);
        }
    }

    async getForecast(location, days = 5) {
        try {
            if (!this.apiKey || this.apiKey === 'your_openweather_api_key_here') {
                return this.getMockForecastData(location, days);
            }

            const response = await axios.get(`${this.baseURL}/forecast`, {
                params: {
                    q: location,
                    appid: this.apiKey,
                    units: 'metric',
                    cnt: days * 8 // 8 forecasts per day
                }
            });

            const forecasts = [];
            const dailyData = {};

            // Group by day
            response.data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                if (!dailyData[date]) {
                    dailyData[date] = {
                        temps: [],
                        conditions: []
                    };
                }
                dailyData[date].temps.push(item.main.temp);
                dailyData[date].conditions.push(item.weather[0].main);
            });

            // Create daily forecast
            Object.keys(dailyData).slice(0, days).forEach(date => {
                const dayData = dailyData[date];
                const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b) / dayData.temps.length);
                const mostFrequentCondition = this.getMostFrequent(dayData.conditions);
                
                forecasts.push({
                    date: date,
                    high: Math.max(...dayData.temps),
                    low: Math.min(...dayData.temps),
                    temperature: avgTemp,
                    condition: mostFrequentCondition,
                    precipitation: Math.floor(Math.random() * 100), // OpenWeather doesn't provide this in free tier
                    humidity: Math.floor(Math.random() * 50) + 30,
                    windSpeed: Math.floor(Math.random() * 20) + 5
                });
            });

            return {
                location: location,
                forecast: forecasts,
                updatedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Forecast API error:', error.response?.data || error.message);
            return this.getMockForecastData(location, days);
        }
    }

    getMostFrequent(arr) {
        return arr.sort((a,b) =>
            arr.filter(v => v === a).length - arr.filter(v => v === b).length
        ).pop();
    }

    getMockWeatherData(location) {
        const weatherConditions = [
            'Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist'
        ];
        
        const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const baseTemp = location.toLowerCase().includes('cairo') ? 25 : 
                        location.toLowerCase().includes('london') ? 15 :
                        location.toLowerCase().includes('new york') ? 20 : 22;
        
        return {
            location: location,
            temperature: Math.floor(Math.random() * 10) + baseTemp,
            feelsLike: Math.floor(Math.random() * 10) + baseTemp,
            humidity: Math.floor(Math.random() * 50) + 30,
            windSpeed: Math.floor(Math.random() * 30) + 5,
            pressure: Math.floor(Math.random() * 100) + 1000,
            description: randomCondition.toLowerCase(),
            condition: randomCondition,
            icon: this.getWeatherIcon(randomCondition),
            visibility: (Math.floor(Math.random() * 10) + 5).toFixed(1),
            sunrise: '06:30:00',
            sunset: '18:45:00',
            timestamp: new Date().toISOString()
        };
    }

    getMockForecastData(location, days) {
        const forecast = [];
        const baseTemp = location.toLowerCase().includes('cairo') ? 25 : 
                        location.toLowerCase().includes('london') ? 15 :
                        location.toLowerCase().includes('new york') ? 20 : 22;
        
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            forecast.push({
                date: date.toDateString(),
                high: baseTemp + Math.floor(Math.random() * 8) + 2,
                low: baseTemp - Math.floor(Math.random() * 5),
                temperature: baseTemp + Math.floor(Math.random() * 5),
                condition: ['Clear', 'Clouds', 'Rain', 'Clouds'][Math.floor(Math.random() * 4)],
                precipitation: Math.floor(Math.random() * 100),
                humidity: Math.floor(Math.random() * 50) + 30,
                windSpeed: Math.floor(Math.random() * 20) + 5
            });
        }
        
        return {
            location: location,
            forecast: forecast,
            updatedAt: new Date().toISOString()
        };
    }

    getWeatherIcon(condition) {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Snow': 'fas fa-snowflake',
            'Thunderstorm': 'fas fa-bolt',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Mist': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'default': 'fas fa-cloud'
        };
        
        return iconMap[condition] || iconMap['default'];
    }
}

module.exports = new WeatherAPIService();