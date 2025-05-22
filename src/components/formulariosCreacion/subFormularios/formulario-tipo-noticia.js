'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import FileUploaderInput from "@/components/utilidad/file-uploader-input";
import { createNoticiaContentAction } from '@/lib/actions';
import { MultimediaJuego } from './utilidades/multimedia-juego';

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularioTipoNoticia({ user, gameId }) {
  const router = useRouter();
  const [createState, createAction, createPending] = useActionState(createNoticiaContentAction, {});
  const [bannerPreview, setBannerPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (createState?.success) {
      router.push("/juego/" + gameId);
    }
  }, [createState]);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex justify-center px-2 sm:px-4 py-12 min-w-auto sm:min-w-[700px] md:min-w-[1200px]">
      <div className="relative bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-5xl space-y-6">

        {createPending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Subir noticia
        </h1>

        <form className="space-y-6" action={createAction}>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título *</label>
              <input
                type="text"
                name="titulo"
                className={inputClass}
                placeholder="Título principal"
                required
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="tituloCorto"
                className={inputClass}
                placeholder="Resumen del título"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Texto *</label>
            <textarea
              name="texto"
              className={`${inputClass} resize-none min-h-[150px]`}
              required
              placeholder="Escribe tu reseña aquí..."
            />
          </div>

          <div>
            <label className={labelClass}>Banner principal</label>
            <FileUploaderInput
              required={true}
              name="banner"
              label="Selecciona un banner"
              accept="image/*"
              showPreview={true}
              previewAspectRatio="16/9"
              defaultImage={bannerPreview}
              onChange={(e) => handleImageChange(e, setBannerPreview)}
              customStyles={{ inputClass, labelClass }}
            />
          </div>

          <div>
            <label className={labelClass}>Thumbnail principal</label>
            <FileUploaderInput
              required={true}
              name="thumbnail"
              label="Selecciona un thumbnail"
              accept="image/*"
              showPreview={true}
              previewAspectRatio="16/9"
              defaultImage={thumbnailPreview}
              onChange={(e) => handleImageChange(e, setThumbnailPreview)}
              customStyles={{ inputClass, labelClass }}
            />
          </div>

          <MultimediaJuego />

          <input type="hidden" name="userId" defaultValue={user?.id} />
          <input type="hidden" name="gameId" defaultValue={gameId} />
          <input type="hidden" name="type" defaultValue="NOTICIA" />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={createPending}
            >
              {createPending ? "Subiendo noticia..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
