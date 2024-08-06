const express = require('express');
const router = express.Router();
const packageController = require('../../controllers/v1/packageController');
const { authenticate, checkRole } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: List of all packages
 */
router.get('/', authenticate, packageController.getAllPackages);

/**
 * @swagger
 * /packages/{packageId}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The package ID
 *     responses:
 *       200:
 *         description: The package data
 */
router.get('/:packageId', authenticate, packageController.getPackageById);

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     responses:
 *       201:
 *         description: The created package
 */
router.post('/', authenticate, checkRole('admin'), packageController.createPackage);

/**
 * @swagger
 * /packages/{packageId}:
 *   put:
 *     summary: Update a package
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The package ID
 *     responses:
 *       200:
 *         description: The updated package
 */
router.put('/:packageId', authenticate, checkRole('admin'), packageController.updatePackage);

/**
 * @swagger
 * /packages/{packageId}:
 *   delete:
 *     summary: Delete a package
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The package ID
 *     responses:
 *       204:
 *         description: Package deleted
 */
router.delete('/:packageId', authenticate, checkRole('admin'), packageController.deletePackage);

module.exports = router;