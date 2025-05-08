import Image from "next/image";
import Link from "next/link";
import { Loader, MessageCircle } from "lucide-react";
import ButtonReportConfig from "@/components/utilidad/button-report-config";
import { Suspense } from "react";

export default function TarjetaNoticia({ noticia, sesion }) {

  return (
    <div
      key={noticia.id}
      className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
    >
      <div className="absolute z-10 top-4 right-4 flex gap-2">
        <Suspense fallback={
          <Loader className="animate-spin text-white" />
        }><ButtonReportConfig id={noticia.id} tipo="CONTENT" session={sesion} />
        </Suspense>

      </div>

      <div className="relative w-full h-[315px] mb-4">
        <Image
          src={noticia.urls?.imgs?.thumbnail}
          alt={noticia.title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {noticia.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {noticia.text.slice(0, 150)}...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
        Creador: {noticia.user.name}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Juego relacionado: {noticia.game.name}
      </p>

      <div className="pt-1 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <MessageCircle className="w-6 h-6" />
          <span className="text-xl">{noticia._count.comments}</span>
        </div>

        <Link
          href={`/contenido/${noticia.id}`}
          className="text-blue-500 font-semibold hover:text-blue-600 transition"
        >
          Leer más
        </Link>
      </div>
    </div>
  );
}
