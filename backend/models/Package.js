const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    active_delivery_id: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    from_name: {
        type: String,
        required: true
    },
    from_address: {
        type: String,
        required: true
    },
    from_location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    to_name: {
        type: String,
        required: true
    },
    to_address: {
        type: String,
        required: true
    },
    to_location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    /* created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } */
}, {
    _id: true,
    timestamps: true
});

packageSchema.virtual('deliveries', {
    ref: 'Delivery',
    localField: '_id',
    foreignField: 'package_id'
});

module.exports = mongoose.model('Package', packageSchema);