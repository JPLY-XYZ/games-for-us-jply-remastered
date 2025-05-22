'use client'
import { useEffect, useState } from 'react';
import { isOwner } from "@/lib/data";
import ButtonDelete from "./button-delete";
import ButtonReport from "./button-report";
import {  Loader, LogIn } from 'lucide-react';
import Link from 'next/link';

function ButtonReportConfig({ id, tipo, session }) {

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

    if (session?.user == null) {
        return <Link href="/login"><LogIn  className="w-6 h-6" /></Link>;
    }


    if (isUserOwner === null) {
        return <Loader className="animate-spin text-white" />; // O cualquier indicador de carga
    }

    if (isUserOwner) {
        return <ButtonDelete id={id} tipo={tipo}/>;
    } else {
        return <ButtonReport id={id} tipo={tipo} />;
    }
}

export default ButtonReportConfig;
