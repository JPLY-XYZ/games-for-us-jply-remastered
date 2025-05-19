'use client';

import { reportAction } from "@/lib/common/actions";
import { AlertTriangle, Loader } from "lucide-react";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import { startTransition } from "react";

function ReportButton({ id, tipo }) {
    const [state, action, pending] = useActionState(reportAction, {});
    const [reported, setReported] = useState(false);

    useEffect(() => {
        if (!tipo) {
            console.error("El tipo no puede ser null o undefined");
            return;
        }

        const reportedItems = JSON.parse(localStorage.getItem('reportedItems')) || [];
        const reportKey = `${tipo}-${id}`;

        if (reportedItems.includes(reportKey)) {
            setReported(true);
        }
    }, [id, tipo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (reported || pending || !tipo) return;

        const reportedItems = JSON.parse(localStorage.getItem('reportedItems')) || [];
        const reportKey = `${tipo}-${id}`;

        if (!reportedItems.includes(reportKey)) {
            reportedItems.push(reportKey);
            localStorage.setItem('reportedItems', JSON.stringify(reportedItems));
            setReported(true);
        }

        const formData = new FormData(e.target);

        startTransition(() => {
            action(formData);
        });
    };

    if (!tipo) {
        return null; 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="tipo" value={tipo} />
            <button
                disabled={reported || pending}
                type="submit"
                className={`opacity-60 focus:outline-none   ${reported ? 'text-orange-500 cursor-default' : 'dark:text-white text-gray-900'} ${reported ? 'cursor-default' : 'hover:opacity-100 cursor-pointer'}`}
            >
                {pending ? <Loader className="animate-spin text-white" /> : <AlertTriangle className="w-6 h-6" />}
            </button>
        </form>
    );
}

export default ReportButton;
