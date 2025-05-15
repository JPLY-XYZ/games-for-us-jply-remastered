import { auth } from "@/auth";
import FormularioJuego from "@/components/formulariosCreacion/FomularioJuego";


async function PageNuevoJuego() {
    const Session = await auth()
    return ( <FormularioJuego userId={Session.user?.id} /> );
}

export default PageNuevoJuego;