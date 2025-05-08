'use client';

import React, { useEffect, useState } from 'react';

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const opciones = {
  sonido: ["Excelente", "Bueno", "Regular", "Malo"],
  errores: ["Ninguno", "Apenas tiene y no empañan la experiencia", "Algunos molestos", "Demasiados"],
  graficos: ["Excelentes", "Muy buenos", "Correctos", "Malos"],
  historia: ["Obra maestra", "Muy buena", "Buena", "Floja"],
  requisitos: ["Muy bajos", "Medios", "Altos", "PCs Gaming"],
  dificultad: ["Muy fácil", "Fácil", "Dificultad media", "Difícil", "Muy difícil"],
  precioCalidad: ["Excelente relación", "Buena", "Acorde a lo que ofrece", "No compensa"],
  recomendacion: ["Muy recomendable", "Recomendable", "No recomendable"],
  modos: ["Un jugador", "Cooperativo", "Cooperativo Local", "Multijugador"]
};

export default function ValoracionResenia({ moreInfo }) {
  const [formValues, setFormValues] = useState({
    sonido: moreInfo?.sonido || '',
    errores: moreInfo?.errores || '',
    graficos: moreInfo?.graficos || '',
    historia: moreInfo?.historia || '',
    requisitos: moreInfo?.requisitos || '',
    dificultad: moreInfo?.dificultad || '',
    precioCalidad: moreInfo?.precioCalidad || '',
    recomendacion: moreInfo?.recomendacion || '',
    duracion_total: moreInfo?.duracion?.total || '',
    duracion_historia: moreInfo?.duracion?.historia || '',
    duracion_secundarias: moreInfo?.duracion?.secundarias || '',
    modos: moreInfo?.modos || []
  });

  // Handle Select Change
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormValues((prevValues) => {
      const newModos = checked
        ? [...prevValues.modos, value]
        : prevValues.modos.filter((modo) => modo !== value);
      return {
        ...prevValues,
        modos: newModos
      };
    });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Valoraciones del juego</h2>

      {/* Selects */}
      {["sonido", "errores", "graficos", "historia", "requisitos", "precioCalidad", "recomendacion"].map((campo) => (
        <div key={campo}>
          <label className={labelClass}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
          <select
            name={campo}
            className={inputClass}
            value={formValues[campo]}
            onChange={handleSelectChange}
            required
          >
            <option value="">Selecciona una opción</option>
            {opciones[campo].map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Duración */}
      <div>
        <label className={labelClass}>Duración del juego</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="duracion_total"
            placeholder="Total (e.g. 20 horas)"
            className={inputClass}
            value={formValues.duracion_total}
            onChange={handleSelectChange}
            required
          />
          <input
            type="text"
            name="duracion_historia"
            placeholder="Historia"
            className={inputClass}
            value={formValues.duracion_historia}
            onChange={handleSelectChange}
            required
          />
          <input
            type="text"
            name="duracion_secundarias"
            placeholder="Secundarias"
            className={inputClass}
            value={formValues.duracion_secundarias}
            onChange={handleSelectChange}
            required
          />
        </div>
      </div>

      {/* Dificultad */}
      <div>
        <label className={labelClass}>Dificultad</label>
        <select
          name="dificultad"
          className={inputClass}
          value={formValues.dificultad}
          onChange={handleSelectChange}
          required
        >
          <option value="">Selecciona dificultad</option>
          {opciones.dificultad.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Modos de juego */}
      <div>
        <label className={labelClass}>Modos de juego</label>
        <div className="flex flex-wrap gap-4">
          {opciones.modos.map((modo) => (
            <label key={modo} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
              <input
                type="checkbox"
                name="modos"
                value={modo}
                checked={formValues.modos.includes(modo)}
                onChange={handleCheckboxChange}
              />
              {modo}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
