const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../middleware/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Forgot Password Routes
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Update password route {needs to be logged in}
router.patch(
  '/updateMyPassword',
  authController.isLoggedIn,
  authController.protect,
  authController.updatePassword,
);

router
  .route('/Me')
  .get(authController.isLoggedIn, authController.protect, userController.getMe);

/* 
  Admin and other privilege procted routes ↓
*/

router
  .route('/getAllUsers')
  .get(
    authController.protect,
    authController.restrictTo('staff', 'admin'),
    userController.getAllUsers,
  );

router
  .route('/:id')
  .get(
    authController.isLoggedIn,
    authController.protect,
    authController.restrictTo('staff', 'admin'),
    userController.getUserById,
  );

router
  .route('/search/:field')
  .get(
    authController.isLoggedIn,
    authController.protect,
    authController.restrictTo('staff', 'admin'),
    userController.searchBy,
  );

module.exports = router;
