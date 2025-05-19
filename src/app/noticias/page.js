import { auth } from "@/auth";
import ContentClient from "@/components/listados/tarjetas/contenido-listado";
import { getAllContentsSimple } from "@/lib/data";

export default async function Page() {
  const session = await auth();
  const contents = await getAllContentsSimple();
  const visiblesContent = contents.filter(
  content => content.visible === true && content.type == "NOTICIA"
);


  return <ContentClient initialContents={visiblesContent} />;
}
