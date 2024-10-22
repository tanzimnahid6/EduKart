import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  trustedHosts: ["localhost:3000", "http://localhost:3000/api/auth/session"],
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isMatch = bcrypt.compare(
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
