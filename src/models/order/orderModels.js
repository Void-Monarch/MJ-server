const mongoose = require('mongoose');

// const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'canceled', 'completed'],
      default: 'pending',
    },
    item: [
      {
        foodItem: {
          type: mongoose.Types.ObjectId,
          ref: 'Menu',
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'Order need to have a price'],
    },
    deliveredAddress: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select:
      '-__v -passwordChangedAt -created_at -updated_at -provider -address',
  });
  this.populate({
    path: 'item.foodItem',
    select: '-__v -created_at -updated_at',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
