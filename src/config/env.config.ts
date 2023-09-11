import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
export const env = {
  DATABASE_CONNECT: process.env.DATABASE_CONNECT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DOMAN_BE: process.env.DOMAN_BE,
  ROOT_PATH: path.join(__dirname, '..'),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT || 6379),
    USER: process.env.REDIS_USER,
    PASS: process.env.REDIS_PASS,
  },
  APP_NAME: process.env.APP_NAME,
};
