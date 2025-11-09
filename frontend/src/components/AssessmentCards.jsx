import { useNavigate } from "react-router-dom";
import "./AssessmentCards.css";

export default function AssessmentCards() {
  const navigate = useNavigate();

  const modes = [
    {
      id: "diagnostic",
      title: "Diagnostic",
      description: "Assess current knowledge level",
      icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png",
    },
    {
      id: "formative",
      title: "Formative",
      description: "Practice and improve",
      icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    },
    {
      id: "summative",
      title: "Summative",
      description: "Final assessment",
      icon: "https://cdn-icons-png.flaticon.com/512/3314/3314190.png",
    },
  ];

  return (
    <div className="cards">
      {modes.map((mode) => (
        <div
          key={mode.id}
          className={`card ${mode.id}`}
          onClick={() => navigate(`/quiz/${mode.id}`)}
        >
          <img src={mode.icon} alt={mode.title} />
          <h3>{mode.title}</h3>
          <p>{mode.description}</p>
        </div>
      ))}
    </div>
  );
}
