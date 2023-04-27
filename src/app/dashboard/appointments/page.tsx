import Icon from '@/utils/getIcon';
import Link from 'next/link';
import React from 'react';
import CustomerList from './components/CustomerList';

const Appintments: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        id="header"
        className="bg-purple-700 w-full h-16 rounded flex items-center justify-between px-4"
      >
        <p title="Clientes" className="text-xl text-white font-semibold">
          Agendamentos
        </p>
        <Link
          title="Novo pedido"
          href="/dashboard/orders/new"
          type="button"
          className="flex items-center justify-center gap-2 bg-purple-400 font-bold px-4 py-2 rounded hover:bg-purple-900 transition-colors"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          Novo Agendamento
        </Link>
      </div>
      <CustomerList />
    </div>
  );
};

export default Appintments;
