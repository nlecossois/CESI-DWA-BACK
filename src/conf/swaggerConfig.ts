import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: { // Ajout de "definition"
    openapi: '3.0.0',
    info: {
      title: 'API Express avec Swagger',
      version: '1.0.0',
      description: 'Documentation de l\'API',
    },
    servers: [{ url: 'http://localhost:8080' }],
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
  apis: ['./src/docs/*.ts'], // Chemin inchangé
};


export default swaggerOptions;