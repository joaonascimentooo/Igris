/**
 * Exemplo de Middleware para proteção de rotas
 * Salve em src/middleware.ts para usar
 */
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];
const protectedRoutes = ['/dashboard', '/routines', '/workout', '/progress'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verifica se é rota pública
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verifica se é rota protegida
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Verificar autenticação aqui
    // Por enquanto, deixar passar (será validado no client-side)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
