import dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.basename('../../.env.local');

dotenv.config({ path: envPath });

export const DB_CONFIG = {
  dbName: process.env.DB_NAME,
  dbLogin: process.env.DB_LOGIN,
  dbPassword: process.env.DB_PASSWORD,
};
