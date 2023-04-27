import React from 'react';
import Link from 'next/link';
import OrderList from './components/OrderList';
import Icon from '@/utils/getIcon';

const Order: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        id="header"
        className="bg-pucci-300 w-full h-16 rounded flex items-center justify-between px-4"
      >
        <p title="Pedidos" className="text-lg text-white font-semibold">
          Pedidos
        </p>
        <Link
          title="Novo pedido"
          href="/dashboard/orders/new"
          type="button"
          className="flex items-center justify-center gap-2 bg-pucci-100 text-sm font-bold px-4 py-2 rounded hover:bg-pucci-500 transition-colors"
        >
          <Icon name="add-circle" className="w-5 h-5" />
          Novo Pedido
        </Link>
      </div>
      <OrderList />
    </div>
  );
};

export default Order;
