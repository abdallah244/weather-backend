const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Routes
const weatherRoutes = require('./routes/weather.routes');
const chatRoutes = require('./routes/chat.routes');
const themeRoutes = require('./routes/theme.routes');
const settingsRoutes = require('./routes/settings.routes');

const app = express();

/* ============================================================
   ✅ إعداد الـ CORS (أول حاجة قبل أي Middleware أو Routes)
============================================================ */
const allowedOrigins = [
  'https://weather-app2-front.vercel.app', // دومين الفرونت على Vercel
  'http://localhost:4200' // للتطوير المحلي
];

// السماح بطلبات الـ OPTIONS (Preflight)
app.options('*', cors());

app.use(
  cors({
    origin: function (origin, callback) {
      // السماح لو الـ request جاي من origin مصرح بيه أو مفيش origin (زي Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

/* ============================================================
   ✅ Middleware أساسية
============================================================ */
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ============================================================
   ✅ Routes
============================================================ */
app.use('/api/weather', weatherRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/settings', settingsRoutes);

/* ============================================================
   ✅ Health Check
============================================================ */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Futuristic Weather 2055 Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/* ============================================================
   ✅ Error Handling
============================================================ */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

/* ============================================================
   ✅ 404 Handler
============================================================ */
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

module.exports = app;
