// Componente de Registro: Captura el nombre del usuario y la selección de los 4 personajes con marcos y botones perfectamente contenidos.
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

  // Lista de los 4 personajes reales
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
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo de la escuela en pantalla completa sin franjas */}
      <img 
        src={bgEscuela} 
        alt="Fondo Escuela" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Capa sutil para contraste */}
      <div className="absolute inset-0 bg-slate-950/20"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-5 my-auto p-2">
        <div>
          <h1 
            className="text-4xl sm:text-5xl font-black text-red-500 tracking-wider"
            style={{ textShadow: "0 3px 6px rgba(0,0,0,0.95), 0 0 15px rgba(0,0,0,0.8)" }}
          >
            Adventure Code
          </h1>
          <p 
            className="text-white text-sm sm:text-base font-bold mt-1"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}
          >
            El Desafío de la Ruleta Rusa
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left space-y-1.5 max-w-md mx-auto">
            <label 
              className="block text-xs uppercase tracking-wider font-extrabold text-white"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}
            >
              Nombre del Jugador *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-950/85 text-white border-2 border-white/80 font-semibold shadow-2xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/70 placeholder:text-white/60 text-base"
              placeholder="Ingresa tu nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label 
              className="block text-xs uppercase tracking-wider font-extrabold text-white text-center"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}
            >
              Selecciona tu Personaje
            </label>
            
            {/* 4 avatares con marcos amplios y overflow-hidden estricto para que los GIFs no salgan */}
            <div className="flex justify-center items-center gap-4 sm:gap-8 flex-nowrap">
              {avatarsList.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`group flex items-center justify-center p-1 transition-all cursor-pointer shrink-0 ${
                    avatar === av.id ? "scale-110" : "hover:scale-105 opacity-85 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative flex aspect-square w-36 sm:w-44 md:w-48 items-center justify-center transition-all duration-200 overflow-hidden rounded-lg ${
                      avatar === av.id ? "filter drop-shadow-[0_0_20px_rgba(239,68,68,0.95)] scale-105" : ""
                    }`}
                    style={{
                      backgroundImage: `url(${marcoAvatares})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                    }}
                  >
                    {/* Contenedor interno con padding estricto para contener el GIF */}
                    <div className="w-full h-full p-5 sm:p-6 flex items-center justify-center overflow-hidden">
                      <img 
                        src={av.img} 
                        alt={av.name} 
                        className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110" 
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 max-w-md mx-auto">
            <button
              type="submit"
              disabled={!name.trim()}
              className="relative inline-flex h-16 w-full items-center justify-center text-lg font-black shadow-2xl transition-transform active:scale-95 text-white uppercase tracking-wider hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-red-600 rounded-lg overflow-hidden"
              style={{ textShadow: "0 2px 3px rgba(0,0,0,0.95)" }}
            >
              {/* Texto del botón */}
              <span className="relative z-10">Comenzar</span>

              {/* Marco de pixel art superpuesto arriba del fondo rojo para proteger los bordes */}
              <img 
                src={marcoBoton} 
                alt="Marco Botón" 
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
                style={{ imageRendering: "pixelated" }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}