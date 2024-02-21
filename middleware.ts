import {
  NextRequestWithAuth,
  withAuth,
  NextAuthMiddlewareOptions,
} from 'next-auth/middleware'

const middleware = async (req: NextRequestWithAuth): Promise<void> => {
  console.log('authorized')
}

export default withAuth(middleware, {
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires is_superuser
      if (req.nextUrl.pathname === '/admin') {
        return token?.is_superuser
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
} as NextAuthMiddlewareOptions)

export const config = { matcher: ['/admin', '/me'] }
