import { getLatestGames } from "@/lib/data";
import TarjetaJuego from "../listados/tarjetas/tarjeta-juego";
import ListadoTresItems from "../listados/listado-tres-items";
import { auth } from "@/auth";
import FallbackTresItems from "../listados/fallback-tres-items";

const listaJuegos = await getLatestGames();

async function NuevosLanzamientos() {
    const session = await auth();
    
      if (listaJuegos.length == 0) {
      return (
  <div className="relative ">
    <FallbackTresItems />

    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <h1 className="text-2xl font-bold text-center bg-white/80 dark:bg-black/50 p-4 rounded">
        No hay juegos para mostrar
      </h1>
    </div>
  </div>
);


    }
    return (<ListadoTresItems>
        {listaJuegos.map((game) => (
            <TarjetaJuego key={game.id} game={game} session={session} />
        ))}
    </ListadoTresItems>);
}

export default NuevosLanzamientos; 