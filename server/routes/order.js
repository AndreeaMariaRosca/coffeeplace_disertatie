// routes/order.js
import express from 'express';
import { Order } from '../models/order.js';

const orderRouter = express.Router();

orderRouter.get('/user/:userId', async (req, res) => {
  try {
    // it returns unknown item, make it return the names of this
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.itemId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

export default orderRouter;
