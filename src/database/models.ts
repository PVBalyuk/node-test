import { initCustomer } from './models/Customer/customer';
import { initOrder } from './models/Order/order';
import { Sequelize } from 'sequelize';

export const initializeModels = (sequelize: Sequelize) => {
  initCustomer(sequelize);
  initOrder(sequelize);
};
