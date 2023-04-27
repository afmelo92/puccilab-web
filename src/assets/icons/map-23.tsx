import React from 'react';

type Map23Props = {
  className: string;
};

const Map23: React.FC<Map23Props> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="current"
      viewBox="0 0 19 64"
      className={className}
    >
      <path
        stroke="current"
        strokeWidth="2"
        d="m7.946 16.942-.007.02-.012.055a104.759 104.759 0 0 0-.285 1.248c-.187.838-.445 2.011-.723 3.348-.558 2.68-1.195 5.994-1.526 8.593-.26 2.03-.285 3.675-.31 5.332l-.01.579c-.03 1.858-.098 3.761-.547 6.155-.42 2.235-1.253 4.99-1.968 7.158a114.24 114.24 0 0 1-1.31 3.74 13.542 13.542 0 0 0-.1.61 14.77 14.77 0 0 0-.144 1.67c-.017.648.016 1.321.139 1.925.123.612.324 1.081.588 1.391.348.409.69.636 1.11.846.178.09.357.17.568.264l.184.083c.284.129.602.277.946.466.492.27.92.549 1.299.802l.19.127c.306.206.572.385.845.546.618.365 1.204.601 2.026.632.902.034 1.559-.188 2.246-.56a17.74 17.74 0 0 0 1.09-.665l.055-.035c.416-.266.882-.563 1.413-.85.762-.413 1.714-1.032 2.493-1.563a61.36 61.36 0 0 0 1.104-.77 12.502 12.502 0 0 0 .525-2.056c.24-1.44.315-3.377-.313-5.417-.488-1.586-.925-2.778-1.297-3.793a88.08 88.08 0 0 1-.406-1.123c-.44-1.254-.743-2.326-.743-3.612 0-.472-.147-1.718-.392-3.478a546.772 546.772 0 0 0-.727-4.956l-.156-1.047a376.691 376.691 0 0 1-.888-6.19c-.239-1.821-.41-3.38-.41-4.23 0-.957.16-3.05.35-5.56.126-1.644.264-3.466.381-5.269.15-2.31.266-4.614.282-6.548a32.858 32.858 0 0 0-.07-2.713c-.678 1.31-1.5 3.337-2.308 5.514a196.05 196.05 0 0 0-2.224 6.373 241.945 241.945 0 0 0-.907 2.795l-.051.163ZM13.203.637c0 .001.002.01.01.024a.09.09 0 0 0-.01-.024Z"
      />
      <path
        stroke="current"
        d="M15.552 42.26s-2.765-1.104-4.632-1.373c-2.524-.365-6.52.343-6.52.343"
      />
    </svg>
  );
};

export default Map23;