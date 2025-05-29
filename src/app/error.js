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
                <p>Se ha producido un error, ponte en contacto con el administrador.</p>
                <p>Probablemente estes esperimentando alta latencia con el servidor.</p>
                <p>{error}</p>

                <button
                    onClick={() => reset()}
                    className="px-4 py-2 border mt-4 rounded-md text-white bg-blue-500">
                    Intentar de nuevo
                </button>
            </div>
        )
    }