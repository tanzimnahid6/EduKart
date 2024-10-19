import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import bcrypt from "bcrypt";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials?.password,
              user?.password
            );

            if (isMatch) {
              return user;
            } else {
              console.log("password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.log("user not found");
            throw new Error("User not found");
          }
        } catch (error) {}
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
});
