import React from 'react';
import { signOut } from 'next-auth/react';

const Button: React.FC = () => {
  function handleLogout() {
    return signOut({
      redirect: true,
      callbackUrl: '/signin',
    });
  }

  return (
    <button
      type="button"
      onClick={() => handleLogout()}
      className="bg-red-500 px-4 py-2 rounded font-bold hover:bg-red-900 transition-colors"
    >
      Logout
    </button>
  );
};

export default Button;
