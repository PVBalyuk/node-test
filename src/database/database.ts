import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../config/db-config';

const sequelize = new Sequelize(DB_CONFIG.dbName, DB_CONFIG.dbLogin, DB_CONFIG.dbPassword, {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;
