const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'driver', 'customer'], required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: function() { return this.role !== 'admin'; } },
    gender: { type: String, enum: ['male', 'female', 'other'], required: function() { return this.role !== 'admin'; } },
    address: { type: String, required: function() { return this.role !== 'admin'; } },
}, { timestamps: true });

userSchema.virtual('packages', {
    ref: 'Package',
    localField: '_id',
    foreignField: 'created_by'
});

userSchema.virtual('deliveries', {
    ref: 'Delivery',
    localField: '_id',
    foreignField: 'driver'
});

const User = mongoose.model('User', userSchema);

module.exports = User;