import express from 'express';
import { initializeDatabase } from './database/initializeDatabase';
import router from './authRouter';

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
    console.log(e);
  }
};
