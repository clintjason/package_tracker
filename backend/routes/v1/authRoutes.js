const express = require('express');
const router = express.Router();
const authController = require('../../controllers/v1/authController');

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, driver, customer]
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user data and token
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auht/logout:
 *  post:
 *     summary: Logout the user
 *      description: Destroys the user's session and logs them out.
 *      tags: [Auth]
 *      responses:
 *        '200':
 *          description: Logout successful
 *          content:
 *            application/json:    
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Logout successful
 *        '500':
 *          description: Logout failed
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Logout failed
 *      requestBody:
 *        required: false
 */ 
router.post('/logout', authController.logout);

/**
 * @swagger
 * /auth:
 *  get:
 *    summary: Get authenticated user info
 *   description: Retrieves the authenticated user's information.
 *    tags: [Auth]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                # User properties go here
 *      '401':
 *        description: Not authenticated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Not authenticated
 *    security:
 *      - bearerAuth: []
 */
router.get('/', authController.getAuthenticatedUser);

module.exports = router;
