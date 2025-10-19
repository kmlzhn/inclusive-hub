import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-primary-700">InclusiveHub</h1>
          <p className="mt-2 text-sm text-gray-600">
            Платформа для инклюзивного образования
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
