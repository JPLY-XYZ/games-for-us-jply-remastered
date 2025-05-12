import AdminPageComp from "@/components/admin/admin-page-comp";
import { getAllCommentsSimple, getAllContentsSimple, getAllGamesSimple, getAllUsersSimple } from "@/lib/data";
import { Suspense } from "react";

async function page() {

  const users = await getAllUsersSimple();
  const contents = await getAllContentsSimple();
  const juegos = await getAllGamesSimple();
  const comments = await getAllCommentsSimple();

  return (<Suspense fallback={"hola esto esta cargando"}>
    <AdminPageComp users={users} contents={contents} juegos={juegos} comments={comments} />
  </Suspense>);
}

export default page;