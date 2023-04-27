'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  password: string;
  confirm_password: string;
};

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const parsedPath = path
    ?.split('/')
    .filter((item) => Boolean(item))
    .join('/');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({});
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(JSON.stringify(data));
      const response = await fetch(
        `http://localhost:3333/session/${parsedPath}`,
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
          <div id="password-input" className="flex flex-col gap-1">
            <label htmlFor="password" className="text-pucci-500 font-bold">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Insira sua senha"
              className={`p-2 bg-slate-50 text-slate-700 placeholder:text-slate-400 ${
                errors.password
                  ? 'focus:outline-red-500'
                  : 'focus:outline-pucci-300'
              }  rounded`}
              defaultValue={''}
              {...register('password', { required: true })}
            />
            {errors.password && (
              <small className="text-red-500 text-xs">Campo obrigatório</small>
            )}
          </div>
          <div id="confirm-password-input" className="flex flex-col gap-1">
            <label
              htmlFor="confirm_password"
              className="text-pucci-500 font-bold"
            >
              Confirmação de Senha
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
            Redefinir senha
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

export default ResetPassword;
