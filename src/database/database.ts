import { Sequelize, DataTypes } from 'sequelize';
// import Customer from './models/customer';
// import Order from './models/order';

const sequelize = new Sequelize('node_test', 'root', '12345678', {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;
