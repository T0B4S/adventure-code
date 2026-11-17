// RouletteView: Pantalla principal de la ruleta con fondo del patio, palanca interactiva y marcador.
import { useState } from "react";
import bgRuleta from "../assets/screens/fondo-ruleta.png";
import ruletaQuieta from "../assets/screens/ruleta-quieta.gif";
import ruletaGirando from "../assets/screens/ruleta-girando.gif";
import ruletaVerde from "../assets/screens/ruleta-verde.gif";
import ruletaAmarillo from "../assets/screens/ruleta-amarillo.gif";
import ruletaRojo from "../assets/screens/ruleta-rojo.gif";
import palancaQuieta from "../assets/screens/palanca-quieta.png";
import accionandoPalanca from "../assets/screens/accionando-palanca.gif";

import alumna1Sel from "../assets/avatars/alumna1-seleccion.gif";
import alumna2Sel from "../assets/avatars/alumna2-seleccion.gif";
import alumnoSel from "../assets/avatars/alumno-seleccion.gif";
import profesorSel from "../assets/avatars/profesor-seleccion.gif";

export default function RouletteView({ playerName, avatarId, lives, score, onSpin }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverActive, setLeverActive] = useState(false);

  const avatarMap = {
    1: { name: "Alumna 1", img: alumna1Sel },
    2: { name: "Alumna 2", img: alumna2Sel },
    3: { name: "Alumno", img: alumnoSel },
    4: { name: "Profesor", img: profesorSel },
  };

  const selectedAvatar = avatarMap[Number(avatarId)] || avatarMap[1];

  const handlePullLever = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLeverActive(true);

    // Simula la animación de la palanca y el giro de la ruleta antes de invocar la lógica del juego
    setTimeout(() => {
      setLeverActive(false);
      setIsSpinning(false);
      onSpin();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Fondo de la escuela (patio) */}
      <img 
        src={bgRuleta} 
        alt="Fondo Ruleta" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Capa de contraste oscura sutil */}
      <div className="absolute inset-0 bg-slate-950/30"></div>

      {/* Contenedor principal de la interfaz */}
      <div className="relative z-10 max-w-5xl w-full h-full flex flex-col justify-between py-6 px-4">
        
        {/* Barra superior: Vidas, Nombre y Puntaje */}
        <div className="flex justify-between items-center bg-slate-950/85 border-2 border-amber-500/70 rounded-xl px-6 py-3 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-slate-400">Vidas:</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-lg ${i < lives ? "text-red-500" : "text-slate-600"}`}>
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

        {/* Centro: Avatar del jugador a la izquierda y Ruleta en el centro */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-auto">
          
          {/* Avatar del jugador en juego */}
          <div className="flex flex-col items-center bg-slate-950/80 border border-white/20 p-4 rounded-xl shadow-2xl">
            <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              <img 
                src={selectedAvatar.img} 
                alt={selectedAvatar.name} 
                className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <span className="mt-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              En Juego
            </span>
          </div>

          {/* Ruleta central animada */}
          <div className="flex flex-col items-center">
            <div className="w-64 sm:w-80 md:w-96 aspect-square flex items-center justify-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              <img 
                src={isSpinning ? ruletaGirando : ruletaQuieta} 
                alt="Ruleta" 
                className="w-full h-full object-contain select-none"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>

        </div>

        {/* Parte inferior: Palanca interactiva para girar */}
        <div className="flex flex-col items-center pb-2">
          <p className="text-white text-xs sm:text-sm font-bold mb-2 uppercase tracking-wider" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}>
            {isSpinning ? "Girando tambor..." : "¡Haz clic en la palanca para girar!"}
          </p>

          <button
            type="button"
            onClick={handlePullLever}
            disabled={isSpinning}
            className="group bg-transparent border-0 p-0 transition-transform hover:scale-115 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer focus:outline-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
          >
            <img 
              src={leverActive ? accionandoPalanca : palancaQuieta} 
              alt="Palanca" 
              className="h-24 sm:h-28 w-auto object-contain select-none transition-transform"
              style={{ imageRendering: "pixelated" }}
            />
          </button>
        </div>

      </div>
    </div>
  );
}