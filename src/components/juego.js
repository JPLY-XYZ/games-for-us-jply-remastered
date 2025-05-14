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
            <div className="h-80 w-full bg-gray-800 relative rounded-b-lg overflow-hidden shadow-lg">
                {game?.urls?.images?.banner && (
                    <Image
                        src={game.urls.images.banner}
                        alt="Game Banner"
                        layout="fill"
                        objectFit="cover"
                        className="brightness-50"
                    />
                )}
                <div className= "  absolute top-4 right-4 text-white opacity-75 hover:opacity-100 focus:outline-none">
                    <ButtonReportConfig id={game.id} tipo="GAME" session={session} />
                </div>
            </div>

            {/* Info principal */}
            <div className="w-full py-12 grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="flex justify-center items-center col-span-1 mx-6">
                    <Suspense fallback={"hola esto está cargando"}>
                        <ClienteCarrusel screenshots={game.urls?.images?.screenshots} />
                    </Suspense>
                </div>

                <div className="col-span-1 space-y-6 mx-6">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">{game.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{game.shortDesc}</p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{game.longDesc}</p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1"><strong>Editor:</strong> {game.editor || "Desconocido"}</span>
                        <span className="flex items-center gap-1"><strong>Lanzamiento:</strong> {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : "Próximamente"}</span>
                        <span className="flex items-center gap-1"><strong>Precio:</strong> {game.price ? `${game.price} €` : "Gratis"}</span>
                        <span className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-500" /> {game.averageScore?.toFixed(1) ?? "N/A"}</span>
                        <span className="flex items-center gap-1"><strong>Ventas:</strong> {game.salesCount}</span>
                        <span className="flex items-center gap-1"><Gamepad className="w-5 h-5 text-green-500" /> {game.platforms?.map(p => p.name).join(", ")}</span>
                    </div>
<div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
<LikeButton game={game} user={session?.user} />
                    {game?.urls?.shopLink && (
                        <a href={game.urls.shopLink} target="_blank" rel="noopener noreferrer">
                            <button className=" cursor-pointer mt-4 px-6 py-3 bg-blue-500 text-white rounded-full text-sm shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2">
                                <ArrowBigRightDash className="w-5 h-5" />
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
                <div className="max-w-screen-xl mx-auto mt-12 px-6">
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
