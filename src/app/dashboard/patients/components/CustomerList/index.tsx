'use client';

import React from 'react';
import Link from 'next/link';

const data = [
  {
    id: 1,
    name: 'Hudson Silva',
    orders: 198,
    status: 'Confirmado',
    created_at: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 2,
    name: 'Percival Moreira',
    orders: 15,
    status: 'Enviado',
    created_at: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 3,
    name: 'Julia Santos',
    orders: 78,
    status: 'Cancelado',
    created_at: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 4,
    name: 'Adriana Calcanhoto',
    orders: 45,
    status: 'Atrasado',
    created_at: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 5,
    name: 'Vladimir Putin',
    orders: 117,
    status: 'Entregue',
    created_at: new Date().toLocaleDateString('pt-BR'),
  },
];

const CustomerList: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div
        id="list-header"
        className="grid grid-cols-[3fr_4fr_1fr_1fr] lg:grid-cols-[64px_3fr_1fr_1fr_1fr_1fr] text-purple-700"
      >
        <strong className="hidden lg:flex text-center items-center justify-center">
          Id
        </strong>
        <strong className="text-center w-full flex items-center justify-center">
          Nome
        </strong>
        <strong className="text-center w-full flex items-center justify-center">
          Pedidos
        </strong>
        <strong className="text-center flex items-center justify-center">
          Status
        </strong>
        <strong className="hidden lg:flex text-center items-center justify-center">
          Data de cadastro
        </strong>
        <strong className="text-center flex items-center justify-center">
          Opções
        </strong>
      </div>

      {data &&
        data.map((item) => (
          <div
            id="row"
            className="bg-purple-100 text-slate-500 w-full h-16 rounded flex items-center"
            key={item.id}
          >
            <div
              id="list-item-1"
              className="w-full grid grid-cols-[3fr_4fr_1fr_1fr] lg:grid-cols-[64px_3fr_1fr_1fr_1fr_1fr] gap-1 items-center"
            >
              <strong
                title={`${item.id}`}
                className="hidden lg:flex text-center items-center justify-center"
              >
                {item.id}
              </strong>
              <strong
                title={item.name}
                className="text-center w-full flex items-center justify-center"
              >
                {item.name}
              </strong>
              <strong
                title={`${item.orders}`}
                className="text-center w-full flex items-center justify-center"
              >
                {item.orders}
              </strong>
              <strong
                title={item.status}
                className={`text-center ${
                  item.status === 'Confirmado'
                    ? 'bg-green-500'
                    : item.status === 'Enviado'
                    ? 'bg-blue-500'
                    : item.status === 'Cancelado'
                    ? 'bg-red-500'
                    : item.status === 'Atrasado'
                    ? 'bg-yellow-500'
                    : 'bg-purple-500'
                } py-1.5 h-fit flex w-3 lg:w-full justify-center items-center rounded-r-full rounded-l-full text-xs text-slate-200  mx-auto`}
              >
                <p className="hidden lg:block">{item.status}</p>
              </strong>
              <strong
                title={item.created_at}
                className="hidden text-center lg:flex items-center justify-center"
              >
                {item.created_at}
              </strong>
              <strong className="text-center flex items-center justify-center">
                <div
                  id="options"
                  className=" flex items-center justify-center gap-1"
                >
                  <Link
                    href={`/dashboard/orders/${item.id}/edit`}
                    id="edit-icon"
                    title="Visualizar ou Editar pedido"
                  >
                    <div className="w-6 h-6 stroke-lime-600 hover:stroke-lime-800 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="current"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.444 19.688h8.5m-6.5-14-8.998 8.998c-.659.659-1.179 1.458-1.337 2.376-.16.927-.213 2.077.335 2.625.549.549 1.699.496 2.626.336.918-.158 1.717-.678 2.376-1.337l8.998-8.999m-4-4s3-3 5-1-1 5-1 5m-4-4 4 4"
                        />
                      </svg>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/orders"
                    id="delete-icon"
                    title="Cancelar pedido"
                  >
                    <div className="w-6 h-6 stroke-red-500 hover:stroke-red-800 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="current"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M14 9.5s.5 1 .5 3-.5 3-.5 3m-4-6s-.5 1-.5 3 .5 3 .5 3M6 6c0 5.859-1.369 14 6 14s6-8.141 6-14M4 6h16m-5 0V5c0-1.775-1.637-2-3-2s-3 .225-3 2v1"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </strong>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CustomerList;
