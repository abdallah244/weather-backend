const openAIService = require('../services/openAI.service');

const chatController = {
    async sendMessage(req, res) {
        try {
            const { message, context = {} } = req.body;
            
            if (!message) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Message is required'
                });
            }

            const aiResponse = await openAIService.generateResponse(message, context);
            
            res.json({
                status: 'success',
                data: {
                    userMessage: message,
                    aiResponse: aiResponse,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            console.error('Chat controller error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to process message'
            });
        }
    },

    async getChatHistory(req, res) {
        try {
            // For now, return empty history
            // Later we'll implement MongoDB storage
            res.json({
                status: 'success',
                data: {
                    history: [],
                    total: 0
                }
            });
        } catch (error) {
            console.error('Chat history error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch chat history'
            });
        }
    }
};

module.exports = chatController;