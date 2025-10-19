"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'Произошла ошибка при аутентификации';

  if (error === 'CredentialsSignin') {
    errorMessage = 'Неверный email или пароль';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка входа</h1>
          <p className="text-gray-700 mb-6">{errorMessage}</p>
          <Link href="/auth/login" className="btn btn-primary">
            Вернуться на страницу входа
          </Link>
        </div>
      </div>
    </div>
  );
}
