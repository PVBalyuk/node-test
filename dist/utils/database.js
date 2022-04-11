import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('node_test', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost',
});
export { sequelize };
//# sourceMappingURL=database.js.map