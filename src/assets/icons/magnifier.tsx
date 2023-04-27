import React from 'react';

type MagnifierIconProps = {
  className: string;
};

const MagnifierIcon: React.FC<MagnifierIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m20 20-4.197-4.197M18 10.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Z"
        />
      </svg>
    </div>
  );
};

export default MagnifierIcon;
