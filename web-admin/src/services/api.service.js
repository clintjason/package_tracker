import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
});

/**
 * Create package.
 * @param pkg - The package content.
 * @returns {Promise<any>} - A promise containing the package content
 */
export const createPackage = (pkg) => {
  return api.post(import.meta.env.VITE_DEV_BASE_URL + `/package`, pkg);
}

/**
 * Create delivery.
 * @param pkg - The delivery content.
 * @returns {Promise<any>} - A promise containing the delivery content
 */
export const createDelivery = (pkg) => {
  return api.post(import.meta.env.VITE_DEV_BASE_URL + `/delivery`, pkg);
}

/**
 * Get all packages.
 * @returns {Array<Package>} - An array of all packages
 */
export const getAllPackages = () => {
  return api.get(import.meta.env.VITE_DEV_BASE_URL + `/package`);
}

/**
 * Get all Deliveris.
 * @returns {Array<Package>} - An array of all deliveries
 */
export const getAllDeliveries = () => {
  return api.get(import.meta.env.VITE_DEV_BASE_URL + `/delivery`);
}

/**
 * Get a package.
 * @returns {Array<Package>} - A package object
 */
export const getOnePackage = (packageId) => {
  return api.get(import.meta.env.VITE_DEV_BASE_URL + `/package/${packageId}`);
}

/**
 * Search for packages.
 * @param {Object} [params] - The search parameters.
 * @param {string} [params.searchTerm] - The search term.
 * @param {number} [params.page] - The page number for pagination.
 * @param {number} [params.limit] - The number of results to return per page.
 * @returns {Promise<{ packages: Array<Package>, totalPages: number, currentPage: number }>} The search results.
 * @throws {Error} If an error occurs while making the request.
 */
export const searchPackages = async (params = {}) => {
  try {
      const response = await api.get(`${import.meta.env.VITE_DEV_BASE_URL}/package`, { params });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error searching packages');
  }
};

/**
 * Search for deliveries.
 * @param {Object} [params] - The search parameters.
 * @param {string} [params.searchTerm] - The search term.
 * @param {number} [params.page] - The page number for pagination.
 * @param {number} [params.limit] - The number of results to return per page.
 * @returns {Promise<{ packages: Array<Package>, totalPages: number, currentPage: number }>} The search results.
 * @throws {Error} If an error occurs while making the request.
 */
export const searchDeliveries = async (params = {}) => {
  try {
      const response = await api.get(`${import.meta.env.VITE_DEV_BASE_URL}/delivery`, { params });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error searching deliveries');
  }
};
