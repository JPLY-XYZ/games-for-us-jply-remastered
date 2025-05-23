'use client' // Error boundaries must be Client Components

import { Cable, Link } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.log(error)
    }, [error])

    return (
        <div className='grid place-content-center min-h-screen'>
            <Cable className="w-36 h-36 animate-bounce mx-auto" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">ERROR</h1>
                <Link href="/" className="text-blue-500 underline">Volver Atrás</Link>
            <p>{error.message}</p>

           

            <button
                onClick={() => reset()}
                className="px-4 py-2 border mt-4 rounded-md text-white bg-blue-500">
                Intentar de nuevo
            </button>
        </div>
    )
}