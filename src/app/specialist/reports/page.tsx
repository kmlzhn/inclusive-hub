"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для отчетов
const mockReports = [
  {
    id: "1",
    title: "Отчет о проведенных консультациях",
    period: "Сентябрь 2025",
    createdAt: "2025-10-01T10:00:00Z",
    status: "submitted",
    content: "За сентябрь 2025 года проведено 15 индивидуальных консультаций и 3 групповых занятия. Основные проблемы: трудности с концентрацией внимания, проблемы с социальной адаптацией."
  },
  {
    id: "2",
    title: "Отчет о диагностике учеников 4А класса",
    period: "Октябрь 2025",
    createdAt: "2025-10-15T14:30:00Z",
    status: "draft",
    content: "Проведена диагностика 10 учеников 4А класса. Выявлены проблемы с чтением у 3 учеников, с математикой у 2 учеников. Рекомендованы дополнительные занятия."
  },
  {
    id: "3",
    title: "Отчет о выполнении ИОП",
    period: "3 четверть 2025",
    createdAt: "2025-04-10T09:15:00Z",
    status: "submitted",
    content: "Проанализировано выполнение индивидуальных образовательных планов за 3 четверть. Достигнуты цели по 7 из 10 ИОП. Требуется корректировка 3 ИОП."
  }
];

export default function SpecialistReportsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [reports, setReports] = useState(mockReports);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    period: "",
    content: ""
  });

  // Проверка роли пользователя
  useEffect(() => {
    const specialistRoles = ["PSYCHOLOGIST", "DEFECTOLOGIST", "SPEECH_THERAPIST", "TUTOR"];
    if (!session?.user?.role || !specialistRoles.includes(session.user.role)) {
      redirect("/dashboard");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  // Фильтрация отчетов
  const filteredReports = reports.filter(report => {
    return filterStatus === "" || report.status === filterStatus;
  });

  // Сортировка отчетов по дате создания (от новых к старым)
  const sortedReports = [...filteredReports].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleAddReport = () => {
    setIsAddModalOpen(true);
    setFormData({
      title: "",
      period: "",
      content: ""
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport = {
      id: String(reports.length + 1),
      title: formData.title,
      period: formData.period,
      createdAt: new Date().toISOString(),
      status: "draft",
      content: formData.content
    };
    
    setReports([...reports, newReport]);
    setIsAddModalOpen(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "submitted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft": return "Черновик";
      case "submitted": return "Отправлен";
      case "rejected": return "Отклонен";
      default: return "Неизвестно";
    }
  };

  const getSpecialistTitle = () => {
    switch (session?.user?.role) {
      case "PSYCHOLOGIST": return "Психолог";
      case "DEFECTOLOGIST": return "Дефектолог";
      case "SPEECH_THERAPIST": return "Логопед";
      case "TUTOR": return "Тьютор";
      default: return "Специалист";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar title={`${getSpecialistTitle()}: Отчеты`} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Фильтры и кнопка добавления */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Фильтр по статусу</label>
                <select
                  id="status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                >
                  <option value="">Все статусы</option>
                  <option value="draft">Черновики</option>
                  <option value="submitted">Отправленные</option>
                  <option value="rejected">Отклоненные</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 flex items-end">
                <button
                  onClick={handleAddReport}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium"
                >
                  Создать отчет
                </button>
              </div>
            </div>

            {/* Список отчетов */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              {sortedReports.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Период
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата создания
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Действия</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.period}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(report.status)}`}>
                            {getStatusText(report.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-gray-600 hover:text-gray-900 mr-4"
                          >
                            Просмотр
                          </button>
                          {report.status === "draft" && (
                            <>
                              <button
                                className="text-gray-600 hover:text-gray-900 mr-4"
                                onClick={() => {/* Редактировать отчет */}}
                              >
                                Редактировать
                              </button>
                              <button
                                className="text-green-600 hover:text-green-900"
                                onClick={() => {/* Отправить отчет */}}
                              >
                                Отправить
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Нет отчетов, соответствующих фильтру</p>
                </div>
              )}
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
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Период</h4>
                        <p className="text-sm text-gray-500">{selectedReport.period}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Дата создания</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedReport.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Статус</h4>
                        <p className="text-sm text-gray-500">{getStatusText(selectedReport.status)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Содержание</h4>
                        <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">{selectedReport.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Закрыть
                </button>
                {selectedReport.status === "draft" && (
                  <button
                    type="button"
                    onClick={() => {/* Редактировать отчет */}}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Редактировать
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для создания отчета */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Создать отчет
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Название отчета
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                            Период
                          </label>
                          <input
                            type="text"
                            name="period"
                            id="period"
                            value={formData.period}
                            onChange={handleFormChange}
                            required
                            placeholder="Например: Октябрь 2025"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Содержание отчета
                          </label>
                          <textarea
                            name="content"
                            id="content"
                            rows={6}
                            value={formData.content}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Создать
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
