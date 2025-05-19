import { auth } from "@/auth";
import ListadoTresItems from "../listados/listado-tres-items";
import TarjetaNoticia from "../listados/tarjetas/tarjeta-noticia";
import { getLatestNews } from "@/lib/data";

async function UltimasNoticias() {
    const session = await auth();
    const listaNoticias = await getLatestNews();

    return (<ListadoTresItems>
        {listaNoticias.map((noticia) => (
            <TarjetaNoticia key={noticia.id} noticia={noticia} sesion={session} />
        ))}
    </ListadoTresItems>);
}

export default UltimasNoticias;