// QuestionCard: Maneja la pizarra, opciones y el estado visual del avatar de forma sincronizada.
import { useEffect, useRef, useState } from "react";
import bgRuleta from "../assets/screens/fondo-ruleta.png";
import pizarraImg from "../assets/screens/pizzara-preguntas.png";
import inputBgImg from "../assets/screens/cuadro-respuesta-escrita.png";
import optionBgImg from "../assets/screens/cuadro-opcion-multiple.png";
import btnAcceptImg from "../assets/screens/cuadro-para-aceptar-escrito.png";
import btnResetImg from "../assets/screens/boton-reinicio.png";
import pensandoAudio from "../assets/audio/musica-pensando.mp3";
import danoFalsoAudio from "../assets/audio/sonido-falso-daño.mp3";
import danoRealAudio from "../assets/audio/sonido-daño.mp3";

// Importación de avatares
import alumna1Pensando from "../assets/avatars/alumna1-pensando.gif";
import alumna1Acertado from "../assets/avatars/alumna1-acertado.gif";
import alumna1Falso from "../assets/avatars/alumna1-falso.gif";

import alumna2Pensando from "../assets/avatars/alumna2-pensando.gif";
import alumna2Acertado from "../assets/avatars/alumna2-acertado.gif";
import alumna2Falso from "../assets/avatars/alumna2-falso.gif";

import alumnoPensando from "../assets/avatars/alumno-pensando.gif";
import alumnoAcertado from "../assets/avatars/alumno-acertado.gif";
import alumnoFalso from "../assets/avatars/alumno-falso.gif";

import profesorPensando from "../assets/avatars/profesor-pensando.gif";
import profesorAcertado from "../assets/avatars/profesor-acertado.gif";
import profesorFalso from "../assets/avatars/profesor-falso.gif";

