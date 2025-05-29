'use client'
import { ConfirmToast } from "@/components/utilidad/confirm-toast";
import { deleteAction, togleVisibilitiAction } from "@/lib/common/actions";
import { BookOpenText, Eye, EyeOff, Loader,  Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";

function CommentListCard({ btnVer, comentario }) {

    const [stateEliminarComentario, actionEliminarComentario, pendingEliminarComentario] = useActionState(deleteAction, {})
    const [stateDesactivarComentario, actionDesactivarComentario, pendingDesactivarComentario] = useActionState(togleVisibilitiAction, {})

    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
    
      ConfirmToast(
        "¿Estás seguro de que quieres borrar esto?",
        () => {
          startTransition(() => {
            actionEliminarComentario(formData);
            setTimeout(() => {
            toast.success("Comentario eliminado con éxito");
            }, 1000);
          });
        }
      );
    }

    const [comentarioVisible, setComentarioVisible] = useState(comentario?.visible);

    return (<div className="bg-white dark:bg-slate-800 p-3 shadow flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3">
            <div>
                <p className="font-bold">Comentario de <Link href={`/perfil/${comentario.user.id}`}>{comentario.user.name}</Link></p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fecha creacion: {new Date(comentario.publishedAt).toLocaleDateString('es-ES')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {comentario.reportCount}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <form onSubmit={(e) => e.preventDefault()}>
                <button className="cursor-pointer" title="Ver perfil" onClick={btnVer}>
                    <BookOpenText  className="w-5 h-5 dark:text-white text-black" />
                </button>
            </form>
            <form action={actionDesactivarComentario}>
                <input type="hidden" name="id" value={comentario.id} />
                <input type="hidden" name="tipo" value="COMMENT" />
                <button disabled={pendingDesactivarComentario} className="cursor-pointer" onClick={() => setComentarioVisible(!comentarioVisible)} title={!comentarioVisible ? "Mostrar" : "Ocultar"}>
                    {pendingDesactivarComentario ? (
                        <Loader className="animate-spin" />
                    ) : (
                        comentarioVisible ? (
                            <Eye className="w-5 h-5 dark:text-white text-black" />
                        ) : (
                            <EyeOff className="w-5 h-5 text-yellow-500" />
                        )
                    )}

                </button>
            </form>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={comentario.id} />
                <input type="hidden" name="tipo" value="COMMENT" />
                <button disabled={pendingEliminarComentario} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarComentario ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>


        </div>
    </div>);
}

export default CommentListCard;