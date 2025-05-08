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
        router.push("/juego?gameid=" + gameId);
      }
    }, [createState, editState]);

    const commonFields = (
      <>
        <input type="hidden" name="userId" defaultValue={user?.id} />
        <input type="hidden" name="gameId" defaultValue={gameId} />
        <input type="hidden" name="type" defaultValue="IMAGEN" />
      </>
    );

    return (
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center w-[80%] justify-center px-4 py-12">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl w-full space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            {content ? "Editar imagen" : "Subir imagen"}
          </h1>

          <form
            className="space-y-6"
            action={content ? editAction : createAction}
          >
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <div className="w-full md:w-1/2">
                <label className={labelClass}>Título *</label>
                <input
                  type="text"
                  name="title"
                  className={inputClass}
                  placeholder="Título principal"
                  required
                  defaultValue={content?.title || ""}
                />
              </div>

              {commonFields}

              {content && (
                <input
                  type="hidden"
                  name="contentId"
                  defaultValue={content.id}
                />
              )}

              <div className="w-full md:w-1/2">
                <label className={labelClass}>Título corto</label>
                <input
                  type="text"
                  name="shortTitle"
                  className={inputClass}
                  placeholder="Resumen del título"
                  defaultValue={content?.shortTitle || ""}
                />
              </div>
            </div>

            <FileUploaderInput
              name="img"
              label={content ? "Actualizar imagen" : "Selecciona una imagen"}
              accept="image/*"
              showPreview={true}
              previewAspectRatio="16/9"
              defaultImage={content?.urls?.img || ""}
              customStyles={{ inputClass, labelClass }}
            />

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
                  ? "Subiendo imagen ..."
                  : "Publicar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
