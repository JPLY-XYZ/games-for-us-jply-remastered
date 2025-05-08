'use client'

import { deleteAction } from "@/lib/common/actions";
import { Trash2, Loader, Pencil } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { startTransition } from "react";

function ActionsButton({ id, tipo, subtipo }) {
  const [state, actionDelete, pendingDelete] = useActionState(deleteAction, {});

  

  return (<>
    <form action={actionDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="tipo" value={tipo} />
      <button
        disabled={pendingDelete}
        type="submit"
        className="opacity-60 text-white hover:opacity-100 focus:outline-none cursor-pointer"
      >
        {pendingDelete ? (
          <Loader className="animate-spin text-white" />
        ) : (
          <Trash2 className="w-6 h-6" />
        )}
      </button>
    </form>

   
    {subtipo != "VIDEO" && <Link 
      href={"/contenido/"+id+"/edit"}
      replace
      className="opacity-60 text-white hover:opacity-100 focus:outline-none cursor-pointer"
    >
      
        <Pencil className="w-6 h-6" />
      
    </Link>}

  </>
  );
}

export default ActionsButton;
