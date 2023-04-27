import React from 'react';

type ToothIconProps = {
  className: string;
};

const ToothIcon: React.FC<ToothIconProps> = ({ className = '' }) => {
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
          d="M9.198 4.458C8.554 4.223 7.944 4 7 4 5 4 4 6 4 8.5c0 1.598.409 2.584.834 3.61.24.578.486 1.169.666 1.89.149.596.21 1.458.273 2.375C5.924 18.537 6.096 21 7.5 21c.899 0 1.293-1.414 1.727-2.971C9.757 16.12 10.348 14 12 14c1.652 0 2.242 2.121 2.774 4.029C15.207 19.586 15.6 21 16.5 21c1.404 0 1.576-2.464 1.727-4.625.064-.917.124-1.779.273-2.375.18-.721.426-1.312.666-1.89.425-1.026.834-2.011.834-3.61C20 6 19 4 17 4c-.944 0-1.554.223-2.198.458C14.082 4.721 13.32 5 12 5s-2.082-.279-2.802-.542Z"
        />
      </svg>
    </div>
  );
};

export default ToothIcon;
