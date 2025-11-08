const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  correct: { type: Boolean, required: true },
  takenAt: { type: Date, default: Date.now },
  timeSpent: { type: Number, default: 0 }, // seconds
  mode: { type: String, enum: ['diagnostic','formative','summative'], default: 'formative' },
  metadata: { type: Object }
});

module.exports = mongoose.model('Attempt', AttemptSchema);
