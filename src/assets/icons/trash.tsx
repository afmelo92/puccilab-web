import React from 'react';

type TrashIconProps = {
  className: string;
};

const TrashIcon: React.FC<TrashIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14 9.5s.5 1 .5 3-.5 3-.5 3m-4-6s-.5 1-.5 3 .5 3 .5 3M6 6c0 5.859-1.369 14 6 14s6-8.141 6-14M4 6h16m-5 0V5c0-1.775-1.637-2-3-2s-3 .225-3 2v1"
        />
      </svg>
    </div>
  );
};

export default TrashIcon;
