// controllers/orderController.js
const { Order, Item, User } = require('../models');

const createOrder = async (req, res) => {
    try {
        const { item_id, quantity } = req.body;
        const user_id = req.user.id; // assuming user info is added to req in auth middleware

        const item = await Item.findByPk(item_id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const total_price = item.price * quantity;

        const order = await Order.create({ user_id, item_id, quantity, total_price });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const user_id = req.user.id; // assuming user info is added to req in auth middleware
        const orders = await Order.findAll({ where: { user_id }, include: [Item] });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (quantity) {
            const item = await Item.findByPk(order.item_id);
            order.total_price = item.price * quantity;
            order.quantity = quantity;
        }

        if (status) {
            order.status = status;
        }

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    updateOrder
};
