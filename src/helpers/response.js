const MESSAGES = {
  // User Management
  1000: 'User found successfully',
  1001: 'User added successfully',
  1101: 'User does not exist',
  1200: 'User details Found  Successfully',
  1201: 'User updated successfully',
  1202: 'User deleted successfully',

  // Authentication
  1301: 'User authenticated successfully',
  1302: 'Invalid credentials',
  1303: 'Authentication token is missing or invalid',

  // Menu
  2200: 'Menu found successfully',
  2201: 'Menu added successfully',
  2202: 'Menu updated successfully',
  2203: 'Menu deleted successfully',

  // Order
  3000: 'Order Found successfully',
  3001: 'Order placed successfully',
  3002: 'Order updated successfully',
  3003: 'Order cancelled successfully',
  3101: 'Order not found',

  // Payment
  4001: 'Payment successful',
  4002: 'Payment failed',

  // Review & Rating
  5001: 'Review added successfully',
  5002: 'Rating added successfully',
  5101: 'Review not found',

  // Admin Code Messages
  // Logs
  10100: 'Logs found successfully',
};

// Function to get message from message code
const getMessage = (messageCode) => {
  if (Number.isNaN(messageCode)) {
    return messageCode;
  }
  return messageCode ? MESSAGES[messageCode] : '';
};

exports.success = function (
  res,
  messageCode = null,
  data = null,
  statusCode = 200,
) {
  const response = {};
  response.success = 'success';
  response.message = getMessage(messageCode);
  if (data != null) {
    response.length = data.length;
    response.data = data;
  }
  res.locals.message = response.message;
  return res.status(statusCode).json(response);
};
