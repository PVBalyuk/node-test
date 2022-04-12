import { Sequelize, DataTypes } from 'sequelize';
import dotenv from "dotenv"
import * as path from "path";

const envpath = path.basename("../../.env.local");

dotenv.config({path: envpath });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
