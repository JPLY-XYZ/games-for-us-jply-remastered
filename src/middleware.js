import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// rutas publicas que no requieren autenticacion
const PUBLIC_PATHS = [
  '/',             
  '/login',        
  '/register',     
  '/verificar',    // ruta para verificar el email
];

export default auth((req) => {
  const { pathname, search } = req.nextUrl;

  // si la ruta es pública, deja pasar
  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // si la ruta no es publica y no esta autenticado, redirige a la pagina de inicio de sesion
  if (!req.auth && !isPublic) {
    const callbackUrl = pathname + search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      `${req.nextUrl.origin}/login?callbackUrl=${encodedCallbackUrl}`
    );
  }



  // si la ruta es publica y esta autenticado, redirige a la pagina de inicio
  return null;
});

//macher para dejar acceso a imagenes, iconos, y demas cosas necesarias para un correcto funcionamiento de la aplicacion
export const config = {
  matcher: [
    '/((?!_next/static|/error*|_next/image|favicon.ico|manifest.json|sitemap.xml|robots.txt|api|images|icons|screenshots|auth).*)',
  ],
};
