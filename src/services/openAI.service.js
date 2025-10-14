const { OpenAI } = require('openai');

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'mock-key-for-development'
        });
        this.weatherContext = {};
    }

    async generateResponse(userMessage, context = {}) {
        try {
            this.weatherContext = { ...this.weatherContext, ...context };
            
            // Mock response for development - أكثر ذكاء
            if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'mock-key-for-development') {
                return this.getSmartMockResponse(userMessage);
            }

            // Actual OpenAI API call
            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful weather assistant for Weather 2055 app. 
                        Provide accurate, friendly weather information and advice. 
                        Current context: ${JSON.stringify(this.weatherContext)}`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API error:', error);
            return this.getSmartMockResponse(userMessage);
        }
    }

    getSmartMockResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // ردود ذكية حسب نوع السؤال
        if (lowerMessage.includes('temperature') || lowerMessage.includes('hot') || lowerMessage.includes('cold')) {
            const responses = [
                "Currently it's 24°C with a real feel of 26°C. Perfect weather for outdoor activities!",
                "The temperature is 22°C, feeling like 24°C. You might want a light jacket for the evening.",
                "It's 28°C with high humidity making it feel like 32°C. Stay hydrated and avoid direct sun exposure!",
                "Temperatures are cooling down to 18°C tonight. Great sleeping weather ahead!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('rain') || lowerMessage.includes('umbrella')) {
            const responses = [
                "No rain expected today! The skies are clear with minimal cloud coverage.",
                "There's a 30% chance of light showers this afternoon. You might want to carry an umbrella.",
                "Heavy rainfall expected in the next 2 hours. I recommend staying indoors or taking waterproof gear.",
                "The radar shows scattered thunderstorms approaching. Better to postpone outdoor plans."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('wind') || lowerMessage.includes('breeze')) {
            const responses = [
                "Wind speeds are moderate at 15 km/h from the northwest. Perfect for flying kites!",
                "Gentle breeze at 8 km/h. Very pleasant conditions for outdoor activities.",
                "Strong winds at 25 km/h detected. You might want to secure loose outdoor items.",
                "Wind conditions are calm at 5 km/h. Great day for a picnic!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('humidity') || lowerMessage.includes('moist')) {
            const responses = [
                "Humidity levels are at 65% - quite comfortable for this time of year.",
                "High humidity at 85% making it feel warmer than actual temperature. Stay hydrated!",
                "Low humidity at 35% today. You might want to use moisturizer for dry skin.",
                "Humidity is perfect at 55% - neither too dry nor too humid."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('forecast') || lowerMessage.includes('tomorrow') || lowerMessage.includes('week')) {
            const responses = [
                "The 5-day forecast shows sunny days ahead with temperatures between 22°C and 28°C. Perfect weather week!",
                "Expect a mix of sun and clouds this week. Temperatures ranging from 20°C to 26°C with a chance of rain on Thursday.",
                "This week looks great! Mostly sunny with highs of 25°C and lows of 18°C. Weekend should be perfect for outings.",
                "Weather forecast indicates gradual warming throughout the week. Starting at 20°C Monday, reaching 28°C by Friday."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            const responses = [
                "Hello! I'm your Weather 2055 assistant. How can I help you with weather information today?",
                "Hi there! Ready to explore today's weather conditions together?",
                "Hey! I'm here to provide you with the latest weather updates and forecasts. What would you like to know?",
                "Greetings! I'm your futuristic weather assistant. Ask me anything about current conditions or forecasts!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // ردود عامة
        const generalResponses = [
            "Based on current weather patterns, I recommend planning outdoor activities in the morning when conditions are most favorable.",
            "The weather data shows optimal conditions for outdoor exercise between 10 AM and 2 PM today.",
            "I'm detecting some interesting weather patterns! Would you like specific information about temperature, wind, or precipitation?",
            "The atmospheric conditions are quite stable today. Perfect time for that outdoor event you were planning!",
            "Weather analysis complete! All systems show green across the board for your planned activities.",
            "I've checked multiple data sources and can confirm today's weather is ideal for your needs.",
            "The meteorological data indicates you'll have a great day ahead! Minimal weather-related concerns."
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    updateWeatherContext(newContext) {
        this.weatherContext = { ...this.weatherContext, ...newContext };
    }
}

module.exports = new OpenAIService();