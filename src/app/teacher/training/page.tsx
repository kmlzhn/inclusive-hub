"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TrainingPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockCourses = [
      {
        id: "1",
        title: "Инклюзивное образование: основы и практики",
        author: "Иванова Е.П.",
        duration: "8 часов",
        level: "Начальный",
        tags: ["Инклюзия", "Методика"],
        progress: 25,
        description: "Курс знакомит с основами инклюзивного образования, принципами и подходами к обучению детей с особыми образовательными потребностями.",
        modules: [
          { title: "Введение в инклюзивное образование", completed: true },
          { title: "Особенности работы с детьми с РАС", completed: false },
          { title: "Адаптация учебных материалов", completed: false },
          { title: "Оценка эффективности инклюзивных практик", completed: false }
        ]
      },
      {
        id: "2",
        title: "Работа с детьми с СДВГ в классе",
        author: "Петров А.С.",
        duration: "6 часов",
        level: "Средний",
        tags: ["СДВГ", "Поведение", "Внимание"],
        progress: 0,
        description: "Практический курс по организации работы с детьми с синдромом дефицита внимания и гиперактивности в условиях общеобразовательного класса.",
        modules: [
          { title: "Понимание СДВГ: причины и проявления", completed: false },
          { title: "Стратегии управления вниманием", completed: false },
          { title: "Адаптация учебной среды", completed: false },
          { title: "Работа с родителями детей с СДВГ", completed: false }
        ]
      },
      {
        id: "3",
        title: "Дислексия: диагностика и методы коррекции",
        author: "Сидорова М.В.",
        duration: "10 часов",
        level: "Продвинутый",
        tags: ["Дислексия", "Чтение", "Коррекция"],
        progress: 60,
        description: "Углубленный курс по выявлению признаков дислексии и применению эффективных методик для развития навыков чтения.",
        modules: [
          { title: "Нейропсихологические основы дислексии", completed: true },
          { title: "Диагностика трудностей чтения", completed: true },
          { title: "Мультисенсорные подходы к обучению чтению", completed: true },
          { title: "Использование технологий для поддержки чтения", completed: false },
          { title: "Оценка прогресса и корректировка стратегий", completed: false }
        ]
      },
      {
        id: "4",
        title: "Сенсорная интеграция в образовательном процессе",
        author: "Козлов Д.И.",
        duration: "5 часов",
        level: "Начальный",
        tags: ["Сенсорика", "Интеграция", "Практика"],
        progress: 100,
        description: "Курс о применении принципов сенсорной интеграции для создания комфортной образовательной среды для всех учеников.",
        modules: [
          { title: "Основы сенсорной интеграции", completed: true },
          { title: "Оценка сенсорного профиля ученика", completed: true },
          { title: "Создание сенсорно-дружественного класса", completed: true },
          { title: "Сенсорные стратегии для улучшения обучения", completed: true }
        ]
      }
    ];

    const mockConsultations = [
      {
        id: "1",
        specialist: "Иванова Анна Петровна",
        role: "Психолог",
        specialization: "Детская психология, СДВГ, тревожные расстройства",
        availableDates: ["2025-10-25", "2025-10-28", "2025-11-02"],
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: "2",
        specialist: "Петров Сергей Николаевич",
        role: "Дефектолог",
        specialization: "Задержка речевого развития, дислексия, дисграфия",
        availableDates: ["2025-10-26", "2025-10-30", "2025-11-05"],
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "3",
        specialist: "Сидорова Елена Александровна",
        role: "Логопед",
        specialization: "Нарушения речи, артикуляция, заикание",
        availableDates: ["2025-10-27", "2025-11-01", "2025-11-04"],
        image: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        id: "4",
        specialist: "Козлов Дмитрий Игоревич",
        role: "Нейропсихолог",
        specialization: "Аутизм, сенсорная интеграция, когнитивное развитие",
        availableDates: ["2025-10-29", "2025-11-03", "2025-11-06"],
        image: "https://randomuser.me/api/portraits/men/55.jpg"
      }
    ];
    
    setTimeout(() => {
      setCourses(mockCourses);
      setConsultations(mockConsultations);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, []);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const openCourseDetails = (course) => {
    setSelectedCourse(course);
    setModalType("course");
    setIsModalOpen(true);
  };

  const openConsultationDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setModalType("consultation");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setSelectedConsultation(null);
  };

  const handleBookConsultation = (date) => {
    alert(`Консультация с ${selectedConsultation.specialist} забронирована на ${new Date(date).toLocaleDateString('ru-RU')}`);
    closeModal();
  };

  const handleStartCourse = (course) => {
    alert(`Вы начали курс "${course.title}"`);
    const updatedCourses = courses.map(c => {
      if (c.id === course.id && c.progress === 0) {
        return { ...c, progress: 5 };
      }
      return c;
    });
    setCourses(updatedCourses);
    closeModal();
  };

  const handleContinueCourse = (course) => {
    alert(`Вы продолжили курс "${course.title}"`);
    closeModal();
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal for course or consultation details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === "course" ? "Информация о курсе" : "Запись на консультацию"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {modalType === "course" && selectedCourse && (
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">{selectedCourse.title}</h4>
                <p className="text-gray-700">{selectedCourse.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Автор</p>
                    <p className="text-gray-900">{selectedCourse.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Длительность</p>
                    <p className="text-gray-900">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Уровень</p>
                    <p className="text-gray-900">{selectedCourse.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Прогресс</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${selectedCourse.progress}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-900 mb-2">Модули курса</h5>
                  <ul className="space-y-2">
                    {selectedCourse.modules.map((module, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-2 h-5 w-5 flex items-center justify-center rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                          {module.completed && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        <span className={module.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                          {module.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end mt-6">
                  {selectedCourse.progress === 0 ? (
                    <button
                      onClick={() => handleStartCourse(selectedCourse)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Начать курс
                    </button>
                  ) : selectedCourse.progress === 100 ? (
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md cursor-default"
                    >
                      Курс завершен
                    </button>
                  ) : (
                    <button
                      onClick={() => handleContinueCourse(selectedCourse)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Продолжить обучение
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {modalType === "consultation" && selectedConsultation && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={selectedConsultation.image} 
                      alt={selectedConsultation.specialist} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedConsultation.specialist}</h4>
                    <p className="text-gray-600">{selectedConsultation.role}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Специализация</p>
                  <p className="text-gray-900">{selectedConsultation.specialization}</p>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-900 mb-2">Доступные даты</h5>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {selectedConsultation.availableDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => handleBookConsultation(date)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm"
                      >
                        {new Date(date).toLocaleDateString('ru-RU')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Обучение и консультации</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Назад
          </button>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex">
                <button
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === "courses"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  Онлайн курсы
                </button>
                <button
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === "consultations"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("consultations")}
                >
                  Консультации специалистов
                </button>
              </nav>
            </div>
            
            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Доступные курсы</h2>
                  <p className="text-gray-600">Повышайте свою квалификацию с помощью специализированных курсов по инклюзивному образованию</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{course.author}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mb-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Прогресс</span>
                          <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">Уровень: {course.level}</span>
                        <button
                          onClick={() => openCourseDetails(course)}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Consultations Tab */}
            {activeTab === "consultations" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Консультации специалистов</h2>
                  <p className="text-gray-600">Запишитесь на индивидуальную консультацию с экспертами в области инклюзивного образования</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {consultations.map((consultation) => (
                    <div key={consultation.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={consultation.image} 
                              alt={consultation.specialist} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{consultation.specialist}</h3>
                            <p className="text-sm text-gray-500">{consultation.role}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-4">{consultation.specialization}</p>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Ближайшая доступная дата:</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(consultation.availableDates[0]).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-end">
                        <button
                          onClick={() => openConsultationDetails(consultation)}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          Записаться
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
