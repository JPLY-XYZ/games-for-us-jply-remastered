'use client'
import { loginDiscord, loginGoogle } from "@/lib/actions";
import { Loader } from "lucide-react";
import { useActionState } from "react";


function OauthButtons({ error }) {
    const [stateGoogle, actionGoogle, pendingGoogle] = useActionState(loginGoogle, {})
    const [stateDiscord, actionDiscord, pendingDiscord] = useActionState(loginDiscord, {})
    return (
        <>
            <form className="flex flex-row gap-4 w-full justify-center flex-nowrap">
                <button
                    disabled={pendingGoogle}
                    formAction={actionGoogle}
                    className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-slate-100 transition"
                >
                    <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
                    {pendingGoogle ? <Loader className="animate-spin" /> : 'Google'}
                </button>

                <button
                    disabled={pendingDiscord}
                    formAction={actionDiscord}
                    className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-[#5865F2] text-white font-semibold rounded-md hover:bg-indigo-600 transition"
                >
                    <img src="/images/discord.svg" alt="Discord" className="h-5 w-5" />
                    {pendingDiscord ? <Loader className="animate-spin" /> : 'Discord'}
                </button>

                <button
                    disabled
                    // formAction={loginMicrosoft}
                    className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-[#171a21] text-white font-semibold rounded-md hover:bg-[#1b1f26] transition"
                >
                    <img src="/images/steam.svg" alt="Steam" className="h-5 w-5" />
                    Steam
                </button>

            </form>
            <p className={error ? 'text-red-500 text-sm mt-2' : 'hidden'}>
                {error}
            </p>
        </>
    );
}

export default OauthButtons;