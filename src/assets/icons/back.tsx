import React from 'react';

type BackIconProps = {
  className: string;
};

const BackIcon: React.FC<BackIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14 4h3.5c3.058 0 3 4 3 8s.058 8-3 8H14M3 12h12M3 12l4-4m-4 4 4 4"
        />
      </svg>
    </div>
  );
};

export default BackIcon;
