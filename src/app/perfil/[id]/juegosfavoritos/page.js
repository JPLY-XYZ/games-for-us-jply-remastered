import { auth } from "@/auth";
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";

export default async function PageNuevoContenido({ params }) {
  const session = await auth();
  const { id } = await params;


  const isOwner = session?.user?.id === id;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full sm:w-[80%] md:w-[70%] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-end items-center mb-6"></div>

        {/* Juegos Favoritos List Section */}
        <ListadoJuegoPaginado
          key={id}
          where={{
            visible: true,
            fans: {
              some: {
                id: id,
              },
            },
          }}
          titulo="Juegos Favoritos"
          isOwner={isOwner}
          session={session}
        />
      </div>
    </div>
  );
}
