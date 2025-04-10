// Run on edge
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// Rutas públicas que no requieren autenticación
const PUBLIC_PATHS = [
  '/', // home
  '/login',
  '/register',
  '/about',
];

export default auth((req) => {
  const { pathname, search } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'));

  if (!req.auth && !isPublic) {
    const callbackUrl = pathname + search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(`${req.nextUrl.origin}/auth/login?callbackUrl=${encodedCallbackUrl}`);
  }

  return null; // permitir acceso
});

// ⬇️ AQUÍ va el matcher
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|images).*)'],
};


