import { Options } from 'swagger-jsdoc';

const PORT = process.env.ARTICLES_SERVICE_PORT || 3002;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Articles',
      version: '1.0.0',
      description: 'API pour la gestion des articles et des menus',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/doc/*.ts'],
};

export default swaggerOptions; 