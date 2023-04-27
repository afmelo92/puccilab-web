'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.email && data.password) {
        const response = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/dashboard',
        });

        console.log({ signin_response: response });
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
          className="flex flex-col gap-2 w-10/12 lg:w-3/4"
        >
          <div id="email-input" className="flex flex-col gap-1">
            <label htmlFor="name" className="text-pucci-500 font-bold text-sm">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              className={`text-sm lg:text-base p-4 lg:p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.email
                  ? 'focus:outline-red-500 focus:outline-double'
                  : 'focus:outline-pucci-300 focus:outline-double'
              }`}
              defaultValue={''}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>

          <div id="password-input" className="flex flex-col gap-1">
            <label htmlFor="name" className="text-pucci-500 font-bold text-sm">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Insira sua senha"
              className={`text-sm lg:text-base p-4 lg:p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.password
                  ? 'outline-red-500 focus:outline-double'
                  : 'focus:outline-pucci-300 focus:outline-double'
              }`}
              defaultValue={''}
              {...register('password', { required: true })}
            />
            {errors.password && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>

          <button
            type="submit"
            className="bg-pucci-300 hover:bg-pucci-800 p-4 lg:p-2 w-full font-bold text-white transition-colors"
          >
            Entrar
          </button>
        </form>
        <div className="flex flex-col gap-2 text-slate-50  text-center text-sm">
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/signup"
          >
            Ainda não sou cadastrado
          </Link>
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/forgot-password"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
