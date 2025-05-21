'use client'

import { updateUserData } from '@/lib/actions';

import { Pencil } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';


function EditUserInfoForm({ user, ownership }) {
    const [isEditing, setIsEditing] = useState(false);

    const [state, action, pending] = useActionState(updateUserData, {});

    const formatDate = (date) => {
        return date ? new Date(date).toISOString().split('T')[0] : ""; // Formato 'YYYY-MM-DD'
    }

    useEffect(() => {
        if (!pending && state?.success) {
            // Cerrar el modal solo si el envío fue exitoso

            setIsEditing(false)
        }
    }, [pending, state?.success, setIsEditing]); // Dependencias para cuando cambian

    if (isEditing) {
        return (
            <form action={action} className="flex-1 flex flex-col justify-center text-center md:text-left relative p-4 bg-white dark:bg-slate-800 rounded shadow">
                <input type='hidden' name='id' value={user.id} />
                <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    placeholder="Nombre"
                    className="text-2xl font-bold text-gray-800 dark:text-gray-100 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none mb-4"
                />
                <textarea
                    name="bio"
                    defaultValue={user.bio}
                    placeholder="Biografía"
                    rows={3}
                    className="text-gray-700 dark:text-gray-300 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none resize-none mb-4"
                />
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="date"
                        name="birthdate"
                        defaultValue={formatDate(user.birthDate)} // Formatear la fecha
                        className="text-gray-700 dark:text-gray-100 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none w-full"
                    />
                    <select
                        name="country"
                        defaultValue={user.country || ""}
                        className="w-full px-3 py-2 text-sm  text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                    >

                        <option value="">Selecciona un país</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="España">España</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="México">México</option>
                        <option value="Perú">Perú</option>
                        <option value="Reino Unido">Reino Unido</option>
                        <option value="Uruguay">Uruguay</option>
                    </select>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        disabled={pending}
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Guardar
                    </button>
                    <button
                        disabled={pending}
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="flex-1 flex flex-col justify-center text-center md:text-left relative p-4">
            {ownership && <button
                onClick={() => setIsEditing(true)}
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                title="Editar"
            >
                <Pencil className="w-5 h-5 cursor-pointer" />
            </button>}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 wrap-anywhere">{user.bio}</p>
            {user.birthDate && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {formatDate(user.birthDate)}
                </p>

            )}
            {user.country && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.country}</p>
            )}
        </div>
    );
}

export default EditUserInfoForm;
