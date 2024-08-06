/**
 * Error handling middleware.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
};