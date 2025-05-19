import FallbackTresItems from "@/components/listados/fallback-tres-items";


import { Suspense } from "react";
import NuevosLanzamientos from "@/components/nuevo/nuevos-lanzamientos";
import UltimasNoticias from "@/components/nuevo/ultimas-noticias";
import NuevosContenidos from "@/components/nuevo/nuevos-contenidos";

export default function Home() {


  return (
    <main className="flex-1 w-full overflow-y-auto p-8 space-y-16">

      {/* NUEVOS LANZAMIENTOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Nuevos Lanzamientos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>

          <NuevosLanzamientos />

        </Suspense>
      </section>

      {/* NOTICIAS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8"> Ultimas noticias</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
          <UltimasNoticias />
        </Suspense>

      </section>

      {/* CONTENIDOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Últimos Contenidos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
          <NuevosContenidos />
        </Suspense>
      </section>
    </main >
  );
}
