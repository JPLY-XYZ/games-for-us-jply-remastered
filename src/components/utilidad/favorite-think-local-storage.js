'use client'

import { toggleFavoriteAny } from "@/lib/common/actions"
import { getContentLikesById } from "@/lib/data"
import { ThumbsUp, Loader } from "lucide-react"
import { useState, useEffect } from "react"

function FavoriteThinkLocalStorage({ id, tipo, owner }) {
    const [favorite, setFavorite] = useState(false)
    const [pending, setPending] = useState(false)
    const [likes, setLikes] = useState(0)

    const localStorageKey = 'favorites'

    useEffect(() => {
        const fetchData = async () => {
            const favorites = JSON.parse(localStorage.getItem(localStorageKey)) || []
            const isFavorited = favorites.some(fav => fav.id === id && fav.tipo === tipo)
            setFavorite(isFavorited)
    
            const likeData = await getContentLikesById(id)
            console.log(likeData)
            setLikes(likeData.score)
        }
    
        fetchData()
    }, [id, tipo])

    const handleFavoriteToggle = async () => {
        setPending(true)
        try {
            const favorites = JSON.parse(localStorage.getItem(localStorageKey)) || []
            let updatedFavorites;

            if (favorite) {
                console.log(`Favorito eliminado: ${tipo}-${id}`)
                updatedFavorites = favorites.filter(fav => !(fav.id === id && fav.tipo === tipo))
                setFavorite(false)
                await toggleFavoriteAny({ tipo, id, sumar: false });
                setLikes(likes - 1)
            } else { 
                console.log(`Favorito añadido: ${tipo}-${id}`)
                updatedFavorites = [...favorites, { id, tipo }]
                setFavorite(true)
                await toggleFavoriteAny({ tipo, id, sumar: true });
                setLikes(likes + 1)
            }

            localStorage.setItem(localStorageKey, JSON.stringify(updatedFavorites))
        } catch (error) {
            console.error("Error al actualizar favoritos:", error)
        } finally {
            setPending(false)
        }
    }

    if (owner) {
        return <div className="dark:text-white  text-black"><ThumbsUp className="w-6 h-6 dark:text-white  text-black" /> {likes}</div>
    }
    return (

        
        <button
            type="button"
            disabled={owner || pending}
            onClick={handleFavoriteToggle}
            className={`cursor-pointer focus:outline-none ${favorite ? 'text-green-500' : 'dark:text-white  text-black opacity-60 hover:opacity-100'}`}
        >
            {pending ? <Loader className="dark:text-white  text-black  w-6 h-6 animate-spin" /> :<> <ThumbsUp className="w-6 h-6 " /> {likes}</>}
        </button>
    )
}

export default FavoriteThinkLocalStorage
