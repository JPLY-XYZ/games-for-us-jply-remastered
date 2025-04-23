import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Pencil, Trash2, Eye, RefreshCcw, ShieldOff, Megaphone } from "lucide-react";

export default async function Page() {
  const sesion = await auth();
  if (sesion?.user.role !== "ADMINISTRADOR") redirect("/");

  return (
    <div className=" w-full p-4  text-black dark:text-white h-[calc(100vh-3.5rem)] ">
      <div className="flex flex-col lg:flex-row gap-4 max-h-full">
        {/* Columna izquierda (60%) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {/* Usuarios */}
          <section className="bg-[var(--aside-card-background)] rounded-2xl shadow p-4 flex flex-col gap-4 h-[calc((100vh - 3.5rem) * 0.6)]">
            <header className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
              <input
                type="text"
                placeholder="Buscar usuario..."
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-1/2 bg-white dark:bg-slate-800 text-black dark:text-white"
              />
            </header>
            <div className="overflow-auto flex-grow space-y-3">
              {[{ nombre: "Carlos Ramos", correo: "carlos@example.com", reportes: 2, estado: "Activo" },
                { nombre: "Lucía Fernández", correo: "lucia@example.com", reportes: 0, estado: "Activo" },
                { nombre: "Pedro López", correo: "pedro@example.com", reportes: 5, estado: "Suspendido" },
                { nombre: "Carlos Ramos", correo: "carlos@example.com", reportes: 2, estado: "Activo" },
                { nombre: "Lucía Fernández", correo: "lucia@example.com", reportes: 0, estado: "Activo" },
                { nombre: "Pedro López", correo: "pedro@example.com", reportes: 5, estado: "Suspendido" },
                { nombre: "Carlos Ramos", correo: "carlos@example.com", reportes: 2, estado: "Activo" },
                { nombre: "Lucía Fernández", correo: "lucia@example.com", reportes: 0, estado: "Activo" },
                { nombre: "Pedro López", correo: "pedro@example.com", reportes: 5, estado: "Suspendido" },
              ].map((user, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold">{user.nombre}</p>
                    <p className="text-sm">{user.correo}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reportes: {user.reportes} • Estado: {user.estado}</p>
                  </div>
                  <div className="flex gap-2">
                    <button title="Ver perfil"><Eye className="w-5 h-5" /></button>
                    <button title="Resetear contraseña"><RefreshCcw className="w-5 h-5" /></button>
                    <button title="Suspender"><ShieldOff className="w-5 h-5 text-yellow-500" /></button>
                    <button title="Eliminar"><Trash2 className="w-5 h-5 text-red-500" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contenidos */}
          <section className="bg-[var(--aside-card-background)] rounded-2xl shadow p-4 flex flex-col gap-4 h-[40vh]">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl font-semibold">Contenidos</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar contenido..."
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white"
                />
                <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white">
                  <option>Todos</option>
                  <option>Pendientes</option>
                  <option>Aprobados</option>
                  <option>Reportes</option>
                </select>
              </div>
            </header>
            <div className="overflow-auto flex-grow space-y-3">
              {[
                { titulo: "Cómo ganar en Apex", tipo: "Guía", autor: "Carlos Ramos", estado: "Pendiente" },
                { titulo: "Reseña: Elden Ring", tipo: "Artículo", autor: "Lucía Fernández", estado: "Aprobado" },
                { titulo: "Denuncia de comportamiento tóxico", tipo: "Reporte", autor: "Pedro López", estado: "Reporte" },
                { titulo: "Cómo ganar en Apex", tipo: "Guía", autor: "Carlos Ramos", estado: "Pendiente" },
                { titulo: "Reseña: Elden Ring", tipo: "Artículo", autor: "Lucía Fernández", estado: "Aprobado" },
                { titulo: "Denuncia de comportamiento tóxico", tipo: "Reporte", autor: "Pedro López", estado: "Reporte" },
                { titulo: "Cómo ganar en Apex", tipo: "Guía", autor: "Carlos Ramos", estado: "Pendiente" },
                { titulo: "Reseña: Elden Ring", tipo: "Artículo", autor: "Lucía Fernández", estado: "Aprobado" },
                { titulo: "Denuncia de comportamiento tóxico", tipo: "Reporte", autor: "Pedro López", estado: "Reporte" },
              ].map((content, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold">{content.titulo}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{content.tipo} • Por {content.autor}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Estado: {content.estado}</p>
                  </div>
                  <div className="flex gap-2">
                    <button title="Editar"><Pencil className="w-5 h-5 text-blue-500" /></button>
                    <button title="Eliminar"><Trash2 className="w-5 h-5 text-red-500" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna derecha (Juegos) */}
        <div className="w-full lg:w-2/5">
          <section className="bg-[var(--aside-card-background)] rounded-2xl shadow p-4 flex flex-col gap-4 h-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl font-semibold">Juegos</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar juego..."
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white"
                />
                <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white">
                  <option>Todos</option>
                  <option>Pendientes</option>
                  <option>Aprobados</option>
                  <option>Reportes</option>
                </select>
              </div>
            </header>
            <div className="overflow-auto flex-grow space-y-3 max-h-screen">
              {[
                { nombre: "Valorant", categoria: "Shooter", estado: "Aprobado" },
                { nombre: "Among Us", categoria: "Party", estado: "Pendiente" },
                { nombre: "Cyberpunk 2077", categoria: "RPG", estado: "Reporte" },
                { nombre: "Valorant", categoria: "Shooter", estado: "Aprobado" },
                { nombre: "Among Us", categoria: "Party", estado: "Pendiente" },
                { nombre: "Cyberpunk 2077", categoria: "RPG", estado: "Reporte" },
                { nombre: "Valorant", categoria: "Shooter", estado: "Aprobado" },
                { nombre: "Among Us", categoria: "Party", estado: "Pendiente" },
                { nombre: "Cyberpunk 2077", categoria: "RPG", estado: "Reporte" },
                { nombre: "Valorant", categoria: "Shooter", estado: "Aprobado" },
                { nombre: "Among Us", categoria: "Party", estado: "Pendiente" },
                { nombre: "Cyberpunk 2077", categoria: "RPG", estado: "Reporte" },
              ].map((juego, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow flex justify-between items-center ">
                  <div>
                    <p className="font-bold">{juego.nombre}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Categoría: {juego.categoria}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Estado: {juego.estado}</p>
                  </div>
                  <div className="flex gap-2">
                    <button title="Editar"><Pencil className="w-5 h-5 text-blue-500" /></button>
                    <button title="Eliminar"><Trash2 className="w-5 h-5 text-red-500" /></button>
                    {juego.estado === "Aprobado" && (
                      <button title="Publicar noticia"><Megaphone className="w-5 h-5 text-green-500" /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
