'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import DesarrolladorInfo from './desarrollador-info';


export default function CarruselDesarrolladores({ developers }) {
  const [index, setIndex] = useState(0);

  if (!developers || developers.length === 0) {
    return <p className="text-center text-gray-500">No hay desarrolladores disponibles.</p>;
  }

  const prev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + developers.length) % developers.length);
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % developers.length);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white flex-1">
          Desarrollador
        </h2>

        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <DesarrolladorInfo user={developers[index]} />
    </div>
  );
}
