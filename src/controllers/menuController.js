const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const RESPONSE = require('../helpers/response');
const { db } = require('../models/db');

exports.createMenu = catchAsync(async (req, res, next) => {
  const newMenu = await db.Menu.create({
    foodItem: req.body.foodItem,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description || 'Coming soon [Generic Description]',
  });

  // Error handling

  // SEND RESPONSE
  RESPONSE.success(res, 2201, newMenu, 201);
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    db.Menu.find({ $or: [{ _id: req.params.menuID }, {}] }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const menu = await features.query;

  // Error handling
  if (!menu) {
    return next(
      new AppError('No menu found !', 404, res), // throw error if token not found
    );
  }

  // SEND REsponse
  RESPONSE.success(res, 2200, menu, 200);
});


exports.getCategoryData = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    db.Menu.find({ $or: [{ _id: req.params.menuID }, {}] }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const menu = await features.query;
  const categoryFilter = _.groupBy(menu, ({ category }) => category);
  const categoryFilter2 = Object.keys(categoryFilter);

  const categoryFilter3 = categoryFilter2.map((el) => {
    const validImage = `/images/category_images/${el}.png`;

    return {
      category: el,
      image: validImage || 'not found',
    };
  });

  // Error handling
  if (!categoryFilter3) {
    return next(
      new AppError('no data found.', 404, res), // throw error if token not found
    );
  }
  // SEND REsponse
  RESPONSE.success(res, 2200, categoryFilter3, 200);
});
