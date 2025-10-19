"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default async function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <StudentDetailsClient params={resolvedParams} />;
}

function StudentDetailsClient({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newObservation, setNewObservation] = useState({ content: "", date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockStudents = [
      { 
        id: "1", 
        firstName: "Иван", 
        lastName: "Иванов", 
        middleName: "Иванович",
        birthDate: "2014-05-15",
        grade: "5А", 
        specialNeeds: ["ADHD", "Дислексия"],
        medicalHistory: [
          { date: "2022-09-01", diagnosis: "СДВГ (ADHD)", doctor: "Петров А.И.", notes: "Рекомендовано: структурированная среда обучения, частые перерывы" },
          { date: "2022-10-15", diagnosis: "Дислексия", doctor: "Сидорова М.П.", notes: "Трудности с чтением и распознаванием слов. Рекомендовано: дополнительное время для чтения, аудиоматериалы" }
        ],
        observations: [
          { date: "2025-09-15", content: "Трудно концентрируется на длительных заданиях. Лучше работает с визуальными материалами." },
          { date: "2025-10-05", content: "Показывает прогресс при использовании цветных маркеров для выделения текста." }
        ]
      },
      { 
        id: "2", 
        firstName: "Мария", 
        lastName: "Петрова", 
        middleName: "Алексеевна",
        birthDate: "2013-08-23",
        grade: "6Б", 
        specialNeeds: ["Аутизм"],
        medicalHistory: [
          { date: "2021-05-10", diagnosis: "Аутизм", doctor: "Иванов С.Н.", notes: "Рекомендовано: предсказуемый распорядок дня, визуальные расписания, сенсорные перерывы" }
        ],
        observations: [
          { date: "2025-09-10", content: "Хорошо реагирует на визуальное расписание. Трудности при изменении рутины." },
          { date: "2025-10-12", content: "Проявляет интерес к математике. Успешно работает в тихой обстановке." }
        ]
      },
      { 
        id: "3", 
        firstName: "Алексей", 
        lastName: "Смирнов", 
        middleName: "Дмитриевич",
        birthDate: "2014-11-30",
        grade: "5А", 
        specialNeeds: ["ЗПР"],
        medicalHistory: [
          { date: "2023-02-15", diagnosis: "Задержка психического развития", doctor: "Кузнецова Е.В.", notes: "Рекомендовано: адаптированная программа обучения, дополнительные визуальные материалы, пошаговые инструкции" }
        ],
        observations: [
          { date: "2025-09-20", content: "Требуется дополнительное время для выполнения заданий. Хорошо работает в малых группах." },
          { date: "2025-10-18", content: "Прогресс в математике при использовании конкретных материалов и визуальных пособий." }
        ]
      },
      { 
        id: "4", 
        firstName: "Елена", 
        lastName: "Козлова", 
        middleName: "Сергеевна",
        birthDate: "2012-04-05",
        grade: "7В", 
        specialNeeds: ["Дисграфия"],
        medicalHistory: [
          { date: "2022-12-10", diagnosis: "Дисграфия", doctor: "Морозова А.П.", notes: "Трудности с письмом. Рекомендовано: использование компьютера для письменных работ, дополнительное время, специальные упражнения для развития моторики" }
        ],
        observations: [
          { date: "2025-09-05", content: "Испытывает трудности при письменных заданиях. Устные ответы значительно лучше письменных." },
          { date: "2025-10-22", content: "Показывает улучшение при использовании клавиатуры вместо рукописного ввода." }
        ]
      }
    ];
    
    setTimeout(() => {
      const foundStudent = mockStudents.find(s => s.id === params.id);
      setStudent(foundStudent || null);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, [params.id]);

  const handleBackToStudents = () => {
    router.push("/teacher/students");
  };

  const handleViewIOP = () => {
    router.push(`/teacher/students/iop/${params.id}`);
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewObservation({ content: "", date: new Date().toISOString().split('T')[0] });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewObservation({
      ...newObservation,
      [name]: value
    });
  };
  
  const handleAddObservation = () => {
    if (!newObservation.content.trim()) {
      alert("Пожалуйста, введите текст наблюдения");
      return;
    }
    
    // Add the new observation to the student's observations array
    const updatedStudent = {
      ...student,
      observations: [
        {
          date: newObservation.date,
          content: newObservation.content
        },
        ...student.observations
      ]
    };
    
    setStudent(updatedStudent);
    handleCloseModal();
    
    // В реальном приложении здесь был бы запрос к API для сохранения данных
    alert("Наблюдение успешно добавлено!");
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Ученик не найден</h2>
          <button
            onClick={handleBackToStudents}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal for adding new observation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Добавить наблюдение</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Дата
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newObservation.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Описание наблюдения
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  value={newObservation.content}
                  onChange={handleInputChange}
                  placeholder="Введите ваши наблюдения..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 flex space-x-2 justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleAddObservation}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Карточка ученика</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleViewIOP}
              className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700"
            >
              Индивидуальный план
            </button>
            <button
              onClick={handleBackToStudents}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Назад к списку
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Карточка ученика */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {student.lastName} {student.firstName} {student.middleName}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Класс: {student.grade}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ФИО</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {student.lastName} {student.firstName} {student.middleName}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Дата рождения</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(student.birthDate).toLocaleDateString('ru-RU')}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Класс</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {student.grade}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Особые потребности</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex flex-wrap gap-1">
                        {student.specialNeeds.map((need: string, index: number) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {need}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Вкладки */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "info"
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("info")}
                  >
                    Медицинская карта
                  </button>
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === "observations"
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("observations")}
                  >
                    Наблюдения
                  </button>
                </nav>
              </div>
              
              {/* Содержимое вкладок */}
              <div className="px-4 py-5 sm:p-6">
                {activeTab === "info" && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Медицинская карта</h4>
                    {student.medicalHistory.length > 0 ? (
                      <div className="space-y-6">
                        {student.medicalHistory.map((record: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <h5 className="text-md font-medium text-gray-900">{record.diagnosis}</h5>
                              <span className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Врач: {record.doctor}</p>
                            <p className="text-sm text-gray-700 mt-2">{record.notes}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Медицинская информация отсутствует</p>
                    )}
                  </div>
                )}
                
                {activeTab === "observations" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Наблюдения</h4>
                      <button 
                        onClick={handleOpenModal}
                        className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700"
                      >
                        Добавить наблюдение
                      </button>
                    </div>
                    {student.observations.length > 0 ? (
                      <div className="space-y-4">
                        {student.observations.map((observation: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <p className="text-sm text-gray-700">{observation.content}</p>
                              <span className="text-sm text-gray-500 ml-4">{new Date(observation.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Наблюдения отсутствуют</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
