import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center  dark:text-white text-black">
      <Loader2 className="w-12 h-12 animate-spin mr-4" />
      <span className="text-xl">Cargando contenido...</span>
    </div>
  );
}
