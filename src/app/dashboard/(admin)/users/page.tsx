import React from 'react';
import CustomerList from './components/UsersList';

export type User = {
  uid: string;
  name: string;
  email: string;
  active: boolean;
  address: string;
  clinic: string;
  cnpj: string | null;
  cro: string;
  phone: string;
};

const Users: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        id="header"
        className="bg-purple-700 w-full h-16 rounded flex items-center justify-between px-4"
      >
        <p title="Clientes" className="text-xl text-white font-semibold">
          Usuários
        </p>
      </div>
      <CustomerList />
    </div>
  );
};

export default Users;
