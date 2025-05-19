'use client';
import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function JuegosClient({ initialGames }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(9);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredGames = useMemo(() => {
    return initialGames.filter(game =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialGames, search]);

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] min-w-[100%] md:min-w-[80%] mx-auto p-4 gap-4">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar juegos..."
          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {paginatedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-grow overflow-y-auto">
          {paginatedGames.map(game => (
            <div key={game.id} className="flex justify-center">
              <Link
                href={`/juego/${game.id}`}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col w-full max-w-[300px] h-[250px]"
              >
                <div className="relative w-full h-[180px]">
                  <img
                    src={game.urls?.images?.cover || "https://placehold.co/640x360"}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{ width: '300px', height: '180px' }}
                  />
                </div>
                <div className="p-4 flex items-center justify-center h-[70px]">
                  <h3 className="font-semibold text-lg text-center text-gray-800 dark:text-gray-100 line-clamp-2">
                    {game.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No se encontraron juegos que coincidan con tu búsqueda
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-2 py-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <div className="flex items-center">
            <span className="px-2 py-1 sm:hidden text-sm">
              {currentPage}/{totalPages}
            </span>

            <div className="hidden sm:flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-6 h-6 flex items-center justify-center rounded-md text-sm ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && currentPage > 3) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNum} className="text-sm">...</span>;
                }
                return null;
              })}
            </div>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
