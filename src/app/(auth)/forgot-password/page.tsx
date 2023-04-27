'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(JSON.stringify(data));
      const response = await fetch(
        'http://localhost:3333/session/forgot-password',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const parsed = await response.json();

        console.log({ status: 'success', data: parsed });
        reset();
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
          <div id="email-input" className="flex flex-col gap-1">
            <label htmlFor="name" className="text-pucci-500 font-bold">
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

          <button
            type="submit"
            className="bg-pucci-300 hover:bg-pucci-800 py-2 w-full rounded font-bold text-white transition-colors"
          >
            Recuperar senha
          </button>
        </form>
        <div className="flex flex-col gap-2 text-center text-sm">
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/signup"
          >
            Ainda não é cadastrado?
          </Link>
          <Link
            className="text-pucci-300 hover:text-pucci-800 hover:underline transition-all"
            href="/signin"
          >
            Lembrei minha senha!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
