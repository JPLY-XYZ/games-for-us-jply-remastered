"use client";

export default function BotonAccion({ texto, icono, color, onClick }) {
  const colores = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white rounded-md transition ${colores[color]}`}
    >
      {icono}
      {texto}
    </button>
  );
}
