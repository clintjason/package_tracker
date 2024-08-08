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

// Request logging middlewares
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/auth', require('./routes/v1/authRoutes'));
app.use('/api/v1/packages', require('./routes/v1/packageRoutes'));
app.use('/api/v1/deliveries', require('./routes/v1/deliveryRoutes'));

// Error handling middleware
app.use(errorMiddleware.errorHandler);

module.exports = app;