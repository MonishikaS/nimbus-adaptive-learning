import React, { useState } from 'react';

export default function QuestionCard({ question, onSubmit }) {
  const [selected, setSelected] = useState(null);

  function submit() {
    if (selected === null && question.type === 'mcq') return alert('Select an option');
    onSubmit(selected);
  }

  return (
    <div style={{padding:12}}>
      <div style={{marginBottom:10}} dangerouslySetInnerHTML={{__html: `<strong>${question.stem}</strong>`}} />
      {question.type === 'mcq' && question.choices && (
        <div>
          {question.choices.map((c, i) => (
            <div key={i}>
              <label>
                <input type="radio" name="opt" value={c.text} onChange={()=>setSelected(c.text)} />
                {' '}
                <span dangerouslySetInnerHTML={{__html: c.text}} />
              </label>
            </div>
          ))}
        </div>
      )}
      {question.type === 'short' && (
        <div>
          <input value={selected || ''} onChange={e=>setSelected(e.target.value)} placeholder="Your answer" />
        </div>
      )}
      <div style={{marginTop:12}}>
        <button onClick={submit}>Submit Answer</button>
      </div>
    </div>
  );
}
