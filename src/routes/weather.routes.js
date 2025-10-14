const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getForecast);
router.get('/historical', weatherController.getHistoricalData);

module.exports = router;