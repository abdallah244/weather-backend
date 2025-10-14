const settingsService = require('../services/settings.service');

const settingsController = {
    async getSettings(req, res) {
        try {
            const settings = await settingsService.getSettings();
            
            res.json({
                status: 'success',
                data: settings
            });
        } catch (error) {
            console.error('Settings controller error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch settings'
            });
        }
    },

    async updateSettings(req, res) {
        try {
            const newSettings = req.body;
            
            if (!newSettings || typeof newSettings !== 'object') {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid settings data'
                });
            }

            const updatedSettings = await settingsService.updateSettings(newSettings);
            
            res.json({
                status: 'success',
                message: 'Settings updated successfully',
                data: updatedSettings
            });
        } catch (error) {
            console.error('Update settings error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to update settings'
            });
        }
    },

    async resetSettings(req, res) {
        try {
            const defaultSettings = await settingsService.resetSettings();
            
            res.json({
                status: 'success',
                message: 'Settings reset to default',
                data: defaultSettings
            });
        } catch (error) {
            console.error('Reset settings error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to reset settings'
            });
        }
    },

    async getThemes(req, res) {
        try {
            const themes = await settingsService.getThemes();
            
            res.json({
                status: 'success',
                data: themes
            });
        } catch (error) {
            console.error('Get themes error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch themes'
            });
        }
    },

    async setActiveTheme(req, res) {
        try {
            const { themeId } = req.body;
            
            if (!themeId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Theme ID is required'
                });
            }

            const settings = await settingsService.setActiveTheme(themeId);
            
            res.json({
                status: 'success',
                message: 'Theme activated successfully',
                data: settings
            });
        } catch (error) {
            console.error('Set theme error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to set active theme'
            });
        }
    }
};

module.exports = settingsController;