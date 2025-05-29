'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createResenaContentAction } from '@/lib/actions';
import ValoracionResenia from './utilidades/valoracion-resenia';
import { MultimediaJuego } from './utilidades/multimedia-juego';
import toast from 'react-hot-toast';

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularioTipoResenia({ user, gameId }) {
  const [state, action, pending] = useActionState(createResenaContentAction, {});
  const router = useRouter();
  const [bannerPreview, setBannerPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (state?.success) {
      router.push("/juego/" + gameId);
    }
  }, [state]);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file.size > 1 * 1024 * 1024) { // 4 MB en bytes
      toast.error("La imagen no puede pesar más de 1 MB.");
      setPreview(null)
      e.target.value = "";
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4 py-12 min-w-auto sm:min-w-[700px] md:min-w-[1200px]">
      <div className="relative bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-screen-lg space-y-6">

        {pending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Subir reseña
        </h1>

        <form className="space-y-6" action={action}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="type" value="RESEÑA" />

          {/* TÍTULOS */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título*</label>
              <input
                type="text"
                name="titulo"
                className={inputClass}
                placeholder="Título principal"
                required
                disabled={pending}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título corto*</label>
              <input
                type="text"
                name="tituloCorto"
                className={inputClass}
                placeholder="Resumen del título"
                required
                disabled={pending}
              />
            </div>
          </div>

          {/* TEXTO */}
          <div>
            <label className={labelClass}>Texto*</label>
            <textarea
              name="texto"
              className={`${inputClass} resize-none min-h-[150px]`}
              required
              placeholder="Escribe tu reseña aquí..."
              disabled={pending}
            />
          </div>

          {/* BANNER */}
          <div>
            <label className={labelClass}>Banner principal*</label>
            <h1 className='text-xs text-gray-400'>Esta es la  imagen que sale en la cabezera de la pagina. Debe ser una imagen de almenos 1900*600.</h1>

            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setBannerPreview)}
              className={inputClass}
              required
              disabled={pending}
            />
            {bannerPreview && (
              <>
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="mt-2 w-full aspect-[18/5] object-cover rounded-md"
                />
                <input type="hidden" name="bannerUrl" value={bannerPreview} />
              </>
            )}
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className={labelClass}>Thumbnail principal*</label>
            <h1 className='text-xs text-gray-400'>Esta es la caratula de la reseña, la cual sale en los listados. Debe ser una imagen de almenos 1000*600.</h1>

            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setThumbnailPreview)}
              className={inputClass}
              required
              disabled={pending}
            />
            {thumbnailPreview && (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="mt-2 w-full max-w-full aspect-video object-cover rounded-md"
                />
                <input type="hidden" name="thumbnailUrl" value={thumbnailPreview} />
              </>
            )}
          </div>

          {/* MULTIMEDIA */}
          <MultimediaJuego />

          {/* VALORACIÓN */}
          <ValoracionResenia name="moreInfo" moreInfo={{}} disabled={pending} />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={pending}
            >
              {pending ? "Subiendo reseña..." : "Publicar"}
            </button>
            <h1 className='mt-1 text-xs text-gray-400'>Los campos marcados con * son obligatorios.</h1>
             <h1 className='mt-1 text-xs text-gray-400'>Debido a las limitaciones de los servicios gratuitos utilizados en el despliegue se pueden producir errores deribados de la red, subida de archivos, se recomienda realizar copia de los datos rellenados en este formulario.</h1>
          </div>
        </form>
      </div>
    </div>
  );
}
