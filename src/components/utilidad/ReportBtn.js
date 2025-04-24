'use client';
import { reportAction } from "@/lib/actions";
import { AlertTriangle, Loader } from "lucide-react";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import { startTransition } from "react";

function ReportButton({ id, tipo }) {
    const [state, action, pending] = useActionState(reportAction, {});
    const [reported, setReported] = useState(false);

    useEffect(() => {
        // Obtenemos los elementos reportados desde localStorage
        const reportedItems = JSON.parse(localStorage.getItem('reportedItems')) || [];

        // Creamos la clave combinando el tipo y el id
        const reportKey = `${tipo}-${id}`;

        // Verificamos si el tipo-id ya está reportado
        if (reportedItems.includes(reportKey)) {
            setReported(true);
        }
    }, [id, tipo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si ya está reportado o está pendiente, no hacemos nada
        if (reported || pending) return;

        // Obtenemos los elementos reportados desde localStorage
        const reportedItems = JSON.parse(localStorage.getItem('reportedItems')) || [];

        // Creamos la clave combinando el tipo y el id
        const reportKey = `${tipo}-${id}`;

        // Si aún no está reportado, lo agregamos
        if (!reportedItems.includes(reportKey)) {
            reportedItems.push(reportKey);
            localStorage.setItem('reportedItems', JSON.stringify(reportedItems));
            setReported(true);
        }

        // Enviamos la acción para reportar
        const formData = new FormData(e.target);

        startTransition(() => {
            action(formData);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="tipo" value={tipo} />
            <button
                disabled={reported || pending}
                type="submit"
                className={` opacity-60 focus:outline-none ${reported ? 'text-orange-500' : 'text-white'} ${reported ? '' : 'hover:opacity-100 cursor-pointer'}`}
            >
                {pending ? <Loader className="animate-spin text-white" /> : <AlertTriangle className="w-6 h-6" />}
            </button>
        </form>
    );
}

export default ReportButton;
