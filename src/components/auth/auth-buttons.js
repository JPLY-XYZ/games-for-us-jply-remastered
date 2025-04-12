import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

async function AuthButtons() {
    const session = await auth();
    return (   <div className="flex items-center space-x-6">
        {session ? (
            <div className="flex items-center space-x-4">
                {session.user?.image && (
                    <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="rounded-full border border-gray-300 shadow-sm"
                    />
                )}
                {session.user?.name && (
                    <span className="text-sm text-gray-700 font-semibold truncate max-w-[120px]">
                        {session.user.name}
                    </span>
                )}
                <form action={logout}>
                    <button className="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition">
                        Cerrar sesión
                    </button>
                </form>
            </div>
        ) : (
            <div className="flex items-center space-x-3">
                <Link
                    href="/login"
                    className="text-sm px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                >
                    Iniciar sesión
                </Link>
                <Link
                    href="/register"
                    className="text-sm px-3 py-1.5 rounded-md bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 transition"
                >
                    Registrarse
                </Link>
            </div>
        )}
    </div>);
}

export default AuthButtons;