import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';

import userRoutes from './routes/user.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import rentalRoutes from './routes/rental.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import reviewRoutes from './routes/review.routes.js';

dotenv.config();
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Routing
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API Rental Kendaraan Aktif 🚗🏍️');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Koneksi & Sync DB
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('✅ Koneksi database berhasil!');

    await db.sync(); // ← aktifkan ini jika belum migrasi manual
  } catch (error) {
    console.error('❌ Gagal koneksi ke database:', error.message);
    process.exit(1);
  }
};

connectDB();

// Jalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
