"use client"
import React, { useActionState } from 'react';
import { RequisitosJuego } from './subFormularios/utilidades/requisitos-juego';
import { MultimediaJuego } from './subFormularios/utilidades/multimedia-juego';
import { createOrUpdateGameAction } from '@/lib/actions';
import { LoaderCircle } from 'lucide-react';

function FormularioJuego({userId}) {

const [state, action, pending] = useActionState(createOrUpdateGameAction, {})

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen px-4 py-10 flex justify-center">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl space-y-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
                    Crear nuevo juego
                </h1>

                <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Nombre y Editor */}
<input type="hidden" name="userId" value={userId} />

                    <div className="">
                        <label className={labelClass}>Nombre</label>
                        <input name="name" required className={inputClass} placeholder="Ej: God of War" />
                    </div>

                    <div>
                        <label className={labelClass}>Descripción corta</label>
                        <input name="shortDesc" className={inputClass} placeholder="Breve resumen del juego" />
                    </div>

                 

                    <div className="md:col-span-2">
                        <label className={labelClass}>Descripción larga</label>
                        <textarea
                            name="longDesc"
                            rows={5}
                            className={inputClass}
                            placeholder="Historia, jugabilidad, mecánicas, etc."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Fecha de lanzamiento</label>
                        <input type="date" name="releaseDate" className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Precio (€)</label>
                        <input type="number" step="0.01" name="price" className={inputClass} placeholder="Ej: 59.99" />
                    </div>

                    {/* Requisitos */}
                    <div className="md:col-span-2">
                        <RequisitosJuego />
                    </div>

                    {/* Multimedia y enlaces */}
                    <div className="md:col-span-2">
                        <MultimediaJuego />
                    </div>

                    {/* Botón */}
                    <div className="md:col-span-2 pt-4">
                        <button
                        disabled={pending}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
                        >
                            {!pending ? "Crear juego": <LoaderCircle className=" mx-auto animate-spin" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioJuego;

// Estilos reutilizables
const inputClass =
    "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export const label = labelClass;
export const input = inputClass;
