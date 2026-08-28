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
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  /*
   * Always validate/refresh the Supabase session.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  /*
   * Employee dashboard:
   *
   * /dashboard/employee
   * /dashboard/employee/*
   */
  const isEmployeeRoute =
    pathname === "/job" ||
    pathname.startsWith("/job");

  /*
   * Customer dashboard:
   *
   * /dashboard
   * /dashboard/*
   *
   * BUT exclude /dashboard/employee/*
   */
  const isCustomerRoute =
    pathname === "/dashboard" ||
    (
      pathname.startsWith("/dashboard/") &&
      !isEmployeeRoute
    );

  /*
   * Anything under /dashboard requires authentication.
   */
  const isDashboardRoute =
    isCustomerRoute || isEmployeeRoute;

  if (isDashboardRoute && !user) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "redirect",
      pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  /*
   * If authenticated, determine whether this
   * account belongs to an employee.
   */
  let isEmployee = false;

  if (user) {
    const { data: employee } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    isEmployee = !!employee;
  }

  /*
   * EMPLOYEE trying to access CUSTOMER dashboard
   *
   * /dashboard
   * /dashboard/referrals
   * /dashboard/settings
   * etc.
   */
  if (isCustomerRoute && isEmployee) {
    return NextResponse.redirect(
      new URL("/job", request.url)
    );
  }

  /*
   * CUSTOMER trying to access EMPLOYEE dashboard
   */
  if (isEmployeeRoute && !isEmployee) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};