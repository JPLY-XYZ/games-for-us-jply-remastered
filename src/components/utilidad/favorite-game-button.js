'use client'

import { toggleFavoriteAction } from "@/lib/actions"
import { ThumbsUp, Loader } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

function FavoriteGameButton({ game, isFavorite, userId }) {
  const [favorite, setFavorite] = useState(isFavorite)
  const [gameCount, setGameCount] = useState(Number(game._count.fans))
  const [pending, setPending] = useState(false) 

  const handleFavoriteToggle = async (event) => {
    event.preventDefault()

    if (!userId) {
      return; 
    }

    setPending(true) 

    try {
      const result = await toggleFavoriteAction({
        gameId: game.id,
        userId,
      })

      if (result?.status === 'added') {
        setFavorite(true)
        setGameCount((prevCount) => prevCount + 1) 
      } else if (result?.status === 'removed') {
        setFavorite(false)
        setGameCount((prevCount) => prevCount - 1) 
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setPending(false) 
    }
  }

  return (
    <>
      <form onSubmit={handleFavoriteToggle}>
        <input type="hidden" name="gameId" value={game.id} />
        <input type="hidden" name="userId" value={userId} />

        {userId == null ? (
          <Link href="/login">
            <ThumbsUp className="w-6 h-6" />
          </Link>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className={`cursor-pointer focus:outline-none ${favorite ? 'text-green-500' : 'text-white opacity-60 hover:opacity-100'}`}
          >
            {pending ? (
              <Loader className="text-white w-6 h-6 animate-spin" />
            ) : (
              <ThumbsUp className="w-6 h-6" />
            )}
          </button>
        )}
      </form>

      <p className="text-xl">{gameCount}</p> 
    </>
  )
}

export default FavoriteGameButton
