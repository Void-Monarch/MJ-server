const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { db } = require('../models/db');
const APIFeatures = require('../utils/apiFeatures');
const filterObj = require('../helpers/filterObj');
const RESPONSE = require('../helpers/response');
const validator = require('validator');
const mongoose = require('mongoose');

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
        res,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email', 'enrollment_id');

  // 3) Update user document
  const updatedUser = await db.User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  RESPONSE.success(res, 1201, updatedUser, 200);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(db.User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  // SEND RESPONSE
  RESPONSE.success(res, 1000, doc, 200);
});

exports.getUserById = catchAsync(async (req, res, next) => {
  let user;

  if (mongoose.isValidObjectId(req.params.id)) {
    user = await db.User.findById(req.params.id);
  } else if (validator.isEmail(req.params.id)) {
    user = await db.User.findOne({ email: req.params.id });
  }

  // Checking if the user exists in the database
  if (!user) return next(new AppError('No User found with that ID!', 404, res));

  // Sending response
  RESPONSE.success(res, 1000, user, 200);
});

exports.searchBy = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(db.User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search(req.params.field);

  const doc = await features.query;

  // SEND RESPONSE
  RESPONSE.success(res, 1000, doc, 200);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await db.User.findById(req.user._id);
  if (!user) {
    return next(new AppError('No such user found.', 404, res));
  }

  // Otherwise continue to send back the users details
  RESPONSE.success(res, 1200, user, 200);
});
