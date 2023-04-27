import Icon from '@/utils/getIcon';
import Link from 'next/link';
import React from 'react';
import TreatmentsList from './components/TreatmentsList';

const Treatments: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        id="header"
        className="bg-pucci-300 w-full h-16 rounded flex items-center justify-between px-4"
      >
        <p title="Pedidos" className="text-lg text-white font-semibold">
          Tratamentos
        </p>
        <Link
          title="Novo Tratamento"
          href="/dashboard/treatments/new"
          type="button"
          className="flex items-center justify-center gap-2 bg-pucci-100 text-sm font-bold px-4 py-2 rounded hover:bg-pucci-500 transition-colors"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          Novo Tratamento
        </Link>
      </div>
      <TreatmentsList />
    </div>
  );
};

export default Treatments;
