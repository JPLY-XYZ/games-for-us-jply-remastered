import Perfil from '@/components/perfil';
import { getUserById } from '@/lib/data';
import { Suspense } from 'react';


export default async function PerfilUsuario({searchParams}) {


    const userid = searchParams.userid;
    
    console.log(userid)
   
    
    const user =  await getUserById(userid)
    return (
       <Suspense fallback={"hola esto esta cargando"}>
       <Perfil user={user} />
   </Suspense>
    );
}