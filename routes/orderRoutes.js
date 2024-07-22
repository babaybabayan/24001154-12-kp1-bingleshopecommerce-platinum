// routes/orderRoutes.js
const express = require('express');
const { createOrder, getUserOrders, updateOrder } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.put('/:id', authenticate, updateOrder);

module.exports = router;
