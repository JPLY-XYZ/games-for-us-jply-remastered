import { Suspense } from "react";
import Image from "next/image";
import {
  Gamepad, Brain, Image as IconImage, DollarSign, Cpu, Clock,
  BookOpen, Volume2, AlertCircle, ThumbsUp, Flag
} from "lucide-react";
import Comentarios from "@/components/comentarios/comentarios";
import { auth } from "@/auth";
import { getContentById } from "@/lib/data";
import ClienteCarrusel from "@/components/carrusel";
import ActionsButton from "@/components/utilidad/actions-btn";
import ButtonReportConfig from "@/components/utilidad/button-report-config";
import ButtonFavorite from "@/components/utilidad/button-favorite";

export default async function Page({ params }) {

  const { contentid } = await params
  const content = await getContentById(+contentid);
  const session = await auth();

  console.log(content);

  if (!content) return <div className="p-6 text-center text-red-500">Contenido no encontrado</div>;

  const renderMultimedia = () => {
    if (content.type === "VIDEO" && content.urls?.video) {
      return (
        <div className="aspect-video mx-auto">
          <iframe
            src={content.urls.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      );
    }
    if (content.type === "IMAGEN" && content.urls?.img) {
      return (
        <img
          src={content.urls.img}
          alt="Imagen"
          className="mx-auto w-full h-auto rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
        />
      );
    }
    if (content.type === "RESEÑA" || content.type === "NOTICIA" && content.urls?.imgs) {
      const { thumbnail, banner, otherImages } = content.urls.imgs;


      return (
        <>
          {banner && (
            <div className="h-96 w-full bg-gray-800 relative rounded-xl overflow-hidden shadow-xl mb-6">
              <Image src={banner} alt="Banner" layout="fill" objectFit="cover" className="brightness-50" />
            </div>
          )}

          {content.text && (
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              {content.text}
            </p>
          )}

          {otherImages?.length > 0 && <ClienteCarrusel screenshots={otherImages} />}
        </>
      );
    }
    return null;
  };

  const iconMap = {
    jugabilidad: <Gamepad className="w-4 h-4 text-blue-500" />,
    dificultad: <Brain className="w-4 h-4 text-purple-500" />,
    graficos: <IconImage className="w-4 h-4 text-pink-500" />,
    precioCalidad: <DollarSign className="w-4 h-4 text-green-500" />,
    requisitos: <Cpu className="w-4 h-4 text-orange-500" />,
    duracion: <Clock className="w-4 h-4 text-yellow-500" />,
    historia: <BookOpen className="w-4 h-4 text-red-500" />,
    sonido: <Volume2 className="w-4 h-4 text-indigo-500" />,
    errores: <AlertCircle className="w-4 h-4 text-gray-500" />,
    recomendacion: <ThumbsUp className="w-4 h-4 text-teal-500" />,
  };

  const valoraciones = (valoraciones) => {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
        <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["sonido"]}
            <span>Sonido: {valoraciones.sonido}</span>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["errores"]}
            <span>Errores: {valoraciones.errores}</span>
          </li>
          <li className="flex items-start gap-2 justify-center md:justify-start">
            {iconMap["duracion"]}
            <div>
              <div><strong>Duración:</strong></div>
              <ul className="pl-6 list-none">
                <li>Historia: {valoraciones.duracion?.historia}</li>
                <li>Secundarias: {valoraciones.duracion?.secundarias}</li>
                <li>Total: {valoraciones.duracion?.total}</li>
              </ul>
            </div>
          </li>
          <li className="flex items-start gap-2 justify-center md:justify-start">
            {iconMap["jugabilidad"]}
            <div>
              <div><strong>Modos de juego:</strong></div>
              <ul className="pl-6 list-none">
                {valoraciones.modos?.map((modo, i) => (
                  <li key={i}>{modo}</li>
                ))}
              </ul>
              <div><strong>Dificultad:</strong> {valoraciones.dificultad}</div>
            </div>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["graficos"]}
            <span>Gráficos: {valoraciones.graficos}</span>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["historia"]}
            <span>Historia: {valoraciones.historia}</span>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["requisitos"]}
            <span>Requisitos: {valoraciones.requisitos}</span>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["precioCalidad"]}
            <span>Precio/Calidad: {valoraciones.precioCalidad}</span>
          </li>
          <li className="flex items-center gap-2 justify-center md:justify-start">
            {iconMap["recomendacion"]}
            <span>Recomendación: {valoraciones.recomendacion}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans w-full md:w-[70%]">
      <div className="mx-auto px-6 py-12 relative">
        {/* Botón de reportar */}

        <div className="absolute top-4 right-4 flex gap-2">
          <ButtonReportConfig id={content.id} tipo="CONTENT" session={session} subtipo={content.type} />
        </div>
        {/* Título */}
        <div className="flex flex-col mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{content.title}</h1>
        </div>

        {/* Multimedia */}
        <div className="mb-8">{renderMultimedia()}</div>

        {/* Botón de likes */}
        <div className="flex space-betwen gap-6 items-center mb-6 ml-2">
          <ButtonFavorite id={content.id} tipo="CONTENT" session={session} />
          <div className="flex items-center flex-end gap-4 text-sm text-white/80">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              {content.user.image && (
                <Image
                  src={content.user.image}
                  alt={content.user.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />

              )}
              <p><strong>{content.user.name}</strong></p>
            </div>
            {/* Info */}
            <div className="space-y-1">
              <p>Miembro desde {new Date(content.user.createdAt).toLocaleDateString()}</p>
              {content.user.country && <p>🌍 {content.user.country}</p>}

            </div>
            <p>Publicado el: {new Date(content.publishedAt).toLocaleDateString()}</p>
            {content.editedAt && (
              <p>Editado el: {new Date(content.editedAt).toLocaleDateString()}</p>
            )}
          </div>

        </div>

        {/* Valoraciones si es una reseña */}
        {content.type === "RESEÑA" && valoraciones(content.moreInfo)}

        {/* Comentarios */}
        <div className="mt-12">
          <Comentarios session={session} comentariosArr={content.comments} relationContent={content.id} />
        </div>
      </div>
    </div>
  );
}
