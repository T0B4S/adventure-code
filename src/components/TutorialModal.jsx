// TutorialModal: Muestra el avatar seleccionado, el nombre del jugador y las reglas del juego.
import alumna1Sel from "../assets/avatars/alumna1-seleccion.gif";
import alumna2Sel from "../assets/avatars/alumna2-seleccion.gif";
import alumnoSel from "../assets/avatars/alumno-seleccion.gif";
import profesorSel from "../assets/avatars/profesor-seleccion.gif";

export default function TutorialModal({ playerName, avatarId, onNext }) {
  const avatarMap = {
    1: { name: "Alumna 1", img: alumna1Sel },
    2: { name: "Alumna 2", img: alumna2Sel },
    3: { name: "Alumno", img: alumnoSel },
    4: { name: "Profesor", img: profesorSel },
  };

  const selectedAvatar = avatarMap[Number(avatarId)] || avatarMap[1];

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
      {/* Fondo temporal oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-emerald-950/80 to-slate-950 pointer-events-none"></div>

      {/* Contenedor principal en dos columnas */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        
        {/* Lado Izquierdo: Avatar seleccionado mirando hacia las instrucciones */}
        <div className="flex flex-col items-center justify-end shrink-0 order-2 md:order-1">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-end justify-center">
            <img
              src={selectedAvatar.img}
              alt={selectedAvatar.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <span className="mt-2 px-4 py-1 rounded bg-slate-950/80 border border-white/20 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase">
            {playerName || "Jugador"}
          </span>
        </div>

        {/* Lado Derecho: Tablero de Instrucciones */}
        <div className="flex-1 w-full bg-slate-950/90 border-4 border-amber-500/80 rounded-xl p-6 sm:p-8 shadow-2xl text-white space-y-5 order-1 md:order-2">
          <div className="border-b-2 border-amber-500/40 pb-3">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase tracking-wider">
              Instrucciones del Juego
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Presta atención a las reglas antes de girar el tambor, <span className="text-white font-bold">{playerName || "Jugador"}</span>:
            </p>
          </div>

          <ul className="space-y-4 text-sm sm:text-base text-slate-200">
            <li className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-red-600 text-white font-black rounded text-xs mt-0.5 shrink-0">1</span>
              <span>
                La ruleta sorteará 3 dificultades:{" "}
                <strong className="text-emerald-400">Verde (Fácil)</strong>,{" "}
                <strong className="text-amber-400">Amarilla (Media)</strong> y{" "}
                <strong className="text-rose-500">Roja (Difícil)</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-red-600 text-white font-black rounded text-xs mt-0.5 shrink-0">2</span>
              <span>
                Responder mal activa la recámara de la <strong className="text-white">Ruleta Rusa</strong>: tienes un <strong className="text-amber-400">50% de probabilidad</strong> de perder una vida.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-red-600 text-white font-black rounded text-xs mt-0.5 shrink-0">3</span>
              <span>
                Comienzas con <strong className="text-white">3 vidas</strong>. Acumula <strong className="text-emerald-400">50 puntos</strong> para ganar o llega a 0 vidas para sufrir un <strong className="text-rose-500">Game Over</strong>.
              </span>
            </li>
          </ul>

          {/* Botón único para ir directo a jugar */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black uppercase tracking-wider rounded-lg border-2 border-white/80 shadow-lg transition-all cursor-pointer text-sm sm:text-base"
            >
              ¡Entendido, a jugar!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}