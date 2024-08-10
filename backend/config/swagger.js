const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Package Tracker API',
            version: '1.0.0',
            description: 'API documentation for the Package Tracker application',
        },
        servers: [{ url: '/api/v1' }],
    },
    apis: ['./routes/v1/*.js', './models/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };