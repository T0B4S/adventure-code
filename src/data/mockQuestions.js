//Preguntas de respaldo locales

export const FALLBACK_QUESTIONS = [
  {
    id: 1,
    difficulty: "verde",
    type: "input",
    prompt: "En React, ¿qué Hook se utiliza para declarar un estado local?",
    correct: "useState",
    explanation: "useState permite añadir estado de React a componentes funcionales."
  },
  {
    id: 2,
    difficulty: "amarilla",
    type: "input",
    prompt: "¿Qué operador lógico evalúa el lado derecho solo si el izquierdo es verdadero (cortocircuito)?",
    correct: "&&",
    explanation: "El operador && ejecuta la segunda expresión si la primera es true."
  },
  {
    id: 3,
    difficulty: "roja",
    type: "multiple",
    prompt: "Estructura de control ideal para evaluar múltiples opciones en reemplazo de varios if/else anidados:",
    opA: "if",
    opB: "switch",
    opC: "while",
    correct: "switch",
    explanation: "La sentencia switch evalúa una expresión contra múltiples casos."
  }
];