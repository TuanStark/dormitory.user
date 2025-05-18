import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Define custom user interface
interface CustomUser {
  id: string;
  email: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
  interface Session {
    user: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number;
    };
    expires: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
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
        console.log("Authorize: Starting credentials authorization", { email: credentials?.email });
        if (!credentials?.email || !credentials?.password) {
          console.error("Authorize: Missing email or password");
          return null;
        }

        try {
          console.log("Authorize: Sending request to", `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`);
          const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("Authorize: Response from NestJS API", {
            status: response.status,
            ok: response.ok,
            data,
          });

          if (!response.ok || !data.accessToken) {
            console.error("Authorize: Authentication failed", { status: response.status, data });
            return null;
          }

          // Giả sử backend trả về expiresIn (thời gian hết hạn tính bằng giây)
          const expiresIn = data.expiresIn || 3600; // Mặc định 1 giờ
          const accessTokenExpires = Date.now() + expiresIn * 1000;

          const user: CustomUser = {
            id: data.id.toString(),
            email: data.email,
            name: data.name || data.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpires,
          };
          console.log("Authorize: User authenticated", { user });
          return user;
        } catch (error) {
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
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/${account.provider}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              [account.provider === "google" ? "googleId" : "facebookId"]: account.providerAccountId,
            }),
          });

          const authData = await response.json();

          if (!response.ok || !authData.data?.accessToken) {
            return false;
          }

          let userData;

          try {
            if (account.provider === "google") {
              const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/google/${user.email}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authData.data.accessToken}`,
                },
              });
              userData = response.ok ? await response.json() : null;
            } else if (account.provider === "facebook") {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/facebook/${account.providerAccountId}`,
                {
                  method: "GET",
                  headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${authData.data.accessToken}` 
                  },
                }
              );
              userData = response.ok ? await response.json() : null;
            }
            
            // Thiết lập thông tin người dùng từ userData
            if (userData.data && userData.data.id) {
              user.id = userData.data.id.toString();
              user.email = userData.data.email || user.email;
              user.name = userData.data.fullName || user.name;
            } else {
              // Fallback nếu không có userData hoặc userData.id
              user.id = account.providerAccountId;
            }
          } catch (error) {
            user.id = account.providerAccountId;
          }

          // Thiết lập token
          user.accessToken = authData.data.accessToken;
          user.refreshToken = authData.data.refreshToken;
          
          // Thiết lập thời gian hết hạn token
          const expiresIn = authData.data.expiresIn || 86400; // Mặc định 24 giờ
          user.accessTokenExpires = Date.now() + expiresIn * 1000;

          return true;
        } catch (error) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Kiểm tra nếu token sắp hết hạn (trước 5 phút = 300 giây)
      const now = Date.now();
      const bufferTime = 5 * 60 * 1000; // 5 phút
      if (token.accessTokenExpires && now > token.accessTokenExpires - bufferTime) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          const refreshData = await response.json();
          if (!response.ok || !refreshData.data?.accessToken) {
            return token; // Giữ token cũ nếu refresh thất bại
          }

          // Cập nhật token
          token.accessToken = refreshData.data.accessToken;
          token.refreshToken = refreshData.data.refreshToken || token.refreshToken;
          token.accessTokenExpires = Date.now() + (refreshData.data.expiresIn || 3600) * 1000;
        } catch (error) {
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          accessTokenExpires: token.accessTokenExpires as number || undefined,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };