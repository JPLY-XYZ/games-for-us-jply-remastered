import FormularioTipoResenia from "./subFormularios/formulario-tipo-resenia";
import FormularioTipoVideo from "./subFormularios/formulario-tipo-video";
import FormularioTipoNoticia from "./subFormularios/formulario-tipo-noticia";
import FormularioTipoImagen from "./subFormularios/formulario-tipo-imagen";
import { auth } from "@/auth";

async function  FormularioContenido({ tipo , gameId}) {
    const session = await auth();
    const user = session?.user;
    switch (tipo) {
        case "IMAGEN":
            console.log(gameId, "IMAGEN", "llegado a formulario intermedio formulariocontenido")
            return <FormularioTipoImagen gameId={gameId} user={user}/>
        case "RESEÑA":
            console.log(gameId, "IMAGEN", "llegado a formulario intermedio formulariocontenido")
            return <FormularioTipoResenia gameId={gameId} user={user} />
        case "VIDEO":
            return <FormularioTipoVideo gameId={gameId} user={user}/>
        case "NOTICIA":
            return <FormularioTipoNoticia gameId={gameId} user={user} />
        default:
            return "Tipo de contenido no válido"
    }
}
    export default FormularioContenido;