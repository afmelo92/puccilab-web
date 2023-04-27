import React from 'react';

type RefreshIconProps = {
  className: string;
};

const RefreshIcon: React.FC<RefreshIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 3v6m0 0h6M3 9c2.327-2.089 4.483-4.453 7.745-4.912a9.001 9.001 0 0 1 9.469 5.234M21 21v-6m0 0h-6m6 0c-2.328 2.089-4.483 4.453-7.745 4.912a9.001 9.001 0 0 1-9.469-5.234"
        />
      </svg>
    </div>
  );
};

export default RefreshIcon;
