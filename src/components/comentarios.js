'use client'
import { useState } from "react";
import { Star, Calendar, X as IconX, Plus as IconPlus, Trash, Flag, StarFilled, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Comentarios({ game, session }) {
    const user = session?.user;
    const [orden, setOrden] = useState("fecha");
    const [mostrar, setMostrar] = useState(5);
    const [modalAbierto, setModalAbierto] = useState(false);
    const comentarios = [...(game.comments || [])];

    if (orden === "fecha") {
        comentarios.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (orden === "puntuacion") {
        comentarios.sort((a, b) => b.score - a.score);
    }

    const desplegadoMasDeUnaVez = mostrar > 9;
    const quedanPorMostrar = mostrar < comentarios.length;

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Comentarios</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setModalAbierto(true)}
                >
                    Añadir Comentario
                </button>
            </div>

            <div className="mb-4 flex gap-4">
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
            </div>

            {comentarios.length > 0 ? (
                <div className="space-y-4">
                    {comentarios.slice(0, mostrar).map((comment, index) => (
                        <div key={index} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md relative">
                            {/* Botones de utilidad en la esquina superior derecha */}
                            <div className="absolute top-2 right-2 flex gap-2">
                                {/* Botón de eliminar, solo visible si el usuario logueado es el creador */}
                                {user?.id === comment.userId && (
                                    <button
                                        className="cursor-pointer text-red-500 opacity-75 hover:opacity-100 focus:outline-none"
                                        onClick={() => handleDeleteComment(comment.id)} // Llama a una función para eliminar el comentario
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                )}

                                {/* Botón de reportar, visible para todos */}
                                {user?.id !== comment.userId && (
                                    <button
                                        className=" cursor-pointer text-white opacity-75 hover:opacity-100 focus:outline-none"


                                        onClick={() => handleReportComment(comment.id)} // Llama a una función para reportar el comentario
                                    >
                                        <AlertTriangle className="w-5 h-5" />
                                    </button>)}
                            </div>

                            {/* Contenido del comentario */}
                            <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
                            {/* Información adicional en una sola línea */}
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                {/* Nombre del usuario */}
                               <Link href={"/perfil?userid=" + comment.user.id}> <span>{comment.user.name}</span></Link>

                                {/* Estrellas para la calificación */}
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => {
                                        const filled = comment.score > index;  // Si la puntuación es mayor que el índice, la estrella se llena
                                        return (
                                            <Star
                                                key={index}
                                                className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-gray-300'}`} // Aplica color amarillo si la estrella está llena
                                            />
                                        );
                                    })}
                                </div>

                                {/* Fecha */}
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>



                    ))}

                    <div className="flex justify-center items-center gap-4 mt-4">
                        {quedanPorMostrar && (
                            <button
                                onClick={() => setMostrar(mostrar + 5)}
                                className="w-32 h-10 bg-blue-500 text-white rounded-sm hover:bg-blue-600 flex items-center justify-center gap-2"
                                title="Mostrar más"
                            >
                                <IconPlus className="w-4 h-4" />
                                <span>Mostrar más</span>
                            </button>
                        )}
                        {desplegadoMasDeUnaVez && (
                            <button
                                onClick={() => setMostrar(5)}
                                className="w-32 h-10 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-sm hover:bg-gray-400 flex items-center justify-center gap-2"
                                title="Cerrar"
                            >
                                <IconX className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                                <span>Cerrar</span>
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No hay comentarios disponibles.</p>
            )}

            {modalAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Añadir comentario</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setModalAbierto(false);
                        }} className="space-y-4">
                            <textarea placeholder="Escribe tu comentario..." className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white" required />
                            <input type="number" min="1" max="5" placeholder="Puntuación (1-5)" className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white" required />
                            <textarea placeholder="Sugerencia de mejora (opcional)" className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white" />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setModalAbierto(false)} className="text-sm text-gray-500">Cancelar</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
