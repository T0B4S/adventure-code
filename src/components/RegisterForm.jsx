// Componente de Registro: Captura el nombre del usuario y la selección de los 4 personajes reales.
import { useState } from "react";
import bgEscuela from "../assets/screens/escuela-fondo.jpg";
import marcoBoton from "../assets/screens/marco-boton.png";
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
      <div className="absolute inset-0 bg-slate-950/70"></div>

      <div className="relative z-10 bg-slate-900/90 p-8 rounded-xl border border-red-500/50 max-w-md w-full shadow-2xl text-center backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-1 text-red-500 tracking-wider">Adventure Code</h1>
        <p className="text-slate-400 mb-6 text-sm">El Desafío de la Ruleta Rusa</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-xs uppercase tracking-wider mb-1 font-bold text-slate-300">Nombre del Jugador *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-red-500"
              placeholder="Ingresa tu nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 font-bold text-slate-300">Selecciona tu Personaje</label>
            <div className="grid grid-cols-4 gap-2">
              {avatarsList.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                    avatar === av.id ? "border-red-500 bg-red-500/20 scale-105" : "border-slate-700 bg-slate-800/80 hover:border-slate-500"
                  }`}
                >
                  <img src={av.img} alt={av.name} className="w-12 h-12 object-contain mb-1" />
                  <span className="text-[10px] text-slate-300 font-bold truncate">{av.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 font-bold rounded shadow transition text-white uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            style={{ 
              backgroundImage: `url(${marcoBoton})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            Iniciar Aventura
          </button>
        </form>
      </div>
    </div>
  );
}