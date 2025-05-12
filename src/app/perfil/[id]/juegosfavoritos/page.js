import { auth } from "@/auth";
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";

export default async function PageNuevoContenido({ params }) {
    const session = await auth()
  const { id } = await params
   

  return    <ListadoJuegoPaginado
        where={{
          fans: {
            some: {
              id: id,
            },
          },
        }}
        titulo="Juegos Favoritos"
        isOwner={session?.user?.id == id}
      />;
}
