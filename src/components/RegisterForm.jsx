// Pantalla 1: Registro y avatares

// Componente de Registro: Captura el nombre del usuario y la selección del avatar.
import { useState } from "react";
export default function RegisterForm({ onStart }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart(name, avatar);
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-md w-full shadow-2xl text-center">
      <h1 className="text-3xl font-bold mb-2 text-red-500">Adventure Code</h1>
      <p className="text-slate-400 mb-6">El Desafío de la Ruleta Rusa</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-left text-sm mb-1 font-semibold">Nombre del Jugador *</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-red-500"
            placeholder="Ingresa tu nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-left text-sm mb-2 font-semibold">Selecciona un Avatar</label>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4].map((id) => (
              <button
                type="button"
                key={id}
                onClick={() => setAvatar(id)}
                className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center font-bold transition ${
                  avatar === id ? "border-red-500 bg-red-500/20 text-red-400" : "border-slate-600 bg-slate-700 text-slate-300"
                }`}
              >
                AV {id}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 font-bold rounded shadow transition text-white"
        >
          INICIAR AVENTURA
        </button>
      </form>
    </div>
  );
}