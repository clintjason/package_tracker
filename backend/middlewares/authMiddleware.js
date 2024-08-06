const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to authenticate users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} If authentication fails.
 */
exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

/**
 * Middleware to check user role.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} If authorization fails.
 */
exports.checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
