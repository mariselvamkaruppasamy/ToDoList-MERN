const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo Web Application",
            version: "1.0.0",
            description: "API for managing tasks and users in the Todo web app",
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = { swaggerUi, swaggerSpec };