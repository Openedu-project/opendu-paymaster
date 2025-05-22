import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { config } from './config';
import { corsConfig } from './config/cors';
import apiV1 from './api/v1';
import { errorHandler } from './middleware/error_handler';
import { loggerMiddleware } from './middleware/logger';

const app = new Hono();

// middleware
app.use('*', logger());
app.use('*', cors(corsConfig));
app.use('*', errorHandler());
app.use('*', loggerMiddleware);

// routes
app.route('/api/v1', apiV1);

// start server
const port = process.env.PORT ? parseInt(process.env.PORT) : config.app.port;
console.log(`Server is running on port ${port}`);

// Start the server
serve({
  fetch: app.fetch,
  port
});
