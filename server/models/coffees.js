import mongoose from 'mongoose';

export const Drink = mongoose.model('Drink', {
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
    }

}, 'coffees');

