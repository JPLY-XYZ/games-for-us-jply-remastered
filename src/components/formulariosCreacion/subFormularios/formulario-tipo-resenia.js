'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createResenaContentAction, updateResenaContentAction } from '@/lib/actions';
import ValoracionResenia from './utilidades/valoracion-resenia';
import { MultimediaJuego } from './utilidades/multimedia-juego';

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularioTipoResenia({ user, gameId, existingResena }) {
  const [state, action, pending] = useActionState(existingResena ? updateResenaContentAction : createResenaContentAction, {});
  const router = useRouter();
  const [imagenes, setImagenes] = useState(existingResena?.urls?.imgs?.otherImages || [null]);
  const [bannerPreview, setBannerPreview] = useState(existingResena?.urls?.imgs?.banner || "");
  const [thumbnailPreview, setThumbnailPreview] = useState(existingResena?.urls?.imgs?.thumbnail || "");

  useEffect(() => {
    if (state?.success) {
      router.push("/juego/" + gameId);
    }
  }, [state]);

  const handleImageChange = (e, setPreview, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (index !== null) {
        const updated = [...imagenes];
        updated[index] = file;
        setImagenes(updated);
      }
    }
  };

  

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4 py-12  min-w-auto sm:min-w-[700px] md:min-w-[1200px]">
      <div className="relative bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-screen-lg space-y-6">
        
        {/* Overlay de carga */}
        {pending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          {existingResena ? 'Editar reseña' : 'Subir reseña'}
        </h1>

        <form className="space-y-6" action={action}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="type" value="RESEÑA" />
          <input type="hidden" name="contentId" value={existingResena?.id || ""} />

          {/* TITULOS */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título *</label>
              <input
                type="text"
                name="titulo"
                className={inputClass}
                placeholder="Título principal"
                defaultValue={existingResena?.title || ""}
                required
                disabled={pending}
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="tituloCorto"
                className={inputClass}
                placeholder="Resumen del título"
                defaultValue={existingResena?.shortTitle || ""}
                required
                disabled={pending}
              />
            </div>
          </div>

          {/* TEXTO */}
          <div>
            <label className={labelClass}>Texto *</label>
            <textarea
              name="texto"
              className={`${inputClass} resize-none min-h-[150px]`}
              required
              placeholder="Escribe tu reseña aquí..."
              defaultValue={existingResena?.text || ""}
              disabled={pending}
            />
          </div>

          {/* BANNER */}
          <div>
            <label className={labelClass}>Banner principal</label>
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
            <label className={labelClass}>Thumbnail principal</label>
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

          {/* CAPTURAS ADICIONALES */}
          <MultimediaJuego />

          <ValoracionResenia name="moreInfo" moreInfo={existingResena?.moreInfo || {}} disabled={pending} />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={pending}
            >
              {pending ? "Subiendo reseña..." : existingResena ? "Actualizar reseña" : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
