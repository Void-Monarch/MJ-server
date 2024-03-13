const validator = require('validator');
const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { db } = require('../../models/db');
const APIFeatures = require('../../utils/apiFeatures');
const filterObj = require('../../helpers/filterObj');
const RESPONSE = require('../../helpers/response');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(db.Logger.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});

exports.getLogsByUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    db.Logger.find({ user: req.params.id }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});

exports.getLogsByIp = catchAsync(async (req, res, next) => {
  // IP address validation
  if (!validator.isIP(req.params.ip)) {
    return next(new AppError('Invalid IP address', 400, res));
  }
  if (validator.isIP(req.params.ip, 4)) {
    req.params.ip = `::ffff:${req.params.ip}`;
  }

  const features = new APIFeatures(
    db.Logger.find({ ip: req.params.ip }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});
