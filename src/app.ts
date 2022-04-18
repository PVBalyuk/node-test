import express from 'express';
import { initializeDatabase } from './database/initializeDatabase';
import router from './modules/auth/router';

const app = express();

app.use(express.json());
app.use('/auth', router);

export const bootstrap = async () => {
  try {
    await initializeDatabase();

    app.listen(3000, () => {
      console.log('server running at port');
    });
  } catch (e) {
    console.error(e);
  }
};
