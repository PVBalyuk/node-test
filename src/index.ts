import express from 'express';
import { syncModels } from './database/main';

const app = express();

syncModels();

app.get('/', (req, res) => {
  res.send('Hello 123 123');
});

app.listen(3000, () => {
  console.log('server running at port');
});
