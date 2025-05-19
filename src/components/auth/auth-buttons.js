'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/lib/actions";
import {
  DoorClosed,
  FolderCog,
  FolderHeart,
  FolderUp,
  SquareUser,
  Menu,
  ChevronDown,
} from "lucide-react";

export default function AuthButtons({ session }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex items-center px-3 py-2 rounded-md hover:bg-gray-200 transition"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 text-sm font-medium text-gray-800 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition"
          >
            Registrarse
          </Link>
        </div>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col sm:hidden">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
   <div className="relative" ref={menuRef}>
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-200 transition cursor-pointer"
  >
    {session.user?.image ? (
    <div className="w-8 h-8 rounded-full overflow-hidden">
  <Image
    src={session.user.image}
    alt="Avatar"
    width={32}
    height={32}
    className="w-full h-full object-cover"
    unoptimized
  />
</div>
    ) : (
      <SquareUser className="w-8 h-8 text-gray-600" />
    )}
    <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
  </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
          </div>
          <Link
            href={"/perfil/" + session.user.id}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            <SquareUser className="w-5 h-5 text-gray-500" />
            <span>Perfil</span>
          </Link>
          <Link
            href={"/perfil/" + session.user.id + "/juegosfavoritos"}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            <FolderHeart className="w-5 h-5 text-gray-500" />
            <span>Juegos Favoritos</span>
          </Link>

          {session.user?.role === "DESARROLLADOR" && (
            <Link
              href={"/perfil/" + session.user.id + "/juegospublicados"}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <FolderUp className="w-5 h-5 text-gray-500" />
              <span>Panel Desarrollador</span>
            </Link>
          )}

          {session.user?.role === "ADMINISTRADOR" && (
            <Link
              href="/administradores"
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <FolderCog className="w-5 h-5 text-gray-500" />
              <span>Panel de administrador</span>
            </Link>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <DoorClosed className="w-5 h-5 text-gray-500" />
              <span>Cerrar sesión</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
