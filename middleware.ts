import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // matcher: [
    //     "/dashboard/:path*",
    //     "/invoices/:path*",
    //     "/customers/:path*",
    //     "/products/:path*",
    //     "/settings/:path*",
    //     "/profile/:path*",
    //     "/login",
    // ],
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}