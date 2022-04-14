import { DataTypes, Model, Sequelize } from 'sequelize';
import { ICustomer, ICustomerCreation } from './customerModel';
import { dbModelNames } from '../dbModelNames';

export class Customer extends Model<ICustomer, ICustomerCreation> {}

export const initCustomer = (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, modelName: dbModelNames.Customer },
  );
};
