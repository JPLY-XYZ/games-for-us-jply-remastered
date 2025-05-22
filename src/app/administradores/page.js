import { auth } from "@/auth";
import AdminPageComp from "@/components/admin/admin-page-comp";
import { getAllCommentsSimple, getAllContentsSimple, getAllGamesSimple, getAllUsersSimple } from "@/lib/data";
import { redirect } from "next/navigation";

async function Page() {


  const session = await auth();
  
 
  if (session?.user?.role !== "ADMINISTRADOR") redirect("/");


  const users = await getAllUsersSimple();
  const contents = await getAllContentsSimple();
  const juegos = await getAllGamesSimple();
  const comments = await getAllCommentsSimple();


  return <AdminPageComp users={users} contents={contents} juegos={juegos} comments={comments} />

}

export default Page;