//Pantallas de finales

// Vista de Finales: Gestiona las pantallas de Game Over, Victoria Malherido y Victoria Perfecta.
import { useState } from "react";
export default function GameOverView({ status, score, shotsTaken, onReset }) {
  const config = {
    GAME_OVER: {
      title: "GAME OVER",
      desc: "Te quedaste sin vidas. El disparo fue fatal.",
      borderColor: "border-red-900",
      titleColor: "text-red-600",
      btnColor: "bg-red-600 hover:bg-red-700",
      placeholder: "[GIF Personaje Caído / Muerto]"
    },
    VICTORY_INJURED: {
      title: "¡VICTORIA SOBREVIVIENTE!",
      desc: `Lograste escapar pero recibiste ${shotsTaken} impacto(s). ¡Quedaste malherido!`,
      borderColor: "border-yellow-600",
      titleColor: "text-yellow-500",
      btnColor: "bg-yellow-600 hover:bg-yellow-700",
      placeholder: "[GIF Personaje Malherido/Vendado]"
    },
    VICTORY_PERFECT: {
      title: "¡VICTORIA LEGENDARIA!",
      desc: "Completaste el juego sin recibir ningún disparo. ¡Esquivaste todas las balas!",
      borderColor: "border-green-500",
      titleColor: "text-green-400",
      btnColor: "bg-green-600 hover:bg-green-700",
      placeholder: "[GIF Personaje Invicto / Trofeo]"
    }
  };

  const current = config[status] || config.GAME_OVER;

  return (
    <div className={`bg-slate-800 p-8 rounded-xl border ${current.borderColor} max-w-md w-full text-center space-y-4 shadow-xl`}>
      <h1 className={`text-3xl font-extrabold ${current.titleColor}`}>{current.title}</h1>
      <p className="text-slate-300 text-sm">{current.desc}</p>
      <p className="text-sm font-semibold text-white">Puntaje Final: 🪙 {score} pts</p>
      <div className="h-28 border border-slate-700 flex items-center justify-center rounded bg-slate-900/50">
        <span className="text-slate-500 text-sm">{current.placeholder}</span>
      </div>
      <button
        onClick={onReset}
        className={`w-full py-3 ${current.btnColor} font-bold rounded transition text-white`}
      >
        VOLVER AL INICIO
      </button>
    </div>
  );
}