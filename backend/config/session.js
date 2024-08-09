const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        maxAge: 180 * 60 * 1000, // 3 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure this is true in production
        sameSite: 'lax'
    }
});