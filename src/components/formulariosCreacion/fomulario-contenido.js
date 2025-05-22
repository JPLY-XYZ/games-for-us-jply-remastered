import FormularioTipoResenia from "./subFormularios/formulario-tipo-resenia";
import FormularioTipoVideo from "./subFormularios/formulario-tipo-video";
import FormularioTipoNoticia from "./subFormularios/formulario-tipo-noticia";
import FormularioTipoImagen from "./subFormularios/formulario-tipo-imagen";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Cable } from "lucide-react";
import Link from "next/link";

async function  FormularioContenido({ tipo , gameId, content=null }) {
    const session = await auth();
    const user = session?.user;
    switch (tipo) {
        case "IMAGEN":
            console.log(gameId, "IMAGEN", "llegado a formulario intermedio formulariocontenido")
            return <FormularioTipoImagen gameId={gameId} user={user} content={content}/>
        case "RESEÑA":
            console.log(gameId, "IMAGEN", "llegado a formulario intermedio formulariocontenido")
            return <FormularioTipoResenia gameId={gameId} user={user} existingResena={content} />
        case "VIDEO":
            return <FormularioTipoVideo gameId={gameId} user={user} content={content}/>
        case "NOTICIA":
            if (session?.user?.role !== "DESARROLLADOR" && session?.user?.role !== "ADMINISTRADOR") redirect("/")

            return <FormularioTipoNoticia gameId={gameId} user={user} content={content}/>
        default:
            return (<><div className="p-6 text-center">
        <Cable className="w-24 h-24 animate-bounce mx-auto" />
        <h1 className="text-4xl mb-4">Ha ocurrido un error con el tipo o el juego seleccionado</h1>
        <h1 className="text-1xl mb-4">El tipo proporcionado no es valido</h1>
        <Link href="/">
          <div className="text-blue-600 hover:underline">Volver Atrás</div>
        </Link>
      </div></>)
    }
}
    export default FormularioContenido;