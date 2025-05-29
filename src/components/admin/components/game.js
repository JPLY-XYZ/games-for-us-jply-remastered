import { ConfirmToast } from "@/components/utilidad/confirm-toast";
import { deleteAction, togleVisibilitiAction } from "@/lib/common/actions";
import { Eye, EyeOff, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";

function GameListCard({ juego }) {


    const [stateEliminarJuego, actionEliminarJuego, pendingEliminarJuego] = useActionState(deleteAction, {})
    const [stateDesactivarJuego, actionDesactivarJuego, pendingDesactivarJuego] = useActionState(togleVisibilitiAction, {})

    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
    
      ConfirmToast(
        "¿Estás seguro de que quieres borrar esto?",
        () => {
          startTransition(() => {
            actionEliminarJuego(formData);
            setTimeout(() => {
            toast.success("Juego eliminado con éxito");
           }, 1000);
          });
        }
      );
    }
    
    const [juegoVisible, setJuegoVisible] = useState(juego?.visible);

    return (<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
  {/* Contenido con Link solo en imagen + texto */}
  <Link href={`/juego/${juego.id}`} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
    <img
      src={juego.urls.images.cover}
      className="object-cover aspect-video w-full max-w-xs h-auto sm:w-26 sm:h-16 md:w-46 md:h-26 rounded-md"
      alt="Imagen Juego"
    />
    <div className="text-left w-full sm:w-auto">
      <p className="font-bold truncate">{juego.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Publicado: {new Date(juego.publishedAt).toLocaleDateString('es-ES')}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {juego.reportCount}</p>
    </div>
  </Link>

  {/* Botones fuera del Link para mantener funcionalidad */}
  <div className="flex gap-2 justify-center sm:justify-start w-full sm:w-auto mt-3 sm:mt-0">
    <form action={actionDesactivarJuego}> {/* Al pulsar el boton se ejecuta la accion y se elimina el juego tras hacer un tiempo de espera */}
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
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={juego.id} />
                <input type="hidden" name="tipo" value="GAME" />
                <button disabled={pendingEliminarJuego} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarJuego ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>
  </div>
</div>
);
}

export default GameListCard;