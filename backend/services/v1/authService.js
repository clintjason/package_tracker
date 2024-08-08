const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Sign up a new customer or driver.
 * @param {Object} userData - The user data for signing up.
 * @returns {Promise<User>} The created user object.
 * @throws {Error} If an error occurs while signing up the user.
 */
exports.signup = async (userData) => {
    try {
      const { role, email, password, firstName, lastName, phoneNumber, gender, address } = userData;

       if (role === 'driver' || role === 'customer' || role === 'admin') {
            if (!email || !password || !firstName || !lastName || !phoneNumber || !gender || !address) {
                return res.status(400).json({ message: 'All fields are required for signup' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password, firstName, lastName, phoneNumber, gender, address, role, password: hashedPassword });
        return await user.save();
    } catch (error) {
        throw new Error(error || 'Error signing up user');
    }
};

/**
 * Sign up a new admin.
 * @param {Object} adminData - The admin data for signing up.
 * @returns {Promise<User>} The created admin user object.
 * @throws {Error} If an error occurs while signing up the admin.
 */
exports.signupAdmin = async (adminData) => {
    try {
      const { role, email, password, firstName, lastName} = userData;

        if (role === 'admin') {
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({ message: 'All fields are required for admin signup' });
            }
        }
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        const admin = new User({ role, email, password, firstName, lastName, password: hashedPassword});
        return await admin.save();
    } catch (error) {
        throw new Error(error || 'Error signing up admin');
    }
};

/**
 * Log in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The token and user information.
 * @throws {Error} If an error occurs while logging in the user.
 */
exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    } catch (error) {
        throw new Error( error ||'Error logging in user');
    }
};