
import LoginForm from '@/components/auth/login-form'

import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { CirclePlus, Play, Globe } from 'lucide-react'

// https://next-auth.js.org/configuration/pages#sign-in-page
const errors = new Map();
errors.set('OAuthSignin', "Error al construir una URL de autorización.");
errors.set('OAuthCallback', "Error al manejar la respuesta de un proveedor de OAuth.");
errors.set('OAuthCreateAccount', "No se pudo crear un usuario proveedor de OAuth en la base de datos.");
errors.set('EmailCreateAccount', "No se pudo crear un usuario de proveedor de correo electrónico en la base de datos.");
errors.set('Callback', "Error en la ruta del controlador de devolución de llamada de OAuth.");
errors.set('OAuthAccountNotLinked', "Este email ya está registrado con otro proveedor.");
errors.set('EmailSignin', "Comprueba tu dirección de correo electrónico.");
errors.set('CredentialsSignin', "Fallo al iniciar sesion. Verifique que los datos que proporcionó sean correctos.");
errors.set('SessionRequired', "Error al iniciar sesión. Verifique que los detalles que proporcionó sean correctos.");
errors.set('Default', "No se puede iniciar sesión.");


async function PaginaLogin({ searchParams }) {
  const { error, callbackUrl } = await searchParams
  globalThis.callbackUrl = callbackUrl || "/"

  const sesion = await auth()

  if (sesion) redirect('/')

  return (
    
      <LoginForm/>
   
  )
}

export default PaginaLogin