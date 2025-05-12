'use client';

import { useSession } from "next-auth/react";
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
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 flex flex-col sm:hidden">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
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
        className="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-200 transition"
      >
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
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
          >
            <SquareUser className="w-5 h-5 text-gray-500" />
            <span>Perfil</span>
          </Link>
          <Link
            href={"/perfil/" + session.user.id + "/juegosfavoritos"}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <FolderHeart className="w-5 h-5 text-gray-500" />
            <span>Juegos Favoritos</span>
          </Link>
          <Link
            href={"/perfil/" + session.user.id + "/juegospublicados"}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <FolderUp className="w-5 h-5 text-gray-500" />
            <span>Panel Desarrollador</span>
          </Link>
          <Link
            href="/administradores"
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <FolderCog className="w-5 h-5 text-gray-500" />
            <span>Panel de administrador</span>
          </Link>
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
    