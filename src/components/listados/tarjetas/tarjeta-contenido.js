import Image from "next/image";
import Link from "next/link";
import { Youtube, Gamepad2, MessageCircle, Loader } from "lucide-react";
import ReportButton from "@/components/utilidad/ReportBtn";
import ButtonReportConfig from "@/components/utilidad/button-report-config";
import { Suspense } from "react";



export default function TarjetaContenido({ contenido, sesion }) {


  return (
    <div
      key={contenido.id}
      className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
    >
      <div className="flex gap-2 absolute top-4 left-4 z-10">
        {contenido.urls?.video ? (
          <Youtube className="text-red-500" />
        ) : (
          <Gamepad2 className="text-green-500" />
        )}
      </div>

      <div className="absolute z-10 flex gap-2 top-4 right-4">
      
      <Suspense fallback={
          <Loader className="animate-spin text-white" />
        }><ButtonReportConfig id={contenido.id} tipo="CONTENT" session={sesion} subtipo={contenido.type}  />
        </Suspense>
     
     
      </div>

      {contenido.urls?.video ? (
        <div className="w-full mb-4">
          <iframe
            src={contenido.urls.video}
            width="100%"
            height="315"
            className="rounded-2xl"
            allowFullScreen
            autoPlay={false}
          ></iframe>
        </div>
      ) : (
        <div className="relative w-full h-[315px] mb-4">
          <Image
            src={contenido.type != "RESEÑA" ? contenido.urls?.img : contenido.urls?.imgs?.thumbnail || "/placeholder.jpg"}
            alt={contenido.title}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {contenido.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Creador: {contenido.user.name}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Juego relacionado: {contenido.game.name}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
        Likes: {contenido.likes ?? 0}
      </p>

      <div className="pt-1 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <MessageCircle className="w-6 h-6" />
          <span className="text-xl">{contenido._count.comments}</span>
        </div>

        <Link
          href={`/contenido/${contenido.id}`}
          className="text-blue-500 font-semibold hover:text-blue-600 transition"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
