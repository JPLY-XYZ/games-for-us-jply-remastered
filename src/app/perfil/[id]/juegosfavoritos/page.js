import { auth } from "@/auth";
import JuegosClient from "@/components/listados/juegos-listado";
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";
import { getAllGames } from "@/lib/data";

export default async function PageNuevoContenido({ params }) {
  const session = await auth();
  const { id } = await params;

  const games = await getAllGames();
    const visibleGames = games.filter(game =>
      game.fans.some(fan => fan.id == id)
    );

  return (
    
      <div className="max-w-[100%] md:max-w-[80%] min-w-[100%] md:min-w-[80%]">
        {/* Header Section */} 
        {/* Juegos List Section */}
        <JuegosClient initialGames={visibleGames} title={"Juegos favoritos de " + session.user.name}  session={session} />
      </div>
    
  );
}
