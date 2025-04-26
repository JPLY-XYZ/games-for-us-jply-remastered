import React from 'react';
import { RequisitosJuego } from './subFormularios/utilidades/requisitos-juego';
import { MultimediaJuego } from './subFormularios/utilidades/multimedia-juego';

function FormularioJuego() {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen px-4 py-12 w-[85%]">
            <div className=" mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl space-y-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
                    Crear nuevo juego
                </h1>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre y Editor */}
                    <div className="md:col-span-2">
                        <label className="label">Nombre *</label>
                        <input name="name" required className={inputClass} placeholder="Ej: God of War" />
                    </div>

                    <div>
                        <label className="label">Descripción corta</label>
                        <input name="shortDesc" className={inputClass} placeholder="Breve resumen del juego" />
                    </div>

                    <div>
                        <label className="label">Editor</label>
                        <input name="editor" className={inputClass} placeholder="Sony, Ubisoft, etc." />
                    </div>

                    <div className="md:col-span-2">
                        <label className="label">Descripción larga</label>
                        <textarea
                            name="longDesc"
                            rows="5"
                            className={inputClass}
                            placeholder="Historia, jugabilidad, mecánicas, etc."
                        />
                    </div>

                    <div>
                        <label className="label">Fecha de lanzamiento</label>
                        <input type="date" name="releaseDate" className={inputClass} />
                    </div>

                    <div>
                        <label className="label">Precio (€)</label>
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
                    <div className="md:col-span-2 pt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
                        >
                            Crear juego
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

// Úsalo dentro de los subformularios también
export const label = labelClass;
export const input = inputClass;
