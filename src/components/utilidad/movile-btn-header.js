'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Solo visible en móvil */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2"
        aria-label="Abrir menú"
      >
        <Gamepad2 className="w-8 h-8" />
      </button>

      {/* Menú fullscreen overlay */}
      {open && (
        <div className="fixed  inset-0 bg-[var(--aside-card-background)] z-[400] flex flex-col items-center justify-center gap-6 text-white text-2xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white text-4xl font-bold"
            aria-label="Cerrar menú"
          >
            &times;
          </button>
          <Link href="/">
            <p className="mb-30 text-4xl text-center flex flex-col items-center justify-center">
              <Gamepad2 className="w-20 h-20" />
              <span>GAMES FOR US</span>
            </p>
          </Link>


         
          <Link href="/contenidos" onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-white hover:text-[var(--aside-card-background)] rounded transition">
            Contenidos
          </Link>
          <Link href="/noticias" onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-white hover:text-[var(--aside-card-background)] rounded transition">
            Noticias
          </Link>
          <Link href="/juegos" onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-white hover:text-[var(--aside-card-background)] rounded transition">
            Juegos
          </Link>

          <a
            onClick={() => setOpen(false)}
            href="https://github.com/JPLY-XYZ"
            className="px-6 py-3 text-xs cursor-pointer text-gray-400 hover:text-gray-200 transition"
          >
            GAMES FOR US REMASTERED BY JPLY - V-1
          </a>

        </div>
      )}
    </>
  );
}
