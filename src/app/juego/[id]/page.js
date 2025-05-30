import { getGameById } from '@/lib/data'; // Importa tu función para obtener el juego
import { Cable, Star, ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from "react";


import { auth } from "@/auth";


import ListadoContenidosDesplegable from '@/components/listado-contenidos-desplegable';
import Comentarios from '@/components/comentarios/comentarios';
import ButtonReportConfig from '@/components/utilidad/button-report-config';
import ImageClienCarrusel from '@/components/image-client-carrusel';
import ButtonLikeGame from '@/components/utilidad/button-like-game';
import CarruselDesarrolladores from '@/components/utilidad/carrusel-desarrolladores';

export default async function Page({ params }) {

  const { id } = await params

  if (isNaN(Number(id))) {
    return (
      <div>
        <Cable className="w-36 h-36 animate-bounce mx-auto" />
        <h1 className="text-6xl mb-4">Juego no encontrado</h1>
        <h1 className="text-1xl mb-4">El identificador proporcionado no es un numero</h1>
        <Link href="/">Volver Atras</Link>
      </div>
    );
  }
  const game = await getGameById(+id);

  if (!game) {
    return <div><Cable className="w-36 h-36 animate-bounce  mx-auto" /><h1 className='text-6xl mb-4'>Juego no encontrado</h1>
      <h1 className="text-1xl mb-4">El identificador proporcionado no es valido</h1>
      <Link href="/">Volver Atras</Link ></div>;
  }












  const session = await auth();

  console.log(game);

  const scores = game.comments.map(c => c.score).filter(s => s !== null);
  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const { minimum, recomended } = game.requirements;

const hasScreenshots = game.urls?.images?.screenshots?.length > 0



  return (
    <div className="w-full lg:w-[80%] mx-auto bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
      {/* Banner */}
      <div className="relative h-56 sm:h-80 w-full overflow-hidden rounded-b-lg shadow-lg bg-gray-800">
        {game?.urls?.images?.banner && (
          <img
            src={game.urls.images.banner}
            alt="Game Banner"

            className="w-full h-full object-cover brightness-50"
          />
        )}
        <div className="absolute top-4 right-4 text-white opacity-75 hover:opacity-100">
          <ButtonReportConfig recargaUrl={"/perfil/"+session.user.id+"/juegospublicados"} id={game.id} tipo="GAME" session={session} />
        </div>
      </div>

      {/* Info principal */}
     <div className={`w-full py-10 px-4 md:px-6 grid gap-10 ${hasScreenshots ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 place-items-center'}`}>
  {hasScreenshots && (
    <div className="w-full flex justify-center items-center">
      <Suspense fallback={"Cargando carrusel..."}>
        <ImageClienCarrusel screenshots={game.urls.images.screenshots} />
      </Suspense>
    </div>
  )}

  <div className="space-y-6 max-w-3xl w-full">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{game.name}</h1>
    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{game.shortDesc}</p>
    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200">{game.longDesc}</p>

    <div className="mx-10 flex flex-wrap justify-between text-sm text-gray-600 dark:text-gray-300">
      <span className="flex-1 min-w-[120px]">
        <strong>Lanzamiento:</strong> {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : "Próximamente"}
      </span>
      <span className="flex-1 min-w-[80px] text-center">
        <strong>Precio:</strong> {game.price !== null && game.price !== undefined ? `${game.price} €` : "Gratis"}
      </span>
      <span className="flex-1 min-w-[60px] flex items-center justify-end gap-1">
        <Star className="w-4 h-4 text-yellow-500" /> {averageScore.toFixed(1) ?? "N/A"}
      </span>
    </div>

    <div className="flex flex-wrap justify-between items-center gap-4">
      <ButtonLikeGame game={game} user={session?.user} />
      {game?.urls?.shopLink && (
        <a href={game.urls.shopLink} className="flex items-center gap-2 px-6 py-3.5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm shadow" target="_blank" rel="noopener noreferrer">
          <ArrowBigRightDash className="w-4 h-4" />
          Ir a la web del desarrollador
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
      <div className="max-w-screen-xl mx-auto mb-10 mt-12 px-6">
        <ListadoContenidosDesplegable session={session} game={game} />
      </div>

      {/* Requisitos */}
      {game.requirements.minimum.storage != " " && (
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

            {recomended && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Requisitos Recomendados</h3>
                <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-sm text-gray-800 dark:text-gray-200">
                  <p><strong>SO:</strong> {recomended.os}</p>
                  <p><strong>Procesador:</strong> {recomended.processor}</p>
                  <p><strong>Memoria:</strong> {recomended.memory}</p>
                  <p><strong>Gráficos:</strong> {recomended.graphics}</p>
                  <p><strong>Almacenamiento:</strong> {recomended.storage}</p>
                  <p><strong>DirectX:</strong> {recomended.directx}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


