const express = require('express');
const cors = require('cors'); // CORS read more on it
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path');
const { logger } = require('./middleware/logger');
// All Routes ----------------
const { allRoute } = require('./routes/allRoutes.routes');

// const AppError = require('./utils/appError');
const globalErrorHandler = require('./middleware/errorController');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// cookie parser
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(logger); 
}
if (process.env.NODE_ENV === 'production') {
  app.use(logger);
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// SETTING CORS
app.use(
  cors({
    origin: '*',
    credentials: true, // need to dig deeper
    exposedHeaders: ['set-cookie'], // check more on this option a web usage
  }),
);

// Serving static files

app.use(express.static(`public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

// 3.1 API Routes
app.use('/api/v1/user', allRoute.userRoute);
app.use('/api/v1/menu', allRoute.menuRoute);
app.use('/api/v1/order', allRoute.orderRoute);

// 3.2 Admin Routes
app.use('/api/v1/admin/log', allRoute.admin.log);

// app.use(globalErrorHandler);
app.use(globalErrorHandler);

module.exports = app;
