'use client'
import { useEffect, useState } from 'react';
import { isOwner } from "@/lib/data";
import { Loader } from 'lucide-react';
import FavoriteButton from './favorite-btn';

function ButtonFavorite({ id, tipo, session}) {


    console.log(session)

       const [isUserOwner, setIsUserOwner] = useState(null);

    useEffect(() => {
        async function checkOwnership() {
            if (session && session.user) {
                const ownership = await isOwner(session.user.id, id, tipo );
               
                setIsUserOwner(ownership);
            }
        }

        checkOwnership();
    }, [session, id, tipo]);

    if (isUserOwner === null) {
        return<> <Loader className="animate-spin text-white" /></> // O cualquier indicador de carga
    }

   
       return <> <FavoriteButton id={id} tipo={tipo} owner={isUserOwner} /></>
    
    
}

export default ButtonFavorite;
