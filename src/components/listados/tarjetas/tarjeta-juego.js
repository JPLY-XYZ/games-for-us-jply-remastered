'use client';

import ButtonReportConfig from "@/components/utilidad/button-report-config";
import LikeButton from "@/components/utilidad/like-button";
import ReportButton from "@/components/utilidad/ReportBtn";
import Link from "next/link";

export default function TarjetaJuego({ game, isOwner, session }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all max-w-full sm:max-w-md md:max-w-lg mx-auto flex flex-col overflow-hidden">
      <Link href={`/juego/${game.id}`} className="block">
        <div className="relative w-full aspect-video">
          <img
            src={game?.urls?.images?.cover || "https://placehold.co/1280x720.jpg"}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          {!game.visible && isOwner && (
            <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Oculto por moderador
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {game.name}
          </h3>

          {game.shortDesc && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {game.shortDesc}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
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
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium line-clamp-1">
              {game.categories.map((category) => category.name).join(" · ")}
            </div>
          )}
        </div>
      </Link>

      <div className="border-t border-gray-200 dark:border-slate-700 px-4 py-3 bg-gray-50 dark:bg-slate-900 flex items-center justify-between">
        <LikeButton game={game} user={session?.user} />
        <ButtonReportConfig id={game.id} tipo={"GAME"} session={session} />
      </div>
    </div>
  );
}
