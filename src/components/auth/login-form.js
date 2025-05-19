'use client'
import { useEffect, useState } from 'react'
import { useActionState } from 'react'
import { login } from '@/lib/actions'
import OauthButtons from './oauth-buttons'

export function LoginForm({ error }) {
  const [state, formAction, pending] = useActionState(login, {})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem('loginEmail')
    const storedPassword = localStorage.getItem('loginPassword')
    if (storedEmail && storedPassword) {
      setEmail(storedEmail)
      setPassword(storedPassword)
      setRemember(true)
    }
  }, [])

  const handleRemember = () => {
    if (remember) {
      localStorage.setItem('loginEmail', email)
      localStorage.setItem('loginPassword', password)
    } else {
      localStorage.removeItem('loginEmail')
      localStorage.removeItem('loginPassword')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 w-full sm:h-auto h-full max-w-screen sm:max-w-md rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Acceso</h2>
      <form
        action={(formData) => {
          handleRemember()
          formAction(formData)
        }}
        className="w-full"
      >
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex gap-7 items-center justify-between flex-wrap">
            <label htmlFor="remember" className="text-sm text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              Recuérdame
            </label>
            <a href="/register" className="text-sm text-blue-300 hover:underline">
              ¿No tienes cuenta? Entra aquí
            </a>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:brightness-110 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          {state.error && (
            <p className="text-red-500 text-sm mt-2">{state.error}</p>
          )}
        </div>
      </form>
      <hr className="h-px bg-gray-400 my-6 w-full" />
      <OauthButtons  />
    </div>
  )
}

export default LoginForm
