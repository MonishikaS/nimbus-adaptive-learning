const Attempt = require('../models/attempt.model');
const Learner = require('../models/learner.model');

async function learnerMasteryTimeline(req, res, next) {
  try {
    const { id } = req.params;
    const attempts = await Attempt.find({ learner: id }).sort({ takenAt: 1 }).lean();
    // group by day and topic -> compute cumulative mastery per point (simple)
    const timeline = attempts.map(a => ({
      takenAt: a.takenAt,
      topic: a.metadata && a.metadata.topic,
      correct: a.correct
    }));
    res.json({ timeline });
  } catch (err) { next(err); }
}

module.exports = { learnerMasteryTimeline };
