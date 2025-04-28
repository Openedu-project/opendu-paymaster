import { Context, Next } from 'hono';
import { ResponseUtil } from '../utils/response';

export const errorHandler = () => async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error('Unhandled error:', error);
    return ResponseUtil.internalServerError(c, 'Internal server error');
  }
};
