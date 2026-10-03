const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productControllers');

router.get('/', getAllProducts);
router.get('/:productId', getProductById);

router.use(requireAuth);

router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;