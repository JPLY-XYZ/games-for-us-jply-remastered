import { auth } from "@/auth";
import ContentClient from "@/components/listados/tarjetas/contenido-listado";
import { getAllContentsSimple } from "@/lib/data";

export default async function Page() {
  const session = await auth();
  const contents = await getAllContentsSimple();

  console.log(contents);



  const visiblesContent = contents
    .filter(content => content.visible === true && content.type !== "NOTICIA")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return <ContentClient initialContents={visiblesContent} session={session} />;
}
