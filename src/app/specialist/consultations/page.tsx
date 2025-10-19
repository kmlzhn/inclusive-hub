"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для консультаций
const mockConsultations = [
  {
    id: "1",
    date: "2025-10-20T10:00:00Z",
    studentId: "1",
    studentName: "Смирнов Иван Алексеевич",
    grade: "4А",
    type: "individual",
    status: "scheduled",
    notes: ""
  },
  {
    id: "2",
    date: "2025-10-21T11:30:00Z",
    studentId: "2",
    studentName: "Иванова Мария Петровна",
    grade: "5Б",
    type: "individual",
    status: "scheduled",
    notes: "Обсуждение прогресса по ИОП"
  },
  {
    id: "3",
    date: "2025-10-22T13:00:00Z",
    studentId: "3",
    studentName: "Петров Алексей Сергеевич",
    grade: "3В",
    type: "group",
    status: "scheduled",
    notes: "Групповое занятие с родителями"
  },
  {
    id: "4",
    date: "2025-10-15T14:30:00Z",
    studentId: "4",
    studentName: "Сидорова Екатерина Александровна",
    grade: "4Б",
    type: "individual",
    status: "completed",
    notes: "Проведена первичная диагностика"
  },
  {
    id: "5",
    date: "2025-10-16T09:00:00Z",
    studentId: "5",
    studentName: "Кузнецов Дмитрий Иванович",
    grade: "5А",
    type: "individual",
    status: "completed",
    notes: "Обсуждены результаты тестирования"
  }
];

export default function SpecialistConsultationsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [consultations, setConsultations] = useState(mockConsultations);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    studentId: "",
    studentName: "",
    type: "individual",
    notes: ""
  });

  // Мок данных для выбора учеников
  const mockStudentOptions = [
    { id: "1", name: "Смирнов Иван Алексеевич", grade: "4А" },
    { id: "2", name: "Иванова Мария Петровна", grade: "5Б" },
    { id: "3", name: "Петров Алексей Сергеевич", grade: "3В" },
    { id: "4", name: "Сидорова Екатерина Александровна", grade: "4Б" },
    { id: "5", name: "Кузнецов Дмитрий Иванович", grade: "5А" }
  ];

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

  // Фильтрация консультаций
  const filteredConsultations = consultations.filter(consultation => {
    const statusMatch = filterStatus === "" || consultation.status === filterStatus;
    const typeMatch = filterType === "" || consultation.type === filterType;
    return statusMatch && typeMatch;
  });

  // Сортировка консультаций по дате
  const sortedConsultations = [...filteredConsultations].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Разделение консультаций на предстоящие и прошедшие
  const upcomingConsultations = sortedConsultations.filter(
    c => c.status === "scheduled" && new Date(c.date) > new Date()
  );
  
  const pastConsultations = sortedConsultations.filter(
    c => c.status === "completed" || new Date(c.date) <= new Date()
  );

  const handleViewConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const handleAddConsultation = () => {
    setIsAddModalOpen(true);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: "10:00",
      studentId: "",
      studentName: "",
      type: "individual",
      notes: ""
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "studentId") {
      const selectedStudent = mockStudentOptions.find(s => s.id === value);
      setFormData({
        ...formData,
        studentId: value,
        studentName: selectedStudent ? selectedStudent.name : ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newConsultation = {
      id: String(consultations.length + 1),
      date: `${formData.date}T${formData.time}:00Z`,
      studentId: formData.studentId,
      studentName: formData.studentName,
      grade: mockStudentOptions.find(s => s.id === formData.studentId)?.grade || "",
      type: formData.type,
      status: "scheduled",
      notes: formData.notes
    };
    
    setConsultations([...consultations, newConsultation]);
    setIsAddModalOpen(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled": return "Запланирована";
      case "completed": return "Завершена";
      case "cancelled": return "Отменена";
      default: return "Неизвестно";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "individual": return "Индивидуальная";
      case "group": return "Групповая";
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
      <NavBar title={`${getSpecialistTitle()}: Консультации`} />

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
                  <option value="scheduled">Запланированные</option>
                  <option value="completed">Завершенные</option>
                  <option value="cancelled">Отмененные</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Фильтр по типу</label>
                <select
                  id="type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                >
                  <option value="">Все типы</option>
                  <option value="individual">Индивидуальные</option>
                  <option value="group">Групповые</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 flex items-end">
                <button
                  onClick={handleAddConsultation}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium"
                >
                  Добавить консультацию
                </button>
              </div>
            </div>

            {/* Предстоящие консультации */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Предстоящие консультации</h3>
              {upcomingConsultations.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата и время
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ученик
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Класс
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Тип
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
                      {upcomingConsultations.map((consultation) => (
                        <tr key={consultation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(consultation.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(consultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{consultation.studentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{consultation.grade}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{getTypeText(consultation.type)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(consultation.status)}`}>
                              {getStatusText(consultation.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewConsultation(consultation)}
                              className="text-gray-600 hover:text-gray-900 mr-4"
                            >
                              Просмотр
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => {/* Редактировать консультацию */}}
                            >
                              Редактировать
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <p className="text-gray-500">Нет предстоящих консультаций</p>
                </div>
              )}
            </div>

            {/* Прошедшие консультации */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Прошедшие консультации</h3>
              {pastConsultations.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата и время
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ученик
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Класс
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Тип
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
                      {pastConsultations.map((consultation) => (
                        <tr key={consultation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(consultation.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(consultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{consultation.studentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{consultation.grade}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{getTypeText(consultation.type)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(consultation.status)}`}>
                              {getStatusText(consultation.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewConsultation(consultation)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Просмотр
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <p className="text-gray-500">Нет прошедших консультаций</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра консультации */}
      {isModalOpen && selectedConsultation && (
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
                      Информация о консультации
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Дата и время</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedConsultation.date).toLocaleDateString()}, {' '}
                          {new Date(selectedConsultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Ученик</h4>
                        <p className="text-sm text-gray-500">{selectedConsultation.studentName}</p>
                        <p className="text-sm text-gray-500">Класс: {selectedConsultation.grade}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Тип консультации</h4>
                        <p className="text-sm text-gray-500">{getTypeText(selectedConsultation.type)}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-md font-medium text-gray-900">Статус</h4>
                        <p className="text-sm text-gray-500">{getStatusText(selectedConsultation.status)}</p>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Примечания</h4>
                        <p className="text-sm text-gray-500">{selectedConsultation.notes || "Нет примечаний"}</p>
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
                {selectedConsultation.status === "scheduled" && (
                  <button
                    type="button"
                    onClick={() => {/* Редактировать консультацию */}}
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

      {/* Модальное окно для добавления консультации */}
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
                        Добавить консультацию
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Дата
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            value={formData.date}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Время
                          </label>
                          <input
                            type="time"
                            name="time"
                            id="time"
                            value={formData.time}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                            Ученик
                          </label>
                          <select
                            name="studentId"
                            id="studentId"
                            value={formData.studentId}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          >
                            <option value="">Выберите ученика</option>
                            {mockStudentOptions.map(student => (
                              <option key={student.id} value={student.id}>
                                {student.name} ({student.grade})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Тип консультации
                          </label>
                          <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-primary-500"
                          >
                            <option value="individual">Индивидуальная</option>
                            <option value="group">Групповая</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Примечания
                          </label>
                          <textarea
                            name="notes"
                            id="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleFormChange}
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
                    Добавить
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
