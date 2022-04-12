import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database';
import {dbModelNames} from "./dbModelNames";

const Customer = sequelize.define(
  dbModelNames.customer,
  {
    id: {
      type: DataTypes.INTEGER,
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Customer;
