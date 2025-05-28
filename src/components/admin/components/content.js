'use client'

import { deleteAction, togleVisibilitiAction } from "@/lib/common/actions";
import { Eye, EyeOff, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

function ContentListCard({ content }) {

    const [stateEliminarContenido, actionEliminarContenido, pendingEliminarContenido] = useActionState(deleteAction, {})
    const [stateDesactivarContenido, actionDesactivarContenido, pendingDesactivarContenido] = useActionState(togleVisibilitiAction, {})

    const [contentVisible, setContentVisible] = useState(content.visible);

    return (<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex justify-between items-center">
        <div className="flex flex-row items-center gap-3">
            <img
                src={
                    content.type === 'VIDEO'
                        ? "/images/video.png"
                        : content.urls?.img || content.urls?.imgs?.thumbnail
                }
                className="object-cover w-26 h-16 sm:w-46 sm:h-26"
                alt={content.type === 'VIDEO' ? "Video Preview" : "User Preview"}
            />
            <div>
                <p className="font-bold"><Link className="cursor-pointer" href={`/contenido/${content.id}`}>{content.title}</Link></p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {content.type} de <Link href={`/perfil/${content.user.id}`}>{content.user.name}</Link>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fecha publicacion: {new Date(content.publishedAt).toLocaleDateString('es-ES')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {content.reportCount}</p>
            </div>
        </div>
        <div className="flex gap-2">
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
            <form action={actionEliminarContenido}>
                <input type="hidden" name="id" value={content.id} />
                <input type="hidden" name="tipo" value="CONTENT" />
                <button disabled={pendingEliminarContenido} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarContenido ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>

        </div>
    </div>);
}

export default ContentListCard;