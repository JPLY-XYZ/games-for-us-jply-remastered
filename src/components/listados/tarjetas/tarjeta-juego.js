"use client";

import Image from "next/image";
import { Eye, EyeOff, Pencil, Trash2, Heart } from "lucide-react";
import BotonAccion from "./boton-accion";


export default function TarjetaJuego({ game, modoUso = "default", onEditar, onEliminar, onToggleVisible }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border
      ${!game.visible ? "border-yellow-400 dark:border-yellow-500" : "border-transparent"}
    `}>
      <Image
        src={game?.urls?.images?.cover || "https://placehold.co/1280x720.jpg"}
        alt={game.name}
        layout="responsive"
        width={600}
        height={300}
        className="object-cover w-full h-40"
      />

      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{game.name}</h3>
            {!game.visible && (
              <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Oculto</span>
            )}
          </div>
          {game.shortDesc && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{game.shortDesc}</p>
          )}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {game.categories?.length > 0 && <>🎮 {game.categories.map(c => c.name).join(", ")} · </>}
            📅 {game.releaseDate ? new Date(game.releaseDate).getFullYear() : "Próximamente"}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {modoUso === "favoritos" ? (
            <BotonAccion texto="Quitar Favorito" icono={<Heart className="w-4 h-4" />} color="red" onClick={() => onEliminar?.(game)} />
          ) : (
            <>
              {onEditar && <BotonAccion texto="Editar" icono={<Pencil className="w-4 h-4" />} color="blue" onClick={() => onEditar(game)} />}
              {onEliminar && <BotonAccion texto="Eliminar" icono={<Trash2 className="w-4 h-4" />} color="red" onClick={() => onEliminar(game)} />}
              {onToggleVisible && (
                <BotonAccion
                  texto={game.visible ? "Ocultar" : "Mostrar"}
                  icono={game.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  color={game.visible ? "yellow" : "green"}
                  onClick={() => onToggleVisible(game)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
