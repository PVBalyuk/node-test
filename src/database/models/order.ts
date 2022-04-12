import sequelize from '../database';
import { Sequelize, DataTypes } from 'sequelize';
import {dbModelNames} from "./dbModelNames";

const Order = sequelize.define(
  dbModelNames.order,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Order;
