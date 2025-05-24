import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import User from './User.js';
import Vehicle from './Vehicle.js';

const Review = db.define('reviews', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Vehicle.hasMany(Review, { foreignKey: 'vehicle_id' });
Review.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

export default Review;
