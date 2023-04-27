import Icon from '@/utils/getIcon';
import Link from 'next/link';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-5 gap-2">
      <div className="w-full col-span-3 bg-white rounded shadow-sm shadow-gray-500 flex flex-col justify-between">
        <Link
          href="/dashboard/treatments/new"
          className="bg-pucci-500 py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          <p>Novo Tratamento</p>
        </Link>

        <Link
          href="/dashboard/appointments/new"
          className="bg-pucci-500 py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          <p>Novo Agendamento</p>
        </Link>

        <Link
          href="/dashboard/orders/new"
          className="bg-pucci-500 py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          <p>Nova Prótese</p>
        </Link>
      </div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
      <div className="w-full row-span-2 bg-pucci-50 rounded"></div>
    </div>
  );
};

export default Dashboard;
