import express from 'express';
import { Order } from '../models/order.js';

const orderRouter = express.Router();

orderRouter.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate('items.itemId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch order history: ${err}` });
  }
});

export default orderRouter;
