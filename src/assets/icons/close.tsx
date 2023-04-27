import React from 'react';

type CloseIconProps = {
  className: string;
};

const CloseIcon: React.FC<CloseIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m16 8-8 8m0-8 8 8"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
