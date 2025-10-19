"use client";

import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function LoginPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Переключатель языка */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo/logo.jpg"
              alt="InclusiveHub Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-primary-700">
            Inclusive<span className="text-secondary-500">Hub</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.platform_description')}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
