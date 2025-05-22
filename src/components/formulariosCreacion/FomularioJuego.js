"use client"
import React, { useActionState, useState } from 'react';
import { RequisitosJuego } from './subFormularios/utilidades/requisitos-juego';
import { MultimediaJuego } from './subFormularios/utilidades/multimedia-juego';
import { createOrUpdateGameAction } from '@/lib/actions';
import { LoaderCircle } from 'lucide-react';

function FormularioJuego({ userId }) {
  const [state, action, pending] = useActionState(createOrUpdateGameAction, {});
  const [imagePreviews, setImagePreviews] = useState({
    thumbUrl: "",
    bannerUrl: "",
    coverUrl: "",
  });

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen px-4 py-10 flex justify-center">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl space-y-10">

        {/* Superposición si está pendiente */}
        {pending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Crear nuevo juego
        </h1>

        <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <input type="hidden" name="userId" value={userId} />

          <div>
            <label className={labelClass}>Nombre</label>
            <input name="name" required className={inputClass} placeholder="Ej: God of War" />
          </div>

          <div>
            <label className={labelClass}>Descripción corta</label>
            <input required name="shortDesc" className={inputClass} placeholder="Breve resumen del juego" />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Descripción larga</label>
            <textarea
              required
              name="longDesc"
              rows={5}
              className={inputClass}
              placeholder="Historia, jugabilidad, mecánicas, etc."
            />
          </div>

          <div>
            <label className={labelClass}>Fecha de lanzamiento</label>
            <input required type="date" name="releaseDate" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Precio (€)</label>
            <input required type="number" step="0.01" name="price" className={inputClass} placeholder="Ej: 59.99" />
          </div>

          <div className="md:col-span-2">
            <RequisitosJuego />
          </div>

          <div className="md:col-span-2">
            {/* Banner */}
            <div>
              <label className="label">Banner</label>
              <input
                required
                name='banner'
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'bannerUrl')}
                className={inputClass}
              />
              {imagePreviews.bannerUrl && (
                <img
                  src={imagePreviews.bannerUrl}
                  alt="Banner Preview"
                  className="mt-2 w-full aspect-[18/5] object-cover"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cover */}
              <div>
                <label className="label">Cover</label>
                <input
                  required
                  name='cover'
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'coverUrl')}
                  className={inputClass}
                />
                {imagePreviews.coverUrl && (
                  <img
                    src={imagePreviews.coverUrl}
                    alt="Cover Preview"
                    className="mt-2 w-full aspect-[15/9] object-cover"
                  />
                )}
              </div>

              {/* Thumbnail */}
              <div>
                <label className="label">Thumbnail</label>
                <input
                  required
                  name='thumbnail'
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'thumbUrl')}
                  className={inputClass}
                />
                {imagePreviews.thumbUrl && (
                  <img
                    src={imagePreviews.thumbUrl}
                    alt="Thumbnail Preview"
                    className="mt-2 w-full aspect-[3/4] object-cover"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="label">Enlace tienda</label>
              <input required name="shopLink" placeholder="Enlace tienda" className={inputClass} />
            </div>

            <MultimediaJuego />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={pending}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
            >
              {!pending ? "Crear juego" : <LoaderCircle className="mx-auto animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioJuego;

// Estilos reutilizables
const inputClass =
  "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export const label = labelClass;
export const input = inputClass;
