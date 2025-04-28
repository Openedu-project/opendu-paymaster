import { Context, Next } from 'hono';

export const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const url = c.req.url;
  
  await next();
  
  const end = Date.now();
  const time = end - start;
  
  console.log(`${method} ${url} - ${time}ms`);
};
