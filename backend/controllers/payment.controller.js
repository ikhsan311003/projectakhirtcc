import { Payment, Rental, Vehicle, User } from '../models/index.js';

// 🔍 Ambil semua pembayaran milik user yang login
export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: {
        model: Rental,
        where: { user_id: req.user.id },
        include: [{ model: Vehicle, as: 'vehicle' }]
      }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Buat pembayaran untuk sewa (user)
export const createPayment = async (req, res) => {
  try {
    const { rental_id, payment_method, amount } = req.body;

    const rental = await Rental.findByPk(rental_id);
    if (!rental) return res.status(404).json({ message: 'Data sewa tidak ditemukan' });
    if (rental.user_id !== req.user.id) return res.status(403).json({ message: 'Tidak diizinkan' });

    const payment = await Payment.create({
      rental_id,
      payment_method,
      amount
    });

    res.status(201).json({ message: 'Pembayaran berhasil dicatat', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update status pembayaran dan status kendaraan (admin only)
export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: {
        model: Rental,
        include: [{ model: Vehicle, as: 'vehicle' }]
      }
    });

    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });

    const newStatus = req.body.status;
    await payment.update({ status: newStatus });

    const rental = payment.rental;
    const vehicle = rental?.vehicle;

    if (vehicle) {
      if (newStatus === 'paid') {
        await vehicle.update({ status: 'rented' });
      } else if (newStatus === 'failed') {
        await vehicle.update({ status: 'available' });
      }
    }

    res.json({ message: 'Status pembayaran dan kendaraan diperbarui', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔍 Semua pembayaran (admin only)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: {
        model: Rental,
        include: [
          { model: Vehicle, as: 'vehicle' },
          { model: User }
        ]
      }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
