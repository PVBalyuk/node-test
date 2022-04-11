import express from 'express';
import { sequelize } from './utils/database';
import Order from './models/order';
import Customer from './models/customer';

const app = express();

sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello 123 123');
});

app.listen(3000, () => {
  console.log('server running at port');
});
