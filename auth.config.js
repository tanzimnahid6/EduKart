export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
  secret: process.env.NEXT_AUTH_SECRET,
};
