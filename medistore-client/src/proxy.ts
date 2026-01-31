import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./constants/role.const";
import { userService } from "./services/user.service";

const customer_allowed_routes = ["/profile", "/my-orders", "/my-account"];

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const { success, data } = await userService.getUserSession();

  // checking session
  if (!success || !data) {
    return NextResponse.redirect(new URL("/sing-in", origin));
  }

  // checking customer routes
  const is_customer_route = customer_allowed_routes.some((route) =>
    pathname.startsWith(route),
  );
  const is_customer = data.user.role === UserRole.customer;

  if (is_customer_route && !is_customer) {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  // checking seller & admin routes
  const is_seller_or_admin_rute = pathname.startsWith("/dashboard");
  const is_seller_or_admin =
    data.user.role === UserRole.seller || data.user.role === UserRole.admin;

  if (is_seller_or_admin_rute && !is_seller_or_admin) {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // customer match
    "/profile",
    "/profile/:path*",
    "/my-orders",
    "/my-orders/:path*",
    "/my-account",
    "/my-account/:path*",

    // seller & admin match
    "/dashboard",
    "/dashboard/:path*",
  ],
};
