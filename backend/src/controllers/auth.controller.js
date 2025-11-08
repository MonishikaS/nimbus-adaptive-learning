const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Learner = require('../models/learner.model');
const { sign } = require('../utils/jwt');

async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role || 'student' });
    if (user.role === 'student') {
      await Learner.create({ user: user._id });
    }
    const token = sign({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = sign({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

module.exports = { signup, login };
