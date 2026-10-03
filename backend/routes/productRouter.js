const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productControllers');
const requireAuth = require('../middleware/requireAuth');

// Public routes: no token needed
router.get('/', getAllProducts);
router.get('/:productId', getProductById);

// Every route BELOW this line requires a valid token
router.use(requireAuth);

router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;