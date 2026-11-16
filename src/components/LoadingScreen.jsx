//Pantalla 2: Carga

// Pantalla de Carga: Muestra el estado de sincronización con Google Sheets.
import { useState } from "react";
export default function LoadingScreen() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-xl font-medium text-white">Cargando preguntas de Google Sheets...</p>
      <span className="text-sm text-slate-400">[Aquí se renderizará el GIF de carga desde src/assets/screens/]</span>
    </div>
  );
}