const { assembleQuiz } = require('../services/quizAssembler');
const Attempt = require('../models/attempt.model');
const Learner = require('../models/learner.model');
const Item = require('../models/item.model');

async function generateQuiz(req, res, next) {
  try {
    const { learnerId, topics, mode, size } = req.body;
    const quiz = await assembleQuiz({ learnerId, topics, mode, size });
    res.json(quiz);
  } catch (err) { next(err); }
}

async function recordAttempt(req, res, next) {
  try {
    const { learnerId, itemId, correct, timeSpent = 0, mode = 'formative' } = req.body;
    const item = await Item.findById(itemId);
    const attempt = await Attempt.create({ learner: learnerId, item: itemId, correct, timeSpent, mode, metadata: { topic: item.tags.topic } });
    // update learner summary fields (append attempt and compute quick mastery)
    const learner = await Learner.findById(learnerId);
    if (learner) {
      learner.attemptHistory = learner.attemptHistory.concat(attempt._id);
      // quick update to lastSeen/timeOnTask/streaks
      const topic = item.tags.topic;
      learner.lastSeen.set(topic, new Date());
      const prevTime = learner.timeOnTask.get(topic) || 0;
      learner.timeOnTask.set(topic, prevTime + timeSpent);
      // streaks: increment if correct else reset
      const prevStreak = learner.streaks.get(topic) || 0;
      learner.streaks.set(topic, correct ? prevStreak + 1 : 0);
      await learner.save();
    }
    res.json(attempt);
  } catch (err) { next(err); }
}

module.exports = { generateQuiz, recordAttempt };
