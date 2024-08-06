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
        throw new Error('Error fetching packages');
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
        throw new Error('Error fetching package');
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
        throw new Error('Error creating package');
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
        throw new Error('Error updating package');
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
        throw new Error('Error deleting package');
    }
};