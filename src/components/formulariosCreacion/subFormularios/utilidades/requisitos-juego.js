export function RequisitosJuego() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Requisitos mínimos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="req_min_os" placeholder="OS mínimo" className={inputClass} />
                <input name="req_min_cpu" placeholder="CPU mínimo" className={inputClass} />
                <input name="req_min_ram" placeholder="RAM mínima" className={inputClass} />
                <input name="req_min_gpu" placeholder="GPU mínima" className={inputClass} />
                <input name="req_min_storage" placeholder="Almacenamiento mínimo" className={inputClass} />
                <input name="req_min_dx" placeholder="DirectX mínimo" className={inputClass} />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white pt-6">Requisitos recomendados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="req_rec_os" placeholder="OS recomendado" className={inputClass} />
                <input name="req_rec_cpu" placeholder="CPU recomendado" className={inputClass} />
                <input name="req_rec_ram" placeholder="RAM recomendada" className={inputClass} />
                <input name="req_rec_gpu" placeholder="GPU recomendada" className={inputClass} />
                <input name="req_rec_storage" placeholder="Almacenamiento recomendado" className={inputClass} />
                <input name="req_rec_dx" placeholder="DirectX recomendado" className={inputClass} />
            </div>
        </div>
    );
}

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
