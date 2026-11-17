// Pantalla de Carga: Muestra únicamente la barra de progreso animada y el texto limpio.
import { useEffect, useRef } from "react";
import barraCarga from "../assets/screens/barra-carga.gif";
import loadingAudioFile from "../assets/audio/barra-cargando.mp3";

export default function LoadingScreen() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(loadingAudioFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.play().catch(err => {
      console.log("Reproducción de audio bloqueada por el navegador:", err);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">
        {/* Barra de carga animada */}
        <img
          src={barraCarga}
          alt="Cargando"
          className="w-64 sm:w-80 h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Texto de carga limpio */}
        <p className="text-white text-lg sm:text-xl font-black tracking-widest uppercase animate-pulse">
          Cargando preguntas...
        </p>
      </div>
    </div>
  );
}