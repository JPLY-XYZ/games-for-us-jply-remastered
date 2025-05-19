'use client';

import Image from "next/image";
import Link from "next/link";
import { Youtube, Gamepad2, MessageCircle, Loader, ThumbsUpIcon } from "lucide-react";
import ButtonReportConfig from "@/components/utilidad/button-report-config";
import { Suspense } from "react";

// Animación CSS para borde inferior que sale desde el centro
const borderBottomAnimation = `
  @keyframes slideFromCenter {
    0% {
      transform: scaleX(0);
      transform-origin: center;
    }
    100% {
      transform: scaleX(1);
      transform-origin: center;
    }
  }
`;

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const safeSrc = (src) =>
  typeof src === "string" && src.trim() !== "" ? src : isDarkMode
  ? "/ImagenJuegoNotFound-oscuro.jpg"
  : "/ImagenJuegoNotFound-claro.jpg";

// Configuración para bordes e iconos según tipo
const tipoConfig = {
  VIDEO: { borderColor: "bg-red-500", icon: <Youtube className="text-red-500 w-5 h-5" /> },
  IMAGEN: { borderColor: "bg-green-500", icon: <Gamepad2 className="text-green-500 w-5 h-5" /> },
  RESEÑA: { borderColor: "bg-blue-500", icon: <MessageCircle className="text-blue-500 w-5 h-5" /> },
  NOTICIA: { borderColor: "bg-orange-500", icon: <MessageCircle className="text-orange-500 w-5 h-5" /> },
  DEFAULT: { borderColor: "bg-gray-300", icon: null },
};

export default function TarjetaContenido({ contenido, sesion }) {
  const config = tipoConfig[contenido.type] || tipoConfig.DEFAULT;

  // Para NOTICIA, ajustamos media y texto un poco distinto
  const esNoticia = contenido.type === "NOTICIA";

  return (
    <>
      <style>{borderBottomAnimation}</style>

      <div
        key={contenido.id}
        className={`w-full mx-auto max-w-xl rounded-2xl bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col overflow-hidden relative border-0`}
      >
        {/* Icono fijo arriba izquierda */}
        <div className="absolute top-2 left-2 z-5">
          {config.icon}
        </div>

        {/* Contenido clickable excepto el botón reportar */}
        <Link href={`/contenido/${contenido.id}`} className="flex flex-col flex-1 cursor-pointer">
          {/* Media */}
          {esNoticia ? (
            <div className="relative w-full h-[315px] mb-4 rounded-t-2xl overflow-hidden">
              <Image
                src={safeSrc(contenido.urls?.img)}

                alt={contenido.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-2xl"
              />
            </div>
          ) : contenido.urls?.video ? (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
              <iframe
                src={safeSrc(contenido.urls.video)}
                width="100%"
                height="100%"
                className="rounded-t-2xl"
                allowFullScreen
                autoPlay={false}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
              <Image
                src={
  contenido.type !== "RESEÑA"
    ? safeSrc(contenido.urls?.img)
    : safeSrc(contenido.urls?.imgs?.thumbnail )
}

                alt={contenido.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-2xl"
              />
            </div>
          )}

          {/* Contenido textual */}
          <div className={`p-4 flex flex-col flex-1 justify-between space-y-2 ${esNoticia ? "" : ""}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {contenido.title}
            </h3>

            {esNoticia ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {contenido.text}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                  Creador: {contenido.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                  Juego relacionado: {contenido.game.name}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  Creador: {contenido.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  Juego relacionado: {contenido.game.name}
                </p>
              </>
            )}
          </div>
        </Link>

        {/* Footer: Likes, Comentarios y Botón Reporte */}
        <div className="p-4 pt-0 flex justify-between items-center relative text-sm text-gray-600 dark:text-gray-300">
          {!esNoticia && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <ThumbsUpIcon className="w-5 h-5" />
                <span>{contenido.score ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-5 h-5" />
                <span>{contenido._count.comments ?? 0}</span>
              </div>
            </div>
          )}

          {esNoticia && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span>{contenido._count.comments ?? 0}</span>
            </div>
          )}

          <Suspense fallback={<Loader className="animate-spin text-gray-500" />}>
            <ButtonReportConfig
              id={contenido.id}
              tipo="CONTENT"
              session={sesion}
              subtipo={contenido.type}
            />
          </Suspense>

          {/* Borde animado abajo */}
          <span
            className={`absolute bottom-0 left-0 right-0 h-1 ${config.borderColor} origin-center`}
            style={{
              animation: "slideFromCenter 0.5s ease forwards",
              transformOrigin: "center",
              transform: "scaleX(0)"
            }}
          />
        </div>
      </div>
    </>
  );
}
