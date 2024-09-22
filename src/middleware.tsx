import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Clave secreta para NextAuth
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Excluir rutas públicas y archivos estáticos
  if (
    pathname.startsWith("/api/auth") || // Rutas de autenticación de API
    pathname.startsWith("/api/district") || // Rutas de autenticación de API
    pathname.startsWith("/public") || // Rutas públicas (ajusta según tu estructura)
    pathname.startsWith("/_next/static") || // Archivos estáticos generados por Next.js
    pathname.startsWith("/favicon.ico") // Favicon
  ) {
    return NextResponse.next()
  }

  // Obtener el token de autenticación
  const token = await getToken({ req: request, secret })

  // Redirigir a login si no está autenticado
  if (
    !token &&
    pathname !== "/auth/login" &&
    pathname !== "/auth" &&
    pathname !== "/auth/register"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Redirigir a home si ya está autenticado y tratando de acceder a la página de login
  //   if (token && pathname === '/auth/login') {
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

export const config = {
  matcher: [
    "/((?!api/auth|public|_next/static|favicon.ico).*)", // Aplicar el middleware a todas las rutas excepto las excluidas
  ],
}
