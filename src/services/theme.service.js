class ThemeService {
    constructor() {
        this.themes = [
            {
                id: 'cyberpunk',
                name: 'Cyberpunk',
                description: 'Neon lights and futuristic city vibes',
                colors: {
                    primary: '#ff00ff',
                    secondary: '#00ffff',
                    accent: '#ffff00',
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a0b2e 50%, #2d0b5e 100%)',
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
            }
        ];
        
        this.activeTheme = this.themes[0];
    }

    async getAllThemes() {
        return this.themes;
    }

    async getThemeById(themeId) {
        return this.themes.find(theme => theme.id === themeId) || null;
    }

    async setActiveTheme(themeId) {
        const theme = await this.getThemeById(themeId);
        if (theme) {
            this.activeTheme = theme;
        }
        return this.activeTheme;
    }

    async getActiveTheme() {
        return this.activeTheme;
    }

    

}


module.exports = new ThemeService();
