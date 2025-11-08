require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const itemsRoutes = require('./routes/items.routes');
const quizzesRoutes = require('./routes/quizzes.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const learnersRoutes = require('./routes/learners.routes');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/quiz', quizzesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/learners', learnersRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}).catch(err => {
  console.error('Mongo connection error', err);
});