export default function QuestionCard({ question, difficulty, lives, score, playerName, avatarId, onAnswer, onReset }) {
  const pensandoAudioRef = useRef(null);
  const [answerInput, setAnswerInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarState, setAvatarState] = useState("pensando"); // "pensando" | "acertado" | "falso"

  useEffect(() => {
    const audio = new Audio(pensandoAudio);
    audio.loop = true;
    audio.volume = 0.3;
    pensandoAudioRef.current = audio;

    audio.play().catch(err => {
      console.log("Audio de pensamiento bloqueado por el navegador:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      pensandoAudioRef.current = null;
    };
  }, [question]);

  const avatars = {
    1: { pensando: alumna1Pensando, acertado: alumna1Acertado, falso: alumna1Falso },
    "1": { pensando: alumna1Pensando, acertado: alumna1Acertado, falso: alumna1Falso },
    2: { pensando: alumna2Pensando, acertado: alumna2Acertado, falso: alumna2Falso },
    "2": { pensando: alumna2Pensando, acertado: alumna2Acertado, falso: alumna2Falso },
    3: { pensando: alumnoPensando, acertado: alumnoAcertado, falso: alumnoFalso },
    "3": { pensando: alumnoPensando, acertado: alumnoAcertado, falso: alumnoFalso },
    4: { pensando: profesorPensando, acertado: profesorAcertado, falso: profesorFalso },
    "4": { pensando: profesorPensando, acertado: profesorAcertado, falso: profesorFalso },
  };

  const currentAvatarSet = avatars[avatarId] || avatars[2];
  const selectedAvatarImg = currentAvatarSet[avatarState] || currentAvatarSet.pensando;

  const difficultyConfig = {
    verde: { label: "Fácil (Verde)", color: "text-emerald-400 border-emerald-500/50" },
    amarilla: { label: "Media (Amarilla)", color: "text-amber-400 border-amber-500/50" },
    roja: { label: "Difícil (Roja)", color: "text-rose-500 border-rose-500/50" },
  };

  const currentDiff = difficultyConfig[difficulty] || difficultyConfig.verde;

  const isMultipleChoice = 
    question.type?.toLowerCase() === "multiple" || 
    question.type?.toLowerCase() === "choice" || 
    (question.opA && question.opA.trim() !== "");

  const handleSubmission = (userAnswer) => {
    if (isSubmitting || !question) return;
    setIsSubmitting(true);

    if (pensandoAudioRef.current) {
      pensandoAudioRef.current.pause();
      pensandoAudioRef.current.currentTime = 0;
    }

    // Ejecutamos la validación en App.jsx y capturamos el cambio de avatar de forma inmediata
    const outcome = onAnswer(userAnswer, setFeedback, (newState) => {
      setAvatarState(newState);
    });

    if (!outcome.isCorrect) {
      const audioFile = outcome.receivedDamage ? danoRealAudio : danoFalsoAudio;
      const audio = new Audio(audioFile);
      audio.volume = 0.6;
      audio.play().catch(err => {
        console.log("Audio de respuesta bloqueado por el navegador:", err);
      });
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    handleSubmission(answerInput);
  };

  const handleOptionClick = (optText) => {
    setSelectedOption(optText);
    handleSubmission(optText);
  };

  if (!question) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center text-white">
        <p>Cargando pregunta...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-hidden select-none">
      <img
        src={bgRuleta}
        alt="Fondo Patio"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-slate-950/30 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl w-full h-full flex flex-col justify-between py-6 px-4">
        
        {/* Barra superior */}
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

          <button
            type="button"
            onClick={onReset}
            title="Reiniciar partida"
            className="group relative flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <img
              src={btnResetImg}
              alt="Reiniciar"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow-md"
              style={{ imageRendering: "pixelated" }}
            />
          </button>
        </div>

        {/* Zona Central */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-auto">
          
          {/* Avatar dinámico */}
          <div className="flex flex-col items-center shrink-0">
            <img
              key={avatarState}
              src={selectedAvatarImg}
              alt="Avatar Estado"
              className="h-40 sm:h-52 md:h-60 w-auto object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.95)]"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="mt-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/40">
              {avatarState === "pensando" ? "Pensando..." : avatarState === "acertado" ? "¡BANG / Daño!" : "¡Se salvó!"}
            </span>
          </div>

          {/* Pizarra */}
          <div className="relative w-full max-w-2xl p-6 sm:p-10 flex flex-col justify-center items-center">
            <img
              src={pizarraImg}
              alt="Pizarra"
              className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)]"
              style={{ imageRendering: "pixelated" }}
            />

            <div className="relative z-10 w-full text-white px-4 sm:px-8 py-4 space-y-3">
              
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${currentDiff.color}`}>
                  Dificultad: {currentDiff.label}
                </span>
              </div>

              <h2 className="text-sm sm:text-lg font-bold text-slate-100 leading-snug drop-shadow-md">
                {question.question}
              </h2>

              {isMultipleChoice ? (
                <div className="space-y-2 pt-1">
                  {[question.opA, question.opB, question.opC].filter(Boolean).map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleOptionClick(opt)}
                      className={`relative w-full flex items-center justify-center h-12 sm:h-14 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 bg-transparent border-0 p-0 ${
                        selectedOption === opt ? "brightness-125" : ""
                      }`}
                    >
                      <img
                        src={optionBgImg}
                        alt="Opción Multiple"
                        className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none drop-shadow-md"
                        style={{ imageRendering: "pixelated" }}
                      />
                      <span className="relative z-10 text-white font-bold text-xs sm:text-sm px-4 text-center">
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleInputSubmit} className="space-y-3 pt-1">
                  <div className="relative w-full flex items-center h-12 sm:h-14">
                    <img
                      src={inputBgImg}
                      alt="Cuadro Respuesta"
                      className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none drop-shadow-md"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <input
                      type="text"
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Escribe tu respuesta aquí..."
                      disabled={isSubmitting}
                      className="relative z-10 w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm px-6 py-3 focus:outline-none"
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !answerInput.trim()}
                      className="group relative flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <img
                        src={btnAcceptImg}
                        alt="Aceptar Respuesta"
                        className="h-10 sm:h-12 w-auto object-contain drop-shadow-lg"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </button>
                  </div>
                </form>
              )}

              {feedback && <div className="mt-1 animate-bounce text-center">{feedback}</div>}

            </div>
          </div>

        </div>

        <div className="h-4"></div>

      </div>
    </div>
  );
}