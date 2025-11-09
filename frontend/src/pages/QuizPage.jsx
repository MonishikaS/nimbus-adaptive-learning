import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function QuizPage() {
  const { mode } = useParams();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Fetch sample question
    async function fetchQuestion() {
      try {
        const res = await api.post("/quiz/next", {
          topic: "JavaScript",
          difficulty: 1,
        });
        setQuestion(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestion();
  }, [mode]);

  async function submitAnswer() {
    try {
      const res = await api.post("/quiz/attempt", {
        questionId: question._id,
        selected,
      });
      setResult(res.data.correct ? "✅ Correct!" : "❌ Incorrect!");
    } catch (err) {
      console.error(err);
    }
  }

  if (!question)
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
          Loading question...
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2>{mode.toUpperCase()} MODE</h2>
        <h3>{question.text}</h3>
        <ul>
          {question.options.map((opt, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={submitAnswer}>Submit</button>
        <p style={{ marginTop: "20px" }}>{result}</p>
      </div>
    </>
  );
}
