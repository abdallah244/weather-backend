const express = require('express');
const router = express.Router();
const themeController = require('../controllers/theme.controller');

router.get('/', themeController.getThemes);
router.post('/active', themeController.setActiveTheme);
router.get('/active', themeController.getActiveTheme);

module.exports = router;