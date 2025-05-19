import { getLatestGames } from "@/lib/data";
import TarjetaJuego from "../listados/tarjetas/tarjeta-juego";
import ListadoTresItems from "../listados/listado-tres-items";
import { auth } from "@/auth";

const listaJuegos = await getLatestGames();

async function NuevosLanzamientos() {
    const session = await auth();
    
    return (<ListadoTresItems>
        {listaJuegos.map((game) => (
            <TarjetaJuego key={game.id} game={game} session={session} />
        ))}
    </ListadoTresItems>);
}

export default NuevosLanzamientos; 