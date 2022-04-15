import sequelize from '../../database';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DbModelNames } from '../dbModelNames';
import { IOrder, IOrderCreation } from './orderModel';

export class Order extends Model<IOrder, IOrderCreation> {}

export const initOrder = (sequelize: Sequelize) => {
  Order.init(
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
    { sequelize, modelName: DbModelNames.Order },
  );
};
