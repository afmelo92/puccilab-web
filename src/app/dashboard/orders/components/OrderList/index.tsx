'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { User } from '@/app/dashboard/(admin)/users/page';
import { MountedStatus, mountStatus } from '@/utils/mountStatus';
import Icon from '@/utils/getIcon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColorScale, ToothMapColorScale } from '../NewOrderForm/constants';
import { useForm } from 'react-hook-form';
import toast from '@/utils/toast';

export type Order = {
  id: number;
  uid: string;
  user_id: string;
  patient_name: string;
  patient_age: number;
  patient_phone: string;
  patient_sex: 'M' | 'F';
  product_id: string;
  deadline: string;
  deadline_period: 'M' | 'T';
  final_status: 'S' | 'N';
  prepare_color: ColorScale[number];
  final_color: ColorScale[number];
  gum_color: string;
  material: string;
  category: string;
  odgm: string[];
  map_a: Array<ToothMapColorScale[number]>;
  map_b: Array<ToothMapColorScale[number]>;
  antagonista: number;
  componentes: number;
  modelo_estudo: number;
  modelo_trabalho: number;
  moldeira: number;
  relacionamento_oclusao: number;
  outros: number;
  aditional_info: string | null;
  files: string[];
  status: number;
  formatted_status?: MountedStatus;
  user: User;
  product: {
    uid: string;
    title: string;
    description: string | null;
    materials: string[];
    category: string;
    price: number;
    active: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
};

type OrdersData = Order[];

const initialOffset = 10;

const OrderList: React.FC = () => {
  const { data: session } = useSession();
  const [pagination, setPagination] = useState({
    index: 0,
    offset: initialOffset,
  });

  const { data: ordersQueryData, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<OrdersData | []> => {
      const response = await fetch(`http://localhost:3333/orders`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }

      if (response.ok) {
        const parsed = await response.json();

        const parsedData = parsed.data;

        return parsedData.map((order: Order, index: number) => ({
          ...order,
          id: index + 1,
          formatted_status: mountStatus(order.status),
          deadline: new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
          }).format(new Date(order.deadline)),
        }));
      }

      return [];
    },
    initialData: [],
    onError: (err: Error) => {
      if (err.message === 'Unauthorized') {
        toast({
          duration: 5000,
          text: 'Oops! Você não tem permissão ou sua sessão expirou. Faça login novamente.',
          type: 'danger',
        });
        signOut();
      } else {
        toast({
          duration: 5000,
          text: 'Oops! Houve um erro ao carregar os pedidos. Atualize a página.',
          type: 'danger',
        });
      }
    },
    refetchOnWindowFocus: false,
  });

  // configurar mutateAsync no handle delete
  useMutation({
    mutationFn: async (uid: string) => {
      const response = await fetch(`http://localhost:3333/orders/${uid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }
    },
    onSuccess: () => {
      toast({
        duration: 5000,
        text: 'Pedido cancelado com sucesso.',
        type: 'success',
      });
      refetch();
    },
    onError: (err: Error) => {
      if (err.message === 'Unauthorized') {
        toast({
          duration: 5000,
          text: 'Oops! Você não tem permissão ou sua sessão expirou. Faça login novamente.',
          type: 'danger',
        });
        signOut();
      } else {
        toast({
          duration: 5000,
          text: 'Oops! Houve um erro ao cancelar o pedido. Atualize a página.',
          type: 'danger',
        });
      }
    },
  });

  const { watch, register } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchContent = watch('search');

  const filteredOrdersData = useMemo(
    () =>
      ordersQueryData.filter(
        (order) =>
          order.user.name.toLowerCase().includes(searchContent.toLowerCase()) ||
          order.patient_name
            .toLowerCase()
            .includes(searchContent.toLowerCase()) ||
          order.product.title
            .toLowerCase()
            .includes(searchContent.toLowerCase()) ||
          order.formatted_status?.text
            .toLowerCase()
            .includes(searchContent.toLowerCase()) ||
          order.deadline.toLowerCase().includes(searchContent.toLowerCase())
      ),
    [ordersQueryData, searchContent]
  );

  const slicedOrdersData: OrdersData = useMemo(() => {
    return filteredOrdersData.slice(pagination.index, pagination.offset);
  }, [filteredOrdersData, pagination.index, pagination.offset]);

  function handleDeleteOrder(uid: string) {
    console.log(`Pedido ${uid} cancelado`);
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="w-full h-12 flex items-center justify-end gap-2 sticky -top-2">
        <div
          className={`w-full h-full flex items-center bg-white py-2 px-4 gap-2 rounded stroke-slate-500 focus-within:stroke-pucci-500 focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-pucci-100`}
        >
          <Icon name="magnifier" className={`w-6 h-6 stroke-inherit`} />
          <input
            type="text"
            placeholder="Pesquise por qualquer dado do pedido..."
            className="w-full h-full text-pucci-300 focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            {...register('search')}
          />
        </div>
        <button
          className="bg-pucci-100 hover:bg-pucci-500 transition-colors w-fit rounded font-bold text-xs flex items-center h-full gap-2 px-4"
          title="Atualizar"
          onClick={() => refetch()}
        >
          <Icon name="refresh" className="w-4 h-4 stroke-white" />
        </button>
      </div>
      <div
        id="list-header"
        className="grid grid-cols-[2fr_2fr_4fr_1fr_1fr] lg:grid-cols-[64px_2fr_2fr_2fr_1fr_1fr_1fr] text-pucci-500 py-2"
      >
        <strong className="text-sm hidden lg:flex text-center items-center justify-center">
          Id
        </strong>
        <strong className="text-sm text-center w-full flex items-center justify-center">
          Responsável
        </strong>
        <strong className="text-sm text-center w-full flex items-center justify-center">
          Paciente
        </strong>
        <strong className="text-sm text-center w-full flex items-center justify-center">
          Serviço
        </strong>
        <strong className="text-sm text-center flex items-center justify-center">
          Status
        </strong>
        <strong className="text-sm hidden lg:flex text-center items-center justify-center">
          Data entrega
        </strong>
        <strong className="text-sm text-center flex items-center justify-center">
          Opções
        </strong>
      </div>

      {slicedOrdersData &&
        slicedOrdersData.map((item) => (
          <div
            id="row"
            className="bg-fuchsia-200 text-pucci-500 w-full h-fit py-4 lg:py-2 rounded flex items-center"
            key={item.uid}
          >
            <div
              id="list-item-1"
              className="w-full grid grid-cols-[2fr_2fr_4fr_1fr_1fr] lg:grid-cols-[64px_2fr_2fr_2fr_1fr_1fr_1fr] gap-1 items-center"
            >
              <p
                title={`${item.id}`}
                className="text-xs hidden lg:flex text-center items-center justify-center font-medium"
              >
                {item.id}
              </p>
              <p
                title={item.user.name}
                className="text-xs text-center w-full flex items-center justify-center font-medium"
              >
                {item.user.name}
              </p>
              <p
                title={item.patient_name}
                className="text-xs text-center w-full flex items-center justify-center font-medium"
              >
                {item.patient_name}
              </p>
              <p
                title={item.product.title}
                className="text-xs text-center w-full flex items-center justify-center font-medium"
              >
                {item.product.title}
              </p>
              <div
                title={`${item.formatted_status?.text}`}
                className={`text-center ${item.formatted_status?.style} py-1.5 lg:py-1 h-fit flex w-3 lg:w-full justify-center items-center rounded-r-full rounded-l-full text-xs font-semibold text-slate-200  mx-auto`}
              >
                <p className="hidden lg:block">{item.formatted_status?.text}</p>
              </div>
              <p
                title={item.deadline}
                className="text-xs hidden text-center lg:flex items-center justify-center font-medium"
              >
                {item.deadline}
              </p>
              <strong className="text-center flex items-center justify-center">
                <div
                  id="options"
                  className="flex items-center justify-center gap-1"
                >
                  <Link
                    href={`/dashboard/orders/${item.uid}/edit`}
                    id="edit-icon"
                    title="Visualizar ou Editar pedido"
                    className={`stroke-lime-600 hover:stroke-lime-800 transition-colors`}
                  >
                    <Icon name="edit" className="w-4 h-4 stroke-inherit" />
                  </Link>

                  <button
                    type="button"
                    id="delete-icon"
                    title="Cancelar pedido"
                    onClick={() => handleDeleteOrder(item.uid)}
                    disabled={
                      item.formatted_status?.text === 'CANCELADO' ||
                      item.formatted_status?.text === 'FINALIZADO' ||
                      item.formatted_status?.text === 'CONFIRMADO'
                    }
                    aria-disabled={
                      item.formatted_status?.text === 'CANCELADO' ||
                      item.formatted_status?.text === 'FINALIZADO' ||
                      item.formatted_status?.text === 'CONFIRMADO'
                    }
                    className="disabled:cursor-not-allowed disabled:stroke-slate-400 disabled:hover:stroke-slate-400 stroke-red-500 hover:stroke-red-800 "
                  >
                    <Icon
                      name="trash"
                      className="w-4 h-4 stroke-inherit transition-colors"
                    />
                  </button>
                </div>
              </strong>
            </div>
          </div>
        ))}

      <div
        id="list-control"
        className="w-full h-fit flex items-center justify-center gap-2"
      >
        <button
          className="text-white py-2 px-4 bg-pucci-500 rounded disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={
            (pagination.index === 0 && pagination.offset === initialOffset) ||
            filteredOrdersData.length <= 0
          }
          onClick={() =>
            setPagination((prev) => {
              if (prev.index >= initialOffset) {
                return {
                  index: prev.index - initialOffset,
                  offset: prev.offset - initialOffset,
                };
              }

              return prev;
            })
          }
        >
          {'<'}
        </button>
        <span className="text-black">
          pág: <strong>{pagination.offset / initialOffset}</strong> de{' '}
          <strong>
            {filteredOrdersData.length % initialOffset === 0
              ? Math.floor(filteredOrdersData.length / initialOffset)
              : Math.floor(filteredOrdersData.length / initialOffset + 1)}
          </strong>
        </span>
        <button
          className="text-white py-2 px-4 bg-pucci-500 rounded disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={
            filteredOrdersData.slice(pagination?.index, pagination?.offset)
              .length < initialOffset ||
            filteredOrdersData.slice(
              pagination?.index + initialOffset,
              pagination?.offset + initialOffset
            ).length === 0
          }
          onClick={() =>
            setPagination((prev) => ({
              index: prev.index + initialOffset,
              offset: prev.offset + initialOffset,
            }))
          }
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default OrderList;
