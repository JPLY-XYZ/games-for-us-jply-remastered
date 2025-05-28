    'use client' 

    import { Cable, Link } from 'lucide-react'
    import { useEffect } from 'react'

    export default function Error({ error, reset }) {
        useEffect(() => {
            console.log(error)
        }, [error])

        return (
            <div className='grid place-content-center min-h-screen'>
                <Cable className="w-36 h-36 animate-bounce mx-auto" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">ERROR</h1>
                <p>Probablemente has intentado subir una imagen o video con un tamaño superior a 4Mb o el tiempo de respuesta se a excedido.</p>

                <p>Comprueba tu conexion.</p>
                <p>{error}</p>

                <button
                    onClick={() => reset()}
                    className="px-4 py-2 border mt-4 rounded-md text-white bg-blue-500">
                    Intentar de nuevo
                </button>
            </div>
        )
    }