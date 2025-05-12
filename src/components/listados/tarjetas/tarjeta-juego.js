"use client";

import Link from "next/link";

export default function TarjetaJuego({ game, isOwner }) {
  return (
    <Link
      href={"/juego/" + game.id}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
    >
      <img
        src={game?.urls?.images?.cover || "https://placehold.co/1280x720.jpg"}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-3 ">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
          {game.name}
        </h3>

        {game.shortDesc && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {game.shortDesc}
          </p>
        )}

        <div className="flex flex-wrap justify-start gap-4 text-xs text-gray-500 dark:text-gray-400">
          {game.releaseDate && (
            <span>
              {new Date(game.releaseDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
              })}
            </span>
          )}
          {game.price != null && (
            <span>
              {game.price === 0 ? "Gratis" : `${game.price} €`}
            </span>
          )}
          {game.averageScore != null && (
            <span> {game.averageScore}/100</span>
          )}
        </div>

        {game.categories?.length > 0 && (
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            {game.categories.map((c) => c.name).join(" · ")}
          </div>
        )}
      </div>

      {/* Mensaje para el propietario si el juego está oculto */}
      {!game.visible && isOwner && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2 px-4 py-2  rounded-lg">
          El juego está oculto por el desarrollador o algún moderador
        </p>
      )}
    </Link>
  );
}
