import User from './User.js';
import Vehicle from './Vehicle.js';
import Rental from './Rental.js';
import Payment from './Payment.js';
import Review from './Review.js';

// =====================
// 📦 ASSOCIATIONS
// =====================

// User ↔ Rental
User.hasMany(Rental, { foreignKey: 'user_id' });
Rental.belongsTo(User, { foreignKey: 'user_id' });

// Vehicle ↔ Rental
Vehicle.hasMany(Rental, { foreignKey: 'vehicle_id' });
Rental.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

// Rental ↔ Payment
Rental.hasOne(Payment, { foreignKey: 'rental_id' });
Payment.belongsTo(Rental, { foreignKey: 'rental_id' });

// Vehicle ↔ Review
Vehicle.hasMany(Review, { foreignKey: 'vehicle_id' });
Review.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// User ↔ Review
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

export {
  User,
  Vehicle,
  Rental,
  Payment,
  Review
};
