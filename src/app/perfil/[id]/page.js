import Perfil from '@/components/perfil';
import { getUserById } from '@/lib/data';
import { Suspense } from 'react';


export default async function PerfilUsuario({params}) {


    const { userid } = await params
 
    
    const user =  await getUserById(userid)
    return (
       <Suspense fallback={"hola esto esta cargando"}>
       <Perfil user={user} />
   </Suspense>
    );
}