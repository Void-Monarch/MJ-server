const express = require('express');
const authController = require('../../middleware/authController');
const logController = require('../../controllers/admin/logController');

const router = express.Router();

router.use(
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
);

router.route('/').get(logController.getAllLogs)

router.route('/user/:id').get(logController.getLogsByUser)

router.route('/ip/:ip').get(logController.getLogsByIp)



module.exports = router;
