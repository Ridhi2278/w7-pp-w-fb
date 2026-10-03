const Product = require('../models/productModel');

const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct };