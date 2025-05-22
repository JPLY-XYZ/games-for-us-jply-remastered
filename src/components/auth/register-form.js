'use client'
import { useActionState } from 'react'
import { register } from '@/lib/actions'
import Link from 'next/link'
import OauthButtons from './oauth-buttons'


function RegisterForm() {

  const [state, action, pending] = useActionState(register, {})

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800  w-full sm:h-auto  h-full max-w-screen  sm:max-w-md rounded-lg shadow-md p-6">
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

      <OauthButtons />
    </div>


  )
}

export default RegisterForm