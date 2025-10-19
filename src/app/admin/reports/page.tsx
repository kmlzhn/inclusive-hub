"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Мок данных для отчетов
const mockReports = [
  {
    id: "1",
    title: "Ерекше қажеттіліктері бар оқушылардың оқу нәтижелері бойынша есеп",
    description: "Соңғы тоқсандағы ерекше білім беру қажеттіліктері бар оқушылардың оқу нәтижелерін талдау",
    date: "2025-10-01T10:00:00Z",
    type: "academic"
  },
  {
    id: "2",
    title: "Қатысу бойынша есеп",
    description: "Ерекше қажеттіліктері бар оқушылардың қатысу статистикасы",
    date: "2025-10-05T10:00:00Z",
    type: "attendance"
  },
  {
    id: "3",
    title: "Жеке жоспарлар бойынша есеп",
    description: "Жеке білім беру жоспарларын орындауды талдау",
    date: "2025-10-10T10:00:00Z",
    type: "iop"
  }
];

// Мок данных для статистики
const mockStats = {
  totalStudents: 45,
  totalTeachers: 12,
  specialistsCount: {
    psychologists: 3,
    defectologists: 2,
    speechTherapists: 4,
    tutors: 5
  },
  attendanceRate: 87,
  iopCompletionRate: 76
};

export default function ReportsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const { t } = useLanguage();
  const router = useRouter();
  const [reports, setReports] = useState(mockReports);
  const [stats, setStats] = useState(mockStats);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Проверка роли пользователя
  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('reports.loading')}</p>
      </div>
    );
  }

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
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
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('reports.title')}</h2>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
          >
            {t('reports.back_to_dashboard')}
          </button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Статистика */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{t('reports.general_statistics')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.total_students_sen')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalStudents}</dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.total_teachers')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalTeachers}</dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.attendance')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.attendanceRate}%</dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.iop_completion')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.iopCompletionRate}%</dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.psychologists')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.specialistsCount.psychologists}</dd>
                    </dl>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{t('reports.defectologists')}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.specialistsCount.defectologists}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Отчеты */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('reports.available_reports')}</h3>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('reports.report_name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('reports.report_description')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('reports.report_date')}
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">{t('reports.actions')}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            {t('reports.view')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра отчета */}
      {isModalOpen && selectedReport && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedReport.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {selectedReport.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {t('reports.report_date')}: {new Date(selectedReport.date).toLocaleDateString()}
                      </p>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">{t('reports.report_content')}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {t('reports.demo_content')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t('reports.close')}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t('reports.download_pdf')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
