'use client';
import toast from "react-hot-toast";

export function ConfirmToast(mensaje, onConfirmar, onCancelar) {
  toast.custom((t) => (
    <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-4 rounded shadow-md flex flex-col gap-2">
      <span>{mensaje}</span>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirmar?.(); // Ejecuta si existe
          }}
          className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded"
        >
          Confirmar
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onCancelar?.(); // Ejecuta si existe
          }}
          className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  ));
}
