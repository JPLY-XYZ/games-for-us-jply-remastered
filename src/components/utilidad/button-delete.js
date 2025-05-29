'use client';

import { deleteAction } from "@/lib/common/actions";
import { Trash2, Loader } from "lucide-react";
import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { ConfirmToast } from "./confirm-toast";
import { startTransition } from "react";

function ButtonDelete({ id, tipo, recargaUrl }) {
  const [state, actionDelete, pendingDelete] = useActionState(deleteAction, {});
  const pathname = usePathname();

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  ConfirmToast(
    "¿Estás seguro de que quieres borrar esto?",
    () => {
      startTransition(() => {
        actionDelete(formData);
      });
    }
  );
}

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="tipo" value={tipo} />
      <input type="hidden" name="recarga" value={recargaUrl} />
      <button
        disabled={pendingDelete}
        type="submit"
        className="opacity-60 dark:text-white hover:opacity-100 focus:outline-none cursor-pointer"
      >
        {pendingDelete ? (
          <Loader className="animate-spin dark:text-white text-black" />
        ) : (
          tipo !== "USER" && <Trash2 className="w-6 h-6" />
        )}
      </button>
    </form>
  );
}

export default ButtonDelete;

