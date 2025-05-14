'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createResenaContentAction, updateResenaContentAction } from '@/lib/actions';
import ValoracionResenia from './utilidades/valoracion-resenia';
import { X } from 'lucide-react';

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

  const addScreenshot = () => {
    setImagenes((prev) => [...prev, null]);
  };

  const removeScreenshot = (index) => {
    if (index === 0) return;
    const updated = imagenes.filter((_, i) => i !== index);
    setImagenes(updated);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center w-[80%] justify-center px-4 py-12">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          {existingResena ? 'Editar reseña' : 'Subir reseña'}
        </h1>

        <form className="space-y-6" action={action}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="type" value="RESEÑA" />
          <input type="hidden" name="contentId" value={existingResena?.id || ""} />

          {/* TITULOS */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label className={labelClass}>Título *</label>
              <input
                type="text"
                name="titulo"
                className={inputClass}
                placeholder="Título principal"
                defaultValue={existingResena?.title || ""}
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="tituloCorto"
                className={inputClass}
                placeholder="Resumen del título"
                defaultValue={existingResena?.shortTitle || ""}
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
            />
            {thumbnailPreview && (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="mt-2 w-[1000px] mx-auto aspect-[16/9] object-cover rounded-md"
                />
                <input type="hidden" name="thumbnailUrl" value={thumbnailPreview} />
              </>
            )}
          </div>

          {/* CAPTURAS ADICIONALES */}
          <div>
            <label className={labelClass}>Capturas adicionales</label>
            <div className="space-y-4">
              {imagenes.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-full flex items-center space-x-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
                    <input
                      type="file"
                      name={`img_${index}`}
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, () => {}, index)}
                      className="w-full p-3 rounded-md dark:bg-slate-700 dark:text-white"
                    />
                    {index > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {file && (
                    <div className="w-[1000px] aspect-video overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
                      <img
                        src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                        alt={`Screenshot ${index + 1} Preview`}
                        className="w-full h-full object-cover"
                      />
                      {typeof file === 'string' && (
                        <input type="hidden" name={`imgUrl_${index}`} value={file} />
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addScreenshot}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Añadir otra captura
              </button>
            </div>
          </div>

          <ValoracionResenia name="moreInfo" moreInfo={existingResena?.moreInfo || {}} />

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
