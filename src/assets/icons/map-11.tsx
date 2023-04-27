import React from 'react';

type Map11Props = {
  className: string;
};

const Map11: React.FC<Map11Props> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="current"
      viewBox="0 0 24 66"
      className={className}
    >
      <path
        stroke="current"
        strokeWidth="2"
        d="M6.342 21.445c.247-2.994-2.199-20.647 0-20.443 2.2.204 4.956 8.675 6.897 14.72 1.733 5.392.998 6.226 2.843 14.222 1.835 7.948 5.707 12.636 5.911 15.49.204 2.853 2.446 17.528-.815 18.547-1.967.614-5.515 1.009-5.515 1.009H6.9s-4.1.204-4.846-1.227c-.746-1.43-1.492-6.746-.746-12.88.746-6.132 1.895-7.428 2.796-12.265.642-3.446 1.532-10.306 1.532-10.306s.586-5.427.705-6.867Z"
      />
      <path
        stroke="current"
        d="M3.242 42.579s5.52-1.903 9.172-1.835c3.34.063 8.356 1.835 8.356 1.835"
      />
    </svg>
  );
};

export default Map11;
