const express = require('express');
const router = express.Router();
const Learner = require('../models/learner.model');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const l = await Learner.findById(req.params.id).populate('user', 'name email');
    if (!l) return res.status(404).json({ error: 'Not found' });
    res.json(l);
  } catch (err) { next(err); }
});

module.exports = router;
