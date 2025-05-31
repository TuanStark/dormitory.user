import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Hàm để lấy thời gian hết hạn từ JWT token
function getJwtExpiration(token: string): number {
  try {
    // JWT token có cấu trúc: header.payload.signature
    const payload = token.split('.')[1];
    // Giải mã base64
    const decodedPayload = Buffer.from(payload, 'base64').toString();
    // Parse JSON
    const { exp } = JSON.parse(decodedPayload);
    return exp;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    // Trả về thời gian mặc định (1 giờ từ hiện tại)
    return Math.floor(Date.now() / 1000) + 3600;
  }
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
      authorize: async (credentials) => {
        try {
          const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log('Authorize: Response status', response.status);
          
          const responseData = await response.json();
          console.log('Authorize: Response from API', responseData);

          if (!response.ok) {
            console.log('Authorize: Authentication failed', responseData);
            throw new Error(responseData?.message || 'Đăng nhập thất bại');
          }

          const tokens = responseData?.data || {};
          
          if (!tokens.accessToken) {
            console.log('Authorize: No access token in response');
            throw new Error('Không tìm thấy token đăng nhập');
          }

          const accessToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          const accessTokenExpires = getJwtExpiration(accessToken);

          // Lấy thông tin người dùng từ API
          // console.log('Authorize: Fetching user info with token', accessToken.substring(0, 20) + '...');
          
          try {
            const userInfoResponse = await fetch(`http://localhost:8000/users/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            });
            
            console.log('Authorize: User info response status', userInfoResponse.status);
            
            let userId = String(Date.now());
            let userName = '';
            let userEmail = credentials?.email || '';
            let userImage = '';
            
            if (userInfoResponse.ok) {
              const userInfo = await userInfoResponse.json();
              console.log('Authorize: User info from API', userInfo);
              
              // Trích xuất dữ liệu từ cấu trúc phản hồi
              const userData = userInfo?.data || {};
              console.log(userData);
              
              // Kiểm tra lỗi từ API
              if (userData.name === 'PrismaClientValidationError' || userInfo.statusCode >= 400) {
                console.error('Authorize: API returned error', userInfo);
                // Sử dụng thông tin cơ bản từ credentials
                userName = credentials?.email?.split('@')[0] || 'Người dùng';
                userEmail = credentials?.email || '';
              } else {
                userId = userData.id?.toString() || userId;
                userName = userData.fullName || userData.name || userName;
                userEmail = userData.email || userEmail;
                userImage = userData.avatar || '';
              }
              
              console.log('Authorize: Extracted user data', { userId, userName, userEmail });
            } else {
              console.log('Authorize: Failed to fetch user info, using default values');
              userName = credentials?.email?.split('@')[0] || 'Người dùng';
            }

            console.log('Authorize: Authentication successful', { 
              userId,
              userName,
              userEmail,
              accessTokenExpires: new Date(accessTokenExpires * 1000).toISOString() 
            });

            return {
              id: userId,
              name: userName,
              email: userEmail,
              image: userImage,
              accessToken,
              refreshToken,
              accessTokenExpires,
            };
          } catch (error) {
            console.error('Authorize: Error fetching user info', error);
            
            // Trả về thông tin cơ bản nếu không lấy được thông tin người dùng
            return {
              id: String(Date.now()),
              email: credentials?.email || '',
              accessToken,
              refreshToken,
              accessTokenExpires,
            };
          }
        } catch (error) {
          console.error('Authorize: Error during authentication', error);
          throw error;
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
    async signIn({ account, profile, user, credentials }) {
      if (credentials) {
        return true;
      }

      if (account && profile) {
        try {
          console.log(`SignIn: ${account.provider} authentication`, {
            provider: account.provider,
            email: profile?.email,
          });

          const response = await fetch(`http://localhost:8000/auth/${account.provider}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: account.access_token,
              email: profile?.email,
              name: profile?.name,
            }),
          });

          const responseData = await response.json();

          if (!response.ok) {
            return false;
          }

          const tokens = responseData?.data || {};

          if (!tokens.accessToken) {
            console.error(`SignIn: No access token in ${account.provider} response`);
            return false;
          }

          // Lấy thông tin người dùng từ API
          console.log(`SignIn: Fetching user info with token`, tokens.accessToken.substring(0, 20) + '...');
          
          try {
            const userInfoResponse = await fetch(`http://localhost:8000/users/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${tokens.accessToken}`,
                'Content-Type': 'application/json',
              },
            });
            
            console.log(`SignIn: User info response status`, userInfoResponse.status);

            let userId = account.providerAccountId;
            let userName = profile?.name || 'Người dùng';
            let userEmail = profile?.email || '';
            let userImage = profile?.image || '';
            
            if (userInfoResponse.ok) {
              const userInfo = await userInfoResponse.json();
              console.log(`SignIn: User info from API`, userInfo);
              
              // Trích xuất dữ liệu từ cấu trúc phản hồi
              const userData = userInfo?.data || {};
              
              // Kiểm tra lỗi từ API
              if (userData.name === 'PrismaClientValidationError' || userInfo.statusCode >= 400) {
                console.error('SignIn: API returned error', userInfo);
                // Sử dụng thông tin từ profile
                userId = account.providerAccountId;
                userName = profile?.name || 'Người dùng';
                userEmail = profile?.email || '';
              } else {
                userId = userData.id?.toString() || userId;
                userName = userData.fullName || userData.name || userName;
                userEmail = userData.email || userEmail;
                userImage = userData.avatar || userImage;
              }
              
              console.log(`SignIn: Extracted user data`, { userId, userName, userEmail });
              
              // Cập nhật thông tin user
              user.id = userId;
              user.name = userName;
              user.email = userEmail;
              user.image = userImage;
            } else {
              console.log(`SignIn: Failed to fetch user info, using profile values`);
            }

            const accessTokenExpires = getJwtExpiration(tokens.accessToken);

            user.accessToken = tokens.accessToken;
            user.refreshToken = tokens.refreshToken;
            user.accessTokenExpires = accessTokenExpires;

            console.log(`SignIn: ${account.provider} authentication successful`, {
              userId,
              userName,
              userEmail,
              accessTokenExpires: new Date(accessTokenExpires * 1000).toISOString(),
            });

            return true;
          } catch (error) {
            console.error(`SignIn: Error fetching user info`, error);
            
            // Vẫn cho phép đăng nhập nhưng với thông tin từ profile
            user.accessToken = tokens.accessToken;
            user.refreshToken = tokens.refreshToken;
            user.accessTokenExpires = getJwtExpiration(tokens.accessToken);
            
            return true;
          }
        } catch (error) {
          console.error(`SignIn: Error during ${account.provider} authentication`, error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        console.log("JWT: Initial sign in", { 
          provider: account.provider,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
        });
        
        // Đảm bảo token.id được set đúng từ user.id
        if (!token.id && user.id) {
          token.id = user.id;
        }
        
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires * 1000) {
        console.log("JWT: Token still valid", {
          expiry: new Date(token.accessTokenExpires * 1000).toISOString(),
          now: new Date().toISOString(),
        });
        return token;
      }

      console.log("JWT: Token expired, refreshing");
      try {
        const response = await fetch("http://localhost:8000/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken as string,
          }),
        });

        const responseData = await response.json();
        console.log("JWT: Refresh token response", responseData);

        if (!response.ok) {
          console.error("JWT: Failed to refresh token", responseData);
          return { ...token, error: "RefreshAccessTokenError" };
        }

        const tokens = responseData?.data || {};
        
        if (!tokens.accessToken) {
          console.error("JWT: No access token in refresh response");
          return { ...token, error: "RefreshAccessTokenError" };
        }

        const accessTokenExpires = getJwtExpiration(tokens.accessToken);

        console.log("JWT: Token refreshed successfully", {
          expiry: new Date(accessTokenExpires * 1000).toISOString(),
        });

        return {
          ...token,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken || token.refreshToken,
          accessTokenExpires,
        };
      } catch (error) {
        console.error("JWT: Error refreshing token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      if (session.user) {
        console.log("Session: Creating session for user", { 
          id: token.id,
          name: token.name,
          email: token.email,
        });
        
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string || session.user.name,
          email: token.email as string || session.user.email,
          image: token.image as string || session.user.image || '/default-avatar.png',
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          accessTokenExpires: token.accessTokenExpires as number || undefined,
        };
        
        console.log("Session: Session created successfully");
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };