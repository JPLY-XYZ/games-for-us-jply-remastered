'use client'

import { useState } from "react";
import { Star, Calendar, X as IconX, Plus as IconPlus, Trash, Pencil } from "lucide-react";
import Link from "next/link";
import ButtonReportConfig from "../utilidad/button-report-config";
import ModalComentario from "./ModalComentario";

export default function Comentarios({ relationGame, relationContent, comentariosArr, session, EsPuntuacion = false }) {
    const user = session?.user;
    const [orden, setOrden] = useState({ campo: "fecha", asc: false });
    const [mostrar, setMostrar] = useState(5);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [haExpandido, setHaExpandido] = useState(false);
    
    let comentarios = [...(comentariosArr || [])];
    console.log(relationGame, relationContent);
    
    // Ordenación similar a la de contenido.js
    if (orden.campo === "fecha") {
        comentarios.sort((a, b) =>
            orden.asc
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt)
        );
    } else if (orden.campo === "puntuacion" && EsPuntuacion) {
        comentarios.sort((a, b) =>
            orden.asc
                ? (a.score ?? 0) - (b.score ?? 0)
                : (b.score ?? 0) - (a.score ?? 0)
        );
    }

    const desplegadoMasDeUnaVez = mostrar > 9;
    const quedanPorMostrar = mostrar < comentarios.length;

    // Función para cambiar el orden, similar a la de contenido.js
    const cambiarOrden = (campo) => {
        setOrden(prev =>
            prev.campo === campo ? { campo, asc: !prev.asc } : { campo, asc: false }
        );
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-6">
            <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Comentarios</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setModalAbierto(true)}
                >
                    Añadir Comentario
                </button>
            </div>
            
            {/* Botones de ordenación mejorados */}
            <div className="mb-4 flex gap-4 justify-start sm:justify-start">
                <button
                    className={`text-sm px-3 py-1 rounded flex items-center gap-1 ${
                        orden.campo === "fecha" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    }`}
                    onClick={() => cambiarOrden("fecha")}
                >
                    <Calendar className="inline w-4 h-4 mr-1" /> Fecha {orden.campo === "fecha" && (orden.asc ? "↑" : "↓")}
                </button>
                
                {EsPuntuacion && (
                    <button
                        className={`text-sm px-3 py-1 rounded flex items-center gap-1 ${
                            orden.campo === "puntuacion" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                        onClick={() => cambiarOrden("puntuacion")}
                    >
                        <Star className="inline w-4 h-4 mr-1" /> Puntuación {orden.campo === "puntuacion" && (orden.asc ? "↑" : "↓")}
                    </button>
                )}
            </div>

            {comentarios.length > 0 ? (
                <div className="space-y-4">
                    {comentarios.slice(0, mostrar).map((comment, index) => (
                        <div key={index} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md relative">
                            {/* Botones de utilidad en la esquina superior derecha */}
                            <div className="absolute top-2 right-2 flex gap-2">
                               <ButtonReportConfig id={comment.id} session={session} tipo={"COMMENT"} key={comment.id} />
                                {user?.role === "ADMINISTRADOR" && (
                                    <span>{comment.reportCount}</span>
                                )}
                            </div>
                            {/* Contenido del comentario */}
                            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                {/* Nombre del usuario */}
                                <img src={comment.user.image} alt="" className="w-6 h-6 rounded-full" />
                                <Link href={"/profile?userid=" + comment.user.id}> <span>{comment.user.name}</span></Link>
                                {/* Estrellas para la calificación */}
                                {EsPuntuacion && <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => {
                                        const filled = comment.score > index;  // Si la puntuación es mayor que el índice, la estrella se llena
                                        return (
                                            <Star
                                                key={index}
                                                className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-gray-300'}`} // Aplica color amarillo si la estrella está llena
                                            />
                                        );
                                    })}
                                </div>}
                                <div className="flex items-center gap-3 ">
                                    {/* Fecha */}
                                    <span>{new Date(comment.publishedAt).toLocaleDateString()}</span>
                                    {comment.edited && (
                                        <div className="flex text-[10px]  gap-1"><Pencil className="w-3 h-3" /> Editado el {new Date(comment.editedAt).toLocaleDateString()} </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm mt-2 dark:bg-gray-900 bg-gray-300 p-3 rounded-2xl text-gray-800 dark:text-gray-200 break-words overflow-hidden">{comment.text}</p>
                        </div>
                    ))}
                    
                    {/* Botones para mostrar más/cerrar */}
                    <div className="flex justify-center items-center gap-4 mt-4">
                        {quedanPorMostrar && (
                            <button
                                onClick={() => {
                                    setMostrar(mostrar + 5);
                                    setHaExpandido(true);
                                }}
                                className="w-32 h-10 bg-blue-500 text-white rounded-sm hover:bg-blue-600 flex items-center justify-center gap-2"
                                title="Mostrar más"
                            >
                                <IconPlus className="w-4 h-4" />
                                <span>Mostrar más</span>
                            </button>
                        )}
                        {desplegadoMasDeUnaVez && (
                            <button
                                onClick={() => {
                                    setMostrar(5);
                                    setHaExpandido(false);
                                }}
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
            
            {modalAbierto &&
                <ModalComentario setModalAbierto={setModalAbierto} game={relationGame} content={relationContent} EsPuntuacion={EsPuntuacion} />
            }
        </div>
    );
}
