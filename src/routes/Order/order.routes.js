const express = require('express');
const orderController = require('../../controllers/orderController');
const authController = require('../../middleware/authController');

const router = express.Router();

router
  .route('/:orderID?')
  .get(
    authController.isLoggedIn,
    authController.protect,
    orderController.getOrder,
  )
  .post(
    authController.isLoggedIn,
    authController.protect,
    orderController.createOrder,
  )
  .patch(
    authController.isLoggedIn,
    authController.protect,
    orderController.cancelOrder,
  );


// Admin authorization Routes

module.exports = router;
