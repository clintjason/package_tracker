const Delivery = require('../../models/Delivery');

/**
 * Get all deliveries.
 * @returns {Promise<Array<Delivery>>} An array of all delivery objects.
 * @throws {Error} If an error occurs while fetching the deliveries.
 */
exports.getAllDeliveries = async () => {
    try {
        return await Delivery.find().populate('package_id');;
    } catch (error) {
        throw new Error(error || 'Error fetching deliveries');
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
        throw new Error(error || 'Error fetching delivery');
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
        throw new Error(error || 'Error creating delivery');
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
        throw new Error(error || 'Error updating delivery');
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
        throw new Error(error || 'Error deleting delivery');
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
        throw new Error(error || 'Error fetching active delivery');
    }
};

/**
 * Search Deliveries.
 * @param {Object} [query] - The search query.
 * @param {string} [query.searchTerm] - The search term to match against all fields.
 * @param {number} [query.page=1] - The page number for pagination.
 * @param {number} [query.limit=10] - The number of results to return per page.
 * @returns {Promise<{ deliveries: Array<Delivery>, totalPages: number, currentPage: number }>} The search results.
 * @throws {Error} If an error occurs while searching the packages.
 */
exports.searchDeliveries = async (query = {}) => {
    try {
        const { searchTerm, page = 1, limit = 10 } = query;
        const searchOptions = {};

        if (searchTerm) {
            searchOptions.$or = [
                { '_id': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.active_delivery_id': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.description': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.weight': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.width': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.height': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.depth': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.from_name': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.from_address': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.to_name': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.to_address': { $regex: new RegExp(searchTerm, 'i') } },
                { 'package_id.createdAt': { $regex: new RegExp(searchTerm, 'i') } },
                { 'createdAt': { $regex: new RegExp(searchTerm, 'i') } }
            ];
        }

        const deliveries = await Delivery.find(searchOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalDeliveries = await Delivery.countDocuments(searchOptions);
        const totalPages = Math.ceil(totalDeliveries / limit);

        return {
            deliveries,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        throw new Error(error || 'Error searching deliveries');
    }
};