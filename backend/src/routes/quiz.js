const express = require("express");
const { getNextQuestion, submitAttempt } = require("../controllers/quizController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/next", auth, getNextQuestion);
router.post("/attempt", auth, submitAttempt);

module.exports = router;
