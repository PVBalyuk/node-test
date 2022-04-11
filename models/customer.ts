import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../utils/database';

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Customer;
