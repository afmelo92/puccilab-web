import React from 'react';

type UsersIconProps = {
  className: string;
};

const UsersIcon: React.FC<UsersIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-white fill-none"
      >
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 14c2.21 0 4 2 4 3.5a1.5 1.5 0 0 1-1.5 1.5H21m-4-8a3 3 0 1 0 0-6M5 14c-2.21 0-4 2-4 3.5A1.5 1.5 0 0 0 2.5 19H3m4-8a3 3 0 0 1 0-6m9.5 14h-9A1.5 1.5 0 0 1 6 17.5C6 15 9 14 12 14s6 1 6 3.5a1.5 1.5 0 0 1-1.5 1.5ZM15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
  );
};

export default UsersIcon;
