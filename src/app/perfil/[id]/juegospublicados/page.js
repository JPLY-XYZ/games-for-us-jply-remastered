
import { auth } from "@/auth";
import JuegosClient from "@/components/listados/juegos-listado";
import ListadoJuegoPaginado from "@/components/listados/listado-juegos-paginado";
import { getAllGames } from "@/lib/data";
import Link from "next/link";

export default async function PageJuegosPublicados({ params }) {
  const session = await auth();
  const { id } = await params;

  const isOwner = session?.user?.id === id;

  const games = await getAllGames();
  const visibleGames = games.filter(game =>
    game.developers.some(developer => developer.id == id)
  );

return (
  
    <div className="max-w-[100%] md:max-w-[80%] min-w-[100%] md:min-w-[80%]">
      {/* Header Section */}
      
       

      {/* Juegos List Section */}
      <JuegosClient initialGames={visibleGames} isOwner={isOwner} title={"Juegos publicados por " + session.user.name} session={session} />
    </div>
  
);

}
