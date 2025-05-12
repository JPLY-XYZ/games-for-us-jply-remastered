import { deleteAction, togleVisibilitiAction } from "@/lib/common/actions";
import { Eye, EyeOff, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

function GameListCard({ juego }) {


    const [stateEliminarJuego, actionEliminarJuego, pendingEliminarJuego] = useActionState(deleteAction, {})
    const [stateDesactivarJuego, actionDesactivarJuego, pendingDesactivarJuego] = useActionState(togleVisibilitiAction, {})

    const [juegoVisible, setJuegoVisible] = useState(juego?.visible);

    return (<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex justify-between items-center">
        <Link href={`/juego/${juego.id}`} className="flex flex-row items-center gap-3">
            <img
                src={juego.urls.images.cover}
                className="object-cover w-26 h-16 sm:w-46 sm:h-26"
                alt="Imagen Juego"
            />
            <div>
                <p className="font-bold">{juego.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Publicado: {new Date(juego.publishedAt).toLocaleDateString('es-ES')} </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {juego.reportCount}</p>
            </div>
        </Link>
        <div className="flex gap-2 ">
           <form action={actionDesactivarJuego}>
                <input type="hidden" name="id" value={juego.id} />
                <input type="hidden" name="tipo" value="GAME" />
                <button disabled={pendingDesactivarJuego} className="cursor-pointer" onClick={() => setJuegoVisible(!juegoVisible)} title={!juegoVisible ? "Mostrar" : "Ocultar"}>
                    {pendingDesactivarJuego ? (
                        <Loader className="animate-spin" />
                    ) : (
                        juegoVisible ? (
                            <Eye className="w-5 h-5 text-white" />
                        ) : (
                            <EyeOff className="w-5 h-5 text-yellow-500" />
                        )
                    )}

                </button>
            </form>
            <form action={actionEliminarJuego}>
                <input type="hidden" name="id" value={juego.id} />
                <input type="hidden" name="tipo" value="GAME" />
                <button disabled={pendingEliminarJuego} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarJuego ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>
        </div>
    </div>);
}

export default GameListCard;