import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";


import db from "../db/db";



export const authConfig: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await db.user.findFirst({
          where: { email: credentials.email.toLowerCase() },
          select:{
            id:true,
            email:true,
            password:true,
            rating:true,
            createdAt:true,
            updatedAt:true,
            name:true,
            role:true,
          },
        });


        if (dbUser && dbUser.password === credentials.password) {
          const { password, createdAt,updatedAt,rating, ...dbUserWithoutPassword } = dbUser;

          return dbUserWithoutPassword as User;
        }

        return null;
      },
    }),
  ],
    
  callbacks: {

    async jwt({token,user,session}){
      if(user){
        return{
          ...token,
          id:user.id,
          name:user.name,
          email:user.email,
          role:user.role,
        }
      }
      return token;
    },
    async session({session,user,token}){
      return {
        ...session,
        user:{
          email:token.email,
          name:token.name,
          role:token.role,
          id:token.id,
        }
      
      }
      }
    
  }
  
};



export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

/*
export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
*/