class SettingsService {
    constructor() {
        this.defaultSettings = {
            unit: 'celsius',
            theme: 'cyberpunk',
            language: 'en',
            notifications: true,
            voiceControl: false,
            location: 'Cairo',
            autoRefresh: true,
            refreshInterval: 5 // minutes
        };
        
        this.currentSettings = { ...this.defaultSettings };
    }

    async getSettings() {
        return this.currentSettings;
    }

    async updateSettings(newSettings) {
        this.currentSettings = { ...this.currentSettings, ...newSettings };
        return this.currentSettings;
    }

    async resetSettings() {
        this.currentSettings = { ...this.defaultSettings };
        return this.currentSettings;
    }

    async getThemes() {
        return [
            {
                id: 'cyberpunk',
                name: 'Cyberpunk',
                description: 'Neon lights and futuristic city vibes',
                colors: {
                    primary: '#00ffff',
                    secondary: '#0080ff',
                    accent: '#ff00ff',
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
                    text: '#ffffff'
                }
            },
            {
                id: 'nebula',
                name: 'Nebula',
                description: 'Deep space and cosmic colors',
                colors: {
                    primary: '#8a2be2',
                    secondary: '#00bfff',
                    accent: '#ff1493',
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #1b0b38 50%, #2d1b69 100%)',
                    text: '#ffffff'
                }
            },
            {
                id: 'matrix',
                name: 'Matrix',
                description: 'Green code and digital rain',
                colors: {
                    primary: '#00ff00',
                    secondary: '#008000',
                    accent: '#ffffff',
                    background: 'linear-gradient(135deg, #001100 0%, #003300 50%, #005500 100%)',
                    text: '#00ff00'
                }
            },
            {
                id: 'sunset',
                name: 'Sunset',
                description: 'Warm orange and purple gradients',
                colors: {
                    primary: '#ff6b6b',
                    secondary: '#ffa500',
                    accent: '#8b4513',
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #2d0b0b 50%, #5e2d0b 100%)',
                    text: '#ffffff'
                }
            },
            {
                id: 'arctic',
                name: 'Arctic',
                description: 'Ice blue and frosty themes',
                colors: {
                    primary: '#00ffff',
                    secondary: '#87ceeb',
                    accent: '#ffffff',
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #1c2b4e 50%, #2c3e50 100%)',
                    text: '#ffffff'
                }
            }
        ];
    }

    async setActiveTheme(themeId) {
        const themes = await this.getThemes();
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            this.currentSettings.theme = themeId;
        }
        return this.currentSettings;
    }

    async getActiveTheme() {
        const themes = await this.getThemes();
        return themes.find(theme => theme.id === this.currentSettings.theme) || themes[0];
    }
}

module.exports = new SettingsService();