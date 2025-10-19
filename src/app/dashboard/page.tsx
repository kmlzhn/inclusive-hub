"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "ADMIN": return "Администратор";
      case "TEACHER": return "Учитель";
      case "PSYCHOLOGIST": return "Психолог";
      case "DEFECTOLOGIST": return "Дефектолог";
      case "SPEECH_THERAPIST": return "Логопед";
      case "TUTOR": return "Тьютор";
      default: return "Пользователь";
    }
  };

  const getModulesByRole = () => {
    switch (session?.user?.role) {
      case "ADMIN":
        return [
          { name: "Управление пользователями", description: "Добавление и редактирование учетных записей", path: "/admin/users" },
          { name: "Статистика и отчеты", description: "Общая статистика по школе", path: "/admin/reports" },
          { name: "Распределение ресурсов", description: "Управление ресурсами школы", path: "/admin/resources" }
        ];
      case "TEACHER":
        return [
          { name: "Мои ученики", description: "Список учеников с особыми потребностями", path: "/teacher/students" },
          { name: "Задания", description: "Создание и проверка заданий", path: "/teacher/assignments" },
          { name: "Посещаемость", description: "Отметка посещаемости", path: "/teacher/attendance" },
          { name: "Обучение", description: "Тренинги и консультации для учителей", path: "/teacher/training" }
        ];
      case "PSYCHOLOGIST":
        return [
          { name: "Мои ученики", description: "Список учеников с особыми потребностями", path: "/specialist/students" },
          { name: "Индивидуальные планы", description: "Индивидуальные образовательные планы", path: "/specialist/iop" },
          { name: "Консультации", description: "Расписание и записи консультаций", path: "/specialist/consultations" },
          { name: "Отчеты", description: "Отчеты о проделанной работе", path: "/specialist/reports" },
          { name: "Тренинги", description: "Материалы по психологической поддержке", path: "/specialist/training" }
        ];
      case "DEFECTOLOGIST":
        return [
          { name: "Мои ученики", description: "Список учеников с особыми потребностями", path: "/specialist/students" },
          { name: "Индивидуальные планы", description: "Индивидуальные образовательные планы", path: "/specialist/iop" },
          { name: "Консультации", description: "Расписание и записи консультаций", path: "/specialist/consultations" },
          { name: "Отчеты", description: "Отчеты о проделанной работе", path: "/specialist/reports" },
          { name: "Тренинги", description: "Материалы по коррекционной педагогике", path: "/specialist/training" }
        ];
      case "SPEECH_THERAPIST":
        return [
          { name: "Мои ученики", description: "Список учеников с особыми потребностями", path: "/specialist/students" },
          { name: "Индивидуальные планы", description: "Индивидуальные образовательные планы", path: "/specialist/iop" },
          { name: "Консультации", description: "Расписание и записи консультаций", path: "/specialist/consultations" },
          { name: "Отчеты", description: "Отчеты о проделанной работе", path: "/specialist/reports" },
          { name: "Тренинги", description: "Материалы по речевому развитию", path: "/specialist/training" }
        ];
      case "TUTOR":
        return [
          { name: "Мои ученики", description: "Список учеников с особыми потребностями", path: "/specialist/students" },
          { name: "Индивидуальные планы", description: "Индивидуальные образовательные планы", path: "/specialist/iop" },
          { name: "Консультации", description: "Расписание и записи консультаций", path: "/specialist/consultations" },
          { name: "Отчеты", description: "Отчеты о проделанной работе", path: "/specialist/reports" },
          { name: "Тренинги", description: "Материалы по тьюторскому сопровождению", path: "/specialist/training" }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Навигационная панель */}
      <nav className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">InclusiveHub</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center max-w-xs text-sm focus:outline-none"
                  >
                    <span className="mr-2">{session?.user?.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Панель управления</h2>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Информация о пользователе */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Информация о пользователе
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ФИО</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Роль</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {getRoleName(session?.user?.role || "")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Общие ресурсы - доступны для всех */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Общие ресурсы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI Чат-бот */}
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-medium text-gray-900">AI Чат-бот по инклюзии</h4>
                        <p className="mt-1 text-sm text-gray-600">Получите помощь по вопросам инклюзивного образования</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3">
                    <button 
                      onClick={() => router.push("/chat")}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Открыть чат-бот →
                    </button>
                  </div>
                </div>

                {/* Нормативные акты */}
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-medium text-gray-900">Нормативные акты</h4>
                        <p className="mt-1 text-sm text-gray-600">Законы и правовые документы по инклюзии</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3">
                    <button 
                      onClick={() => router.push("/legal")}
                      className="text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      Открыть документы →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Доступные модули */}
            <h3 className="text-xl font-semibold mb-4">Доступные модули</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getModulesByRole().map((module, index) => (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-lg font-medium text-gray-900">{module.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">{module.description}</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3">
                    <button 
                      onClick={() => module.path && router.push(module.path)}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Открыть
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}