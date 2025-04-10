'use client'
import { useActionState } from 'react'
import { login } from '@/lib/actions'
import { loginGoogle, loginDiscord } from "@/lib/actions"



export function LoginForm({ className }) {
    const [state, action, pending] = useActionState(login, {})

    return (


        <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 w-full max-w-md rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">Acceso</h2>
            <form action={action} className="w-full">
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={state.fields?.email || ''}
                        required
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        defaultValue={state.fields?.password || ''}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />

                    <div className="flex gap-7 items-center justify-between flex-wrap">
                        <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember">
                            <input
                                className="mr-2"
                                id="remember"
                                name="remember"
                                type="checkbox"
                                defaultChecked={state.fields?.remember}
                            />
                            Recuérdame
                        </label>
                        <a href="/register" className="text-sm dark:text-blue-500 text-blue-900 hover:underline">
                            ¿No tienes cuenta? Entra aquí
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 disabled:bg-slate-300 disabled:animate-pulse"
                    >
                        {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>

                    <p className={state?.error ? 'text-red-500 text-sm mt-2' : 'hidden'}>
                        {state.error}
                    </p>
                </div>
            </form>
            
            <hr className="h-[1px] bg-gray-400 my-6 w-full" />

                <div className="flex flex-row gap-4 w-full justify-center flex-nowrap">
                    <button
                        formAction={loginGoogle}
                        className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-slate-100 transition"
                    >
                        <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
                        Google
                    </button>

                    <button
                        formAction={loginDiscord}
                        className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-[#5865F2] text-white font-semibold rounded-md hover:bg-indigo-600 transition"
                    >
                        <img src="/images/discord.svg" alt="Discord" className="h-5 w-5" />
                        Discord
                    </button>

                    <button
                        className="flex items-center justify-center gap-2 w-[200px] px-4 py-2 bg-[#171a21] text-white font-semibold rounded-md hover:bg-[#1b1f26] transition"
                    >
                        <img src="/images/steam.svg" alt="Steam" className="h-5 w-5" />
                        Steam
                    </button>
                </div>



          
        </div>


    )
}

export default LoginForm