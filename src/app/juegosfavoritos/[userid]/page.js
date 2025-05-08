import { auth } from "@/auth"; // tu función de auth del server
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";


export default async function JuegosPage({params}) {
  
  const { userid } = await params

  if (!userid) {
    return (
      <div className="text-center py-8">
        <p>Debes iniciar sesión para ver tus juegos favoritos.</p>
      </div>
    );
  }

  return (
    <ListadoJuegoPaginado
      where={{
        fans: {
          some: {
            id: userid,
          },
        },
      }}
      titulo="Mis Juegos Favoritos"
    />
  );
}
