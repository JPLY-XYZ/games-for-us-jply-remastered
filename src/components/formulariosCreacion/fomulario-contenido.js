import FormularioTipoResenia from "./subFormularios/formulario-tipo-resenia";
import FormularioTipoVideo from "./subFormularios/formulario-tipo-video";
import FormularioTipoNoticia from "./subFormularios/formulario-tipo-noticia";
import FormularioTipoImagen from "./subFormularios/formulario-tipo-imagen";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
            return "Tipo de contenido no válido"
    }
}
    export default FormularioContenido;