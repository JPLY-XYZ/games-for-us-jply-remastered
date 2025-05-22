import { Cable} from "lucide-react";
import Link from "next/link";

function NotFound() {
    return (  <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <Cable className="w-36 h-36 animate-bounce mx-auto" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">Pagina no encontrada</h1>
                <Link href="/" className="text-blue-500 underline">Volver Atrás</Link>
            </div> );
}

export default NotFound;