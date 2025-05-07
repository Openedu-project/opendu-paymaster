import { Context, Next } from 'hono';
import { config } from '../config';
import { ResponseUtil } from '../utils/response';

export const authMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header('X-API-Key');
  
  if (!apiKey || apiKey !== config.app.apiKey) {
    return ResponseUtil.unauthorized(c, 'Invalid API key');
  }
  
  await next();
}; 