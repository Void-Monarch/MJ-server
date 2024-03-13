const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const RESPONSE = require('../helpers/response');
const { db } = require('../models/db');

exports.createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await db.Order.create({
    userId: req.user._id,
    item: req.body.item,
    totalPrice: req.body.totalPrice,
    deliveredAddress: req.body.deliveredAddress,
  });

  // SEND RESPONSE
  RESPONSE.success(res, 3001, newOrder, 201);
});

exports.getOrder = catchAsync(async (req, res, next) => {
  // GET THE ORDER FOR THE LOGIN USED
  const userId = req.user._id;
  let features;
  if (req.params.orderID) {
    features = new APIFeatures(
      db.Order.find({ userId: userId, _id: req.params.orderID }),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
  } else {
    features = new APIFeatures(db.Order.find({ userId: userId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
  }

  const doc = await features.query;

  if (!doc || doc.length === 0) {
    return next(new AppError('No Order Found', 404, res));
  }

  // SEND RESPONSE
  RESPONSE.success(res, 3000, doc, 200);
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const order = await db.Order.findOneAndUpdate(
    { _id: req.params.orderID, userId: req.user._id },
    { status: 'cancelled' },
  );

  if (!order) {
    return next(new AppError('No Order Found', 404, res));
  }

  // SEND RESPONSE
  RESPONSE.success(res, 3003, order, 200);
});
