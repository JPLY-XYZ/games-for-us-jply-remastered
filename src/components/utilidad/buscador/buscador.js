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
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        startTransition(async () => {
          const res = await buscarTodoServer(query)
          setResultados(res)
          setDropdownVisible(true)
        })
      } else {
        setResultados({})
        setDropdownVisible(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleBuscar = () => {
    router.push(`/busqueda?q=${query}`)
    setDropdownVisible(false)
  }

  const handleClick = (item) => {
    if (item.type === 'Juego') router.push(`/juego/${item.id}`)
    else if (item.type === 'Usuario') router.push(`/perfil/${item.id}`)
    else if (item.type === 'Contenido') router.push(`/contenido/${item.id}`)
    setDropdownVisible(false)
  }

  const getIconForContent = (type) => {
    if (type === 'VIDEO') return <FileVideo2 />
    if (type === 'RESEÑA') return <FileCheck />
    if (type === 'IMAGEN') return <FileImage />
    if (type === 'NOTICIA') return <FileSpreadsheet />
    return <File />
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="flex-grow px-4 py-2 rounded-l-xl border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none"
        />
        <button
          onClick={handleBuscar}
          className="hidden sm:inline px-4 py-2 rounded-r-xl bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Buscar
        </button>
      </div>

      {dropdownVisible && Object.keys(resultados).length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-1/2 top-full w-[100%] sm:w-[50%] transform -translate-x-1/2 -translate-y-2 bg-white dark:bg-gray-800 border dark:border-gray-700 mt-2 rounded-xl shadow-lg max-h-90 overflow-auto"
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
