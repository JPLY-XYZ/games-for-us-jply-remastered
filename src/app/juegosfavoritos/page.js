"use client";
import { useState } from "react";
import { List, LayoutGrid } from "lucide-react";
import Image from "next/image";

const juegos = [
    {
        titulo: "Juego 1",
        imagen: "https://cdn1.epicgames.com/offer/b0cd075465c44f87be3b505ac04a2e46/EGS_GrandTheftAutoVEnhanced_RockstarNorth_S1_2560x1440-906d8ae76a91aafc60b1a54c23fab496",
        descripcion: "Una aventura épica llena de misterio.",
        genero: "Aventura",
        anio: 2024,
    },
    {
        titulo: "Juego 2",
        imagen: "/juego2.jpg",
        descripcion: "Acción frenética con multijugador.",
        genero: "Acción",
        anio: 2023,
    },
    {
        titulo: "Juego 3",
        imagen: "/juego3.jpg",
        descripcion: "Explora mundos infinitos y crea sin límites.",
        genero: "Sandbox",
        anio: 2022,
    },
];

function JuegosPage() {
    const [modoTarjeta, setModoTarjeta] = useState(true);

    return (
        <div className="w-full min-h-screen  px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Juegos</h1>
                    <button
                        onClick={() => setModoTarjeta(!modoTarjeta)}
                        className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white p-2 rounded-full shadow hover:bg-gray-300 transition"
                        aria-label="Cambiar vista"
                    >
                        {modoTarjeta ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                    </button>
                </div>

                <div className={modoTarjeta ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                    {juegos.map((juego, index) => (
                        <div
                            key={index}
                            className={`bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition overflow-hidden ${
                                modoTarjeta ? "" : "flex h-40"
                            }`}
                        >
                            <div className={`${modoTarjeta ? "" : "relative w-1/3 h-full"}`}>
                                <Image
                                    src={juego.imagen}
                                    alt={juego.titulo}
                                    layout={modoTarjeta ? "responsive" : "fill"}
                                    width={modoTarjeta ? 600 : undefined}
                                    height={modoTarjeta ? 300 : undefined}
                                    className={`object-cover ${modoTarjeta ? "w-full h-40" : "rounded-l-lg"}`}
                                />
                            </div>

                            <div className={`${modoTarjeta ? "p-4" : "p-4 w-2/3 flex flex-col justify-between"}`}>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{juego.titulo}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{juego.descripcion}</p>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    <span className="mr-4">🎮 {juego.genero}</span>
                                    <span>📅 {juego.anio}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JuegosPage;
