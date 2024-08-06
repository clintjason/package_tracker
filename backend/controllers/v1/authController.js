const authService = require('../../services/v1/authService');

/**
 * Sign up a new customer or driver.
 * @route POST /api/v1/auth/signup
 * @param {Object} req.body - The user data for signing up.
 * @access Public
 * @returns {User} The created user object.
 * @throws {Error} If an error occurs while signing up the user.
 */
exports.signup = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await authService.signup(userData);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

/**
 * Sign up a new admin.
 * @route POST /api/v1/auth/admin/signup
 * @param {Object} req.body - The admin data for signing up.
 * @access Public
 * @returns {User} The created admin user object.
 * @throws {Error} If an error occurs while signing up the admin.
 */
exports.signupAdmin = async (req, res, next) => {
    try {
        const adminData = req.body;
        const newAdmin = await authService.signupAdmin(adminData);
        res.status(201).json(newAdmin);
    } catch (error) {
        next(error);
    }
};

/**
 * Log in a user.
 * @route POST /api/v1/auth/login
 * @param {Object} req.body - The user credentials for logging in.
 * @access Public
 * @returns {Object} The token and user information.
 * @throws {Error} If an error occurs while logging in the user.
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const tokenData = await authService.login(email, password);
        res.json(tokenData);
    } catch (error) {
        next(error);
    }
};