'use client'
import { useActionState } from 'react'
import { loginDiscord, loginGoogle, register } from '@/lib/actions'
import Link from 'next/link'


function RegisterForm() {

  const [state, action, pending] = useActionState(register, {})

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 w-full max-w-md rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Registro</h2>
      <form action={action} className="w-full">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            defaultValue={state.fields?.name || ''}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

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
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Repite la contraseña"
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <input
            type="date"
            name="birthDate"
            defaultValue={state.fields?.birthDate || ''}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <select
            name="country"
            defaultValue={state.fields?.country || ''}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <option value="" disabled>Selecciona un país</option>
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Chile">Chile</option>
            <option value="México">México</option>
            <option value="España">España</option>
            <option value="Colombia">Colombia</option>
            <option value="Perú">Perú</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Francia">Francia</option>
            <option value="Alemania">Alemania</option>
          </select>

          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 disabled:bg-slate-300 disabled:animate-pulse"
          >
            {pending ? 'Registrando...' : 'Registrarse'}
          </button>
          <Link href="/login" className="text-sm dark:text-blue-500 text-blue-900 hover:underline">
            ¿Ya tienes cuenta? Entra aquí
          </Link>

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

export default RegisterForm