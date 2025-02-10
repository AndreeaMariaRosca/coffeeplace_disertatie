import mongoose from 'mongoose';

export const Form = mongoose.model('Form', {
    id: {
        type: String
    },
    sign: {
        type: String,
        enum: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricornus', 'aquarius', 'pisces'],
        required: true,
    },
    type: {
        type: String,
        enum: ['morning', 'night'],
        required: true
    },
    season: {
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter'],
        required: true
    },
    genre: {
        type: String,
        enum: ['action', 'horror', 'drama', 'thriller', 'adventure', 'fantasy', 'SF', 'crime', 'comedy', 'romance', 'rom-com', 'animation', 'musical', 'documentary'],
        required: true
    },
    color: {
        type: String,
        enum: ['green', 'red', 'blue', 'brown', 'gray', 'pink', 'yellow', 'black', 'orange', 'white', 'purple', 'cyan', 'magenta', 'violet'],
        required: true
    },
    sex: {
        type: String,
        enum: ['woman', 'man'],
        required: true
    },
    score: {
        type: Number,
        required: true
    }

}, "forms");
