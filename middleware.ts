import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 1. If trying to access dashboard but NOT logged in -> Login
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 2. If trying to access dashboard but NOT verified -> Verify Email
  if (user && !user.email_confirmed_at && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Note: You can skip this if you don't want to force email verification
    return NextResponse.redirect(new URL("/auth/verify-email", request.url));
  }

  // 3. If ALREADY logged in and trying to access auth pages -> Dashboard
  if (user && user.email_confirmed_at && request.nextUrl.pathname.startsWith("/auth")) {
     // Allow 'verify-email' if they just signed up, but otherwise redirect
     if (!request.nextUrl.pathname.includes("/verify-email")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
     }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};