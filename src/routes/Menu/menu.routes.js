const express = require('express');
const menuController = require('../../controllers/menuController');
const authController = require('../../middleware/authController');

const router = express.Router();

router
  .route('/:menuID?')
  .get(authController.isLoggedIn, menuController.getMenu)
  .post(
    authController.isLoggedIn,
    authController.protect,
    authController.restrictTo('admin', 'staff'),
    menuController.createMenu,
  );


router.route('/util/getCategory').get(menuController.getCategoryData);
// Admin authorization Routes

module.exports = router;
