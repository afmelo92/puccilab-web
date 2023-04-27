import React from 'react';

type MedkitIconProps = {
  className: string;
};

const MedkitIcon: React.FC<MedkitIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.5 13h7M12 9.5v7M9 6.093A47.649 47.649 0 0 1 12 6c1.059 0 2.079.035 3 .093m-6 0s-3.667.296-4.111.685C4.543 7.08 4.198 8.792 4.06 11 4.022 11.633 4 12.307 4 13c0 3.111.444 5.833.889 6.222.444.39 3.555.778 7.111.778 3.556 0 6.667-.389 7.111-.778.445-.389.889-3.11.889-6.222 0-.693-.022-1.367-.061-2-.137-2.208-.483-3.92-.828-4.222-.444-.39-4.111-.685-4.111-.685m-6 0V5c0-1.775 1.637-2 3-2s3 .225 3 2v1.093"
        />
      </svg>
    </div>
  );
};

export default MedkitIcon;
