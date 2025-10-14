const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/futuristic-weather';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Futuristic Weather 2055 Backend is running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔻 Shutting down server gracefully...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
});