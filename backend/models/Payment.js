import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Rental from './Rental.js';

const Payment = db.define('payments', {
  rental_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'transfer', 'ewallet'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: false
});

Rental.hasOne(Payment, { foreignKey: 'rental_id' });
Payment.belongsTo(Rental, { foreignKey: 'rental_id' });

export default Payment;
