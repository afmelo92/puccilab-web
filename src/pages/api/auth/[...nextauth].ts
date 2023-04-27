import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

type LoginProps = {
  email: string;
  password: string;
};

type SessionMenuProps = {
  href: string;
  icon: string;
  title: string;
  uid: string;
}[];

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'Insira seu e-mail',
        },
        password: {
          label: 'Senha',
          type: 'password',
          placeholder: 'Insira sua senha',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as LoginProps;

        const response = await fetch('http://localhost:3333/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const parsed = await response.json();

        const { user, token } = parsed.data;

        if (response.ok && user && token) {
          return { accessToken: token, ...user };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  pages: {
    signIn: '/signin',
    newUser: '/dashboard',
  },
  secret: 'default',
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;
      session.menu = token.menu as SessionMenuProps;

      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;

        if (user.accessToken) {
          const menuResponse = await fetch(`http://localhost:3333/menus`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });

          const parsedMenuResponse = await menuResponse.json();

          if (menuResponse.ok) {
            token.menu = parsedMenuResponse.data;
          } else {
            token.menu = [];
          }
        }
      }

      return Promise.resolve(token);
    },
  },
};
export default NextAuth(authOptions);
