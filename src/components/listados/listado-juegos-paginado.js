"use client";

import { obtenerJuegosPaginados } from "@/lib/games/actions";
import ListadoJuegos from "./listado-juegos";
import { useInfiniteScroll } from "./hook-observador-scroll-infinito-cliente";

export default function ListadoJuegoPaginado({ pageSize = 6, titulo = "Todos los Juegos", where = {}, isOwner = false, session }) {
  const fetchItems = async (page) => {
    const { juegos, hayMas } = await obtenerJuegosPaginados({ page, pageSize, where });
    return { newItems: juegos, moreAvailable: hayMas };
  };

  const { items: games, loading, hasMore, loaderRef, appendItems } = useInfiniteScroll(fetchItems);

  const handleNewItems = (newItems) => {
    appendItems(newItems); // Asegúrate de que appendItems está gestionando la concatenación correctamente
  };

  return (
    <div className="px-4 sm:px-8">
      <ListadoJuegos games={games} titulo={titulo} isOwner={isOwner} session={session} />
      {loading && <div className="text-center py-4 text-gray-500 dark:text-gray-400">Cargando...</div>}

      {/* SIEMPRE este div, aunque no haya más */}
      <div ref={loaderRef} className="h-8" />

{games.length == 0 && !loading && (
        <div className="text-center py-4 text-gray-400 dark:text-gray-500">
          No hay juegos.
        </div>
      )}
      {!hasMore && !games.length == 0 && !loading && (
        <div className="text-center py-4 text-gray-400 dark:text-gray-500">
          No hay más juegos.
        </div>
      )}
      
    </div>
  );
}
