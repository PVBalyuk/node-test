import { sequelize } from '../utils/database';
import { DataTypes } from 'sequelize';
const Order = sequelize.define('order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
export default Order;
//# sourceMappingURL=order.js.map