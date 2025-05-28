import { auth } from "@/auth";
import JuegosClient from "@/components/listados/juegos-listado";
import { getAllGames } from "@/lib/data";

export default async function Page() {
  const session = await auth();
  const games = await getAllGames();


  const visibleGames = games
    .filter(game => game.visible === true)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="max-w-[100%] md:max-w-[80%] min-w-[100%] md:min-w-[80%]">
      <JuegosClient initialGames={visibleGames} session={session} />
    </div>
  )
}
