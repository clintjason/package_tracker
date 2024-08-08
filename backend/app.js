const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');
const session = require('./config/session');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');
const app = express();

// Database connection
connectDB();

app.use(express.json());
app.use(session);

// security config
app.use(cors());
app.use(helmet({crossOriginResourcePolicy: false,}));

// Middleware to log incoming requests
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    logger.info(message);
  });
  next();
});

// Request Error Handling and logging middlewares
app.use((err, req, res, next) => {
  logger.error(`Error processing request: ${req.method} ${req.url}`);
  logger.error(`Stack Trace: ${err.stack}`);
  next();
});

// Routes Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/auth', require('./routes/v1/authRoutes'));
app.use('/api/v1/packages', require('./routes/v1/packageRoutes'));
app.use('/api/v1/deliveries', require('./routes/v1/deliveryRoutes'));

// Error handling middleware
app.use(errorMiddleware.errorHandler);

// Capture uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ', err);
  process.exit(1); // Optional: Consider graceful shutdown before exiting
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;