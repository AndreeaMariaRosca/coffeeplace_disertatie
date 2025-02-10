import mongoose from 'mongoose';

export const Recipe = mongoose.model('Recipe', {
    userID: {
        type: String,
        required: true
    },
    personalityCoffeeID: {
        type: String,
        required: true
    }
}, 'recipe');