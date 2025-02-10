import mongoose from 'mongoose';

export const Order = mongoose.model('Order', {
    coffee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coffees',
    },
    beverage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'beverages'
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        require: true
        // list of drinks ids
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
    // total list of ids for the drinks

});

