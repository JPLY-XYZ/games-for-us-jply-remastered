"use client";
import { useState } from "react";
import { List, LayoutGrid, Pencil, Trash2, EyeOff, Eye } from "lucide-react";
import Image from "next/image";

const juegos = [
  {
    titulo: "Juego 1",
    imagen: "/juego1.jpg",
    descripcion: "Una aventura épica llena de misterio.",
    genero: "Aventura",
    anio: 2024,
    visible: true,
  },
  {
    titulo: "Juego 2",
    imagen: "/juego2.jpg",
    descripcion: "Acción frenética con multijugador.",
    genero: "Acción",
    anio: 2023,
    visible: false,
  },
];

export default function JuegosDesarrollador() {
  const [modoTarjeta, setModoTarjeta] = useState(true);

  const toggleVisibilidad = (index) => {
    juegos[index].visible = !juegos[index].visible;
  };

  const handleEditar = (juego) => console.log("Editar:", juego);
  const handleEliminar = (juego) => console.log("Eliminar:", juego);

  return (
    <div className="w-full min-h-screen  px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Panel de Juegos
          </h1>
          <button
            onClick={() => setModoTarjeta(!modoTarjeta)}
            className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white p-2 rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition"
            aria-label="Cambiar vista"
          >
            {modoTarjeta ? (
              <List className="w-5 h-5" />
            ) : (
              <LayoutGrid className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Listado */}
        <div
          className={
            modoTarjeta
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {juegos.map((juego, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border ${
                juego.visible
                  ? "border-transparent"
                  : "border-yellow-400 dark:border-yellow-500"
              } ${modoTarjeta ? "" : "flex h-44"}`}
            >
              {/* Imagen */}
              <div className={`${modoTarjeta ? "" : "relative w-1/3 h-full"}`}>
                <Image
                  src={juego.imagen}
                  alt={juego.titulo}
                  layout={modoTarjeta ? "responsive" : "fill"}
                  width={modoTarjeta ? 600 : undefined}
                  height={modoTarjeta ? 300 : undefined}
                  className={`object-cover ${
                    modoTarjeta ? "w-full h-40" : "rounded-l-xl"
                  }`}
                />
              </div>

              {/* Info y acciones */}
              <div
                className={`${
                  modoTarjeta
                    ? "p-4 flex flex-col justify-between h-48"
                    : "p-4 w-2/3 flex flex-col justify-between"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {juego.titulo}
                    </h3>
                    {!juego.visible && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                        Oculto
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {juego.descripcion}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    🎮 {juego.genero} · 📅 {juego.anio}
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <BotonAccion
                    texto="Editar"
                    icono={<Pencil className="w-4 h-4" />}
                    color="blue"
                    onClick={() => handleEditar(juego)}
                  />
                  <BotonAccion
                    texto="Eliminar"
                    icono={<Trash2 className="w-4 h-4" />}
                    color="red"
                    onClick={() => handleEliminar(juego)}
                  />
                  <BotonAccion
                    texto={juego.visible ? "Ocultar" : "Mostrar"}
                    icono={
                      juego.visible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )
                    }
                    color={juego.visible ? "yellow" : "green"}
                    onClick={() => toggleVisibilidad(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para botones
function BotonAccion({ texto, icono, color, onClick }) {
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
