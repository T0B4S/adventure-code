//Pantalla 4: Ruleta y palanca

// Vista de Ruleta: Controla el panel de estado actual y el accionamiento de la palanca.
import { useState } from "react";
export default function RouletteView({ playerName, lives, score, onSpin }) {
  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-md w-full text-center space-y-6 shadow-xl">
      <div className="flex justify-between border-b border-slate-700 pb-3 text-sm text-slate-300">
        <span>Jugador: <strong className="text-white">{playerName}</strong></span>
        <span>Vidas: ❤️ {lives}</span>
        <span>Puntos: 🪙 {score}</span>
      </div>

      <h3 className="text-xl font-bold text-white">Presiona el botón para accionar la palanca</h3>
      <div className="h-32 border-2 border-dashed border-slate-600 flex items-center justify-center rounded bg-slate-900/50">
        <span className="text-slate-500 text-sm">[Animación Palanca / GIF Ruleta]</span>
      </div>

      <button
        onClick={onSpin}
        className="w-full py-3 bg-red-600 hover:bg-red-700 font-bold rounded shadow text-lg transition text-white"
      >
        🎰 GIRAR RULETA
      </button>
    </div>
  );
}