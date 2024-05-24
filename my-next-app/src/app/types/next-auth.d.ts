import { DefaultSession } from 'next-auth'
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module 'next-auth' {
    interface Session extends DefaultSession {
      user: {
        name: string
        id: string
        email: string
        role: string
      }
    }

    interface User {
        id: string
        name: string
        email: string
        role: string
    }
  }

  declare module 'next-auth/jwt' {
    interface JWT {
      id: string
      name: string
      email: string
      role: string
    }
  }
