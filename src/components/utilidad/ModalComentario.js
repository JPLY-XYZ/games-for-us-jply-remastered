'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { enviarComentario } from '@/lib/actions';
import RatingStarsBtn from './RatingStarsBtn';
import { usePathname } from 'next/navigation';

export function ModalComentario({ setModalAbierto, game = null, content = null, EsPuntuacion = false }) {
    const [rating, setRating] = useState(0); // Estado para la calificación
    const [isVisible, setIsVisible] = useState(true); // Modal visible desde el inicio

    // Usamos useActionState para manejar el estado de la acción y el envío del comentario
    const [state, action, pending] = useActionState(enviarComentario, {});

    const handleRatingChange = (newRating) => {
        setRating(newRating); // Actualiza la calificación
    };

    // Cerrar el modal una vez que se haya enviado el comentario con éxito
    useEffect(() => {
        if (!pending && state?.success) {
            // Cerrar el modal solo si el envío fue exitoso
            setModalAbierto(false);
        }
    }, [pending, state?.success, setModalAbierto]); // Dependencias para cuando cambian

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
                    Añadir comentario
                </h3>

                <form action={action} className="w-full space-y-5">
                    <div className="flex flex-col gap-4">
                        {/* Componente de calificación */}
                        <textarea
                            name='comentario'
                            placeholder="Escribe tu comentario..."
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            rows={4}
                            required
                        />
                        {EsPuntuacion &&
                        <RatingStarsBtn
                            score={rating} // Pasa el rating al componente
                            onRate={handleRatingChange} // Actualiza el rating cuando el usuario hace clic
                            className="grid grid-cols-5 justify-items-center px-18 mx-auto text-4xl"
                        />}
                        {/* Campo hidden para enviar la calificación */}
                        <input type="hidden" name="rating" value={rating || 0} />
                        <input type="hidden" name="path" value={usePathname()} />
                        {game && <input type="hidden" name="gameId" value={game} />}
                        {content && <input type="hidden" name="contentId" value={content} />}

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setModalAbierto(false)}
                                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={pending}
                                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 disabled:bg-slate-300 disabled:animate-pulse"
                            >
                                {pending ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>

                        {/* Mostrar errores si los hay */}
                        {state?.error && (
                            <p className="text-red-500 text-sm mt-2">{state?.error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalComentario;
