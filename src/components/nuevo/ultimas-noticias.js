import { auth } from "@/auth";
import ListadoTresItems from "../listados/listado-tres-items";
import { getLatestNews } from "@/lib/data";
import TarjetaContenido from "../listados/tarjetas/tarjeta-contenido";

async function UltimasNoticias() {
    const session = await auth();
    const listaNoticias = await getLatestNews();

    return (<ListadoTresItems>
        {listaNoticias.map((noticia) => (
            <TarjetaContenido key={noticia.id} contenido={noticia} sesion={session} />
        ))}
    </ListadoTresItems>);
}

export default UltimasNoticias;