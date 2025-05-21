import { auth } from "@/auth";
import ListadoTresItems from "../listados/listado-tres-items";
import { getLatestNews } from "@/lib/data";
import TarjetaContenido from "../listados/tarjetas/tarjeta-contenido";
import FallbackTresItems from "../listados/fallback-tres-items";

async function UltimasNoticias() {
    const session = await auth();
    const listaNoticias = await getLatestNews();


    if (listaNoticias.length == 0) {
       return (
  <div className="relative ">
    <FallbackTresItems />

    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <h1 className="text-2xl font-bold text-center bg-white/80 dark:bg-black/50 p-4 rounded">
        No hay noticias para mostrar
      </h1>
    </div>
  </div>
);

    }

    return (
    <ListadoTresItems>
       
        {listaNoticias.map((noticia) => (
            <TarjetaContenido key={noticia.id} contenido={noticia} sesion={session} />
        ))}
    </ListadoTresItems>);
}

export default UltimasNoticias;