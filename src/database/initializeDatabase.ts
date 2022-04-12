import sequelize from './database';
import { models } from './models';

export const initializeDatabase = async () => {
  await sequelize
    .sync()
    .then(async () => {
      await Promise.all(models.map(async (model) => await model.sync({ force: true })));
    })
    .catch(console.log);
};
