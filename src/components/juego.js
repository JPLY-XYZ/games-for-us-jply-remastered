import { AlertTriangle, Star, Gamepad, Tags, ShoppingCart, ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import ClienteCarrusel from "./carrusel";
import Image from "next/image";
import { Suspense } from "react";

import Comentarios from "./comentarios/comentarios";
import { auth } from "@/auth";
import Contenido from "./contenido";
import CarruselDesarrolladores from "./utilidad/carrusel-desarrolladores";

import LikeButton from "./utilidad/like-button";
import ButtonReportConfig from "./utilidad/button-report-config";

async function Juego({ game }) {
    const session = await auth();

    console.log(game);

    const { requirements } = game;
    const { minimum, recommended } = requirements ? requirements.requirements : {};



    return (
       <div className="w-full lg:w-[80%] mx-auto bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
  {/* Banner */}
  <div className="relative h-56 sm:h-80 w-full overflow-hidden rounded-b-lg shadow-lg bg-gray-800">
    {game?.urls?.images?.banner && (
      <Image
        src={game.urls.images.banner}
        alt="Game Banner"
        fill
        className="object-cover brightness-50"
      />
    )}
    <div className="absolute top-4 right-4 text-white opacity-75 hover:opacity-100">
      <ButtonReportConfig id={game.id} tipo="GAME" session={session} />
    </div>
  </div>

  {/* Info principal */}
  <div className="w-full py-10 px-4 md:px-6 grid grid-cols-1 xl:grid-cols-2 gap-10">
    <div className="w-full flex justify-center items-center">
      <Suspense fallback={"Cargando carrusel..."}>
        <ClienteCarrusel screenshots={game.urls?.images?.screenshots} />
      </Suspense>
    </div>

    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{game.name}</h1>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{game.shortDesc}</p>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200">{game.longDesc}</p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
        <span><strong>Editor:</strong> {game.editor || "Desconocido"}</span>
        <span><strong>Lanzamiento:</strong> {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : "Próximamente"}</span>
        <span><strong>Precio:</strong> {game.price ? `${game.price} €` : "Gratis"}</span>
        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> {game.averageScore?.toFixed(1) ?? "N/A"}</span>
        <span><strong>Ventas:</strong> {game.salesCount}</span>
        <span className="flex items-center gap-1"><Gamepad className="w-4 h-4 text-green-500" /> {game.platforms?.map(p => p.name).join(", ")}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <LikeButton game={game} user={session?.user} />
        {game?.urls?.shopLink && (
          <a href={game.urls.shopLink} target="_blank" rel="noopener noreferrer">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm shadow">
              <ArrowBigRightDash className="w-4 h-4" />
              Ir a la web del desarrollador
            </button>
          </a>
        )}
      </div>
    </div>
  </div>



            {/* Comentarios y desarrolladores */}
            <div className="max-w-screen-xl mx-auto mt-12 px-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3 w-full">
                        <Comentarios session={session} comentariosArr={game.comments} EsPuntuacion={true} relationGame={game.id} />
                    </div>
                    <div className="lg:w-1/3 w-full">
                        <CarruselDesarrolladores developers={game.developers} />
                    </div>
                </div>
            </div>

            {/* Contenido adicional */}
            <div className="max-w-screen-xl mx-auto mt-12 px-6">
                <Contenido session={session} game={game} />
            </div>

            {/* Requisitos */}
            {requirements && (
                <div className="max-w-screen-xl mx-auto mt-12 px-6 mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Requisitos</h2>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {minimum && (
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Requisitos Mínimos</h3>
                                <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-sm text-gray-800 dark:text-gray-200">
                                    <p><strong>SO:</strong> {minimum.os}</p>
                                    <p><strong>Procesador:</strong> {minimum.processor}</p>
                                    <p><strong>Memoria:</strong> {minimum.memory}</p>
                                    <p><strong>Gráficos:</strong> {minimum.graphics}</p>
                                    <p><strong>Almacenamiento:</strong> {minimum.storage}</p>
                                    <p><strong>DirectX:</strong> {minimum.directx}</p>
                                </div>
                            </div>
                        )}

                        {recommended && (
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Requisitos Recomendados</h3>
                                <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-sm text-gray-800 dark:text-gray-200">
                                    <p><strong>SO:</strong> {recommended.os}</p>
                                    <p><strong>Procesador:</strong> {recommended.processor}</p>
                                    <p><strong>Memoria:</strong> {recommended.memory}</p>
                                    <p><strong>Gráficos:</strong> {recommended.graphics}</p>
                                    <p><strong>Almacenamiento:</strong> {recommended.storage}</p>
                                    <p><strong>DirectX:</strong> {recommended.directx}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Juego;
