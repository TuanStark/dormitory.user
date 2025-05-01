import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Define our custom user interface
interface CustomUser {
  id: string;
  email: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
}

// Extend the NextAuth types to include our custom properties
declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
         // console.log("Authorize: Missing email or password");
          return null;
        }

        try {
          // console.log("Authorize: Sending request to NestJS API", {
          //   email: credentials.email,
          //   url: `${process.env.NESTJS_API_URL}/auth/login`,
          // });

          const response = await fetch(`${process.env.NESTJS_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          // console.log("Authorize: Response from NestJS API", {
          //   status: response.status,
          //   data,
          // });

          if (!response.ok || !data.accessToken) {
            //console.log("Authorize: Authentication failed", { data });
            return null;
          }

          const user = {
            id: data.id.toString(), // Chuyển number thành string
            email: data.email,
            name: data.name || data.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          } as CustomUser;
          //console.log("Authorize: User authenticated", user);
          return user;
        } catch (error) {
          //console.error("Authorize: Error authenticating with NestJS API", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      //console.log("SignIn Callback: Processing sign-in", {
      //  provider: account?.provider,
      //  user,
      //  account,
      //  profile,
      //  nestjsApiUrl: process.env.NESTJS_API_URL,
     // });

      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          // console.log(`SignIn Callback: Syncing ${account.provider} user with NestJS API`, {
          //   email: user.email,
          //   name: user.name,
          //   providerId: account.providerAccountId,
          // });

          const response = await fetch(`${process.env.NESTJS_API_URL}/auth/${account.provider}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              [account.provider === "google" ? "googleId" : "facebookId"]: account.providerAccountId,
            }),
          });

          const data = await response.json();
          console.log(`SignIn Callback: Response from NestJS ${account.provider} API`, {
            status: response.status,
            data,
          });

          // Xử lý cấu trúc bọc { data: {...} }
          const userData = data.data || data;

          if (!response.ok || !userData.accessToken) {
            //console.log(`SignIn Callback: Failed to sync ${account.provider} user`, { data });
            return false;
          }

          user.id = userData.id?.toString() || userData.sub?.toString();
          user.accessToken = userData.accessToken;
          user.refreshToken = userData.refreshToken;
          //console.log(`SignIn Callback: ${account.provider} user synced`, { user });
        } catch (error: any) {
          // console.error(`SignIn Callback: Error syncing ${account.provider} user with NestJS`, {
          //   error: error.message,
          //   cause: error.cause,
          //   stack: error.stack,
          // });
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      //console.log("JWT Callback: Processing token", { token, user });
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        //console.log("JWT Callback: Updated token with user data", { token });
      }
      return token;
    },
    async session({ session, token }) {
     // console.log("Session Callback: Processing session", { session, token });
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        } as CustomUser;
        //console.log("Session Callback: Updated session", { session });
      }
      //console.log("Session Callback: Final session", { session });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };