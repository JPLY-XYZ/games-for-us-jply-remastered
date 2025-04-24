import ListadoContenidosActuales from "@/components/listados/ListadoContenidosActuales";
import ListadoJuegoActuales from "@/components/listados/ListadoJuegosActuales";
import ListadoNoticiasActuales from "@/components/listados/ListadoNoticiasActuales";
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

        }>
          <ListadoJuegoActuales />
        </Suspense>
      </section>

      {/* NOTICIAS */}
      <section>
      <h2 className="text-4xl font-semibold text-white mb-8"> Ultimas noticias</h2>
      <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

        }>
          <ListadoNoticiasActuales />
        </Suspense>
      
      </section>

      {/* CONTENIDOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Últimos Contenidos</h2>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition animate-pulse">
              <div className="relative w-full h-60 mb-4 bg-gray-300 rounded-2xl"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

        }>
          <ListadoContenidosActuales />
        </Suspense>
        
      </section>
    </main >
  );
}
