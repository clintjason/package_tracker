const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    delivery_id: {
        type: String,
        required: true,
        unique: true
    },
    package_id: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
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
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Delivery', deliverySchema);