require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Item = require('../models/item.model');
const Rule = require('../models/rule.model');
const Learner = require('../models/learner.model');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nimbusdb');
  await Promise.all([User.deleteMany({}), Item.deleteMany({}), Rule.deleteMany({}), Learner.deleteMany({})]);

  const pass = await bcrypt.hash('password', 10);
  const student = await User.create({ name: 'Alex Student', email: 'student@example.com', passwordHash: pass, role: 'student' });
  const instructor = await User.create({ name: 'Irene Instructor', email: 'instructor@example.com', passwordHash: pass, role: 'instructor' });
  await Learner.create({ user: student._id });

  const items = [
    {
      stem: 'What is the derivative of x^2 + 3x - 5 ?',
      type: 'mcq',
      choices: [
        { text: '2x + 3', correct: true },
        { text: 'x^2 + 3', correct: false },
        { text: '2x + 3x - 5', correct: false },
        { text: 'x^2 + 6x - 5', correct: false }
      ],
      tags: { topic: 'algebra', bloom: 'apply', difficulty: 'easy' },
      hints: [{ text: 'Differentiate termwise.', penalty: 0.2 }],
      explanation: 'Derivative of x^2 is 2x and derivative of 3x is 3.'
    },
    {
      stem: 'Calculate the area of triangle with base 5 and height 4.',
      type: 'short',
      answer: '10',
      tags: { topic: 'geometry', bloom: 'apply', difficulty: 'easy' },
      explanation: 'Area = 0.5 * base * height = 10'
    },
    {
      stem: 'Write a function to reverse a string in your language.',
      type: 'code',
      tags: { topic: 'programming', bloom: 'create', difficulty: 'hard' },
      explanation: 'Typical solution uses built-in reverse or manual swap.'
    }
  ];

  await Item.insertMany(items);

  const rule = {
    name: 'Algebra remediation',
    when: { topic: 'algebra', masteryLt: 0.6 },
    then: { action: 'remediate', params: { topic: 'algebra', level: 'foundation' } },
    active: true
  };
  await Rule.create(rule);

  console.log('Seed complete');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
