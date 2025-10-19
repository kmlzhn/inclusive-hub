"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для тренингов психолога
const psychologistTrainings = [
  {
    id: "p1",
    title: "Диагностика эмоциональных нарушений у детей с РАС",
    description: "Методики диагностики эмоциональной сферы у детей с расстройствами аутистического спектра",
    type: "webinar",
    date: "2025-11-15T14:00:00Z",
    duration: 90,
    instructor: "Иванова Е.П., клинический психолог",
    materials: ["Презентация", "Опросник", "Методические рекомендации"],
    isCompleted: false
  },
  {
    id: "p2",
    title: "Арт-терапия в работе с тревожными состояниями",
    description: "Практические методы использования арт-терапии для снижения тревожности у детей с ОВЗ",
    type: "workshop",
    date: "2025-11-20T15:30:00Z",
    duration: 120,
    instructor: "Петрова А.С., арт-терапевт",
    materials: ["Видеозапись", "Список материалов", "Сборник упражнений"],
    isCompleted: false
  },
  {
    id: "p3",
    title: "Когнитивно-поведенческая терапия в школе",
    description: "Адаптация методов КПТ для работы с детьми с эмоционально-волевыми нарушениями в школьной среде",
    type: "course",
    date: "2025-10-10T10:00:00Z",
    duration: 480,
    instructor: "Сидоров И.М., психотерапевт",
    materials: ["Учебное пособие", "Рабочая тетрадь", "Сертификат"],
    isCompleted: true
  }
];

// Мок данных для тренингов дефектолога
const defectologistTrainings = [
  {
    id: "d1",
    title: "Нейропсихологический подход в коррекционной работе",
    description: "Применение нейропсихологических методов в работе с детьми с ЗПР и интеллектуальными нарушениями",
    type: "course",
    date: "2025-11-18T10:00:00Z",
    duration: 360,
    instructor: "Кузнецова М.В., нейропсихолог",
    materials: ["Учебник", "Практикум", "Диагностические материалы"],
    isCompleted: false
  },
  {
    id: "d2",
    title: "Сенсорная интеграция в коррекционной педагогике",
    description: "Методы и приемы сенсорной интеграции для детей с нарушениями развития",
    type: "workshop",
    date: "2025-11-25T14:30:00Z",
    duration: 180,
    instructor: "Николаев А.П., дефектолог",
    materials: ["Презентация", "Каталог упражнений", "Видеоматериалы"],
    isCompleted: false
  },
  {
    id: "d3",
    title: "Альтернативная коммуникация для детей с ОВЗ",
    description: "Системы альтернативной коммуникации (PECS, жесты, карточки) для детей с тяжелыми нарушениями речи",
    type: "webinar",
    date: "2025-10-05T11:00:00Z",
    duration: 120,
    instructor: "Смирнова О.Л., специалист по АДК",
    materials: ["Презентация", "Набор карточек PECS", "Методическое пособие"],
    isCompleted: true
  }
];

// Мок данных для тренингов логопеда
const speechTherapistTrainings = [
  {
    id: "s1",
    title: "Коррекция дизартрии у детей школьного возраста",
    description: "Современные методики работы с дизартрией, артикуляционная гимнастика, постановка звуков",
    type: "course",
    date: "2025-11-10T09:00:00Z",
    duration: 300,
    instructor: "Васильева Т.Н., логопед высшей категории",
    materials: ["Учебное пособие", "Альбом упражнений", "Видеоуроки"],
    isCompleted: false
  },
  {
    id: "s2",
    title: "Логоритмика в системе коррекционной работы",
    description: "Использование логоритмических упражнений для развития речи детей с ОВЗ",
    type: "workshop",
    date: "2025-11-22T13:00:00Z",
    duration: 150,
    instructor: "Кузьмина Е.В., логопед-дефектолог",
    materials: ["Презентация", "Аудиоматериалы", "Сборник упражнений"],
    isCompleted: false
  },
  {
    id: "s3",
    title: "Диагностика и коррекция нарушений письменной речи",
    description: "Выявление и коррекция дисграфии и дислексии у младших школьников",
    type: "webinar",
    date: "2025-10-01T15:00:00Z",
    duration: 90,
    instructor: "Соколова И.А., логопед",
    materials: ["Презентация", "Диагностические материалы", "Рабочие листы"],
    isCompleted: true
  }
];

// Мок данных для тренингов тьютора
const tutorTrainings = [
  {
    id: "t1",
    title: "Организация тьюторского сопровождения в инклюзивном классе",
    description: "Методы эффективного сопровождения детей с ОВЗ в условиях инклюзивного образования",
    type: "course",
    date: "2025-11-12T10:00:00Z",
    duration: 240,
    instructor: "Морозова А.В., тьютор-методист",
    materials: ["Учебное пособие", "Шаблоны документов", "Видеолекции"],
    isCompleted: false
  },
  {
    id: "t2",
    title: "Адаптация учебных материалов для детей с ОВЗ",
    description: "Практикум по созданию и адаптации учебных материалов для детей с различными нарушениями",
    type: "workshop",
    date: "2025-11-28T14:00:00Z",
    duration: 180,
    instructor: "Антонов П.С., тьютор",
    materials: ["Презентация", "Образцы материалов", "Методические рекомендации"],
    isCompleted: false
  },
  {
    id: "t3",
    title: "Взаимодействие тьютора с родителями особых детей",
    description: "Стратегии эффективной коммуникации с родителями детей с ОВЗ",
    type: "webinar",
    date: "2025-10-08T16:30:00Z",
    duration: 60,
    instructor: "Дмитриева К.Р., семейный психолог",
    materials: ["Презентация", "Памятка", "Чек-листы"],
    isCompleted: true
  }
];

