import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// Rutas públicas que no requieren autenticación
const PUBLIC_PATHS = [
  '/',             // Página de inicio
  '/login',        // Login
  '/register',     // Registro
];

export default auth((req) => {
  const { pathname, search } = req.nextUrl;

  console.log("MIDDLEWARE", pathname, req.auth);

  // Verificamos si es una ruta pública
  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // Si no está autenticado y no es pública, redirige a login
  if (!req.auth && !isPublic) {
    const callbackUrl = pathname + search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      `${req.nextUrl.origin}/login?callbackUrl=${encodedCallbackUrl}`
    );
  }

  // Si está autenticado o es una ruta pública, deja pasar
  return null;
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|images|auth).*)',
  ],
};
