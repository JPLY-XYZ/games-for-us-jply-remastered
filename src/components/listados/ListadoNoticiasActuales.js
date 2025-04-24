import { getLatestNews } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import ReportButton from "../utilidad/ReportBtn";
import { MessageCircle } from "lucide-react";

async function ListadoNoticiasActuales() {
  const sesion = await auth();
  const listaNoticias = await getLatestNews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {listaNoticias.map((noticia) => (
        <div
          key={noticia.id}
          className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
        >
          <div className="absolute z-10 top-4 right-4 flex gap-2">
            <ReportButton id={noticia.id} tipo="CONTENT" />
            {sesion?.user?.role === "ADMINISTRADOR" && (
              <span>{noticia.reportCount}</span>
            )}
          </div>

          {noticia.urls?.video ? (
            <div className="w-full mb-4">
              <iframe
                src={noticia.urls.video}
                width="100%"
                height="315"
                className="rounded-2xl"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative w-full h-[315px] mb-4">
              <Image
                src={noticia.urls?.image || "/placeholder.jpg"}
                alt={noticia.title}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          )}

          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {noticia.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{noticia.text.slice(0, 150)}...</p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
            Creador: {noticia.user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Juego relacionado: {noticia.game.name}
          </p>

          <div className=" pt-1 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xl">{noticia._count.comments}</span>
            </div>

            <Link
              href={`/content?id=${noticia.id}`}
              className="text-blue-500 font-semibold hover:text-blue-600 transition"
            >
              Leer más
            </Link>
          </div>


        </div>
      ))}
    </div>
  );
}

export default ListadoNoticiasActuales;
