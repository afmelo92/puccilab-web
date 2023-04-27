import React from 'react';

type HamburgerMenuProps = {
  className: string;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 17h16M4 12h16M4 7h16"
        />
      </svg>
    </div>
  );
};

export default HamburgerMenu;
