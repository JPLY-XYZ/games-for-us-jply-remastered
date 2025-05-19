import { auth } from "@/auth";
import { getLatestContents } from "@/lib/data";
import ListadoTresItems from "../listados/listado-tres-items";
import TarjetaContenido from "../listados/tarjetas/tarjeta-contenido";

async function NuevosContenidos() {
    const session = await auth();
     const listaContenido = await getLatestContents();
    return (  <ListadoTresItems>
            {listaContenido.map((contenido) => (
              <TarjetaContenido key={contenido.id} contenido={contenido} sesion={session} />
            ))}
          </ListadoTresItems> );
}

export default NuevosContenidos;