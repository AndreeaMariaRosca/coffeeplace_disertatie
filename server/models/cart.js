import mongoose from "mongoose";

export const Cart = mongoose.model('Cart', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  items: [
    {
      coffeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coffee", // Reference to the Coffee model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1, // Quantity cannot be less than 1
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});