/**
 * CORS configuration for the application
 * This file contains all CORS-related configuration settings
 */

// Parse additional allowed origins from environment variable
const additionalOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

export const corsConfig = {
  origin: [
    'https://api-test.openedu101.com',
    process.env.ALLOWED_ORIGIN || 'https://openedu101.com',
    'http://localhost:8000',
    'http://localhost:8001',
    'http://localhost:8002',
    'http://localhost:8003',
    ...additionalOrigins
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-API-Key'],
  exposeHeaders: ['Content-Length', 'X-API-Key'],
  maxAge: 86400,
  credentials: true,
};
