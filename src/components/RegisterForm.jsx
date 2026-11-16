// Componente de Registro: Captura el nombre del usuario y la selección de los 4 personajes reales.
import { useState } from "react";
import bgEscuela from "../assets/screens/escuela-fondo.png";
import marcoBoton from "../assets/screens/marco-boton.png";
import marcoAvatares from "../assets/screens/marco-avatares.png";
import alumna1Sel from "../assets/avatars/alumna1-seleccion.gif";
import alumna2Sel from "../assets/avatars/alumna2-seleccion.gif";
import alumnoSel from "../assets/avatars/alumno-seleccion.gif";
import profesorSel from "../assets/avatars/profesor-seleccion.gif";

export default function RegisterForm({ onStart }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(1);

  // Lista de los 4 personajes con sus avatares y nombres
  const avatarsList = [
    { id: 1, name: "Alumna 1", img: alumna1Sel },
    { id: 2, name: "Alumna 2", img: alumna2Sel },
    { id: 3, name: "Alumno", img: alumnoSel },
    { id: 4, name: "Profesor", img: profesorSel },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart(name, avatar);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgEscuela})` }}
    >
      <div className="relative z-10 p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-1 text-red-500 tracking-wider" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}>Adventure Code</h1>
        <p className="text-white mb-6 text-sm" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}>El Desafío de la Ruleta Rusa</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-xs uppercase tracking-wider mb-1 font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}>Nombre del Jugador *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded bg-slate-950/75 text-white border-2 border-white/80 font-semibold shadow-lg focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/70 placeholder:text-white/90"
              placeholder="Ingresa tu nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}>Selecciona tu Personaje</label>
            <div className="grid grid-cols-4 gap-2">
              {avatarsList.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`group flex flex-col items-center justify-center gap-1 p-1 transition cursor-pointer hover:z-10 ${
                    avatar === av.id ? "scale-105" : ""
                  }`}
                >
                  <span
                    className={`flex h-28 w-28 items-center justify-center transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 ${
                      avatar === av.id ? "bg-amber-400/15" : "bg-slate-950/20"
                    }`}
                    style={{
                      backgroundImage: `url(${marcoAvatares})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img src={av.img} alt={av.name} className="h-20 w-20 object-contain" />
                  </span>
                  <span className="text-[10px] text-white font-bold truncate" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)" }}>{av.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="inline-flex h-14 w-full items-center justify-center text-lg font-bold shadow-lg transition text-white uppercase tracking-wider hover:brightness-125 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300 disabled:opacity-75 cursor-pointer"
            style={{ 
              backgroundColor: "rgba(127, 29, 29, 0.9)",
              backgroundImage: `url(${marcoBoton})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              border: 0,
              textShadow: "0 2px 3px rgba(0, 0, 0, 0.9)",
            }}
          >
            Comenzar
          </button>
        </form>
      </div>
    </div>
  );
}