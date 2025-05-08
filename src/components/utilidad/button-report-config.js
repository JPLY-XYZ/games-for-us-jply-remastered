'use client'
import { useEffect, useState } from 'react';
import { isOwner } from "@/lib/data";
import ActionsButton from "./actions-btn";
import ReportButton from "./ReportBtn";
import { Loader } from 'lucide-react';

function ButtonReportConfig({ id, tipo, session, subtipo, editRoute }) {

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
        return <Loader className="animate-spin text-white" />; // O cualquier indicador de carga
    }

    if (isUserOwner) {
        return <ActionsButton id={id} tipo={tipo} subtipo={subtipo} editRoute={editRoute} />;
    } else {
        return <ReportButton id={id} tipo={tipo} />;
    }
}

export default ButtonReportConfig;
