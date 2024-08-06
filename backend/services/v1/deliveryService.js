const Delivery = require('../../models/Delivery');

/**
 * Get all deliveries.
 * @returns {Promise<Array<Delivery>>} An array of all delivery objects.
 * @throws {Error} If an error occurs while fetching the deliveries.
 */
exports.getAllDeliveries = async () => {
    try {
        return await Delivery.find();
    } catch (error) {
        throw new Error('Error fetching deliveries');
    }
};

/**
 * Get a delivery by ID.
 * @param {string} deliveryId - The ID of the delivery to fetch.
 * @returns {Promise<Delivery|null>} The delivery object, or null if not found.
 * @throws {Error} If an error occurs while fetching the delivery.
 */
exports.getDeliveryById = async (deliveryId) => {
    try {
        return await Delivery.findById(deliveryId).populate('package_id');
    } catch (error) {
        throw new Error('Error fetching delivery');
    }
};

/**
 * Create a new delivery.
 * @param {Object} deliveryData - The delivery data to create a new delivery.
 * @returns {Promise<Delivery>} The created delivery object.
 * @throws {Error} If an error occurs while creating the delivery.
 */
exports.createDelivery = async (deliveryData) => {
    try {
        return await Delivery.create(deliveryData);
    } catch (error) {
        throw new Error('Error creating delivery');
    }
};

/**
 * Update a delivery.
 * @param {string} deliveryId - The ID of the delivery to update.
 * @param {Object} deliveryData - The updated delivery data.
 * @returns {Promise<Delivery>} The updated delivery object.
 * @throws {Error} If an error occurs while updating the delivery.
 */
exports.updateDelivery = async (deliveryId, deliveryData) => {
    try {
        return await Delivery.findByIdAndUpdate(deliveryId, deliveryData, { new: true });
    } catch (error) {
        throw new Error('Error updating delivery');
    }
};

/**
 * Delete a delivery.
 * @param {string} deliveryId - The ID of the delivery to delete.
 * @returns {Promise<void>} This function doesn't return any data.
 * @throws {Error} If an error occurs while deleting the delivery.
 */
exports.deleteDelivery = async (deliveryId) => {
    try {
        await Delivery.findByIdAndDelete(deliveryId);
    } catch (error) {
        throw new Error('Error deleting delivery');
    }
};

/**
 * Get the active delivery for a package.
 * @param {string} deliveryId - The ID of the active delivery.
 * @returns {Promise<Delivery|null>} The active delivery object, or null if not found.
 * @throws {Error} If an error occurs while fetching the active delivery.
 */
exports.getActiveDelivery = async (deliveryId) => {
    try {
        return await Delivery.findById(deliveryId);
    } catch (error) {
        throw new Error('Error fetching active delivery');
    }
};