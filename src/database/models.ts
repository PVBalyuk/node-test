// import Customer from './models/customer';
// import Order from './models/order';
import { initCustomer } from './models/Customer/customer';
import { initOrder } from './models/Order/order';
import { Sequelize } from 'sequelize';
// export const models = [Order, Customer];

export const initializeModels = (sequelize: Sequelize) => {
  initCustomer(sequelize);
  initOrder(sequelize);
};
