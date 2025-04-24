import mongoose from 'mongoose';

export const PersonalityCoffee = mongoose.model('PersonalityCoffee', {
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
        enum: ["regular", "none"],
        required: true
    },
    syrup: {
        type: String,
        enum: ["vanilla", "white chocolate", "dark chocolate", "coconut", "salted caramel", "caramel", "irish cream", "hazelnuts", "none"],
        required: true
    },
    hasIce: {
        type: Boolean
    },
    score: {
        minValue: Number,
        maxValue: Number,
    },
    description: {
        type: String
    },
    price: { type: Number}

}, 'personalityCoffees');