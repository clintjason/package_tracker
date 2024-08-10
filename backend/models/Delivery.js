const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    package_id: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    /* driver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, */
    pickup_time: {
        type: Date
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    status: {
        type: String,
        enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
    }
}, {
    _id: true,
    timestamps: true
});

module.exports = mongoose.model('Delivery', deliverySchema);