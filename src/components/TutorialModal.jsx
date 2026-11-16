//Pantalla 3: Tutorial

// Modal de Tutorial: Explica las reglas del juego y el funcionamiento de la ruleta.
import { useState } from "react";
export default function TutorialModal({ onNext }) {
  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-lg w-full text-center space-y-4 shadow-xl">
      <h2 className="text-2xl font-bold text-yellow-400">Instrucciones del Juego</h2>
      <ul className="text-left text-slate-300 space-y-2 text-sm">
        <li>1. La ruleta sorteará 3 dificultades: 🟩 Verde (Fácil), 🟨 Amarilla (Media), 🟥 Roja (Difícil).</li>
        <li>2. Responder mal activa la recámara de la Ruleta Rusa: 50% de probabilidad de perder una vida.</li>
        <li>3. Comienzas con 3 vidas. Acumula 50 puntos para ganar o llega a 0 vidas para sufrir un <strong>Game Over</strong>.</li>
      </ul>
      <button
        onClick={onNext}
        className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded shadow transition"
      >
        ¡ENTENDIDO, GIRAR RULETA!
      </button>
    </div>
  );
}