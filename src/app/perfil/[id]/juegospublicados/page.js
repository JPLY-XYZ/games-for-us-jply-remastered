
import { auth } from "@/auth";
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";
import Link from "next/link";

export default async function PageJuegosPublicados({ params }) {
  const session = await auth();
  const { id } = params;

  const isOwner = session?.user?.id === id;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-end items-center mb-6">
         

          {isOwner && <Link
            href={"/perfil/"+id+"/juegospublicados/nuevojuego"}
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Nuevo Juego
          </Link>}
        </div>

        {/* Juegos List Section */}
        <ListadoJuegoPaginado
          where={{
            developers: {
              some: {
                id: id,
              },
            },
          }}
          titulo="Juegos Publicados"
          isOwner={isOwner}
        />
      </div>
    </div>
  );
}
