// RouletteView: Sincronizado perfectamente con la dificultad elegida y el avatar correcto.
import { useState } from "react";
import bgRuleta from "../assets/screens/fondo-ruleta.png";
import ruletaQuieta from "../assets/screens/ruleta-quieta.gif";
import ruletaGirando from "../assets/screens/ruleta-girando.gif";
import ruletaVerde from "../assets/screens/ruleta-resultado-verde.gif";
import ruletaAmarillo from "../assets/screens/ruleta-resultado-amarillo.gif";
import ruletaRojo from "../assets/screens/ruleta-resultado-rojo.gif";

import palancaQuieta from "../assets/screens/palanca-accionada.png";
import accionandoPalanca from "../assets/screens/accionando-palanca.gif";

import alumna1Sel from "../assets/avatars/alumna1-seleccion.gif";
import alumna2Sel from "../assets/avatars/alumna2-seleccion.gif";
import alumnoSel from "../assets/avatars/alumno-seleccion.gif";
import profesorSel from "../assets/avatars/profesor-seleccion.gif";

export default function RouletteView({ playerName, avatarId, lives, score, onSpin }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverActive, setLeverActive] = useState(false);
  const [resultColor, setResultColor] = useState(null);

  // Mapeo robusto de avatares (Soporta números y strings)
  const avatarMap = {
    1: alumna1Sel,
    "1": alumna1Sel,
    2: alumna2Sel,
    "2": alumna2Sel,
    3: alumnoSel,
    "3": alumnoSel,
    4: profesorSel,
    "4": profesorSel,
  };

  // Si avatarId llega vacío o no coincide, por defecto usa alumna1 o el que venga
  const selectedAvatarImg = avatarMap[avatarId] || alumna2Sel;

  const handlePullLever = () => {
    if (isSpinning || resultColor) return;
    setIsSpinning(true);
    setLeverActive(true);

    // 1. Elegimos la dificultad aquí de forma centralizada
    const difficulties = ["verde", "amarilla", "roja"];
    const chosenDiff = difficulties[Math.floor(Math.random() * difficulties.length)];

    // 2. Duración de la animación de la palanca y giro de la ruleta (1.2s)
    setTimeout(() => {
      setLeverActive(false);
      setIsSpinning(false);
      setResultColor(chosenDiff); // Muestra el GIF exacto del color ganador

      // 3. Pausa de 1.2 segundos mostrando el resultado en la ruleta antes de ir a la pregunta
      setTimeout(() => {
        onSpin(chosenDiff); // Enviamos el color exacto a App.jsx
      }, 1200);

    }, 1200);
  };

  const getRouletteImage = () => {
    if (isSpinning) return ruletaGirando;
    if (resultColor === "verde") return ruletaVerde;
    if (resultColor === "amarilla") return ruletaAmarillo;
    if (resultColor === "roja") return ruletaRojo;
    return ruletaQuieta;
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Fondo de la escuela (patio) */}
      <img
        src={bgRuleta}
        alt="Fondo Ruleta"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-between py-5 px-4">
        
        {/* Barra superior: Vidas, Nombre y Puntaje */}
        <div className="flex justify-between items-center bg-slate-950/85 border-2 border-amber-500/70 rounded-xl px-6 py-3 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-slate-400">Vidas:</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-lg ${i < lives ? "text-red-500" : "text-slate-600 opacity-30"}`}>
                  ❤️
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-amber-400 font-black text-sm sm:text-base uppercase tracking-wider">
              {playerName || "Jugador"}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-slate-400">Puntaje:</span>
            <span className="text-emerald-400 font-black text-lg">{score} / 50 pts</span>
          </div>
        </div>

        {/* Fila única: Personaje (Izq) | Palanca (Centro) | Ruleta (Der) */}
        <div className="w-full flex flex-row items-end justify-center gap-8 sm:gap-14 md:gap-20 pb-6 mt-auto">
          
          {/* 1. IZQUIERDA: Personaje seleccionado */}
          <div className="flex flex-col items-center">
            <img
              src={selectedAvatarImg}
              alt="Avatar Seleccionado"
              className="h-44 sm:h-56 md:h-64 w-auto object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.95)]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* 2. MEDIO: Palanca interactiva */}
          <div className="flex flex-col items-center">
            <p
              className="text-white text-[10px] sm:text-xs font-extrabold mb-2 uppercase tracking-wider text-center max-w-[130px]"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,1)" }}
            >
              {isSpinning ? "Girando..." : resultColor ? `¡Tocó ${resultColor}!` : "¡Tira de la palanca!"}
            </p>
            <button
              type="button"
              onClick={handlePullLever}
              disabled={isSpinning || Boolean(resultColor)}
              className="bg-transparent border-0 p-0 transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed cursor-pointer focus:outline-none drop-shadow-[0_10px_16px_rgba(0,0,0,0.95)]"
            >
              <img
                src={leverActive ? accionandoPalanca : palancaQuieta}
                alt="Palanca"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </button>
          </div>

          {/* 3. DERECHA: Ruleta */}
          <div className="flex flex-col items-center">
            <img
              src={getRouletteImage()}
              alt="Ruleta"
              className="w-56 sm:w-72 md:w-80 aspect-square object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.95)]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

        </div>

      </div>
    </div>
  );
}