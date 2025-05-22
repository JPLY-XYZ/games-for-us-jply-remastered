'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { enviarComentario } from '@/lib/actions';
import RatingStarsButton from '../utilidad/rating-stars-button';
import { usePathname } from 'next/navigation';

export function ModalComentario({ setModalAbierto, game = null, content = null, EsPuntuacion = false }) {
    const [rating, setRating] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [state, action, pending] = useActionState(enviarComentario, {});
    const pathname = usePathname();

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        if (!pending && state?.success) {
            setModalAbierto(false);
        }
    }, [pending, state?.success, setModalAbierto]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 bg-white/60 dark:bg-slate-800/60 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
                    Añadir comentario
                </h3>

                <form action={action} className="w-full space-y-5">
                    <div className="flex flex-col gap-4">
                        <textarea
                            name='comentario'
                            placeholder="Escribe tu comentario..."
                            className="dark:bg-gray-700 bg-gray-300 dark:text-gray-200 border-0 rounded-md p-2 dark:focus:bg-gray-600 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            rows={4}
                            required
                        />
                        {EsPuntuacion &&
                        <RatingStarsButton
                            score={rating}
                            onRate={handleRatingChange}
                            className="grid grid-cols-5 justify-items-center px-18 mx-auto text-4xl"
                        />}
                        <input type="hidden" name="rating" value={rating || 0} />
                        <input type="hidden" name="path" value={pathname} />
                        {game && <input type="hidden" name="gameId" value={game} />}
                        {content && <input type="hidden" name="contentId" value={content} />}

                        <div className="flex justify-end  gap-3">
                            <button
                                type="button"
                                onClick={() => setModalAbierto(false)}
                                className="text-sm mt-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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

                        {state?.error && (
                            <p className="text-red-500 text-sm ">{state?.error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalComentario;
