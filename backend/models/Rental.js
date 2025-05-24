import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './User.js';
import Vehicle from './Vehicle.js';

const Rental = db.define('rentals', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('booked', 'cancelled', 'completed'),
    defaultValue: 'booked'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// 🔗 Relasi dengan User
User.hasMany(Rental, { foreignKey: 'user_id' });
Rental.belongsTo(User, { foreignKey: 'user_id' });

// 🔗 Relasi dengan Vehicle (DILENGKAPI ALIAS)
Vehicle.hasMany(Rental, { foreignKey: 'vehicle_id' });
Rental.belongsTo(Vehicle, {
  foreignKey: 'vehicle_id',
  as: 'vehicle' // ✅ Penting agar bisa di-include di controller
});

export default Rental;
