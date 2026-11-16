//Pantalla 5: Preguntas / desafíos

// Tarjeta de Preguntas: Renderiza el desafío activo (opción múltiple o input de texto).
import { useState } from "react";
export default function QuestionCard({ question, difficulty, lives, score, onAnswer }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (ans) => {
    setFeedback(true);
    onAnswer(ans, setFeedback);
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-xl w-full space-y-6 shadow-xl">
      <div className="flex justify-between text-sm border-b border-slate-700 pb-2 text-slate-300">
        <span className={`capitalize font-bold ${
          difficulty === "verde" ? "text-green-400" : difficulty === "amarilla" ? "text-yellow-400" : "text-red-400"
        }`}>
          Dificultad: {difficulty}
        </span>
        <span>Vidas: ❤️ {lives} | Puntos: 🪙 {score}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{question.prompt}</h3>

      {question.opA ? (
        <div className="grid grid-cols-1 gap-3">
          {[question.opA, question.opB, question.opC].map((op, i) => (
            <button
              key={i}
              disabled={feedback !== null}
              onClick={() => handleSelect(op)}
              className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-left font-medium transition text-white"
            >
              {op}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            disabled={feedback !== null}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
            placeholder="Escribe tu respuesta..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            disabled={feedback !== null || !userAnswer.trim()}
            onClick={() => handleSelect(userAnswer)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 font-bold rounded transition text-white"
          >
            ENVIAR RESPUESTA
          </button>
        </div>
      )}
    </div>
  );
}