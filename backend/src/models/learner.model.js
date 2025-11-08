const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  mastery: { type: Map, of: Number, default: {} }, // e.g. {algebra: 0.6}
  streaks: { type: Map, of: Number, default: {} },
  lastSeen: { type: Map, of: Date, default: {} },
  timeOnTask: { type: Map, of: Number, default: {} }, // seconds per topic
  attemptHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }]
}, { timestamps: true });

module.exports = mongoose.model('Learner', LearnerSchema);
