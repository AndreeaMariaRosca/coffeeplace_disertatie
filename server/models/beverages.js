import mongoose from 'mongoose';

export const Beverage = mongoose.model('Beverage', {
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
}, "beverages");

