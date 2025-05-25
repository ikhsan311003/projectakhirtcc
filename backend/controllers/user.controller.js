import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user' // ⛔️ role dikunci hanya "user"
    });

    res.status(201).json({ message: 'User berhasil didaftarkan', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🟡 Login request:', email); // Tambahan

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('🔴 User tidak ditemukan:', email);
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('🔴 Password salah:', email);
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ Login berhasil:', email);
    res.status(200).json({ message: 'Login berhasil', token });

  } catch (err) {
    console.error('🔥 ERROR LOGIN:', err); // ✅ ini penting agar error terlihat
    res.status(500).json({ error: 'Login error: ' + err.message });
  }
};
