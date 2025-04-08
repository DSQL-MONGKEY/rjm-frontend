import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';



const getUserData = async(credentials: any) => {
  try {
    const payload = {
      username: credentials.username,
      password: credentials.password
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload)
    });

    const { data }  = await res.json();
    
    if(res.ok && data?.user && data?.accessToken) {
      return data;
    }

    return null;
  } catch(error) {
    if(error instanceof Error) {
      throw new Error("Failed to fetch user: " + error.message);
    }
  }
}


const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
    }),

    CredentialProvider({
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'username'
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password'
        }
      },
      async authorize(credentials): Promise<any> {
        try {
          const data = await getUserData(credentials);
          
          console.log("======", data)
          if(data) {

            const { user, accessToken } = data;
            
            return {
              id: user.id,
              name: user.fullname,
              email: user.username + '@rjm.co.id',
              username: user.username,
              roles_id: user.roles_id,
              accessToken: accessToken,
            };
          
          } else {
            return null
          };

        } catch(err) {
          if(err instanceof Error) {
            throw new Error(`Login failed: ${err.message}`);
          }
        }
      }
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async authorized({ auth, request: { nextUrl } })  {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if(isOnDashboard) {
        if(isLoggedIn) return true
        return false
      } else if(isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if(user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.roles_id = user.roles_id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      console.log("===JWT: ", { token, user })
      return token;
    },

    async session({ session, token }) {
      console.log("INI SESSION TOKEN====", token);
      if(session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        (session.user as any).accessToken = token.accessToken;
      }
      console.log("===Session Callback: ",{ session, token });
      return session;
    } 
  },
  session: {
    strategy: "jwt",
    
  },
  cookies: {
    sessionToken: {
      name: 'next-auth-session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  pages: {
    signIn: '/', //sigin page
    error: '/'
  },
} satisfies NextAuthConfig;

export default authConfig;
