import { IconNames } from '@/utils/getIcon';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface User {
    id: string;
    accessToken: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    cro: string | null;
    cnpj: string | null;
    clinic: string | null;
    role: string;
  }

  export interface Session {
    user: User & DefaultSession['user'];
    menu: {
      href: string;
      icon: IconNames;
      title: string;
      uid: string;
    }[];
  }
}
