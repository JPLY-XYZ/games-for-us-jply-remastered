import { auth } from "@/auth";
import JuegosClient from "@/components/listados/juegos-listado";
import { getAllGames } from "@/lib/data";

export default async function Page() {
  const session = await auth();
  const games = await getAllGames();
  const visibleGames = games.filter(game => game.visible === true);

  return <div className="max-w-[100%] md:max-w-[80%]"><JuegosClient initialGames={visibleGames} session={session} /></div>;
}
