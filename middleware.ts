// middleware.ts
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// ── Supported locales ─────────────────────────────────────────────
const locales       = ["en", "pt", "es", "fr", "it", "bg", "el", "pl", "tr"];
const defaultLocale = "en";

// ── next-intl middleware ──────────────────────────────────────────
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed"
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
  return NextResponse.next();
}

if (pathname.startsWith("/api")) {
  return NextResponse.next();
}

  // ── Run next-intl for all NON-admin routes ─────────────────────
  const intlResponse = intlMiddleware(request);
  let supabaseResponse = intlResponse ?? NextResponse.next({ request });

  // ── Supabase client ────────────────────────────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // ── Refresh session ────────────────────────────────────────────
  const { data: { user } } = await supabase.auth.getUser();

  // ── Strip locale prefix for route matching ─────────────────────
  const localePrefix = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  const pathnameWithoutLocale = localePrefix
    ? pathname.slice(`/${localePrefix}`.length) || "/"
    : pathname;

  // ── Protect /dashboard (localized) ─────────────────────────────
  if (!user && pathnameWithoutLocale.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL(`/${localePrefix ?? defaultLocale}/login`, request.url)
    );
  }

  // ── Redirect logged-in users away from localized auth pages ────
  if (
    user &&
    (pathnameWithoutLocale === "/login" ||
     pathnameWithoutLocale === "/register")
  ) {
    return NextResponse.redirect(
      new URL(`/${localePrefix ?? defaultLocale}/dashboard`, request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|woff2?)$).*)"
  ]
};
