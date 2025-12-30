import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // If user tries to access protected route, redirect to home (where they can open login modal)
  },
});

export const config = {
  // Define which routes REQUIRE the user to be logged in
  matcher: [
    "/api/checkout",   // Block direct access to checkout API
    "/success",        // Only allow success page if logged in
  ],
};