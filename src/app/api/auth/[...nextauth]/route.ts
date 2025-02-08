import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth({
  ...authOptions,
  session: {
    ...authOptions.session,
    maxAge: 24 * 60 * 60,
  },
});

export { handler as GET, handler as POST };
