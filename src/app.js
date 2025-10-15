const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const weatherRoutes = require('./routes/weather.routes');
const chatRoutes = require('./routes/chat.routes');
const themeRoutes = require('./routes/theme.routes');
const settingsRoutes = require('./routes/settings.routes');

const app = express();

// ✅ تعديل CORS هنا
const allowedOrigins = [
  'https://weather-app2-front.vercel.app', // الدومين بتاعك على Vercel
  'http://localhost:4200' // عشان التطوير المحلي
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/weather', weatherRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Futuristic Weather 2055 Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

module.exports = app;
