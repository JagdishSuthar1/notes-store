import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/helper/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user}) {

        const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email!,
          },
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