export default function SpecialistTrainingPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [trainings, setTrainings] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Проверка роли пользователя и загрузка соответствующих тренингов
  useEffect(() => {
    if (!session?.user?.role) {
      return;
    }

    // Выбор тренингов в зависимости от роли специалиста
    switch (session.user.role) {
      case "PSYCHOLOGIST":
        setTrainings(psychologistTrainings);
        break;
      case "DEFECTOLOGIST":
        setTrainings(defectologistTrainings);
        break;
      case "SPEECH_THERAPIST":
        setTrainings(speechTherapistTrainings);
        break;
      case "TUTOR":
        setTrainings(tutorTrainings);
        break;
      default:
        // Если роль не соответствует ни одной из специальностей
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

  // Фильтрация тренингов по типу
  const filteredTrainings = filterType 
    ? trainings.filter(training => training.type === filterType)
    : trainings;

  // Разделение тренингов на предстоящие и прошедшие
  const upcomingTrainings = filteredTrainings.filter(
    training => !training.isCompleted && new Date(training.date) > new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completedTrainings = filteredTrainings.filter(
    training => training.isCompleted || new Date(training.date) <= new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleViewTraining = (training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const getTrainingTypeText = (type) => {
    switch (type) {
      case "webinar": return "Вебинар";
      case "workshop": return "Практикум";
      case "course": return "Курс";
      default: return "Неизвестно";
    }
  };

  const getTrainingTypeBadgeColor = (type) => {
    switch (type) {
      case "webinar": return "bg-blue-100 text-blue-800";
      case "workshop": return "bg-green-100 text-green-800";
      case "course": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
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

  const getSpecialistTrainingTitle = () => {
    switch (session?.user?.role) {
      case "PSYCHOLOGIST": return "Тренинги по психологической поддержке";
      case "DEFECTOLOGIST": return "Тренинги по коррекционной педагогике";
      case "SPEECH_THERAPIST": return "Тренинги по речевому развитию";
      case "TUTOR": return "Тренинги по тьюторскому сопровождению";
      default: return "Тренинги";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar title={`${getSpecialistTitle()}: ${getSpecialistTrainingTitle()}`} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Фильтры */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Фильтр по типу</label>
                <select
                  id="type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Все типы</option>
                  <option value="webinar">Вебинары</option>
                  <option value="workshop">Практикумы</option>
                  <option value="course">Курсы</option>
                </select>
              </div>
            </div>

            {/* Предстоящие тренинги */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Предстоящие тренинги</h3>
              {upcomingTrainings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingTrainings.map((training) => (
                    <div key={training.id} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">{training.title}</h4>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTrainingTypeBadgeColor(training.type)}`}>
                            {getTrainingTypeText(training.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                        <div className="text-sm text-gray-500">
                          <p>
                            <span className="font-medium">Дата:</span> {new Date(training.date).toLocaleDateString()}, {' '}
                            {new Date(training.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p>
                            <span className="font-medium">Продолжительность:</span> {training.duration} мин.
                          </p>
                          <p>
                            <span className="font-medium">Ведущий:</span> {training.instructor}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-end">
                        <button
                          onClick={() => handleViewTraining(training)}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <p className="text-gray-500">Нет предстоящих тренингов</p>
                </div>
              )}
            </div>

            {/* Прошедшие тренинги */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Прошедшие тренинги</h3>
              {completedTrainings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedTrainings.map((training) => (
                    <div key={training.id} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">{training.title}</h4>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTrainingTypeBadgeColor(training.type)}`}>
                            {getTrainingTypeText(training.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                        <div className="text-sm text-gray-500">
                          <p>
                            <span className="font-medium">Дата:</span> {new Date(training.date).toLocaleDateString()}, {' '}
                            {new Date(training.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p>
                            <span className="font-medium">Продолжительность:</span> {training.duration} мин.
                          </p>
                          <p>
                            <span className="font-medium">Ведущий:</span> {training.instructor}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-between">
                        <span className="text-sm text-gray-500">
                          {training.isCompleted ? "Пройден" : "Не пройден"}
                        </span>
                        <button
                          onClick={() => handleViewTraining(training)}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <p className="text-gray-500">Нет прошедших тренингов</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для просмотра тренинга */}
      {isModalOpen && selectedTraining && (
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
                      {selectedTraining.title}
                    </h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTrainingTypeBadgeColor(selectedTraining.type)}`}>
                          {getTrainingTypeText(selectedTraining.type)}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">{selectedTraining.description}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Дата и время</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedTraining.date).toLocaleDateString()}, {' '}
                          {new Date(selectedTraining.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Продолжительность</h4>
                        <p className="text-sm text-gray-500">{selectedTraining.duration} минут</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Ведущий</h4>
                        <p className="text-sm text-gray-500">{selectedTraining.instructor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Материалы</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500">
                          {selectedTraining.materials.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {!selectedTraining.isCompleted && new Date(selectedTraining.date) > new Date() && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Записаться
                  </button>
                )}
                {selectedTraining.isCompleted || new Date(selectedTraining.date) <= new Date() ? (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Скачать материалы
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
