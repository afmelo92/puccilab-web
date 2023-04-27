import React from 'react';

import ProfileForm from './components/ProfileForm';

export default async function Profile() {
  return (
    <div className="w-full grid grid-col-1 grid-rows-[64px_1fr] relative">
      <div
        id="header"
        className="bg-pucci-300 w-full rounded flex items-center p-4 sticky top-0 z-10"
      >
        <p className="text-xl text-white font-semibold">Perfil</p>
      </div>
      <div className="w-full grid grid-cols-1 grid-rows-1 pt-4">
        <ProfileForm />
      </div>
    </div>
  );
}
