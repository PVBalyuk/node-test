import express from 'express';
import { initializeDatabase } from './database/initializeDatabase';
import router from './modules/auth/router';
import dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.basename('../.env.local');

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());
app.use('/auth', router);

export const bootstrap = async () => {
  try {
    await initializeDatabase();

    app.listen(process.env.PORT, () => {
      console.log('server running at port');
    });
  } catch (e) {
    console.error(e);
  }
};
