const deliveryService = require('../../services/v1/deliveryService');
const { updateLocation, updateStatus } = require('../../utils/websocket');

/**
 * Get all deliveries.
 * @route GET /api/v1/deliveries
 * @access Private
 * @returns {Array<Delivery>} An array of all delivery objects.
 * @throws {Error} If an error occurs while fetching the deliveries.
 */
exports.getAllDeliveries = async (req, res, next) => {
    try {
        const deliveries = await deliveryService.getAllDeliveries();
        res.json(deliveries);
    } catch (error) {
        next(error);
    }
};

/**
 * Get a delivery by ID.
 * @route GET /api/v1/deliveries/:deliveryId
 * @param {string} req.params.deliveryId - The ID of the delivery to fetch.
 * @access Private
 * @returns {Delivery|null} The delivery object, or null if not found.
 * @throws {Error} If an error occurs while fetching the delivery.
 */
exports.getDeliveryById = async (req, res, next) => {
    try {
        const delivery = await deliveryService.getDeliveryById(req.params.deliveryId);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        console.log('delivery: ', delivery)
        res.json(delivery);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new delivery.
 * @route POST /api/v1/deliveries
 * @param {Object} req.body - The delivery data to create a new delivery.
 * @access Private/Admin
 * @returns {Delivery} The created delivery object.
 * @throws {Error} If an error occurs while creating the delivery.
 */
exports.createDelivery = async (req, res, next) => {
    try {
        const deliveryData = req.body;
        const newDelivery = await deliveryService.createDelivery(deliveryData);
        res.status(201).json(newDelivery);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a delivery.
 * @route PUT /api/v1/deliveries/:deliveryId
 * @param {string} req.params.deliveryId - The ID of the delivery to update.
 * @param {Object} req.body - The updated delivery data.
 * @access Private/Admin
 * @returns {Delivery} The updated delivery object.
 * @throws {Error} If an error occurs while updating the delivery.
 */
exports.updateDelivery = async (req, res, next) => {
    try {
        const deliveryId = req.params.deliveryId;
        const deliveryData = req.body;
        const updatedDelivery = await deliveryService.updateDelivery(deliveryId, deliveryData);
        res.json(updatedDelivery);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a delivery.
 * @route DELETE /api/v1/deliveries/:deliveryId
 * @param {string} req.params.deliveryId - The ID of the delivery to delete.
 * @access Private/Admin
 * @returns {void} This endpoint doesn't return any data.
 * @throws {Error} If an error occurs while deleting the delivery.
 */
exports.deleteDelivery = async (req, res, next) => {
    try {
        const deliveryId = req.params.deliveryId;
        await deliveryService.deleteDelivery(deliveryId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

/**
 * Update delivery status.
 * @route PATCH /api/v1/deliveries/:id/status
 * @param {Object} req.body - The new status for the delivery.
 * @access Private
 * @returns {Delivery} The updated delivery object.
 * @throws {Error} If an error occurs while updating the delivery status.
 * @throws {Error} If the delivery is not found.
 */
exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const delivery = await deliveryService.getDeliveryById(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        await updateStatus(req.params.id, status);
        res.json(delivery);
    } catch (error) {
        next(error);
    }
};

/**
 * Update delivery location.
 * @route PATCH /api/v1/deliveries/:id/location
 * @param {Object} req.body - The new location for the delivery.
 * @access Private
 * @returns {Delivery} The updated delivery object.
 * @throws {Error} If an error occurs while updating the delivery location.
 * @throws {Error} If the delivery is not found.
 */
exports.updateLocation = async (req, res, next) => {
    try {
        const { location } = req.body;
        const delivery = await deliveryService.getDeliveryById(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        await updateLocation(req.params.id, location);
        res.json(delivery);
    } catch (error) {
        next(error);
    }
};

/**
 * Search deliveries.
 * @param {Object} [query] - The search query.
 * @param {string} [query.searchTerm] - The search term to match against all fields.
 * @param {number} [query.page=1] - The page number for pagination.
 * @param {number} [query.limit=10] - The number of results to return per page.
 * @returns {Promise<{ packages: Array<Package>, totalPages: number, currentPage: number }>} The search results.
 * @throws {Error} If an error occurs while searching the packages.
 */
exports.searchDeliveries = async (req, res, next) => {
    try {
        const { searchTerm, page, limit } = req.query;
        const { deliveries, totalPages, currentPage } = await deliveryService.searchDeliveries({
            searchTerm,
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10
        });
        res.json({ deliveries, totalPages, currentPage });
    } catch (error) {
        next(error);
    }
};