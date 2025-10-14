const themeService = require('../services/theme.service');

const themeController = {
    async getThemes(req, res) {
        try {
            const themes = await themeService.getAllThemes();
            
            res.json({
                status: 'success',
                data: themes
            });
        } catch (error) {
            console.error('Theme controller error:', error);
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

            const activeTheme = await themeService.setActiveTheme(themeId);
            
            res.json({
                status: 'success',
                data: activeTheme
            });
        } catch (error) {
            console.error('Set theme error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to set active theme'
            });
        }
    },

    async getActiveTheme(req, res) {
        try {
            const activeTheme = await themeService.getActiveTheme();
            
            res.json({
                status: 'success',
                data: activeTheme
            });
        } catch (error) {
            console.error('Get active theme error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to get active theme'
            });
        }
    }
};

module.exports = themeController;