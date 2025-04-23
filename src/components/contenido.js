'use client'
import { useState } from "react";
import { Film, ImageIcon, MessageSquareText, AlertTriangle, ThumbsUp, MessageSquare, Calendar, Star, X, Plus } from "lucide-react";
import Link from "next/link";

export default function Contenidos({ game }) {
    const [contenidoActivo, setContenidoActivo] = useState(null);
    const [mostrar, setMostrar] = useState(3);
    const [orden, setOrden] = useState("fecha");
    const [haExpandido, setHaExpandido] = useState(false);

    const contenidos = [...(game.contents || [])];

    if (orden === "fecha") {
        contenidos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (orden === "puntuacion") {
        contenidos.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    } else if (orden === "comentarios") {
        contenidos.sort((a, b) => (b.Comment?.length ?? 0) - (a.Comment?.length ?? 0));
    }

    const iconoPorTipo = {
        RESEÑA: <MessageSquareText className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        VIDEO: <Film className="w-5 h-5 text-red-600 dark:text-red-400" />,
        IMAGEN: <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />,
    };

    const formatearFecha = (fechaStr) => {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const renderPreview = (contenido) => {
        const tipo = contenido.type;
        const data = contenido.urls || {};

        if (tipo === 'VIDEO' && data.video) {
            return (
                <div className="aspect-video mb-3 rounded overflow-hidden">
                    <iframe
                        src={data.video}
                        title="Video"
                        className="w-full h-full border-0"
                        allowFullScreen
                    />
                </div>
            );
        }

        if (tipo === 'IMAGEN' && data.img) {
            return (
                <img
                    src={data.img}
                    alt="Imagen"
                    className="w-full h-48 object-cover rounded mb-3"
                />
            );
        }

        if (tipo === 'RESEÑA' && data.imgs?.thumbnail) {
            return (
                <img
                    src={data.imgs.thumbnail}
                    alt="Reseña Thumbnail"
                    className="w-full h-48 object-cover rounded mb-3"
                />
            );
        }

        return null;
    };

    const quedanPorMostrar = mostrar < contenidos.length;

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contenidos</h2>
                <div className="flex gap-2">
                    <button
                        className={`text-sm px-3 py-1 rounded ${orden === "fecha" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
                        onClick={() => setOrden("fecha")}
                    >
                        <Calendar className="inline w-4 h-4 mr-1" /> Fecha
                    </button>
                    <button
                        className={`text-sm px-3 py-1 rounded ${orden === "puntuacion" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
                        onClick={() => setOrden("puntuacion")}
                    >
                        <Star className="inline w-4 h-4 mr-1" /> Puntuación
                    </button>
                    <button
                        className={`text-sm px-3 py-1 rounded ${orden === "comentarios" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
                        onClick={() => setOrden("comentarios")}
                    >
                        <MessageSquare className="inline w-4 h-4 mr-1" /> Comentarios
                    </button>
                </div>
            </div>

            {contenidos.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contenidos.slice(0, mostrar).map((contenido) => {
                        const tipo = contenido.type;
                        const comentarios = contenido.Comment?.length || 0;

                        return (
                            <Link href={`/post?postid=${contenido.id}`}
                                key={contenido.id}
                                className="relative bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition"
                            >
                                <button
                                    onClick={() => {/* lógica de reportar */}}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-400 transition"
                                >
                                    <AlertTriangle className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2 mb-2">
                                    {iconoPorTipo[tipo]}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tipo}</span>
                                </div>

                                {renderPreview(contenido)}

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {contenido.shortTitle || 'Sin título corto'}
                                </h3>

                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="font-medium">{contenido.userId}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-4 h-4" />
                                        <strong>{contenido.score ?? 0}</strong>
                                        <MessageSquare className="w-4 h-4" />
                                        <strong>{comentarios}</strong>
                                    </div>
                                    <span className="text-xs">{formatearFecha(contenido.publishedAt)}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">No hay contenidos disponibles.</p>
            )}

            {(quedanPorMostrar || haExpandido) && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    {quedanPorMostrar && (
                        <button
                            onClick={() => {
                                setMostrar(mostrar + 3);
                                if (!haExpandido) setHaExpandido(true);
                            }}
                            className="w-32 h-10 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                            title="Mostrar más"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Mostrar más</span>
                        </button>
                    )}
                    {haExpandido && (
                        <button
                            onClick={() => {
                                setMostrar(3);
                                setHaExpandido(false);
                            }}
                            className="w-32 h-10 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 flex items-center justify-center gap-2"
                            title="Cerrar"
                        >
                            <X className="w-4 h-4" />
                            <span>Cerrar</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
