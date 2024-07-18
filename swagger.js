const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'bingle shop API',
        version: '1.0.0',
        description: 'bingle shop API documentation',
    }
    
};

const options = {
    swaggerDefinition,
    apis: ['./app.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; 