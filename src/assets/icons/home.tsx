import React from 'react';

type HomeIconProps = {
  className: string;
};

const HomeIcon: React.FC<HomeIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="stroke-white fill-none"
      >
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6.5 7c1.461-1.461 3.094-2.581 4.197-3.26a2.474 2.474 0 0 1 2.605 0C14.406 4.42 16.04 5.54 17.5 7c3.168 3.168 3 5 3 8 0 1.41-.11 2.599-.227 3.463-.124.91-.917 1.537-1.835 1.537H17a2 2 0 0 1-2-2v-2a3 3 0 0 0-6 0v2a2 2 0 0 1-2 2H5.562c-.918 0-1.711-.627-1.835-1.537A25.992 25.992 0 0 1 3.5 15c0-3-.168-4.832 3-8Z"
        />
      </svg>
    </div>
  );
};

export default HomeIcon;
