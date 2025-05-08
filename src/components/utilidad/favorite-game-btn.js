'use client'
import { toggleFavoriteAction } from "@/lib/actions"
import { ThumbsUp, Loader } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { useState } from "react"

function FavoriteGameButton({ game, isFavorite, userId }) {
    const [favorite, setFavorite] = useState(isFavorite)

    console.log(game._count)

    const [gameCount, setGameCount] = useState(Number(game._count.fans))

    const [state, action, pending] = useActionState(
        async (prev, formData) => {
            const result = await toggleFavoriteAction(prev, formData)

            // Actualizamos estado local según lo que diga el servidor
            if (result?.status === 'added') {
                setFavorite(true)
                setGameCount(prevCount => prevCount + 1) // Usamos la función de actualización de estado para garantizar el valor más reciente
            }
            if (result?.status === 'removed') {
                setFavorite(false)
                setGameCount(prevCount => prevCount - 1) // Usamos la función de actualización de estado
            }

            return result
        },
        {}
    )

    return (
    <>
            <form action={action}>
                <input type="hidden" name="gameId" value={game.id} />
                <input type="hidden" name="userId" value={userId} />
                {userId == null && <Link href="/login"> <ThumbsUp className="w-6 h-6" /> </Link>}
                {userId != null && <button
                    type="submit"
                    disabled={pending}
                    className={`cursor-pointer focus:outline-none ${favorite ? 'text-green-500' : 'text-white opacity-60 hover:opacity-100'}`}
                >
                    {pending ? <Loader className="text-white w-6 h-6 animate-spin" /> : <ThumbsUp className="w-6 h-6" />}
                </button>}

            </form>
            <p className="text-xl">{gameCount}</p> {/* Muestra el contador actualizado de fans */}
            </>
            )   
}

            export default FavoriteGameButton
