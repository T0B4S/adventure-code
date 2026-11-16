// Pantalla de Carga: Muestra el estado de sincronización con Google Sheets usando los recursos reales.
import barraCarga from "../assets/screens/barra-carga.gif";
import profesorPensando from "../assets/avatars/profesor-pensando.gif";

export default function LoadingScreen() {
  return (
    <div className="text-center space-y-6 p-8 bg-slate-900/90 border border-slate-700 rounded-xl max-w-md w-full shadow-2xl">
      <div className="flex justify-center">
        <img src={profesorPensando} alt="Pensando..." className="w-24 h-24 object-contain animate-pulse" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold text-white">Cargando preguntas de Google Sheets...</p>
        <p className="text-xs text-slate-400">Preparando el desafío académico</p>
      </div>
      <div className="flex justify-center pt-2">
        <img src={barraCarga} alt="Barra de carga" className="w-64 h-auto object-contain" />
      </div>
    </div>
  );
}