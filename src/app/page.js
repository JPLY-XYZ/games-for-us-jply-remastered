import ListadoContenidosActuales from "@/components/listados/ListadoContenidosActuales";
import ListadoJuegoActuales from "@/components/listados/ListadoJuegosActuales";
import ListadoNoticiasActuales from "@/components/listados/ListadoNoticiasActuales";
import FallbackTresItems from "@/components/utilidad/fallback-tres-items";
import ReportButton from "@/components/utilidad/ReportBtn";
import { getLatestGames } from "@/lib/data";
import { AlertTriangle, Heart, Youtube, Gamepad2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {



  return (
    <main className="flex-1 w-full overflow-y-auto p-8 space-y-16">

      {/* NUEVOS LANZAMIENTOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Nuevos Lanzamientos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
          <ListadoJuegoActuales />
        </Suspense>
      </section>

      {/* NOTICIAS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8"> Ultimas noticias</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
          <ListadoNoticiasActuales />
        </Suspense>

      </section>

      {/* CONTENIDOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Últimos Contenidos</h2>
        <Suspense fallback={
          <FallbackTresItems />
        }>
          <ListadoContenidosActuales />
        </Suspense>
      </section>
    </main >
  );
}
