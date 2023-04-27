'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { signOut, useSession } from 'next-auth/react';
import Icon from '@/utils/getIcon';
import {
  ToothMapColorScale,
  colorScale,
  toothMap,
  toothMapColorScale,
  odontograma_section_1,
  odontograma_section_2,
  odontograma_section_3,
  odontograma_section_4,
} from '../NewOrderForm/constants';
import { newOrderSchema } from '@/utils/validationSchemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { NewOrderInputs } from '../NewOrderForm';
import { Order } from '../OrderList';
import Image from 'next/image';
import toast from '@/utils/toast';

type EditOrderForm = {
  edit: boolean;
  params: {
    slug: string;
  };
};

type Product = {
  active: boolean;
  category: string;
  description: string | null;
  materials: string[];
  price: number;
  title: string;
  id?: string;
  uid?: string;
};

type ProductsData = Product[];

type EditInputs = NewOrderInputs & {
  status: number;
  deleted_files?: string[];
};

type OrderFiles = {
  uploaded: string[];
  deleted: string[];
};

const EditOrderForm: React.FC<EditOrderForm> = ({ edit = false, params }) => {
  const [editMode, setEditMode] = useState({ initial: true, edit });
  const [orderFiles, setOrderFiles] = useState<OrderFiles>({
    uploaded: [],
    deleted: [],
  });
  const { data: session } = useSession();

  const { isLoading: servicesLoading, data: servicesQueryData } = useQuery({
    queryKey: ['getServices'],
    queryFn: async (): Promise<ProductsData | []> => {
      const response = await fetch(`http://localhost:3333/products`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }

      if (response.ok) {
        const parsedResponse = await response.json();

        const services = parsedResponse.data.map((item: Product) => ({
          id: item.uid,
          title: item.title,
          description: item.description,
          materials: item.materials,
          price: item.price,
          active: item.active,
          category: item.category,
        }));

        return services;
      }

      return [];
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
          text: 'Oops! Houve um erro ao carregar os serviços. Atualize a página.',
          type: 'danger',
        });
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: orderQueryData, refetch: orderQueryRefetech } = useQuery({
    queryKey: ['getOrder'],
    queryFn: async (): Promise<Order | {}> => {
      const response = await fetch(
        `http://localhost:3333/orders/${params.slug}`,
        {
          headers: { Authorization: `Bearer ${session?.user.accessToken}` },
        }
      );

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }

      if (response.ok) {
        const parsedResponse = await response.json();

        return parsedResponse.data;
      }

      return {};
    },
    initialData: {},
    onSuccess: (data: Order) => {
      setOrderFiles((val) => ({
        ...val,
        uploaded: [...data.files],
        deleted: [],
      }));
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
          text: 'Oops! Houve um erro ao carregar o pedido. Atualize a página.',
          type: 'danger',
        });
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutateAsync, isLoading: mutationLoading } = useMutation({
    mutationFn: async (formData: any) => {
      const response = await fetch(
        `http://localhost:3333/orders/${orderQueryData.uid}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: formData,
        }
      );

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }
    },
    onSuccess: () => {
      setEditMode((val) => ({ ...val, edit: false }));
      orderQueryRefetech();
      toast({
        duration: 5000,
        text: 'Pedido editado com sucesso.',
        type: 'success',
      });
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
          text: 'Oops! Houve um erro ao editar o pedido. Tente novamente.',
          type: 'danger',
        });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm<EditInputs>({
    mode: 'onSubmit',
    resolver: async (data, context, options) => {
      data.service_category =
        servicesQueryData?.find((product) => product.id === data.service_title)
          ?.category || 'DEFAULT';

      data.odgm_result = Object.entries(data)
        .filter((item) => item[0].includes('odgm') && item[1] === true)
        .map((only_odgm_string) => only_odgm_string[0])
        .map((just_the_number) => Number(just_the_number.split('_')[1]))
        .sort();

      data.map1_result = Object.entries(data)
        .filter((item) => item[0].includes('map1_a'))
        .map((only_map1_data) => only_map1_data[1]) as Array<
        ToothMapColorScale[number]
      >;

      data.map2_result = Object.entries(data)
        .filter((item) => item[0].includes('map2_a'))
        .map((only_map2_data) => only_map2_data[1]) as Array<
        ToothMapColorScale[number]
      >;

      return yupResolver(newOrderSchema)(data, context, options);
    },
    values: {
      customer_name: orderQueryData.patient_name,
      customer_age: orderQueryData.patient_age,
      customer_phone: orderQueryData.patient_phone,
      customer_sex: orderQueryData.patient_sex,
      service_title: orderQueryData.product_id,
      service_material: orderQueryData.material,
      service_category: orderQueryData.category,
      service_deadline: new Date(orderQueryData.deadline || new Date())
        .toISOString()
        .split('T')[0],
      service_deadline_period: orderQueryData.deadline_period,
      service_final_status: orderQueryData.final_status ? 'S' : 'N',
      service_prepare_color: orderQueryData.prepare_color,
      service_final_color: orderQueryData.final_color,
      service_gum_color:
        Number(orderQueryData.gum_color) === 0
          ? 'DEFAULT'
          : Number(orderQueryData.gum_color),
      odgm_11: orderQueryData.odgm?.includes('11'),
      odgm_12: orderQueryData.odgm?.includes('12'),
      odgm_13: orderQueryData.odgm?.includes('13'),
      odgm_14: orderQueryData.odgm?.includes('14'),
      odgm_15: orderQueryData.odgm?.includes('15'),
      odgm_16: orderQueryData.odgm?.includes('16'),
      odgm_17: orderQueryData.odgm?.includes('17'),
      odgm_18: orderQueryData.odgm?.includes('18'),
      odgm_21: orderQueryData.odgm?.includes('21'),
      odgm_22: orderQueryData.odgm?.includes('22'),
      odgm_23: orderQueryData.odgm?.includes('23'),
      odgm_24: orderQueryData.odgm?.includes('24'),
      odgm_25: orderQueryData.odgm?.includes('25'),
      odgm_26: orderQueryData.odgm?.includes('26'),
      odgm_27: orderQueryData.odgm?.includes('27'),
      odgm_28: orderQueryData.odgm?.includes('28'),
      odgm_31: orderQueryData.odgm?.includes('31'),
      odgm_32: orderQueryData.odgm?.includes('32'),
      odgm_33: orderQueryData.odgm?.includes('33'),
      odgm_34: orderQueryData.odgm?.includes('34'),
      odgm_35: orderQueryData.odgm?.includes('35'),
      odgm_36: orderQueryData.odgm?.includes('36'),
      odgm_37: orderQueryData.odgm?.includes('37'),
      odgm_38: orderQueryData.odgm?.includes('38'),
      odgm_41: orderQueryData.odgm?.includes('41'),
      odgm_42: orderQueryData.odgm?.includes('42'),
      odgm_43: orderQueryData.odgm?.includes('43'),
      odgm_44: orderQueryData.odgm?.includes('44'),
      odgm_45: orderQueryData.odgm?.includes('45'),
      odgm_46: orderQueryData.odgm?.includes('46'),
      odgm_47: orderQueryData.odgm?.includes('47'),
      odgm_48: orderQueryData.odgm?.includes('48'),
      odgm_result: orderQueryData.odgm?.map((item) => Number(item)),
      map1_result: orderQueryData.map_a,
      map1_a1: orderQueryData.map_a?.[0],
      map1_a2: orderQueryData.map_a?.[1],
      map1_a3: orderQueryData.map_a?.[2],
      map1_a4: orderQueryData.map_a?.[3],
      map1_a5: orderQueryData.map_a?.[4],
      map1_a6: orderQueryData.map_a?.[5],
      map1_a7: orderQueryData.map_a?.[6],
      map1_a8: orderQueryData.map_a?.[7],
      map1_a9: orderQueryData.map_a?.[8],
      map2_result: orderQueryData.map_b,
      map2_a1: orderQueryData.map_b?.[0],
      map2_a2: orderQueryData.map_b?.[1],
      map2_a3: orderQueryData.map_b?.[2],
      map2_a4: orderQueryData.map_b?.[3],
      map2_a5: orderQueryData.map_b?.[4],
      map2_a6: orderQueryData.map_b?.[5],
      map2_a7: orderQueryData.map_b?.[6],
      map2_a8: orderQueryData.map_b?.[7],
      map2_a9: orderQueryData.map_b?.[8],
      antagonista: orderQueryData.antagonista,
      componentes: orderQueryData.componentes,
      modelo_estudo: orderQueryData.modelo_estudo,
      modelo_trabalho: orderQueryData.modelo_trabalho,
      moldeira: orderQueryData.moldeira,
      relacionamento_oclusao: orderQueryData.relacionamento_oclusao,
      outros: orderQueryData.outros,
      aditional_info: orderQueryData.aditional_info || '',
      upload: [],
      status: orderQueryData.status,
    },
    defaultValues: {
      customer_name: '',
      customer_age: 1,
      customer_phone: '',
      customer_sex: 'M',
      service_title: 'DEFAULT',
      service_category: 'DEFAULT',
      service_material: 'DEFAULT',
      // Essa linha acrescenta um dia à data atual e separa apenas DD-MM-YYYY
      service_deadline: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split('T')[0],
      service_deadline_period: 'M',
      service_final_status: 'S',
      service_prepare_color: 'DEFAULT',
      service_final_color: 'DEFAULT',
      service_gum_color: 'DEFAULT',
      odgm_result: [],
      map1_a1: 'DEFAULT',
      map1_a2: 'DEFAULT',
      map1_a3: 'DEFAULT',
      map1_a4: 'DEFAULT',
      map1_a5: 'DEFAULT',
      map1_a6: 'DEFAULT',
      map1_a7: 'DEFAULT',
      map1_a8: 'DEFAULT',
      map1_a9: 'DEFAULT',
      map1_result: [],
      map2_a1: 'DEFAULT',
      map2_a2: 'DEFAULT',
      map2_a3: 'DEFAULT',
      map2_a4: 'DEFAULT',
      map2_a5: 'DEFAULT',
      map2_a6: 'DEFAULT',
      map2_a7: 'DEFAULT',
      map2_a8: 'DEFAULT',
      map2_a9: 'DEFAULT',
      map2_result: [],
      antagonista: 0,
      componentes: 0,
      modelo_estudo: 0,
      modelo_trabalho: 0,
      moldeira: 0,
      relacionamento_oclusao: 0,
      outros: 0,
      aditional_info: '',
    },
  });

  const onSubmit: SubmitHandler<EditInputs> = async (data) => {
    const usableDataSet = {
      customer_name: data.customer_name,
      customer_age: data.customer_age,
      customer_phone: data.customer_phone,
      customer_sex: data.customer_sex,
      service_title: data.service_title,
      service_material: data.service_material,
      service_deadline: data.service_deadline,
      service_deadline_period: data.service_deadline_period,
      service_final_status: data.service_final_status,
      service_prepare_color: data.service_prepare_color,
      service_final_color: data.service_final_color,
      service_gum_color: data.service_gum_color,
      odgm_result: data.odgm_result,
      map1_result: data.map1_result,
      map2_result: data.map2_result,
      antagonista: data.antagonista,
      componentes: data.componentes,
      modelo_estudo: data.modelo_estudo,
      modelo_trabalho: data.modelo_trabalho,
      moldeira: data.moldeira,
      relacionamento_oclusao: data.relacionamento_oclusao,
      outros: data.outros,
      aditional_info: data.aditional_info,
      upload: data.upload,
      status: data.status,
      deleted_files: orderFiles.deleted,
    };

    const formData = new FormData();

    let item: keyof EditInputs;

    for (item in usableDataSet) {
      switch (item) {
        case 'upload':
          for (let i = 0; i < data[item].length; i++) {
            formData.append(item, data[item][i]);
          }
          break;
        case 'service_title':
          formData.append('service_id', data[item]);
          break;
        case 'deleted_files':
          formData.append(item, orderFiles.deleted as any);
          break;
        default:
          formData.append(item, data[item] as any);
          break;
      }
    }

    await mutateAsync(formData);
  };

  function handleImageDelete(index: number) {
    const selectedFile = orderFiles?.uploaded?.[index];

    if (selectedFile) {
      setOrderFiles((val) => ({
        ...val,
        uploaded: val.uploaded.filter((_, idx) => idx !== index),
        deleted: [...val.deleted, selectedFile],
      }));
    }
  }

  function handleVisualMode() {
    setEditMode((prev) => ({ ...prev, initial: true, edit: false }));
    reset();
  }

  return (
    <>
      <div
        id="header"
        className="bg-pucci-500 w-full h-16 rounded flex items-center justify-between p-4 sticky top-0 z-10"
      >
        <div className="flex items-center gap-2">
          <Link href="/dashboard/orders" title="Voltar aos pedidos">
            <Icon
              name="back"
              className="w-8 h-8 p-1 rounded stroke-white hover:bg-pucci-300 transition-colors"
            />
          </Link>
          <p className="text-xl text-white font-semibold">
            Pedido {params.slug}
          </p>
        </div>
        {session?.user.role === 'ADMIN' && (
          <select
            id="status"
            className="p-2 rounded justify-end bg-pucci-100 text-white-500 focus:outline-pucci-100 focus:outline-offset-1 border-none ring-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={orderQueryData.status === 5}
            {...register('status')}
          >
            <option value={0}>Enviado</option>
            <option value={1}>Confirmado</option>
            <option value={2}>Cancelado</option>
            <option value={3}>Pendente</option>
            <option value={4}>Atrasado</option>
            <option value={5}>Finalizado</option>
          </select>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-4"
      >
        {/* Dados paciente */}
        <fieldset
          id="patient-data"
          className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4"
        >
          <legend className="font-bold text-pucci-500 text-sm">
            Dados do paciente
          </legend>

          <div
            id="row-1"
            className="grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-2"
          >
            <div id="input_customer_name" className="w-full ">
              <label htmlFor="customer_name" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Nome</strong>
                <input
                  type="text"
                  id="customer_name"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  placeholder="Nome do paciente"
                  disabled={mutationLoading || !editMode.edit}
                  autoComplete="off"
                  autoCorrect="off"
                  {...register('customer_name')}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="customer_name"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_customer_age" className="w-full">
              <label htmlFor="customer_age" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Idade</strong>
                <input
                  type="number"
                  id="customer_age"
                  className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  placeholder="Idade do paciente"
                  min={1}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('customer_age')}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="customer_age"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_customer_phone" className="w-full">
              <label htmlFor="customer_phone" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Telefone</strong>
                <input
                  type="text"
                  id="customer_phone"
                  className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  placeholder="Telefone do paciente"
                  disabled={mutationLoading || !editMode.edit}
                  autoComplete="off"
                  autoCorrect="off"
                  {...register('customer_phone')}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="customer_phone"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_customer_sex" className="w-full">
              <label
                htmlFor="customer_sex"
                className="flex h-full flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">Sexo</strong>
                <select
                  id="customer_sex"
                  className="text-sm p-3 rounded bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('customer_sex')}
                >
                  <option value={'M'}>Masculino</option>
                  <option value={'F'}>Feminino</option>
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="customer_sex"
                render={({ message }) => (
                  <small className="text-red-500 tex-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>
          </div>
        </fieldset>

        {/* Dados do serviço */}
        <fieldset
          id="patient-data"
          className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4"
        >
          <legend className="font-bold text-pucci-500 text-sm">
            Dados do serviço
          </legend>

          <div id="row-1" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div id="input_service_title" className="w-full">
              <label htmlFor="service_title" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">
                  Tipo de trabalho
                </strong>
                <select
                  id="service_title"
                  className="p-3 rounded text-sm bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={
                    mutationLoading || !editMode.edit || servicesLoading
                  }
                  {...register('service_title')}
                >
                  <option value={'DEFAULT'}>Selecione</option>
                  <optgroup label="Primários">
                    {servicesQueryData
                      ?.filter((item) => item.category === 'Primários')
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Outros">
                    {servicesQueryData
                      ?.filter((item) => item.category === 'Outros')
                      .map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.title}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_title"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_material" className="w-full">
              <label htmlFor="service_material" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">Material</strong>
                <select
                  id="service_material"
                  className="p-3 text-sm rounded bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={
                    mutationLoading || !editMode.edit || servicesLoading
                  }
                  {...register('service_material')}
                >
                  <option value={'DEFAULT'}>Selecione</option>
                  {servicesQueryData
                    ?.find((item) => item.id === watch('service_title'))
                    ?.materials.map((material, index) => (
                      <option value={material} key={index}>
                        {material}
                      </option>
                    ))}
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_material"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_deadline" className="w-full">
              <label htmlFor="service_deadline" className="flex flex-col gap-1">
                <strong className="text-pucci-500 text-xs">
                  Data de entrega
                </strong>
                <input
                  id="service_deadline"
                  className="p-3 rounded bg-white text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  type="date"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_deadline')}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="service_deadline"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_deadline_period" className="w-full">
              <label
                htmlFor="service_deadline_period"
                className="flex flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">
                  Período de entrega
                </strong>
                <select
                  id="service_deadline_period"
                  className="p-3 text-sm rounded bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_deadline_period')}
                >
                  <option value={'M'}>Manhã</option>
                  <option value={'T'}>Tarde</option>
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_deadline_period"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>
          </div>

          <div id="row-2" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div id="input_service_final_status" className="w-full">
              <label
                htmlFor="service_final_status"
                className="flex flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">
                  Enviar finalizado?
                </strong>
                <select
                  id="service_final_status"
                  className="p-3 rounded text-sm bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_final_status')}
                >
                  <option value={'S'}>Sim</option>
                  <option value={'N'}>Não</option>
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_final_status"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_prepare_color" className="w-full">
              <label
                htmlFor="service_prepare_color"
                className="flex flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">Cor preparo</strong>
                <select
                  id="service_prepare_color"
                  className="p-3 rounded bg-white text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_prepare_color')}
                >
                  <option value={'DEFAULT'}>Selecione</option>
                  {colorScale.map((color) =>
                    color !== 'DEFAULT' ? (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ) : null
                  )}
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_prepare_color"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_final_color" className="w-full">
              <label
                htmlFor="service_final_color"
                className="flex flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">Cor final</strong>
                <select
                  id="service_final_color"
                  className="p-3 rounded bg-white text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_final_color')}
                >
                  <option value={'DEFAULT'} className="text-sm">
                    Selecione
                  </option>
                  {colorScale.map((color) =>
                    color !== 'DEFAULT' ? (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ) : null
                  )}
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_final_color"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input_service_gum_color" className="w-full">
              <label
                htmlFor="service_gum_color"
                className="flex flex-col gap-1"
              >
                <strong className="text-pucci-500 text-xs">Cor gengiva</strong>
                <select
                  id="service_gum_color"
                  className="p-3 rounded bg-white text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={mutationLoading || !editMode.edit}
                  {...register('service_gum_color')}
                >
                  <option value={'DEFAULT'}>Selecione</option>
                  <option value={1}>Cor 1</option>
                  <option value={2}>Cor 2</option>
                  <option value={3}>Cor 3</option>
                  <option value={4}>Cor 4</option>
                  <option value={5}>Cor 5</option>
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="service_gum_color"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>
          </div>

          <div id="row-3" className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div id="input-odgm" className="flex w-full flex-col gap-2">
              <strong className="text-pucci-500 text-xs">Odontograma</strong>
              <div
                id="odgm-container"
                className="grid grid-cols-2 grid-rows-2 bg-white p-2 rounded h-full"
              >
                <div
                  id="odontograma_section_1"
                  className="flex gap-2 border-b border-r border-pucci-500 items-end justify-end p-2 relative"
                >
                  <strong className="absolute top-0 left-0 text-pucci-500 text-xs">
                    Q1
                  </strong>
                  {odontograma_section_1.map((item) => (
                    <div id={`input_odgm_${item}`} key={`odgm-${item}`}>
                      <label
                        htmlFor={`odgm_${item}`}
                        className="flex flex-col gap-1 text-pucci-500 text-xs"
                      >
                        {item}
                      </label>
                      <input
                        type="checkbox"
                        id={`odgm_${item}`}
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`odgm_${item}`)}
                      />
                    </div>
                  ))}
                </div>

                <div
                  id="odontograma_section_2"
                  className="flex gap-2 p-2 border-b border-pucci-500 items-end relative"
                >
                  <strong className="absolute top-0 right-0 text-pucci-500 text-xs">
                    Q2
                  </strong>
                  {odontograma_section_2.map((item) => (
                    <div id={`input_odgm_${item}`} key={`odgm-${item}`}>
                      <label
                        htmlFor={`odgm_${item}`}
                        className="flex flex-col gap-1 text-pucci-500 text-xs"
                      >
                        {item}
                      </label>
                      <input
                        type="checkbox"
                        id={`odgm_${item}`}
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`odgm_${item}`)}
                      />
                    </div>
                  ))}
                </div>

                <div
                  id="odontograma_section_3"
                  className="flex gap-2 p-2 border-r border-pucci-500 items-top justify-end relative"
                >
                  <strong className="absolute bottom-0 left-0 text-pucci-500 text-xs">
                    Q3
                  </strong>
                  {odontograma_section_4.map((item) => (
                    <div id={`input_odgm_${item}`} key={`odgm-${item}`}>
                      <input
                        type="checkbox"
                        id={`odgm_${item}`}
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`odgm_${item}`)}
                      />
                      <label
                        htmlFor={`odgm_${item}`}
                        className="flex flex-col gap-1 text-pucci-500 text-xs"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>

                <div
                  id="odontograma_section_4"
                  className="flex gap-2 p-2 items-top relative"
                >
                  <strong className="absolute bottom-0 right-0 text-pucci-500 text-xs">
                    Q4
                  </strong>
                  {odontograma_section_3.map((item) => (
                    <div id={`input_odgm_${item}`} key={`odgm-${item}`}>
                      <input
                        type="checkbox"
                        id={`odgm_${item}`}
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`odgm_${item}`)}
                      />
                      <label
                        htmlFor={`odgm_${item}`}
                        className="flex flex-col gap-1 text-pucci-500 text-xs"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name="odgm_result"
                render={({ message }) => (
                  <small className="text-red-500 text-xs font-bold">
                    {message}
                  </small>
                )}
              />
            </div>

            <div id="input-maps-1" className="w-full flex flex-col gap-2">
              <strong className="text-pucci-500 text-xs">Mapa A</strong>

              <div
                id="mapa1-container"
                className="grid grid-cols-2 gap-2 w-full h-full items-center"
              >
                <div
                  id="mapa1-img"
                  className="stroke-purple-700 w-3/4 h-3/4 mx-auto flex items-center justify-center rounded bg-white relative"
                >
                  <Icon
                    name="tooth-map-a"
                    className="w-32 h-32 fill-none stroke-pucci-500"
                  />
                </div>
                <div
                  id="mapa1-inputs"
                  className="grid grid-cols-3 grid-rows-3 gap-2 w-full"
                >
                  {toothMap.map((item) => (
                    <div
                      id="input-container"
                      key={`map1-a${item}`}
                      className="flex flex-col gap-2 w-full"
                    >
                      <label
                        htmlFor={`map1_a${item}`}
                        className="flex flex-col text-pucci-500 text-xs font-bold gap-1 w-fit"
                      >
                        {`Área ${item}`}
                      </label>
                      <select
                        id={`map1_a${item}`}
                        className="p-2 rounded bg-white text-xs text-slate-500 font-normal focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`map1_a${item}`)}
                      >
                        <option value={'DEFAULT'}>Cores</option>
                        {toothMapColorScale.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name="map1_result"
                message="Cores de mapa A obrigatórias"
                render={({ message }) => {
                  return (
                    <small className="text-red-500 text-xs font-bold mx-auto p-2">
                      {message}
                    </small>
                  );
                }}
              />
            </div>
            {/* mapa 2 */}
            <div id="input-maps-2" className="w-full flex flex-col gap-2">
              <strong className="text-pucci-500 text-xs">Mapa B</strong>

              <div
                id="mapa2-container"
                className="grid grid-cols-2 gap-2 w-full h-full items-center"
              >
                <div
                  id="mapa2-img"
                  className="stroke-purple-700 w-3/4 h-3/4 mx-auto flex items-center justify-center rounded bg-white"
                >
                  <Icon
                    name="tooth-map-b"
                    className="w-40 h-40 fill-none stroke-pucci-500 flex items-center"
                  />
                </div>
                <div
                  id="mapa2-inputs"
                  className="grid grid-cols-3 grid-rows-3 gap-2 w-full"
                >
                  {toothMap.map((item) => (
                    <div
                      id="input-container"
                      key={`map2_a${item}`}
                      className="flex flex-col gap-2 w-full"
                    >
                      <label
                        htmlFor={`map2_a${item}`}
                        className="flex flex-col text-pucci-500 text-xs font-bold gap-1 w-fit"
                      >
                        {`Área ${item}`}
                      </label>
                      <select
                        id={`map2_a${item}`}
                        className="p-2 rounded bg-white text-xs text-slate-500 font-normal focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={mutationLoading || !editMode.edit}
                        {...register(`map2_a${item}`)}
                      >
                        <option value={'DEFAULT'}>Cores</option>
                        {toothMapColorScale.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name="map2_result"
                message="Cores de mapa B obrigatórias"
                render={({ message }) => {
                  return (
                    <small className="text-red-500 text-xs font-bold mx-auto p-2">
                      {message}
                    </small>
                  );
                }}
              />
            </div>
          </div>

          <div id="row-4" className="flex flex-col gap-2">
            <strong className="text-pucci-500 text-xs">
              Materiais enviados
            </strong>
            <div
              id="inputs-materiais-enviados"
              className="grid grid-cols-2 lg:grid-cols-7 gap-2"
            >
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-antagonista"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Antagonista
                </label>
                <input
                  type="number"
                  id="input-antagonista"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-slate-500 text-sm"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('antagonista')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-componentes"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Componentes
                </label>
                <input
                  type="number"
                  id="input-componentes"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('componentes')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-modelo-estudo"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Modelo de estudo
                </label>
                <input
                  type="number"
                  id="input-modelo-estudo"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('modelo_estudo')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-modelo-trabalho"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Modelo de trabalho
                </label>
                <input
                  type="number"
                  id="input-modelo-trabalho"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('modelo_trabalho')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-moldeira"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Moldeira
                </label>
                <input
                  type="number"
                  id="input-moldeira"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('moldeira')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-relacionamento-oclusao"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Relacionamento de oclusão
                </label>
                <input
                  type="number"
                  id="input-relacionamento-oclusao"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('relacionamento_oclusao')}
                />
              </div>
              <div id="input-container" className="flex flex-col gap-1">
                <label
                  htmlFor="input-outros"
                  className="text-xs text-pucci-500 font-bold h-full"
                >
                  Outros
                </label>
                <input
                  type="number"
                  id="input-outros"
                  className="p-2 rounded focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm text-slate-500"
                  placeholder="Quantidade"
                  min={0}
                  disabled={mutationLoading || !editMode.edit}
                  {...register('outros')}
                />
              </div>
            </div>
          </div>
        </fieldset>

        {/* Info e Upload */}
        <div id="row-5" className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <fieldset
            id="info"
            className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4"
          >
            <legend className="font-bold text-pucci-500 text-xs">
              Informações adicionais
            </legend>

            <textarea
              id="info"
              className="h-full w-full rounded p-2 text-slate-600 resize-none focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={mutationLoading || !editMode.edit}
              {...register('aditional_info')}
            />
          </fieldset>

          <fieldset
            id="info"
            className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4"
          >
            <legend className="font-bold text-pucci-500 text-xs">
              Upload de imagens
            </legend>
            <p className="bg-blue-500 p-2 rounded text-sm font-medium">
              Insira as imagens do preparo. Tamanho máximo de 10MB.
            </p>
            <input
              type="file"
              className="text-slate-500 disabled:cursor-not-allowed"
              multiple
              size={10485760}
              accept="image/*"
              disabled={mutationLoading || !editMode.edit}
              {...register('upload')}
            />
            <div className="flex w-full h-full gap-2">
              {orderFiles?.uploaded?.length > 0 &&
                orderFiles?.uploaded?.map((file, index) => (
                  <div key={file} className="relative h-24 w-24">
                    <Image
                      src={`https://app-pucci-dental-lab.s3.amazonaws.com/${file}`}
                      alt={file}
                      fill
                      sizes="96px"
                    />
                    <button
                      type="button"
                      disabled={mutationLoading || !editMode.edit}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-900 transition-colors rounded z-10 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => handleImageDelete(index)}
                    >
                      <Icon name="close" className="stroke-white h-6 w-6" />
                    </button>
                  </div>
                ))}
            </div>
          </fieldset>
        </div>

        {/* Alerta */}
        <fieldset
          id="alert"
          className="w-full flex flex-col gap-4 bg-red-500 rounded px-4 pb-4"
        >
          <legend
            className="font-bold text-sm
         text-white bg-red-900 rounded px-4 py-2"
          >
            Atenção
          </legend>
          <p className="text-sm font-bold text-center">
            A pontualidade e o resultado final do trabalho depende do
            preenchimento correto das informações acima. Principalmente imagens.
          </p>
          <p className="text-sm font-bold text-center">
            Em caso de dúvida, entre em contato conosco.
          </p>
        </fieldset>

        {editMode.edit ? (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-900 py-4 rounded transition-colors font-bold"
            onClick={() => handleVisualMode()}
          >
            Apenas visualizar pedido
          </button>
        ) : (
          <button
            type="button"
            disabled={
              orderQueryData.status === 5 ||
              orderQueryData.status === 2 ||
              (orderQueryData.status === 1 && session?.user.role === 'USER')
            }
            onClick={() =>
              setEditMode((prev) => ({ ...prev, initial: true, edit: true }))
            }
            className=" bg-amber-500 hover:bg-amber-900 py-4 rounded transition-colors font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Editar Pedido
          </button>
        )}

        {editMode.edit && (
          <button
            type="submit"
            className={`bg-lime-600 hover:bg-lime-900 py-4 rounded transition-colors font-bold disabled:bg-gray-300`}
            onClick={() =>
              setEditMode((prev) => ({ ...prev, initial: false, edit: true }))
            }
            disabled={!isDirty}
          >
            Salvar alterações
          </button>
        )}
      </form>
    </>
  );
};

export default EditOrderForm;
