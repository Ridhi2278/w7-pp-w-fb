const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  deleteProduct
} = require('../controllers/productControllers');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.delete('/:productId', deleteProduct);

module.exports = router;