import sequelize from './database';

import { initializeModels } from './models';

export const initializeDatabase = async () => {
  initializeModels(sequelize);
  await sequelize.sync({ force: true }).catch(console.log);
};
