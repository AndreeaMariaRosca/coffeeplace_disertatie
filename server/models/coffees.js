import mongoose from 'mongoose';

export const Coffee = mongoose.model('Coffee', {
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        enum: ["hot", "cold"],
        required: true
    },
    milk: {
        type: String,
        enum: ["regular", "almond", "soy", "coconut", "none"],
        required: true
    },
    syrup: {
        type: String,
        enum: ["vanilla", "white chocolate", "dark chocolate", "coconut", "salted caramel", "caramel", "irish cream", "hazelnuts", "none"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hasIce: {
        type: Boolean
    },
    description: {
        type: String,
        required: true
    }

}, 'coffees');

