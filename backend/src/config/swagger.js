
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
        },
        csrfToken: {
            type: 'apiKey',
            in: 'header',
            name: 'X-CSRF-Token',
            description: 'CSRF token obtained from login response or /auth/csrf endpoint'
        }
      },
      parameters: {
        deviceIdHeader: {
          in: 'header',
          name: 'X-Device-Id',
          schema: { type: 'string' },
          required: false,
          description: 'Unique device identifier (UUID or fingerprint)'
        },
        deviceTokenHeader: {
          in: 'header',
          name: 'X-Device-Token',
          schema: { type: 'string' },
          required: false,
          description: 'Device token for trusted device authentication (returned after 2FA)'
        }
      }
    },
    // No global security - each route defines its own security requirements
  },
  apis: ['./src/routes/*.js', './src/modules/**/*.routes.js'], // Files containing annotations
};

export const swaggerSpec = swaggerJsdoc(options);
