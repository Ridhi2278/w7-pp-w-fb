const Product = require('../models/productModel');
const mongoose = require('mongoose');

const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct
};