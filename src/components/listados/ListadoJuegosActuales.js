import { getLatestGames } from "@/lib/data";
import { AlertTriangle, FileText, FileTextIcon, MessageCircle, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import ReportButton from "../utilidad/ReportBtn";
import FavoriteButton from "../utilidad/FavoriteBtn";
import { auth } from "@/auth";
import Link from "next/link";



async function ListadoJuegoActuales() {
  const sesion = await auth();
  let listaJuegos = await getLatestGames()

  console.log(listaJuegos)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {listaJuegos.map((juego) => (
        <div key={juego.id} className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
          <div className="absolute z-10 top-4 right-4 flex gap-2">
            <ReportButton id={juego.id} tipo="GAME" />
            {sesion?.user?.role === "ADMINISTRADOR" && (
              <span>{juego.reportCount}</span>
            )}
          </div>

          <Link href={`/game?gameid=${juego.id}`}>
            <div className="relative w-full h-56 mb-4">
              <Image
                src={juego.urls.images.cover}
                alt={juego.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </Link>

          <Link href={`/game?gameid=${juego.id}`}>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{juego.name}</h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-400">{juego.shortDesc}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Editor: {juego.editor}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Lanzamiento: {new Date(juego.releaseDate).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Precio: {juego.price.toFixed(2)} €</p>

          <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <FavoriteButton game={juego} isFavorite={juego.fans.some(fan => fan.id === sesion?.user?.id)} userId={sesion?.user?.id} />
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xl">{juego._count.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileTextIcon className="w-6 h-6" />
              <span className="text-xl">{juego._count.contents}</span>
            </div>
          </div>
        </div>
      ))}
    </div>


  )
}



export default ListadoJuegoActuales;