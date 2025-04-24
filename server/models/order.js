import mongoose from 'mongoose';

export const Order = mongoose.model('Order', {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
      itemType: { type: String, enum: ['Beverage', 'Coffee', 'PersonalityCoffee'], required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, 'orders');
