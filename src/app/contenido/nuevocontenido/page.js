import { Cable } from "lucide-react";
import Link from "next/link";
import { getGameById } from "@/lib/data";
import FormularioContenido from "@/components/formulariosCreacion/fomulario-contenido";

export default async function Page({ searchParams }) {
  const params = searchParams;
  const tipo = params?.tipo || null;
  const gameid = params?.gameid || null;

  const game = await getGameById(+gameid);

  console.log("game desde perrroooo" ,game);

  if (!game) {
    return (
      <div className="p-6 text-center">
        <Cable className="w-24 h-24 animate-bounce mx-auto" />
        <h1 className="text-4xl mb-4">Ha ocurrido un error con el tipo o el juego seleccionado</h1>
        <h1 className="text-1xl mb-4">El identificador proporcionado no es valido</h1>
        <Link href="/">
          <div className="text-blue-600 hover:underline">Volver Atrás</div>
        </Link>
      </div>
    );
  }

  return <FormularioContenido tipo={tipo} gameId={gameid} />;
}
