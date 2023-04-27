'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  cro: string;
  password: string;
  confirm_password: string;
};

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(JSON.stringify(data));
      const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const parsed = await response.json();

        localStorage.setItem('user', JSON.stringify(parsed.data));

        router.replace('/signin');
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="p-4">
      <div className="bg-pucci-50 h-full rounded flex flex-col gap-6 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-3/4"
        >
          <div id="name-input" className="flex flex-col gap-1">
            <label htmlFor="name" className="text-pucci-500 font-bold">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Insira seu nome"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.name
                  ? 'focus:outline-red-500'
                  : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <div id="email-input" className="flex flex-col gap-1">
            <label htmlFor="email" className="text-pucci-500 font-bold">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.email
                  ? 'focus:outline-red-500'
                  : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <div id="cro-input" className="flex flex-col gap-1">
            <label htmlFor="cro" className="text-pucci-500 font-bold">
              CRO
            </label>
            <input
              type="text"
              id="cro"
              placeholder="Insira seu CRO"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.cro ? 'focus:outline-red-500' : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('cro', { required: true })}
            />
            {errors.cro && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <div id="password-input" className="flex flex-col gap-1">
            <label htmlFor="password" className="text-pucci-500 font-bold">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Insira sua melhor senha"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.password ? 'outline-red-500' : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('password', { required: true })}
            />
            {errors.password && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <div id="confirm_password-input" className="flex flex-col gap-1">
            <label
              htmlFor="confirm_password"
              className="text-pucci-500 font-bold"
            >
              Confirmação de senha
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirme sua senha"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.confirm_password
                  ? 'focus:outline-red-500'
                  : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('confirm_password', { required: true })}
            />
            {errors.confirm_password && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <button
            type="submit"
            className="bg-pucci-300 hover:bg-pucci-800 py-2 w-full rounded font-bold text-white transition-colors"
          >
            Cadastrar
          </button>
        </form>
        <div className="flex flex-col gap-2 text-center text-sm">
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/signin"
          >
            Já é cadastrado?
          </Link>
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
