'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/utils/getIcon';
import { useSession } from 'next-auth/react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav id="sidebar" className="hidden lg:flex flex-col w-full bg-pucci-500">
      {session?.menu.map((item) => (
        <Link
          key={item.uid}
          href={item.href}
          className={`px-4 py-3 hover:bg-pucci-700 transition-colors flex gap-3 items-center text-xs ${
            pathname === item.href
              ? 'bg-pucci-700'
              : pathname?.includes(item.href) && item.href !== '/dashboard'
              ? 'bg-pucci-700'
              : ''
          }`}
        >
          <Icon name={item.icon} className="h-5 w-5 stroke-white" />
          <p>{item.title}</p>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
