const User = require('./user/userModel');
const Menu = require('./menu/menuModel');
const Order = require('./order/orderModels');
const Logger = require('./logger/logger');

exports.db = {
  User: User,
  Menu: Menu,
  Order: Order,
  Logger: Logger,
};
