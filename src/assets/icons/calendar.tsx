import React from 'react';

type CalendarIconProps = {
  className: string;
};

const CalendarIcon: React.FC<CalendarIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 2.5v4m-6-4v4m11.483 5H3.517m16.966 0C20.274 5.793 18.154 4 12 4s-8.274 1.793-8.483 7.5m16.966 0c.011.32.017.654.017 1 0 6.5-2 8.5-8.5 8.5s-8.5-2-8.5-8.5c0-.346.006-.68.017-1"
        />
      </svg>
    </div>
  );
};

export default CalendarIcon;
