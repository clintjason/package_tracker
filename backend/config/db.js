const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * @returns {Promise<void>} Promise that resolves when connected to MongoDB.
 * @throws {Error} If an error occurs while connecting to MongoDB.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        });
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
};
module.exports = connectDB;