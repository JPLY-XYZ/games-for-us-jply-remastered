'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Film, ImageIcon, MessageSquareText, AlertTriangle,
  ThumbsUp, MessageSquare, Calendar, Star, X, Plus, Newspaper
} from "lucide-react";
import Link from "next/link";
import ButtonReportConfig from "./utilidad/button-report-config";

export default function Contenidos({ game, session }) {
  const [mostrar, setMostrar] = useState(3);
  const [orden, setOrden] = useState({ campo: "fecha", asc: false });
  const [haExpandido, setHaExpandido] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const searchParams = useSearchParams();
  const tipoFiltro = searchParams.get("tipo");
const contenidosVisibles = game.contents.filter(c => c.visible);

  let contenidos = [...(contenidosVisibles || [])];
  if (tipoFiltro && tipoFiltro !== "TODOS") {
    contenidos = contenidos.filter(c => c.type === tipoFiltro);
  }

  if (orden.campo === "fecha") {
    contenidos.sort((a, b) =>
      orden.asc
        ? new Date(a.publishedAt) - new Date(b.publishedAt)
        : new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  } else if (orden.campo === "puntuacion") {
    contenidos.sort((a, b) =>
      orden.asc
        ? (a.score ?? 0) - (b.score ?? 0)
        : (b.score ?? 0) - (a.score ?? 0)
    );
  } else if (orden.campo === "comentarios") {
    contenidos.sort((a, b) =>
      orden.asc
        ? (a._count?.comments ?? 0) - (b._count?.comments ?? 0)
        : (b._count?.comments ?? 0) - (a._count?.comments ?? 0)
    );
  }

  const iconoPorTipo = {
    RESEÑA: <MessageSquareText className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    VIDEO: <Film className="w-5 h-5 text-red-600 dark:text-red-400" />,
    IMAGEN: <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />,
    NOTICIA: <Newspaper className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
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

    if ((tipo === 'RESEÑA' || tipo === 'NOTICIA') && data.imgs?.thumbnail) {
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

  const cambiarOrden = (campo) => {
    setOrden(prev =>
      prev.campo === campo ? { campo, asc: !prev.asc } : { campo, asc: false }
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Contenidos</h2>
          <div className="flex flex-wrap gap-2">
            {["fecha", "puntuacion", "comentarios"].map(tipo => {
              const icon = tipo === "fecha" ? <Calendar className="inline w-4 h-4 mr-1" /> :
                          tipo === "puntuacion" ? <Star className="inline w-4 h-4 mr-1" /> :
                          <MessageSquare className="inline w-4 h-4 mr-1" />;

              const activo = orden.campo === tipo;
              const direccion = activo && (orden.asc ? "↑" : "↓");

              return (
                <button
                  key={tipo}
                  className={`text-sm px-3 py-1 rounded flex items-center gap-1 ${
                    activo ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                  onClick={() => cambiarOrden(tipo)}
                >
                  {icon} {tipo[0].toUpperCase() + tipo.slice(1)} {activo && direccion}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Crear contenido</span>
            <svg
              className={`w-4 h-4 transition-transform ${menuAbierto ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuAbierto && (
            <div className="absolute z-50 mt-2 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
              {["RESEÑA", "VIDEO", "IMAGEN"].map(tipo => (
                <Link
                  key={tipo}
                  href={`/contenido/nuevocontenido?tipo=${tipo}&gameid=${game.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMenuAbierto(false)}
                >
                  {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                </Link>
              ))}
              {(session?.user?.role === "ADMINISTRADOR" || game?.developers?.some(dev => dev.id === session?.user?.id)) && (
                <Link
                  href={`/contenido/nuevocontenido?tipo=NOTICIA&gameid=${game.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMenuAbierto(false)}
                >
                  Noticia
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {contenidos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contenidos.slice(0, mostrar).map(contenido => {
            const tipo = contenido.type;
            return (
              <Link
                href={`/contenido/${contenido.id}`}
                key={contenido.id}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition block w-full h-full"
              >
                <div
                  className="absolute top-3 right-3 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ButtonReportConfig
                    id={contenido.id}
                    session={session}
                    tipo={"CONTENT"}
                    key={contenido.id + 33}
                  />
                </div>

                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    {iconoPorTipo[tipo]}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tipo}</span>
                  </div>

                  <div className="flex-1">{renderPreview(contenido)}</div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mt-2">
                    {contenido.shortTitle || 'Sin título corto'}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <img
                      src={contenido.user.image}
                      alt="User"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-medium">{contenido.user.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      <strong>{contenido.score ?? 0}</strong>
                      <MessageSquare className="w-4 h-4" />
                      <strong>{contenido._count.comments}</strong>
                    </div>
                    <span>{formatearFecha(contenido.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 mt-6">No hay contenidos disponibles.</p>
      )}
      
      {(quedanPorMostrar || haExpandido) && (
        <div className="flex justify-center items-center gap-4 mt-6">
          {quedanPorMostrar && !haExpandido && (
            <button
              onClick={() => {
                setMostrar(mostrar + 3);
                setHaExpandido(true);
              }}
              className="w-36 h-10 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
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
              className="w-36 h-10 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 flex items-center justify-center gap-2"
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
