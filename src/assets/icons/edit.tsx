import React from 'react';

type EditIconProps = {
  className: string;
};

const EditIcon: React.FC<EditIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12.444 19.688h8.5m-6.5-14-8.998 8.998c-.659.659-1.179 1.458-1.337 2.376-.16.927-.213 2.077.335 2.625.549.549 1.699.496 2.626.336.918-.158 1.717-.678 2.376-1.337l8.998-8.999m-4-4s3-3 5-1-1 5-1 5m-4-4 4 4"
        />
      </svg>
    </div>
  );
};

export default EditIcon;
