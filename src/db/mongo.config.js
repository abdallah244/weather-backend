const mongoose = require('mongoose');

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log('🔗 MongoDB event connected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB event error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 MongoDB event disconnected');
});

module.exports = mongoConfig;