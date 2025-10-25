import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define rutas públicas (accesibles sin login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/projects(.*)",
  "/about",
  "/privacy",
  "/terms",
  "/api/webhooks(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// Define rutas protegidas que REQUIEREN autenticación
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/create(.*)",
  "/perfil(.*)",
  "/admin(.*)",
  "/credcamer(.*)",
]);

// Middleware de Clerk actualizado para v5
export default clerkMiddleware((auth, req) => {
  // Si es ruta protegida, SIEMPRE requerir autenticación
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // Si no es ruta pública ni protegida, requerir autenticación por defecto
  else if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
