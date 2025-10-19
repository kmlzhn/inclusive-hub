"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import NavBar from "@/components/layout/NavBar";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const { t } = useLanguage();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('common.loading')}</p>
      </div>
    );
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "ADMIN": return t('role.admin');
      case "TEACHER": return t('role.teacher');
      case "PSYCHOLOGIST": return t('role.psychologist');
      case "DEFECTOLOGIST": return t('role.defectologist');
      case "SPEECH_THERAPIST": return t('role.speech_therapist');
      case "TUTOR": return t('role.tutor');
      default: return t('role.user');
    }
  };

  const getModulesByRole = () => {
    switch (session?.user?.role) {
      case "ADMIN":
        return [
          { name: t('dashboard.admin.user_management'), description: t('dashboard.admin.user_management_desc'), path: "/admin/users" },
          { name: t('dashboard.admin.reports'), description: t('dashboard.admin.reports_desc'), path: "/admin/reports" },
          { name: t('dashboard.admin.resources'), description: t('dashboard.admin.resources_desc'), path: "/admin/resources" }
        ];
      case "TEACHER":
        return [
          { name: t('dashboard.teacher.students'), description: t('dashboard.teacher.students_desc'), path: "/teacher/students" },
          { name: t('dashboard.teacher.assignments'), description: t('dashboard.teacher.assignments_desc'), path: "/teacher/assignments" },
          { name: t('dashboard.teacher.attendance'), description: t('dashboard.teacher.attendance_desc'), path: "/teacher/attendance" },
          { name: t('dashboard.teacher.training'), description: t('dashboard.teacher.training_desc'), path: "/teacher/training" }
        ];
      case "PSYCHOLOGIST":
        return [
          { name: t('dashboard.specialist.students'), description: t('dashboard.specialist.students_desc'), path: "/specialist/students" },
          { name: t('dashboard.specialist.iop'), description: t('dashboard.specialist.iop_desc'), path: "/specialist/iop" },
          { name: t('dashboard.specialist.consultations'), description: t('dashboard.specialist.consultations_desc'), path: "/specialist/consultations" },
          { name: t('dashboard.specialist.reports'), description: t('dashboard.specialist.reports_desc'), path: "/specialist/reports" },
          { name: t('dashboard.specialist.training'), description: t('dashboard.specialist.training_desc_psychologist'), path: "/specialist/training" }
        ];
      case "DEFECTOLOGIST":
        return [
          { name: t('dashboard.specialist.students'), description: t('dashboard.specialist.students_desc'), path: "/specialist/students" },
          { name: t('dashboard.specialist.iop'), description: t('dashboard.specialist.iop_desc'), path: "/specialist/iop" },
          { name: t('dashboard.specialist.consultations'), description: t('dashboard.specialist.consultations_desc'), path: "/specialist/consultations" },
          { name: t('dashboard.specialist.reports'), description: t('dashboard.specialist.reports_desc'), path: "/specialist/reports" },
          { name: t('dashboard.specialist.training'), description: t('dashboard.specialist.training_desc_defectologist'), path: "/specialist/training" }
        ];
      case "SPEECH_THERAPIST":
        return [
          { name: t('dashboard.specialist.students'), description: t('dashboard.specialist.students_desc'), path: "/specialist/students" },
          { name: t('dashboard.specialist.iop'), description: t('dashboard.specialist.iop_desc'), path: "/specialist/iop" },
          { name: t('dashboard.specialist.consultations'), description: t('dashboard.specialist.consultations_desc'), path: "/specialist/consultations" },
          { name: t('dashboard.specialist.reports'), description: t('dashboard.specialist.reports_desc'), path: "/specialist/reports" },
          { name: t('dashboard.specialist.training'), description: t('dashboard.specialist.training_desc_speech'), path: "/specialist/training" }
        ];
      case "TUTOR":
        return [
          { name: t('dashboard.specialist.students'), description: t('dashboard.specialist.students_desc'), path: "/specialist/students" },
          { name: t('dashboard.specialist.iop'), description: t('dashboard.specialist.iop_desc'), path: "/specialist/iop" },
          { name: t('dashboard.specialist.consultations'), description: t('dashboard.specialist.consultations_desc'), path: "/specialist/consultations" },
          { name: t('dashboard.specialist.reports'), description: t('dashboard.specialist.reports_desc'), path: "/specialist/reports" },
          { name: t('dashboard.specialist.training'), description: t('dashboard.specialist.training_desc_tutor'), path: "/specialist/training" }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar title={t('page.dashboard.title')} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Информация о пользователе */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t('page.dashboard.user_info')}
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t('page.dashboard.user_name')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t('page.dashboard.user_email')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {session?.user?.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t('page.dashboard.user_role')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {getRoleName(session?.user?.role || "")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Общие ресурсы - доступны для всех */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">{t('page.dashboard.common_resources')}</h3>
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
                        <h4 className="text-lg font-medium text-gray-900">{t('page.dashboard.ai_chatbot')}</h4>
                        <p className="mt-1 text-sm text-gray-600">{t('page.dashboard.ai_chatbot_desc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3">
                    <button 
                      onClick={() => router.push("/chat")}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t('page.dashboard.open_chat')}
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
                        <h4 className="text-lg font-medium text-gray-900">{t('page.dashboard.normative_acts.title')}</h4>
                        <p className="mt-1 text-sm text-gray-600">{t('page.dashboard.normative_acts.description')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3">
                    <button 
                      onClick={() => router.push("/legal")}
                      className="text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      {t('page.dashboard.normative_acts.open')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Доступные модули */}
            <h3 className="text-xl font-semibold mb-4">{t('page.dashboard.role_modules')}</h3>
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
                      {t('common.open')}
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