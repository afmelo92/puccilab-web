'use client';

import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { signOut, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

const defaultUser = {
  email: '',
  name: '',
  cro: '',
  cnpj: '',
  phone: '',
  clinic: '',
  address: '',
};

type Inputs = {
  name: string;
  email: string;
  cro: string;
  address: string;
  clinic: string;
  cnpj: string;
  phone: string;
  password: string;
  confirm_password: string;
};

const ProfileForm = () => {
  const { data: session } = useSession();

  const {
    mutateAsync,
    isLoading: mutationLoading,
    data: mutationData,
  } = useMutation({
    mutationFn: async (data: any) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${session?.user.accessToken}`);

      const response = await fetch(
        `http://localhost:3333/users/${session?.user?.id}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify(data),
        }
      );

      const parsed = await response.json();

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }

      return parsed.data;
    },
    onSuccess: (data) => {
      console.log('Profiled!');
      console.log({ success_data: data });
    },
    onError: (err: Error) => {
      if (err.message === 'Unauthorized') {
        signOut();
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: defaultUser,
    values: {
      name: mutationData?.name || session?.user.name || '',
      email: mutationData?.email || session?.user.email || '',
      cro: mutationData?.cro || session?.user.cro || '',
      address: mutationData?.address || session?.user.address || '',
      clinic: mutationData?.clinic || session?.user.clinic || '',
      cnpj: mutationData?.cnpj || session?.user.cnpj || '',
      phone: mutationData?.phone || session?.user.phone || '',
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data);
  };

  console.log({ session });

  return (
    <div className="relative">
      <div className="lg:grid lg:grid-cols-[196px_1fr] grid-rows-1 gap-4 rounded bg-pucci-50 p-4">
        <div
          id="avatar"
          className="w-full lg:h-fit flex items-center justify-center"
          title="avatar"
        >
          <div id="image-container" className="relative w-48 h-48">
            <Image
              src={'/google_default_user.png'}
              alt={'DEFAULT'}
              className="rounded-full"
              fill
              priority
              sizes="192px"
            />
          </div>
        </div>

        <form
          id="forms"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div id="row-1" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div id="input-name">
              <label htmlFor="name" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Nome</strong>
                <input
                  type="text"
                  id="name"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('name', { required: 'This is required' })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input-cro">
              <label htmlFor="cro" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">CRO</strong>
                <input
                  type="text"
                  id="cro"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('cro')}
                />
              </label>
            </div>
          </div>

          <div id="row-2" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div id="input-email">
              <label htmlFor="email" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">E-mail</strong>
                <input
                  type="text"
                  id="email"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('email')}
                />
              </label>
            </div>
            <div id="input-phone">
              <label htmlFor="phone" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Telefone</strong>
                <input
                  type="text"
                  id="phone"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('phone')}
                />
              </label>
            </div>
          </div>

          <div id="row-3" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div id="input-clinic">
              <label htmlFor="clinic" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Clínica</strong>
                <input
                  type="text"
                  id="clinic"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('clinic')}
                />
              </label>
            </div>

            <div id="input-cnpj">
              <label htmlFor="cnpj" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">CNPJ</strong>
                <input
                  type="text"
                  id="cnpj"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('cnpj')}
                />
              </label>
            </div>
          </div>

          <div id="row-4" className="grid grid-cols-1">
            <div id="input-address">
              <label htmlFor="address" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Endereço</strong>
                <input
                  type="text"
                  id="address"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading}
                  {...register('address')}
                />
              </label>
            </div>
          </div>

          <div id="row-5" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div id="input-password">
              <label htmlFor="password" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Senha</strong>
                <input
                  type="password"
                  id="password"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={mutationLoading}
                  {...register('password')}
                />
              </label>
            </div>

            <div id="input-confirm-password">
              <label htmlFor="confirm-password" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">
                  Confirmação de senha
                </strong>
                <input
                  type="password"
                  id="confirm-password"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={mutationLoading}
                  {...register('confirm_password')}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-slate-50 bg-lime-600 hover:bg-lime-700 rounded py-3 transition-colors font-bold mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!isDirty}
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
