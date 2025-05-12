"use client";

import TarjetaJuego from "./tarjetas/tarjeta-juego";

function ListadoJuegos({ games = [], titulo = "Mis Juegos" , isOwner}) {
  return (
    <div className="  max-w-7xl mx-auto">
      {titulo && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{titulo}</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.length > 0 ? (
          games.map((game, index) => (
            <TarjetaJuego
              key={`${game.id}-${index}`}
              game={game}
              isOwner={isOwner}
            />
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">
            No hay juegos disponibles.
          </div>
        )}
      </div>
    </div>
  );
}

export default ListadoJuegos;
