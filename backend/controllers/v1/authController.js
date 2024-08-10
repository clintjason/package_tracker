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
        req.session.userId = tokenData.user._id;
        req.session.role = tokenData.user.role;
        // Set HTTP-only cookie
        res.cookie('sessionToken', tokenData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
            sameSite: 'Lax', // Prevent CSRF
        });
        res.json(tokenData);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves the authenticated user's information.
 * @function getAuthenticatedUser
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @route POST /api/v1/auth/session
 * @access Public
 * @returns {Promise<Object>} - The authenticated user's information.
 * @throws {Error} - If an error occurs while authenticating the user.
 */
exports.getAuthenticatedUser = async (req, res, next) => {
    try {
        const user = await authService.authenticateUser(req);
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Destroys the user's session and logs them out.
 * @function logout
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} - Resolves when the logout operation is complete.
 * @throws {Error} - If an error occurs during the logout process.
 */
exports.logout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        next(error);
    }
};