import React, { useState, useContext } from 'react';
import QuestionCard from './QuestionCard';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function QuizPlayer({ quiz }) {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const { user } = useContext(AuthContext);

  if (!quiz || !quiz.items) return <div>No quiz</div>;
  const current = quiz.items[index];

  async function submitAnswer(answer) {
    // Determine correctness locally for MCQ (if choices have correct flag) else server should evaluate
    let correct = false;
    if (current.choices && current.choices.length) {
      const chosen = current.choices.find(c => String(c._id || c.id) === String(answer) || c.text === answer);
      if (chosen && chosen.correct) correct = true;
    }
    // record attempt to backend
    if (user) {
      await api.post('/quiz/attempt', {
        learnerId: user.id,
        itemId: current.id,
        correct,
        timeSpent: 5,
        mode: quiz.mode
      });
    }
    setResponses(r => ({ ...r, [current.id]: { answer, correct } }));
    if (index + 1 < quiz.items.length) setIndex(index + 1);
    else alert('Quiz complete');
  }

  return (
    <div style={{background:'#fff', padding:16, borderRadius:8}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Quiz Player</h3>
        <div>{index+1}/{quiz.items.length}</div>
      </header>
      <QuestionCard question={current} onSubmit={submitAnswer} />
    </div>
  );
}
