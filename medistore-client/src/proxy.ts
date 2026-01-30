import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./constants/role.const";
import { userService } from "./services/user.service";

const customer_allowed_routes = ["/profile", "/my-orders", "/my-account"];

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const { success, data } = await userService.getUserSession();

  if (!success || !data) {
    return NextResponse.redirect(new URL("/sing-in", origin));
  }

  const is_customer_route = customer_allowed_routes.some((route) =>
    pathname.startsWith(route),
  );
  const is_customer = data.user.role === UserRole.customer;

  if (is_customer_route && !is_customer) {
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
  ],
};
