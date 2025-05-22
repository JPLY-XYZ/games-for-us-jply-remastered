'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import FileUploaderInput from "@/components/utilidad/file-uploader";
import {
  createImageContentAction,
  updateImageContentAction,
} from "@/lib/actions";

const inputClass =
  "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularioTipoImagen({ gameId, user, content }) {
  const router = useRouter();

  const [createState, createAction, createPending] = useActionState(
    createImageContentAction,
    {}
  );
  const [editState, editAction, editPending] = useActionState(
    updateImageContentAction,
    {}
  );

  useEffect(() => {
    if (createState?.success || editState?.success) {
      router.push("/juego/" + gameId);
    }
  }, [createState, editState]);

  const commonFields = (
    <>
      <input type="hidden" name="userId" defaultValue={user?.id} />
      <input type="hidden" name="gameId" defaultValue={gameId} />
      <input type="hidden" name="type" defaultValue="IMAGEN" />
    </>
  );

  const isPending = createPending || editPending;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4 py-12 min-w-auto md:min-w-[1200px]">
      <div className="relative bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-4xl space-y-6">
        {/* Superposición sobre el formulario */}
        {isPending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          {content ? "Editar imagen" : "Subir imagen"}
        </h1>

        <form
          className="space-y-6"
          action={content ? editAction : createAction}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Título</label>
              <input
                type="text"
                name="title"
                className={inputClass}
                placeholder="Título principal"
                required
                defaultValue={content?.title || ""}
              />
            </div>

            <div>
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="shortTitle"
                className={inputClass}
                placeholder="Resumen del título"
                defaultValue={content?.shortTitle || ""}
                required
              />
            </div>
          </div>

          {commonFields}
          {content && (
            <input
              type="hidden"
              name="contentId"
              defaultValue={content.id}
            />
          )}

          <FileUploaderInput
            name="img"
            label={content ? "Actualizar imagen" : "Selecciona una imagen"}
            accept="image/*"
            showPreview={true}
            previewAspectRatio="16/9"
            defaultImage={content?.urls?.img || ""}
            customStyles={{ inputClass, labelClass }}
            required={true}
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={isPending}
            >
              {content
                ? editPending
                  ? "Guardando cambios..."
                  : "Actualizar"
                : createPending
                ? "Subiendo imagen ..."
                : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
