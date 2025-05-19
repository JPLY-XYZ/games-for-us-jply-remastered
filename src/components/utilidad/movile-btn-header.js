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
          <Link href="/" onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-white hover:text-[var(--aside-card-background)] rounded transition">
            Home
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
        </div>
      )}
    </>
  );
}
