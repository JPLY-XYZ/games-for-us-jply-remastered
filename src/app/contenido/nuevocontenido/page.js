import FormularioContenido from "@/components/formulariosCreacion/fomulario-contenido";
import { redirect } from "next/navigation";

export default async function PageNuevoContenido({ searchParams }) {
  
  const params = await searchParams; // espera que se resuelva
  const tipo = params?.tipo || null;
  const gameid = params?.gameid || null;

  if (!tipo || !gameid) {
    redirect("/error"); // o lanza error
  }

  return <FormularioContenido tipo={tipo} gameId={gameid} />;
}
