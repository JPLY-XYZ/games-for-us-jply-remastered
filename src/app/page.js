import { auth } from "@/auth";
import ListadoTresItems from "@/components/listados/listado-tres-items";
import TarjetaContenido from "@/components/listados/tarjetas/tarjeta-contenido";
import TarjetaJuego from "@/components/listados/tarjetas/tarjeta-juego";
import TarjetaNoticia from "@/components/listados/tarjetas/tarjeta-noticia";
import FallbackTresItems from "@/components/listados/fallback-tres-items";
import { getLatestContents, getLatestGames, getLatestNews } from "@/lib/data";

import { Suspense } from "react";

export default async function Home() {

  const session = await auth();
  const listaNoticias = await getLatestNews();
  const listaContenido = await getLatestContents();
  const listaJuegos = await getLatestGames();

console.log(session)

  return (
    <main className="flex-1 w-full overflow-y-auto p-8 space-y-16">

      {/* NUEVOS LANZAMIENTOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Nuevos Lanzamientos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>

            <ListadoTresItems>
              {listaJuegos.map((game) => (
                <TarjetaJuego key={game.id} game={game} session={session} />
              ))}
            </ListadoTresItems>
        </Suspense>
      </section>

      {/* NOTICIAS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8"> Ultimas noticias</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
            <ListadoTresItems>
            {listaNoticias.map((noticia) => (
              <TarjetaNoticia key={noticia.id} noticia={noticia} sesion={session} />
            ))}
          </ListadoTresItems>
        </Suspense>

      </section>

      {/* CONTENIDOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Últimos Contenidos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
         <ListadoTresItems>
            {listaContenido.map((contenido) => (
              <TarjetaContenido key={contenido.id} contenido={contenido} sesion={session} />
            ))}
          </ListadoTresItems>
        </Suspense>
      </section>
    </main >
  );
}
