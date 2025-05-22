
import { auth } from "@/auth";
import JuegosClient from "@/components/listados/juegos-listado";
import { getAllGames, getUserById } from "@/lib/data";
import Link from "next/link";

export default async function Page({ params }) {
  const session = await auth();
  const { id } = await params;

  const user = await getUserById(id);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <Cable className="w-36 h-36 animate-bounce mx-auto" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">Usuario no encontrado</h1>
                <h1 className="text-1xl mb-4">El identificador proporcionado no es valido</h1>
                <Link href="/" className="text-blue-500 underline">Volver Atrás</Link>
            </div>
        );
    }

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
