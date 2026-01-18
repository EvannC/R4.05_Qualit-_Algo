const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/products', auth, productController.getAllProducts);
router.post('/products', auth, productController.createProduct);
router.get('/products/:id', auth, productController.getProduct);
router.patch('/products/:id/stock', auth, productController.updateStock);

<<<<<<< HEAD
router.use((err, req, res, next) => {
=======
router.use((err, req, res) => {
>>>>>>> 2b808a8 (chore: initial project setup)
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;
