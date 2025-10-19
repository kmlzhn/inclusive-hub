import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
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
            Платформа для инклюзивного образования
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
