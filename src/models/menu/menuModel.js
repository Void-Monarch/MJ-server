const mongoose = require('mongoose');
const slugify = require('slugify');

const menuSchema = new mongoose.Schema(
  {
    foodItem: {
      type: String,
      required: [true, 'Menu foodItem must have a name !'],
    },
    price: {
      type: Number,
      required: [true, 'Please add the price for the food Item!'],
    },
    category: String,
    nonVeg: {
      type: Boolean,
      default: false,
    },
    jain: {
      type: Boolean,
      default: false,
    },
    description: String,
    image: String,
    slug: String,
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

// Methods
menuSchema.index({ slug: 1 });

menuSchema.pre('save', function (next) {
  this.slug = slugify(this.foodItem, { lower: true });
  next();
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
