'use client'

import { toggleFavoriteGameAction } from "@/lib/common/actions";
import { LogIn, RefreshCw, ThumbsUp, X } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

function LikeButton({ game, user }) {

    const [state, action, pending] = useActionState(toggleFavoriteGameAction, {});

 

if (!game || !user) {
    return 
       
}

   const isFavorite = game?.fans?.some(fan => fan.id === user.id);
    return (
        <form action={action}>
            <input type="hidden" name="gameid" value={game.id} />
            <input type="hidden" name="userid" value={user.id} />
            <button
                className={`cursor-pointer px-6 py-3 text-sm rounded-full shadow-lg transition-all flex items-center gap-2 
                ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} 
                ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={pending}
            >
                {!pending
                    ? (!isFavorite ? <ThumbsUp />: <X />)
                    : <RefreshCw className="animate-spin" />}

            </button>
        </form>
    );
}

export default LikeButton;
