import Link from 'next/link';
import React from 'react';
import NewOrderForm from '@/app/dashboard/orders/components/NewOrderForm';
import Icon from '@/utils/getIcon';

const NewOrder: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div
        id="header"
        className="bg-pucci-500 w-full h-16 rounded flex items-center gap-4 p-4 sticky top-0"
      >
        <Link href="/dashboard/orders" title="Voltar aos pedidos">
          <Icon
            name="back"
            className="w-8 h-8 p-1 rounded stroke-white hover:bg-pucci-300 transition-colors"
          />
        </Link>
        <p className="text-lg text-white font-semibold z-20">Novo Pedido</p>
      </div>
      <NewOrderForm />
    </div>
  );
};

export default NewOrder;
