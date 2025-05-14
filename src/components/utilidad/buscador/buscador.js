'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { buscarTodoServer } from '@/lib/actions'
import Image from 'next/image'
import { FileCheck, FileImage, FileSpreadsheet, FileVideo2 } from 'lucide-react'

function Buscador() {
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState({})
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const resultsRef = useRef(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        startTransition(async () => {
          const res = await buscarTodoServer(query)
          setResultados(res)
        })
      } else {
        setResultados({})
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleBuscar = () => {
    router.push(`/busqueda?q=${query}`)
  }

  const handleClick = (item) => {
    if (item.type === 'Juego') router.push(`/juego/${item.id}`)
    else if (item.type === 'Usuario') router.push(`/usuario/${item.id}`)
    else if (item.type === 'Contenido') router.push(`/contenido/${item.id}`)
    setResultados({})  // Cerrar los resultados
  }

  const handleClickOutside = (e) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target)) {
      setResultados({})  // Cerrar los resultados al hacer clic fuera
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const getIconForContent = (type) => {
    if (type === 'VIDEO') return <FileVideo2 />
    if (type === 'RESEÑA') return <FileCheck />
    if (type === 'IMAGEN') return <FileImage />
    if (type === 'NOTICIA') return <FileSpreadsheet />
    return <File />
  }

  return (
    <div className=" mx-auto relative">
   <div className="w-full  mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
  {/* Buscador */}
  <div className="flex w-full sm:w-auto">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
      className="flex-grow px-6 py-3 text-lg rounded-l-xl border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none"
    />
    <button
      className="hidden sm:inline px-6 py-3 text-lg rounded-r-xl bg-blue-600 hover:bg-blue-700 text-white transition"
    >
      Buscar
    </button>
  </div>
</div>


      {/* Contenedor de resultados más grande */}
      {Object.keys(resultados).length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mt-2 rounded-xl shadow-lg max-h-96 overflow-auto z-50"
        >
          {Object.entries(resultados).map(([categoria, items]) => (
            <div key={categoria} className="border-b dark:border-gray-700">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {categoria}
              </p>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-white flex items-center gap-3"
                  onClick={() => handleClick(item)}
                >
                  {item.type === 'Usuario' && item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  )}

                  {item.type === 'Juego' && item.cover && (
                    <Image
                      src={item.cover}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  )}

                  {item.type === 'Contenido' && getIconForContent(item.contentType)}

                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>

                    {item.type === 'Juego' && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.price ? `${item.price} €` : 'Gratis'} · ⭐ {item.score || 0}
                      </span>
                    )}

                    {item.type === 'Contenido' && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.contentType}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Buscador
