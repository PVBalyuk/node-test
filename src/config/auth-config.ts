import dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.basename('../../.env.local');

dotenv.config({ path: envPath });

export const SECRET_KEY_CONFIG = {
  secretKeyAccess: process.env.SECRET_KEY,
  secretKeyRefresh: process.env.SECRET_KEY_REFRESH,
};
