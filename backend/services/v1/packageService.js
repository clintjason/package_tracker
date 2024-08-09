const Package = require('../../models/Package');

/**
 * Get all packages.
 * @returns {Promise<Array<Package>>} An array of all package objects.
 * @throws {Error} If an error occurs while fetching the packages.
 */
exports.getAllPackages = async () => {
    try {
        return await Package.find();
    } catch (error) {
        throw new Error(error || 'Error fetching packages');
    }
};

/**
 * Get a package by ID.
 * @param {string} packageId - The ID of the package to fetch.
 * @returns {Promise<Package|null>} The package object, or null if not found.
 * @throws {Error} If an error occurs while fetching the package.
 */
exports.getPackageById = async (packageId) => {
    try {
        return await Package.findById(packageId).populate('active_delivery_id');
    } catch (error) {
        throw new Error(error || 'Error fetching package');
    }
};

/**
 * Create a new package.
 * @param {Object} packageData - The package data to create a new package.
 * @returns {Promise<Package>} The created package object.
 * @throws {Error} If an error occurs while creating the package.
 */
exports.createPackage = async (packageData) => {
    try {
        return await Package.create(packageData);
    } catch (error) {
        throw new Error( error || 'Error creating package');
    }
};

/**
 * Update a package.
 * @param {string} packageId - The ID of the package to update.
 * @param {Object} packageData - The updated package data.
 * @returns {Promise<Package>} The updated package object.
 * @throws {Error} If an error occurs while updating the package.
 */
exports.updatePackage = async (packageId, packageData) => {
    try {
        return await Package.findByIdAndUpdate(packageId, packageData, { new: true });
    } catch (error) {
        throw new Error(error || 'Error updating package');
    }
};

/**
 * Delete a package.
 * @param {string} packageId - The ID of the package to delete.
 * @returns {Promise<void>} This function doesn't return any data.
 * @throws {Error} If an error occurs while deleting the package.
 */
exports.deletePackage = async (packageId) => {
    try {
        await Package.findByIdAndDelete(packageId);
    } catch (error) {
        throw new Error(error || 'Error deleting package');
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
exports.searchPackages = async (query = {}) => {
    try {
        const { searchTerm, page = 1, limit = 10 } = query;
        const searchOptions = {};

        if (searchTerm) {
            searchOptions.$or = [
                { '_id': { $regex: new RegExp(searchTerm, 'i') } },
                { 'active_delivery_id': { $regex: new RegExp(searchTerm, 'i') } },
                { 'description': { $regex: new RegExp(searchTerm, 'i') } },
                { 'weight': { $regex: new RegExp(searchTerm, 'i') } },
                { 'width': { $regex: new RegExp(searchTerm, 'i') } },
                { 'height': { $regex: new RegExp(searchTerm, 'i') } },
                { 'depth': { $regex: new RegExp(searchTerm, 'i') } },
                { 'from_name': { $regex: new RegExp(searchTerm, 'i') } },
                { 'from_address': { $regex: new RegExp(searchTerm, 'i') } },
                { 'to_name': { $regex: new RegExp(searchTerm, 'i') } },
                { 'to_address': { $regex: new RegExp(searchTerm, 'i') } },
                { 'createdAt': { $regex: new RegExp(searchTerm, 'i') } }
            ];
        }

        const packages = await Package.find(searchOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPackages = await Package.countDocuments(searchOptions);
        const totalPages = Math.ceil(totalPackages / limit);

        return {
            packages,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        throw new Error(error || 'Error searching packages');
    }
};