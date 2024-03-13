const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'config.env' });

module.exports = {
  // database details
  database: {
    DATABASE: process.env.DATABASE,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_TYPE: 'LIVE' || 'LOCAL',
  },
  //  JWT TOKEN CONFIGs
  JWT: {
    JWT_SECRET:
      process.env.JWT_SECRET || 'A-SECRET-SO-SERCET-THAT-EVEN-I-DONT-KNOW-?',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    JWT_COOKIE_EXPIRES_IN:
      process.env.JWT_COOKIE_EXPIRES_IN || 30 * 24 * 60 * 60 * 1000,
  },
  protocol: process.env.PROTOCOL || 'http',
  PORT: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
};
