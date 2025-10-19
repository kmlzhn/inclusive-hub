"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для индивидуальных образовательных планов
const mockIops = [
  {
    id: "1",
    studentId: "1",
    studentName: "Смирнов Иван Алексеевич",
    grade: "4А",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    goals: ["Развитие навыков чтения", "Развитие социальных навыков", "Улучшение концентрации внимания"],
    adaptations: ["Увеличенное время на выполнение заданий", "Визуальные подсказки"],
    methods: ["Структурированное обучение", "Сенсорные перерывы", "Визуальное расписание"],
    status: "active"
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Иванова Мария Петровна",
    grade: "5Б",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    goals: ["Развитие математических навыков", "Улучшение навыков письма"],
    adaptations: ["Упрощенные задания", "Дополнительное время"],
    methods: ["Мультисенсорное обучение", "Дробление заданий на части"],
    status: "active"
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Петров Алексей Сергеевич",
    grade: "3В",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    goals: ["Улучшение навыков чтения", "Развитие навыков письма", "Улучшение орфографии"],
    adaptations: ["Специальные учебные материалы", "Устные вместо письменных заданий"],
    methods: ["Фонетический подход", "Использование компьютерных программ"],
    status: "review"
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Сидорова Екатерина Александровна",
    grade: "4Б",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    goals: ["Развитие моторных навыков", "Улучшение речи"],
    adaptations: ["Адаптированное рабочее место", "Использование специальных устройств"],
    methods: ["Физическая терапия", "Эрготерапия"],
    status: "active"
  },
  {
    id: "5",
    studentId: "5",
    studentName: "Кузнецов Дмитрий Иванович",
    grade: "5А",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    goals: ["Развитие навыков ориентации", "Улучшение тактильного восприятия"],
    adaptations: ["Увеличенный шрифт", "Аудиоматериалы"],
    methods: ["Тактильные материалы", "Аудиозаписи уроков"],
    status: "draft"
  }
];

export default function SpecialistIopPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [iops, setIops] = useState(mockIops);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedIop, setSelectedIop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Фильтрация ИОП
  const filteredIops = iops.filter(iop => {
    const nameMatch = searchTerm === "" || iop.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === "" || iop.status === filterStatus;
    return nameMatch && statusMatch;
  });

  const handleViewIop = (iop: any) => {
    setSelectedIop(iop);
    setIsModalOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Активен";
      case "draft": return "Черновик";
      case "review": return "На рассмотрении";
      case "completed": return "Завершен";
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
      <NavBar title={`${getSpecialistTitle()}: Индивидуальные образовательные планы`} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Фильтры и поиск */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/3">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Поиск по имени ученика</label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Введите ФИО ученика"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Фильтр по статусу</label>
                <select
                  id="status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                >
                  <option value="">Все статусы</option>
                  <option value="active">Активные</option>
                  <option value="draft">Черновики</option>
                  <option value="review">На рассмотрении</option>
                  <option value="completed">Завершенные</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 flex items-end">
                <button
                  onClick={() => {/* Создать новый ИОП */}}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium"
                >
                  Создать новый ИОП
                </button>
              </div>
            </div>

            {/* Список ИОП */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ученик
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Класс
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Период
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цели
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIops.map((iop) => (
                    <tr key={iop.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{iop.studentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{iop.grade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(iop.startDate).toLocaleDateString()} - {new Date(iop.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(iop.status)}`}>
                          {getStatusText(iop.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {iop.goals.slice(0, 2).map((goal, index) => (
                            <div key={index}>{goal}</div>
                          ))}
                          {iop.goals.length > 2 && <div>...</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewIop(iop)}
                          className="text-gray-600 hover:text-gray-900 mr-4"
                        >
                          Просмотр
                        </button>
                        <button
                          onClick={() => {/* Редактировать ИОП */}}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Редактировать
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра ИОП */}
      {isModalOpen && selectedIop && (
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
                      Индивидуальный образовательный план
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Информация об ученике</h4>
                        <p className="text-sm text-gray-500">ФИО: {selectedIop.studentName}</p>
                        <p className="text-sm text-gray-500">Класс: {selectedIop.grade}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Период действия</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedIop.startDate).toLocaleDateString()} - {new Date(selectedIop.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Цели</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500">
                          {selectedIop.goals.map((goal: string, index: number) => (
                            <li key={index}>{goal}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Адаптации</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500">
                          {selectedIop.adaptations.map((adaptation: string, index: number) => (
                            <li key={index}>{adaptation}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Методы</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500">
                          {selectedIop.methods.map((method: string, index: number) => (
                            <li key={index}>{method}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Статус</h4>
                        <p className="text-sm text-gray-500">{getStatusText(selectedIop.status)}</p>
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
                <button
                  type="button"
                  onClick={() => {/* Редактировать ИОП */}}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Редактировать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
