import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from './connect'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth"

export const authOptions = {
      adapter: PrismaAdapter(prisma),
  providers: [
 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
   debug: process.env.NODE_ENV === "development",// ✅ Important for JWT sessions
}

export const getAuthSession=()=>getServerSession(authOptions)