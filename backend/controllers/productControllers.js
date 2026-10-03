const Product = require('../models/productModel');
const mongoose = require('mongoose');

const createProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const product = new Product({ ...req.body, user_id });
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

// GET /api/products/:productId
const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:productId
const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
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
  getProductById,
  updateProduct,
  deleteProduct
};