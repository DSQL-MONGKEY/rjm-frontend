import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
  }

  interface User {
    id: number;
    name: string;
    username: string
    email: string;
    roles_id: string;
    accessToken: string;
  }

  interface CredentialsInputs {
    username: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: number | string;
    name?: string;
    email?: string;
    accessToken: string;
    username?: string;
    roles_id?: number | string;
  }
}
