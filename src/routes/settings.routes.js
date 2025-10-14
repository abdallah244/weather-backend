const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);
router.post('/reset', settingsController.resetSettings);
router.get('/themes', settingsController.getThemes);
router.post('/themes/active', settingsController.setActiveTheme);

module.exports = router;