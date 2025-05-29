'use client'

import { ConfirmToast } from "@/components/utilidad/confirm-toast";
import { deleteAction, togleVisibilitiAction } from "@/lib/common/actions";
import { Eye, EyeOff, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";

function ContentListCard({ content }) {

    const [stateEliminarContenido, actionEliminarContenido, pendingEliminarContenido] = useActionState(deleteAction, {})
    const [stateDesactivarContenido, actionDesactivarContenido, pendingDesactivarContenido] = useActionState(togleVisibilitiAction, {})

    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
    
      ConfirmToast(
        "¿Estás seguro de que quieres borrar esto?",
        () => {
          startTransition(() => {
            actionEliminarContenido(formData);
            setTimeout(() => {
            toast.success("Contenido eliminado con éxito");
            }, 1000);
          });
        }
      );
    }

    const [contentVisible, setContentVisible] = useState(content.visible);

    return (<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 w-full sm:w-auto">
    <img
      src={
        content.type === 'VIDEO'
          ? "/images/video.png"
          : content.urls?.img || content.urls?.imgs?.thumbnail
      }
      className="object-cover aspect-video w-full max-w-xs sm:w-26 sm:h-16 md:w-46 md:h-26 rounded-md"
      alt={content.type === 'VIDEO' ? "Video Preview" : "User Preview"}
      style={{ height: 'auto' }}
    />
    <div className="text-left w-full sm:w-auto">
      <p className="font-bold">
        <Link className="cursor-pointer" href={`/contenido/${content.id}`}>
          {content.title}
        </Link>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {content.type} de <Link href={`/perfil/${content.user.id}`}>{content.user.name}</Link>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fecha publicación: {new Date(content.publishedAt).toLocaleDateString('es-ES')}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {content.reportCount}</p>
    </div>
  </div>

  <div className="flex gap-2 justify-center sm:justify-start w-full sm:w-auto">
   <form action={actionDesactivarContenido}>
                <input type="hidden" name="id" value={content.id} />
                <input type="hidden" name="tipo" value="CONTENT" />
                <button disabled={pendingDesactivarContenido} className="cursor-pointer" onClick={() => setContentVisible(!contentVisible)} title={!contentVisible ? "Mostrar" : "Ocultar"}>
                    {pendingDesactivarContenido ? (
                        <Loader className="animate-spin" />
                    ) : (
                        contentVisible ? (
                            <Eye className="w-5 h-5 dark:text-white text-black " />
                        ) : (
                            <EyeOff className="w-5 h-5 text-yellow-500" />
                        )
                    )}

                </button>
            </form>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={content.id} />
                <input type="hidden" name="tipo" value="CONTENT" />
                <button disabled={pendingEliminarContenido} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarContenido ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>

  </div>
</div>
);
}

export default ContentListCard;