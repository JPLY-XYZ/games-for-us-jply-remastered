import { auth } from "@/auth";
import { getLatestContents } from "@/lib/data";
import ListadoTresItems from "../listados/listado-tres-items";
import TarjetaContenido from "../listados/tarjetas/tarjeta-contenido";
import FallbackTresItems from "../listados/fallback-tres-items";

async function NuevosContenidos() {
  const session = await auth();
  const listaContenido = await getLatestContents();

  if (listaContenido.length == 0) {
    return (
  <div className="relative ">
    <FallbackTresItems />

    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <h1 className="text-2xl font-bold text-center bg-white/80 dark:bg-black/50 p-4 rounded">
        No hay contenidos para mostrar
      </h1>
    </div>
  </div>
);


  }

  return (<ListadoTresItems>
    {listaContenido.map((contenido) => (
      <TarjetaContenido key={contenido.id} contenido={contenido} sesion={session} />
    ))}
  </ListadoTresItems>);
}

export default NuevosContenidos;