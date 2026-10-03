const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inventoryCount: {
      type: Number,
      required: true,
    },
    supplier: {
      name: { type: String, required: true },
      contactEmail: { type: String, required: true },
      contactPhone: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);