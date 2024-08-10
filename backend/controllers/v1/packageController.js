const packageService = require('../../services/v1/packageService');
const deliveryService = require('../../services/v1/deliveryService');

/**
 * Get all packages.
 * @route GET /api/v1/packages
 * @access Private
 * @returns {Array<Package>} An array of all package objects.
 * @throws {Error} If an error occurs while fetching the packages.
 */
exports.getAllPackages = async (req, res, next) => {
    try {
        const packages = await packageService.getAllPackages();
        res.json(packages);
    } catch (error) {
        next(error);
    }
};

/**
 * Get a package by ID.
 * @route GET /api/v1/packages/:packageId
 * @param {string} req.params.packageId - The ID of the package to fetch.
 * @access Private
 * @returns {Package|null} The package object, or null if not found.
 * @throws {Error} If an error occurs while fetching the package.
 */
exports.getPackageById = async (req, res, next) => {
    try {
        const package = await packageService.getPackageById(req.params.packageId);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        if (package.active_delivery_id) {
            const activeDelivery = await deliveryService.getActiveDelivery(package.active_delivery_id);
            res.json({ package, activeDelivery });
        } else {
            res.json({ package });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new package.
 * @route POST /api/v1/packages
 * @param {Object} req.body - The package data to create a new package.
 * @access Private/Admin
 * @returns {Package} The created package object.
 * @throws {Error} If an error occurs while creating the package.
 */
exports.createPackage = async (req, res, next) => {
    try {
        const packageData = req.body;
        const newPackage = await packageService.createPackage(packageData);
        res.status(201).json(newPackage);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a package.
 * @route PUT /api/v1/packages/:packageId
 * @param {string} req.params.packageId - The ID of the package to update.
 * @param {Object} req.body - The updated package data.
 * @access Private/Admin
 * @returns {Package} The updated package object.
 * @throws {Error} If an error occurs while updating the package.
 */
exports.updatePackage = async (req, res, next) => {
    try {
        const packageId = req.params.packageId;
        const packageData = req.body;
        const updatedPackage = await packageService.updatePackage(packageId, packageData);
        res.json(updatedPackage);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a package.
 * @route DELETE /api/v1/packages/:packageId
 * @param {string} req.params.packageId - The ID of the package to delete.
 * @access Private/Admin
 * @returns {void} This endpoint doesn't return any data.
 * @throws {Error} If an error occurs while deleting the package.
 */
exports.deletePackage = async (req, res, next) => {
    try {
        const packageId = req.params.packageId;
        await packageService.deletePackage(packageId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


/**
 * Search packages.
 * @param {Object} [query] - The search query.
 * @param {string} [query.searchTerm] - The search term to match against all fields.
 * @param {number} [query.page=1] - The page number for pagination.
 * @param {number} [query.limit=10] - The number of results to return per page.
 * @returns {Promise<{ packages: Array<Package>, totalPages: number, currentPage: number }>} The search results.
 * @throws {Error} If an error occurs while searching the packages.
 */
exports.searchPackages = async (req, res, next) => {
    try {
        const { searchTerm, page, limit } = req.query;
        const { packages, totalPages, currentPage } = await packageService.searchPackages({
            searchTerm,
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10
        });
        res.json({ packages, totalPages, currentPage });
    } catch (error) {
        next(error);
    }
};