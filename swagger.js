const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'bingle API',
        version: '2.0.1',
        description: 'bingle shop API documentation',
    }
    
};

const options = {
    swaggerDefinition,
    apis: ['./app.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; 