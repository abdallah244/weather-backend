const weatherService = require('../services/weatherAPI.service');

const weatherController = {
    async getCurrentWeather(req, res) {
        try {
            const { location = 'Cairo' } = req.query;
            
            // Simulate API call - Replace with actual OpenWeatherMap API
            const weatherData = await weatherService.getCurrentWeather(location);
            
            res.json({
                status: 'success',
                data: weatherData
            });
        } catch (error) {
            console.error('Weather controller error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch weather data'
            });
        }
    },

    async getForecast(req, res) {
        try {
            const { location = 'Cairo', days = 5 } = req.query;
            
            // Simulate forecast data
            const forecastData = await weatherService.getForecast(location, days);
            
            res.json({
                status: 'success',
                data: forecastData
            });
        } catch (error) {
            console.error('Forecast controller error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch forecast data'
            });
        }
    },

    async getHistoricalData(req, res) {
        try {
            const { location, date } = req.query;
            
            // Simulate historical data
            const historicalData = await weatherService.getHistoricalData(location, date);
            
            res.json({
                status: 'success',
                data: historicalData
            });
        } catch (error) {
            console.error('Historical data controller error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch historical data'
            });
        }
    }
};

module.exports = weatherController;