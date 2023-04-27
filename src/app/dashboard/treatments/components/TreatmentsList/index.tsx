'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Icon from '@/utils/getIcon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from '@/utils/toast';

const initialOffset = 10;

const TreatmentsList: React.FC = () => {
  const { data: session } = useSession();
  const [pagination, setPagination] = useState({
    index: 0,
    offset: initialOffset,
  });

  const { data: ordersQueryData, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<[]> => {
      const response = await fetch(`http://localhost:3333/orders`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
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

  const { mutateAsync } = useMutation({
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

  const slicedOrdersData = useMemo(() => {
    return filteredOrdersData.slice(pagination.index, pagination.offset);
  }, [filteredOrdersData, pagination.index, pagination.offset]);

  function handleDeleteOrder(uid: string) {
    modal({
      type: 'danger',
      title: 'Atenção!',
      text: 'Tem certeza de que deseja cancelar o pedido? Essa ação não pode ser desfeita.',
      actionTitle: 'Cancelar',
      action: async () => mutateAsync(uid),
    });
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
          Paciente
        </strong>
        <strong className="text-sm text-center w-full flex items-center justify-center">
          Data de início
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
}

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

export default TreatmentsList;
