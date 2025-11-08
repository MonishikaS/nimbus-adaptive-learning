const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_super_secret';

function sign(payload, opts = { expiresIn: '7d' }) {
  return jwt.sign(payload, JWT_SECRET, opts);
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
