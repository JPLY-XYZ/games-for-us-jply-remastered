'use client';

import ButtonReportConfig from "@/components/utilidad/button-report-config";
import LikeButton from "@/components/utilidad/like-button";
import ReportButton from "@/components/utilidad/ReportBtn";
import Link from "next/link";

export default function TarjetaJuego({ game, isOwner, session }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
      <Link href={`/juego/${game.id}`}>
        <img
          src={game?.urls?.images?.cover || "https://placehold.co/1280x720.jpg"}
          alt={game.name}
          className="w-full h-56 object-cover rounded-t-xl transition-transform transform hover:scale-105"
        />
        <div className="p-5 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">{game.name}</h3>
          
          {game.shortDesc && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{game.shortDesc}</p>
          )}

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            {game.releaseDate && (
              <span>
                {new Date(game.releaseDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}

            {game.price != null && (
              <span>{game.price === 0 ? "Gratis" : `${game.price} €`}</span>
            )}

            {game.averageScore != null && (
              <span>{game.averageScore}/100</span>
            )}
          </div>

          {game.categories?.length > 0 && (
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {game.categories.map((category) => category.name).join(" · ")}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-b-xl flex justify-between items-center">
        <LikeButton game={game} user={session?.user} />
     
        <ButtonReportConfig id={game.id} tipo={"GAME"} session={session} />
      </div>

      {/* Message for owner if the game is hidden */}
      {!game.visible && isOwner && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
          El juego está oculto por un moderador
        </p>
      )}
    </div>
  );
}
