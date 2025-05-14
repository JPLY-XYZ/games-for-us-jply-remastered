'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import FileUploaderInput from "@/components/utilidad/file-uploader";
import { createNoticiaContentAction, updateNoticiaContentAction } from '@/lib/actions';
import { X } from 'lucide-react';

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularioTipoNoticia({ user, gameId, content }) {
  const router = useRouter();
  const [createState, createAction, createPending] = useActionState(createNoticiaContentAction, {});
  const [editState, editAction, editPending] = useActionState(updateNoticiaContentAction, {});

  const [bannerPreview, setBannerPreview] = useState(content?.urls?.imgs?.banner || "");
  const [thumbnailPreview, setThumbnailPreview] = useState(content?.urls?.imgs?.thumbnail || "");
  const [imagenes, setImagenes] = useState(content?.urls?.imgs?.otherImages || []);

  useEffect(() => {
    if (createState?.success || editState?.success) {
      router.push("/juego/" + gameId);
    }
  }, [createState, editState]);

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

  const handleScreenshotChange = (index, file) => {
    const updated = [...imagenes];
    updated[index] = file;
    setImagenes(updated);
  };

  const addScreenshot = () => {
    setImagenes((prev) => [...prev, null]);
  };

  const removeScreenshot = (index) => {
    const updated = imagenes.filter((_, i) => i !== index);
    setImagenes(updated);
  };

  const commonFields = (
    <>
      <input type="hidden" name="userId" defaultValue={user?.id} />
      <input type="hidden" name="gameId" defaultValue={gameId} />
      <input type="hidden" name="type" defaultValue="NOTICIA" />
    </>
  );

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex justify-center px-2 sm:px-4 py-12 min-w-auto sm:min-w-[700px] md:min-w-[1200px]">
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-5xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          {content ? "Actualizar noticia" : "Subir noticia"}
        </h1>

        <form className="space-y-6" action={content != null ? editAction : createAction}>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título *</label>
              <input
                type="text"
                name="titulo"
                className={inputClass}
                placeholder="Título principal"
                defaultValue={content?.title || ""}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="tituloCorto"
                className={inputClass}
                placeholder="Resumen del título"
                defaultValue={content?.shortTitle || ""}
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
              defaultValue={content?.text || ""}
            />
          </div>

          <div>
            <label className={labelClass}>Banner principal</label>
            <FileUploaderInput
              required={false}
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
              required={false}
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

          <div>
            <label className={labelClass}>Capturas adicionales</label>
            <div className="space-y-4">
              {imagenes.map((file, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="w-full sm:w-auto flex-1 flex items-center space-x-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
                    <input
                      type="file"
                      name={`img_${index}`}
                      accept="image/*"
                      onChange={(e) => handleScreenshotChange(index, e.target.files[0])}
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
                    <div className="w-full sm:w-[400px] aspect-video overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
                      <img
                        src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                        alt={`Screenshot ${index + 1} Preview`}
                        className="w-full h-full object-cover"
                      />
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

          {commonFields}

          {content && (
            <input type="hidden" name="contentId" defaultValue={content.id} />
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={content ? editPending : createPending}
            >
              {content
                ? editPending
                  ? "Guardando cambios..."
                  : "Actualizar"
                : createPending
                  ? "Subiendo noticia..."
                  : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
