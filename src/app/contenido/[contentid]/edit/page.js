import FormularioContenido from "@/components/formulariosCreacion/fomulario-contenido";
import { getContentById } from "@/lib/data";


export default async function PageNuevoContenido({ params }) {
  
  const { contentid } = await params
    const content = await getContentById(+contentid);

    console.log(content.type)

  return <FormularioContenido tipo={content.type} gameId={content.gameId} content={content} />;
}
