'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LogoutButton from './components/LogoutButton';
import Sidebar from './components/Sidebar';
import UserGreeting from './components/UserGreeting';
import Icon from '@/utils/getIcon';
import ToastContainer from '../components/Toast/Container';

type DashboardLayoutProps = {
  children: React.ReactNode;
  session: Session;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  session,
}) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <section className="overflow-hidden w-full h-screen grid grid-cols-1 grid-rows-[64px_1fr]">
          <div
            id="app-header"
            className="grid grid-cols-1 lg:grid-cols-[200px_minmax(600px,_1fr)] bg-pucci-500"
          >
            <div
              id="logo"
              className="w-full hidden lg:flex items-center pl-2 lg:pl-0 justify-start lg:justify-center font-bold"
            >
              <Icon
                name="logo-simple"
                className="stroke-white stroke-1 fill-white w-6 h-6 -translate-y-1"
              />
            </div>
            <nav id="navigation" className="flex justify-end pr-2 w-full">
              <div id="user-area" className="flex max-w-fit items-center gap-2">
                <UserGreeting />
                <LogoutButton />
              </div>
            </nav>
          </div>
          <div
            id="app-body"
            className="overflow-y-auto grid grid-cols-1 lg:grid-cols-[180px_minmax(600px,_1fr)]"
          >
            <Sidebar />
            <div
              id="main"
              className="overflow-y-auto w-full mx-auto flex bg-puccWhite p-4"
            >
              {children}
            </div>
          </div>
        </section>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
