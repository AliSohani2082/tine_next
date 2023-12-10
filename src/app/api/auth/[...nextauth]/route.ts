import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import { RequestInternal } from "next-auth";

interface Token {
  access: string;
  refresh: string;
  exp: number;
}

async function refreshAccessToken(token: Token) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: token.refresh }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedToken = await response.json();
    if (response.status !== 200) throw refreshedToken;

    const { exp } = jwtDecode(refreshedToken.access);

    return {
      ...token,
      ...refreshedToken,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

interface Credentials {
  username: string;
  password: string;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Django Rest Framework",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },

      // Explicitly cast the credentials parameter to the expected type
      authorize: async function (
        credentials: Record<"username" | "password", string> | undefined,
        req: Pick<RequestInternal, "method" | "body" | "query" | "headers">
      ) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const token = await response.json();
          if (response.status !== 200) throw token;

          const { username, email, user_id, exp, is_superuser, is_staff } =
            jwtDecode(token.access) as any;

          return {
            ...token,
            exp,
            user: {
              username,
              email,
              user_id,
              is_staff,
              is_superuser,
            },
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: any;
      user: any;
      account: any;
      profile: any;
      isNewUser: any;
    }) {
      // initial signin
      if (account && user) {
        return user;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * 1000) {
        return token;
      }

      // refresh token
      return refreshAccessToken(token);
    },
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      session.user = token.user;
      session.access = token.access;
      session.refresh = token.refresh;
      session.exp = token.exp;
      return session;
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
