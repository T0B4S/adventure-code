// Componente de Registro: Captura el nombre del usuario y la selección de los 4 personajes con los GIFs al 100% de opacidad.
import { useState } from "react";
import bgEscuela from "../assets/screens/escuela-fondo.png";
import cartelInicio from "../assets/screens/cartel-inicio.gif";
import botonComenzar from "../assets/screens/boton-comenzar.gif";
import marcoAvatares from "../assets/screens/marco-avatares.png";
import alumna1Sel from "../assets/avatars/alumna1-seleccion.gif";
import alumna2Sel from "../assets/avatars/alumna2-seleccion.gif";
import alumnoSel from "../assets/avatars/alumno-seleccion.gif";
import profesorSel from "../assets/avatars/profesor-seleccion.gif";

export default function RegisterForm({ onStart }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(1);

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
      <div className="relative z-10 max-w-5xl w-full text-center space-y-4 my-auto p-2">
        {/* Cartel animado del título */}
        <div className="flex flex-col items-center">
          <img 
            src={cartelInicio} 
            alt="Adventure Code" 
            className="h-28 sm:h-36 w-auto object-contain select-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)]"
            style={{ imageRendering: "pixelated" }}
          />
          <p 
            className="text-white text-sm sm:text-base font-bold -mt-1"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}
          >
            El Desafío de la Ruleta Rusa
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left space-y-1 max-w-md mx-auto">
            <label 
              className="block text-xs uppercase tracking-wider font-extrabold text-white"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.95)" }}
            >
              Nombre del Jugador *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950/85 text-white border-2 border-white/80 font-semibold shadow-2xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/70 placeholder:text-white/60 text-base"
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
            
            {/* 4 avatares grandes en una sola línea horizontal */}
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
                    className={`relative flex aspect-square w-32 sm:w-40 md:w-44 items-center justify-center transition-all duration-200 overflow-hidden rounded-lg ${
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

          {/* Botón animado con su opacidad original al 100%, sin rellenos extra */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={!name.trim()}
              className="bg-transparent border-0 p-0 transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed cursor-pointer focus:outline-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)]"
            >
              <img 
                src={botonComenzar} 
                alt="Comenzar" 
                className="h-14 sm:h-16 w-auto object-contain select-none opacity-100"
                style={{ imageRendering: "pixelated" }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}