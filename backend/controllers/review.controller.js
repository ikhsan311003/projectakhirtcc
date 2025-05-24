import { Review } from '../models/index.js';
import User from '../models/User.js';

// Ambil semua review kendaraan tertentu
export const getReviewsByVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const reviews = await Review.findAll({
      where: { vehicle_id: vehicleId },
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        }
      ]
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambahkan review (hanya user login)
export const createReview = async (req, res) => {
  try {
    const { vehicle_id, rating, comment } = req.body;

    const review = await Review.create({
      user_id: req.user.id,
      vehicle_id,
      rating,
      comment
    });

    res.status(201).json({ message: 'Review berhasil ditambahkan', review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
