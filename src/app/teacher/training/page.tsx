"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrainingPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockCourses = [
      {
        id: "1",
        title: "Инклюзивті білім беру: негіздері мен тәжірибелері",
        author: "Айгүл Е.П.",
        duration: "8 сағат",
        level: "Бастапқы",
        tags: ["Инклюзия", "Әдістеме"],
        progress: 25,
        description: "Курс инклюзивті білім берудің негіздерімен, ерекше білім беру қажеттіліктері бар балаларды оқыту принциптері мен тәсілдерімен таныстырады.",
        modules: [
          { title: "Инклюзивті білім беруге кіріспе", completed: true },
          { title: "РАС бар балалармен жұмыс ерекшеліктері", completed: false },
          { title: "Оқу материалдарын бейімдеу", completed: false },
          { title: "Инклюзивті тәжірибелердің тиімділігін бағалау", completed: false }
        ]
      },
      {
        id: "2",
        title: "СДВГ бар балалармен сыныпта жұмыс",
        author: "Нұрлан А.С.",
        duration: "6 сағат",
        level: "Орташа",
        tags: ["СДВГ", "Мінез-құлық", "Назар"],
        progress: 0,
        description: "Жалпы білім беретін сынып жағдайында назар тапшылығы мен гиперактивтілік синдромы бар балалармен жұмысты ұйымдастыру бойынша практикалық курс.",
        modules: [
          { title: "СДВГ түсіну: себептері мен көріністері", completed: false },
          { title: "Назарды басқару стратегиялары", completed: false },
          { title: "Оқу ортасын бейімдеу", completed: false },
          { title: "СДВГ бар балалардың ата-аналарымен жұмыс", completed: false }
        ]
      },
      {
        id: "3",
        title: "Дислексия: диагностика және түзету әдістері",
        author: "Жанар М.В.",
        duration: "10 сағат",
        level: "Жоғары",
        tags: ["Дислексия", "Оқу", "Түзету"],
        progress: 60,
        description: "Дислексия белгілерін анықтау және оқу дағдыларын дамыту үшін тиімді әдістемелерді қолдану бойынша тереңдетілген курс.",
        modules: [
          { title: "Дислексияның нейропсихологиялық негіздері", completed: true },
          { title: "Оқу қиындықтарын диагностикалау", completed: true },
          { title: "Оқуға мультисенсорлық тәсілдер", completed: true },
          { title: "Оқуды қолдау үшін технологияларды пайдалану", completed: false },
          { title: "Прогресті бағалау және стратегияларды түзету", completed: false }
        ]
      },
      {
        id: "4",
        title: "Білім беру процесіндегі сенсорлық интеграция",
        author: "Дәурен К.И.",
        duration: "5 сағат",
        level: "Бастапқы",
        tags: ["Сенсорика", "Интеграция", "Тәжірибе"],
        progress: 100,
        description: "Барлық оқушылар үшін жайлы білім беру ортасын құру үшін сенсорлық интеграция принциптерін қолдану туралы курс.",
        modules: [
          { title: "Сенсорлық интеграция негіздері", completed: true },
          { title: "Оқушының сенсорлық профилін бағалау", completed: true },
          { title: "Сенсорлық-достық сынып құру", completed: true },
          { title: "Оқуды жақсарту үшін сенсорлық стратегиялар", completed: true }
        ]
      }
    ];

    const mockConsultations = [
      {
        id: "1",
        specialist: "Айгүл Анна Петровна",
        role: "Психолог",
        specialization: "Балалар психологиясы, СДВГ, мазасыздық бұзылулары",
        availableDates: ["2025-10-25", "2025-10-28", "2025-11-02"],
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: "2",
        specialist: "Нұрлан Сергей Николаевич",
        role: "Дефектолог",
        specialization: "Сөйлеу дамуының кешігуі, дислексия, дисграфия",
        availableDates: ["2025-10-26", "2025-10-30", "2025-11-05"],
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "3",
        specialist: "Жанар Елена Александровна",
        role: "Логопед",
        specialization: "Сөйлеу бұзылулары, артикуляция, кекіру",
        availableDates: ["2025-10-27", "2025-11-01", "2025-11-04"],
        image: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        id: "4",
        specialist: "Дәурен Дмитрий Игоревич",
        role: "Нейропсихолог",
        specialization: "Аутизм, сенсорлық интеграция, танымдық даму",
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

  const openCourseDetails = (course: any) => {
    setSelectedCourse(course);
    setModalType("course");
    setIsModalOpen(true);
  };

  const openConsultationDetails = (consultation: any) => {
    setSelectedConsultation(consultation);
    setModalType("consultation");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setSelectedConsultation(null);
  };

  const handleBookConsultation = (date: string) => {
    alert(`Консультация с ${selectedConsultation.specialist} забронирована на ${new Date(date).toLocaleDateString('ru-RU')}`);
    closeModal();
  };

  const handleStartCourse = (course: any) => {
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

  const handleContinueCourse = (course: any) => {
    alert(`Вы продолжили курс "${course.title}"`);
    closeModal();
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('training.loading')}</p>
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
                {modalType === "course" ? t('training.course_info') : t('training.book_consultation')}
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
                    <p className="text-sm text-gray-500">{t('training.author')}</p>
                    <p className="text-gray-900">{selectedCourse.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('training.duration')}</p>
                    <p className="text-gray-900">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('training.level')}</p>
                    <p className="text-gray-900">{selectedCourse.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('training.progress')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${selectedCourse.progress}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-900 mb-2">{t('training.course_modules')}</h5>
                  <ul className="space-y-2">
                    {selectedCourse.modules.map((module: any, index: number) => (
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
                      {t('training.start_course')}
                    </button>
                  ) : selectedCourse.progress === 100 ? (
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md cursor-default"
                    >
                      {t('training.course_completed')}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleContinueCourse(selectedCourse)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      {t('training.continue_learning')}
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
                  <p className="text-sm text-gray-500">{t('training.specialization')}</p>
                  <p className="text-gray-900">{selectedConsultation.specialization}</p>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-900 mb-2">{t('training.available_dates')}</h5>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {selectedConsultation.availableDates.map((date: string, index: number) => (
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
                    {t('training.cancel')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('training.title')}</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t('training.back')}
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
                  {t('training.online_courses')}
                </button>
                <button
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === "consultations"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("consultations")}
                >
                  {t('training.specialist_consultations')}
                </button>
              </nav>
            </div>
            
            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('training.available_courses')}</h2>
                  <p className="text-gray-600">{t('training.courses_description')}</p>
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
                          {course.tags.map((tag: string, index: number) => (
                            <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mb-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">{t('training.progress')}</span>
                          <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">{t('training.level')}: {course.level}</span>
                        <button
                          onClick={() => openCourseDetails(course)}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          {t('common.details')}
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('training.consultations_title')}</h2>
                  <p className="text-gray-600">{t('training.consultations_description')}</p>
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
                          <p className="text-xs text-gray-500 mb-2">{t('training.nearest_date')}</p>
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
                          {t('training.book')}
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
