'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DesarrolladorInfo({ user }) {
    if (!user) return null;

    const {
        id,
        name,
        image,
        bio,
        developedGames,
        comments,
        favoriteGames,
        createdAt
    } = user;


    
    const [startIndex, setStartIndex] = useState(0);
    const juegosPorVista = 3;

    const juegosVisibles = developedGames?.slice(startIndex, startIndex + juegosPorVista) || [];

    console.log(juegosVisibles);

    const subir = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const bajar = () => {
        if (startIndex + juegosPorVista < developedGames.length) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={user.image || "/placeholder-avatar.png"}
                    alt={`Avatar de ${name}`}
                    width={64}
                    height={64}
                    className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Miembro desde {new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Bio */}
            {bio && <p className="mb-6 text-gray-700 dark:text-gray-300">{bio}</p>}

            {/* Estadísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mb-6">
                <div>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{developedGames?.length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Juegos creados</p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">{comments?.length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comentarios</p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">{favoriteGames?.length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Juegos favoritos</p>
                </div>
            </div>

            {/* Carrusel de juegos */}
            {developedGames && developedGames.length > 0 && (
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Otros juegos desarrollados</h4>
                    <div className="flex flex-col items-center">
                        {/* Flecha arriba */}
                        <button
                            onClick={subir}
                            disabled={startIndex === 0}
                            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white disabled:opacity-30"
                        >
                            ▲
                        </button>

                        {/* Lista visible */}
                        <div className="flex flex-col gap-4 my-4 w-full">
                            {juegosVisibles.map((game) => {
  // Calcula el promedio de scores válidos (no nulos)
  const scores = game.comments.map(c => c.score).filter(s => s !== null);
  const averageScore = scores.length > 0 
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) 
    : null;

  return (
    <Link
      href={`/juego/${game.id}`}
      key={game.id}
      className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <img
        src={game.urls.images.cover || "/placeholder-game.png"}
        alt={game.name}
        className="rounded-md object-cover w-32 h-16"
      />
      <div className="flex-1">
        <p className="font-medium text-gray-800 dark:text-white truncate">{game.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">€{game.price?.toFixed(2) || 'Gratis'}</p>
        <p className="text-sm text-yellow-500">
          ⭐ {averageScore ?? 'Sin puntuar'}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {game.platforms?.map((platform) => (
            <span
              key={platform.id}
              className="text-xs px-2 py-0.5 bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-white rounded-full"
            >
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
})}

                        </div>

                        {/* Flecha abajo */}
                        <button
                            onClick={bajar}
                            disabled={startIndex + juegosPorVista >= developedGames.length}
                            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white disabled:opacity-30"
                        >
                            ▼
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
