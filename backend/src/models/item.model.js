const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  stem: { type: String, required: true },
  type: { type: String, enum: ['mcq','short','code'], default: 'mcq' },
  choices: [{ text: String, correct: Boolean }],
  answer: { type: mongoose.Schema.Types.Mixed },
  tags: {
    topic: { type: String, required: true },
    bloom: { type: String },
    difficulty: { type: String, enum: ['easy','medium','hard'], default: 'medium' },
    skills: [String]
  },
  hints: [{ text: String, penalty: Number }],
  explanation: { type: String },
  resources: [{ title: String, url: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
