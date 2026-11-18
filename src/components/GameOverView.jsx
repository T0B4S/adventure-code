// GameOverView.jsx: Pantallas finales inmersivas a pantalla completa con el estilo visual del juego.
import { useEffect, useRef } from "react";
import bgRuleta from "../assets/screens/fondo-ruleta.png"; // Fondo general del patio escolar
import victoryAudioFile from "../assets/audio/musica-victoria.mp3";
import defeatAudioFile from "../assets/audio/musica-game-over.mp3";

// --- IMPORTACIÓN DE IMÁGENES DESDE SCREENS ---
import alumna1Derrota from "../assets/screens/alumna1-derrota-gameOver.png";
import alumna1Victoria from "../assets/screens/alumna1-victoria.png";
import alumna1Perfecta from "../assets/screens/alumna1-victoria-perfecta.png";

import alumna2Derrota from "../assets/screens/alumna2-derrota-gameOver.png";
import alumna2Victoria from "../assets/screens/alumna2-victoria.png";
import alumna2Perfecta from "../assets/screens/alumna2-victoria-perfecta.png";

import alumnoDerrota from "../assets/screens/alumno-derrota-gameOver.png";
import alumnoVictoria from "../assets/screens/alumno-victoria.png";
import alumnoPerfecta from "../assets/screens/alumno-victoria-perfecta.png";

import profesorDerrota from "../assets/screens/profesor-derrota-gameOver.png";
import profesorVictoria from "../assets/screens/profesor-victoria.png";
import profesorPerfecta from "../assets/screens/profesor-victoria-perfecta.png";

export default function GameOverView({ status, score, lives, playerName, avatarId, onReset }) {
  const endAudioRef = useRef(null);
  const isVictory = status === "VICTORY_INJURED" || status === "VICTORY_PERFECT";

  useEffect(() => {
    const audio = new Audio(isVictory ? victoryAudioFile : defeatAudioFile);
    audio.loop = true;
    audio.volume = 0.2;
    endAudioRef.current = audio;

    audio.play().catch(err => {
      console.log("Reproducción de audio final bloqueada por el navegador:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      if (endAudioRef.current === audio) {
        endAudioRef.current = null;
      }
    };
  }, [isVictory]);
  
  const endScreens = {
    1: { perfect: alumna1Perfecta, normal: alumna1Victoria, defeat: alumna1Derrota },
    "1": { perfect: alumna1Perfecta, normal: alumna1Victoria, defeat: alumna1Derrota },
    2: { perfect: alumna2Perfecta, normal: alumna2Victoria, defeat: alumna2Derrota },
    "2": { perfect: alumna2Perfecta, normal: alumna2Victoria, defeat: alumna2Derrota },
    3: { perfect: alumnoPerfecta, normal: alumnoVictoria, defeat: alumnoDerrota },
    "3": { perfect: alumnoPerfecta, normal: alumnoVictoria, defeat: alumnoDerrota },
    4: { perfect: profesorPerfecta, normal: profesorVictoria, defeat: profesorDerrota },
    "4": { perfect: profesorPerfecta, normal: profesorVictoria, defeat: profesorDerrota },
  };

  const currentAvatarScreens = endScreens[avatarId] || endScreens[2];

  const isDefeat = lives <= 0 || status === "GAME_OVER";
  const isPerfect = score >= 50 && lives === 3;

  const handleRestartClick = () => {
    if (endAudioRef.current) {
      endAudioRef.current.pause();
      endAudioRef.current.currentTime = 0;
    }
    onReset();
  };

  let finalImage = currentAvatarScreens.defeat;
  let finalTitle = "¡GAME OVER - PERDISTE!";
  let finalDesc = "Te quedaste sin vidas. El disparo fue fatal.";
  let titleColor = "text-red-500";
  let btnBg = "bg-red-600 hover:bg-red-500 border-red-400";

  if (!isDefeat) {
    if (isPerfect) {
      finalImage = currentAvatarScreens.perfect;
      finalTitle = "¡VICTORIA PERFECTA!";
      finalDesc = `¡Impecable, ${playerName || "Jugador"}! Completaste los 50 puntos sin perder ninguna vida.`;
      titleColor = "text-emerald-400";
      btnBg = "bg-emerald-600 hover:bg-emerald-500 border-emerald-400";
    } else {
      finalImage = currentAvatarScreens.normal;
      finalTitle = "¡VICTORIA!";
      finalDesc = `¡Lo lograste, ${playerName || "Jugador"}! Superaste los desafíos a pesar de las heridas.`;
      titleColor = "text-amber-400";
      btnBg = "bg-amber-500 hover:bg-amber-400 border-amber-300 text-slate-950";
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-hidden select-none z-50">
      
      {/* Fondo completo de la escuela idéntico al resto del juego */}
      <img
        src={bgRuleta}
        alt="Fondo Patio"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Capa de oscuridad translúcida para que resalte la tarjeta */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs pointer-events-none"></div>

      {/* Tarjeta central flotante estilo arcade */}
      <div className="relative z-10 max-w-3xl w-full bg-slate-950/90 border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center space-y-4">
        
        {/* Título principal */}
        <h1 className={`text-2xl sm:text-3xl font-black uppercase tracking-wider ${titleColor} text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}>
          {finalTitle}
        </h1>

        {/* Descripción */}
        <p className="text-slate-300 text-xs sm:text-sm text-center font-medium max-w-xl">
          {finalDesc}
        </p>

        {/* Imagen en Pixel Art limpia y centrada */}
        <div className="relative w-full aspect-video max-h-[45vh] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-inner bg-black flex items-center justify-center">
          <img
            src={finalImage}
            alt="Ilustración Final"
            className="w-full h-full object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Panel de Puntuación y Vidas súper claro */}
        <div className="w-full flex flex-wrap justify-center items-center gap-6 bg-slate-900/90 border border-amber-500/30 rounded-xl py-3 px-6 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-slate-400">Puntaje Final:</span>
            <span className="text-emerald-400 font-black text-base sm:text-lg">{score} pts</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-700 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-slate-400">Vidas Restantes:</span>
            <span className="text-red-500 font-black text-base sm:text-lg">{lives} / 3</span>
          </div>
        </div>

        {/* Botón de reinicio claro, destacado y llamativo */}
        <div className="w-full pt-1">
          <button
            type="button"
            onClick={handleRestartClick}
            className={`w-full py-3.5 ${btnBg} font-black uppercase rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-xl cursor-pointer border-2 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide`}
          >
            🔄 VOLVER AL INICIO (MENÚ PRINCIPAL)
          </button>
        </div>

      </div>
    </div>
  );
}