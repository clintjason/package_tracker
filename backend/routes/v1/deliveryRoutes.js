const express = require('express');
const router = express.Router();
const deliveryController = require('../../controllers/v1/deliveryController');
const { authenticate, checkRole } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: List of all deliveries
 */
router.get('/', authenticate, deliveryController.getAllDeliveries);

/**
 * @swagger
 * /deliveries/{deliveryId}:
 *   get:
 *     summary: Get a delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery ID
 *     responses:
 *       200:
 *         description: The delivery data
 */
router.get('/:deliveryId', authenticate, deliveryController.getDeliveryById);

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Deliveries]
 *     responses:
 *       201:
 *         description: The created delivery
 */
router.post('/', authenticate, checkRole('admin'), deliveryController.createDelivery);

/**
 * @swagger
 * /deliveries/{deliveryId}:
 *   put:
 *     summary: Update a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery ID
 *     responses:
 *       200:
 *         description: The updated delivery
 */
router.put('/:deliveryId', authenticate, checkRole('admin'), deliveryController.updateDelivery);

/**
 * @swagger
 * /deliveries/{deliveryId}:
 *   delete:
 *     summary: Delete a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery ID
 *     responses:
 *       204:
 *         description: Delivery deleted
 */
router.delete('/:deliveryId', authenticate, checkRole('admin'), deliveryController.deleteDelivery);

/**
 * @swagger
 * /deliveries/{id}/status:
 *   patch:
 *     summary: Update delivery status
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, picked-up, in-transit, delivered, failed]
 *     responses:
 *       200:
 *         description: The updated delivery
 *       404:
 *         description: Delivery not found
 */
router.patch('/:id/status', authenticate, deliveryController.updateStatus);

/**
 * @swagger
 * /deliveries/{id}/location:
 *   patch:
 *     summary: Update delivery location
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *     responses:
 *       200:
 *         description: The updated delivery
 *       404:
 *         description: Delivery not found
 */
router.patch('/:id/location', authenticate, deliveryController.updateLocation);

module.exports = router;
