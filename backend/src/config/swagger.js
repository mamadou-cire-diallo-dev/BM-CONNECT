
import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BM-CONNECT API',
      version: '1.0.0',
      description: 'REST API for BM-CONNECT platform',
      contact: {
        name: 'API Support',
        email: 'support@bm-connect.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'refresh_token'
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/modules/**/*.routes.js'], // Files containing annotations
};

export const swaggerSpec = swaggerJsdoc(options);
