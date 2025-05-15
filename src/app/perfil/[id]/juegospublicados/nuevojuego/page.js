import { auth } from "@/auth";
import FormularioJuego from "@/components/formulariosCreacion/FomularioJuego";
import { redirect } from "next/navigation";


async function PageNuevoJuego() {
    const session = await auth()

    if (session?.user?.role !== "DESARROLLADOR") redirect("/");

    return ( <FormularioJuego userId={session.user?.id} /> );
}

export default PageNuevoJuego;