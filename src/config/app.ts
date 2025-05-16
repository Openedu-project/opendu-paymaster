import 'dotenv/config';

export const appConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8006,
  apiKey: process.env.API_KEY || 'default_api_key',
  env: process.env.NODE_ENV || 'development',
};
