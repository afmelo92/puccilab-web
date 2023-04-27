import React from 'react';

type AddCircleIconProps = {
  className: string;
};

const AddCircleIcon: React.FC<AddCircleIconProps> = ({ className = '' }) => {
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
          d="M12 7v10m-5-5h10m4 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
};

export default AddCircleIcon;
