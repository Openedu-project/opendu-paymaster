import 'dotenv/config';

export const appConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  env: process.env.NODE_ENV || 'development',
};
