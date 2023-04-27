import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const UserGreeting: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Link
      href="/dashboard/profile"
      id="user-info"
      className="flex gap-2 items-center hover:bg-pucci-300 transition-colors cursor-pointer rounded p-2"
    >
      <div id="user-greeting" className="flex flex-col">
        <p className="max-w-fit text-xs">Bem-vindo,</p>
        <strong className="text-sm">{session?.user.name}</strong>
      </div>
      <div id="avatar" className="h-10 w-10 rounded-full relative">
        <Image
          src={'/google_default_user.png'}
          fill
          alt={session?.user.name || 'user'}
          className="rounded-full"
          priority
          sizes="40px"
        />
      </div>
    </Link>
  );
};

export default UserGreeting;
