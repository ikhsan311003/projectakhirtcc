import { Rental, Vehicle, User } from '../models/index.js';

// 🔍 Ambil semua penyewaan milik user yang login
export const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Ambil semua penyewaan (ADMIN only)
export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      include: [
        { model: User },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    res.json(rentals);
  } catch (err) {
    console.error('❌ Error saat ambil semua sewa:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ➕ Buat penyewaan baru
export const createRental = async (req, res) => {
  try {
    const { vehicle_id, start_date, end_date, total_price } = req.body;

    const rental = await Rental.create({
      user_id: req.user.id,
      vehicle_id,
      start_date,
      end_date,
      total_price,
      status: 'booked' // Status awal, belum disewa sampai payment = paid
    });

    res.status(201).json({ message: 'Penyewaan berhasil dibuat', rental });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✏️ Update status sewa (admin only)
export const updateRentalStatus = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id, {
      include: [{ model: Vehicle, as: 'vehicle' }]
    });

    if (!rental) return res.status(404).json({ message: 'Sewa tidak ditemukan' });

    const newStatus = req.body.status;
    await rental.update({ status: newStatus });

    // ✅ Jika status jadi 'completed', kendaraan harus available lagi
    if (newStatus === 'completed' && rental.vehicle) {
      await rental.vehicle.update({ status: 'available' });
    }

    res.json({ message: 'Status sewa diperbarui', rental });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Hapus sewa (admin only)
export const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Sewa tidak ditemukan' });

    await rental.destroy();
    res.json({ message: 'Sewa berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
