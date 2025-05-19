'use client';

import ButtonReportConfig from "@/components/utilidad/button-report-config";
import LikeButton from "@/components/utilidad/like-button";
import { Star } from "lucide-react";
import Link from "next/link";

export default function TarjetaJuego({ game, isOwner, session }) {
  // Calculate average score
  const scores = game.comments?.map(c => c.score).filter(s => s !== null) || [];
  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  return (
    <div className="w-full mx-auto max-w-md aspect-[10/11.5] rounded-2xl bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col overflow-hidden">
      <Link href={`/juego/${game.id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
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

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {game.name}
          </h3>

          {game.shortDesc && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {game.shortDesc}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
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

            {averageScore != null && (
              <span className="flex gap-0.5">
                {averageScore}
                <Star className="text-yellow-300 h-3.5 w-3.5" />
              </span>
            )}
          </div>

          {game.categories?.length > 0 && (
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium line-clamp-1">
              {game.categories.map((category) => category.name).join(" · ")}
            </div>
          )}
        </div>
      </Link>

      {/* Footer */}
      <div className="border-t  border-gray-200 dark:border-slate-700 px-4 py-3 bg-gray-50 dark:bg-slate-900 flex items-center justify-between">
        <div className="scale-75 -translate-y-2 sm:scale-100 sm:translate-y-0">
          <LikeButton game={game} user={session?.user} />
        </div>
        <ButtonReportConfig id={game.id} tipo={"GAME"} session={session} />
      </div>
    </div>
  );
}
