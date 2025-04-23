'use client'
import { useState } from "react";
import { Film, ImageIcon, MessageSquareText, AlertTriangle, ThumbsUp, MessageSquare } from "lucide-react";

export default function Contenidos({ game }) {
    const [contenidoActivo, setContenidoActivo] = useState(null);

    const contenidos = [...(game.contents || [])].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

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

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contenidos</h2>

            {contenidos.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contenidos.map((contenido) => {
                        const tipo = contenido.type;
                        const comentarios = contenido.Comment?.length || 0;

                        return (
                            <div
                                key={contenido.id}
                                className="relative bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition"
                            >
                                {/* Botón de reportar */}
                                <button
                                    onClick={() => {/* lógica de reportar */}}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-400 transition"
                                >
                                    <AlertTriangle className="w-5 h-5" />
                                </button>

                                {/* Cabecera */}
                                <div className="flex items-center gap-2 mb-2">
                                    {iconoPorTipo[tipo]}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tipo}</span>
                                </div>

                                {/* Vista previa */}
                                {renderPreview(contenido)}

                                {/* Título */}
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {contenido.shortTitle || 'Sin título corto'}
                                </h3>

                                {/* Autor */}
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="font-medium">{contenido.userId}</span>
                                </div>

                                {/* Métricas */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-4 h-4" />
                                        <strong>{contenido.score ?? 0}</strong>
                                        <MessageSquare className="w-4 h-4" />
                                        <strong>{comentarios}</strong>
                                    </div>
                                    <span className="text-xs">{formatearFecha(contenido.publishedAt)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">No hay contenidos disponibles.</p>
            )}
        </div>
    );
}
