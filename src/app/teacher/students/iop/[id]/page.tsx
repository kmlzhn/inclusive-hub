"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function IndividualPlanPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState<any>(null);

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
        specialNeeds: ["ADHD", "Дислексия"]
      },
      { 
        id: "2", 
        firstName: "Мария", 
        lastName: "Петрова", 
        middleName: "Алексеевна",
        birthDate: "2013-08-23",
        grade: "6Б", 
        specialNeeds: ["Аутизм"]
      },
      { 
        id: "3", 
        firstName: "Алексей", 
        lastName: "Смирнов", 
        middleName: "Дмитриевич",
        birthDate: "2014-11-30",
        grade: "5А", 
        specialNeeds: ["ЗПР"]
      },
      { 
        id: "4", 
        firstName: "Елена", 
        lastName: "Козлова", 
        middleName: "Сергеевна",
        birthDate: "2012-04-05",
        grade: "7В", 
        specialNeeds: ["Дисграфия"]
      }
    ];

    const mockPlans = [
      {
        id: "1",
        studentId: "1",
        startDate: "2025-09-01",
        endDate: "2026-05-31",
        goals: [
          "Развитие навыков чтения и понимания текста",
          "Улучшение концентрации внимания",
          "Развитие навыков самоорганизации"
        ],
        adaptations: [
          "Увеличенное время на выполнение заданий",
          "Использование визуальных материалов",
          "Структурированная среда обучения",
          "Частые короткие перерывы"
        ],
        methods: [
          "Использование цветовых маркеров при чтении",
          "Разбивка заданий на короткие этапы",
          "Использование таймера для концентрации",
          "Аудиоматериалы для поддержки чтения"
        ]
      },
      {
        id: "2",
        studentId: "2",
        startDate: "2025-09-01",
        endDate: "2026-05-31",
        goals: [
          "Развитие социальных навыков",
          "Улучшение коммуникативных навыков",
          "Адаптация к изменениям в распорядке"
        ],
        adaptations: [
          "Визуальное расписание",
          "Сенсорные перерывы",
          "Предсказуемый распорядок дня",
          "Тихое рабочее место"
        ],
        methods: [
          "Социальные истории",
          "Визуальные подсказки",
          "Структурированные групповые активности",
          "Система поощрений"
        ]
      },
      {
        id: "3",
        studentId: "3",
        startDate: "2025-09-01",
        endDate: "2026-05-31",
        goals: [
          "Развитие базовых академических навыков",
          "Улучшение памяти и внимания",
          "Развитие самостоятельности"
        ],
        adaptations: [
          "Адаптированная программа обучения",
          "Дополнительное время на выполнение заданий",
          "Пошаговые инструкции",
          "Визуальные материалы"
        ],
        methods: [
          "Использование конкретных материалов",
          "Многократное повторение",
          "Разбивка заданий на малые части",
          "Использование игровых методик"
        ]
      },
      {
        id: "4",
        studentId: "4",
        startDate: "2025-09-01",
        endDate: "2026-05-31",
        goals: [
          "Развитие навыков письма",
          "Улучшение мелкой моторики",
          "Повышение уверенности в письменных работах"
        ],
        adaptations: [
          "Использование компьютера для письменных работ",
          "Дополнительное время на письменные задания",
          "Устные ответы вместо письменных где возможно",
          "Специальные письменные принадлежности"
        ],
        methods: [
          "Упражнения для развития моторики",
          "Использование клавиатуры",
          "Диктовка текста",
          "Специальные линованные листы"
        ]
      }
    ];
    
    setTimeout(() => {
      const foundStudent = mockStudents.find(s => s.id === params.id);
      const foundPlan = mockPlans.find(p => p.studentId === params.id);
      
      setStudent(foundStudent || null);
      setPlan(foundPlan || null);
      setEditedPlan(foundPlan ? { ...foundPlan } : null);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, [params.id]);

  const handleBackToStudent = () => {
    router.push(`/teacher/students/${params.id}`);
  };

  const handleBackToStudents = () => {
    router.push("/teacher/students");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setPlan(editedPlan);
    setIsEditing(false);
    // В реальном приложении здесь был бы запрос к API для сохранения данных
    alert("Индивидуальный образовательный план сохранен!");
  };

  const handleCancel = () => {
    setEditedPlan({ ...plan });
    setIsEditing(false);
  };

  const handleAddItem = (field: string) => {
    setEditedPlan({
      ...editedPlan,
      [field]: [...editedPlan[field], ""]
    });
  };

  const handleRemoveItem = (field: string, index: number) => {
    setEditedPlan({
      ...editedPlan,
      [field]: editedPlan[field].filter((_: any, i: number) => i !== index)
    });
  };

  const handleItemChange = (field: string, index: number, value: string) => {
    const newItems = [...editedPlan[field]];
    newItems[index] = value;
    setEditedPlan({
      ...editedPlan,
      [field]: newItems
    });
  };

  const handleDateChange = (field: string, value: string) => {
    setEditedPlan({
      ...editedPlan,
      [field]: value
    });
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Индивидуальный образовательный план</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleBackToStudent}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              К карточке ученика
            </button>
            <button
              onClick={handleBackToStudents}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              К списку учеников
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Информация об ученике */}
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
            
            {/* Индивидуальный план */}
            {plan ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Индивидуальный образовательный план
                  </h3>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
                      >
                        Отменить
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700"
                    >
                      Редактировать
                    </button>
                  )}
                </div>
                
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Период действия</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <div>
                              <label htmlFor="startDate" className="block text-xs text-gray-500">От:</label>
                              <input
                                type="date"
                                id="startDate"
                                value={editedPlan.startDate}
                                onChange={(e) => handleDateChange("startDate", e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                              />
                            </div>
                            <div>
                              <label htmlFor="endDate" className="block text-xs text-gray-500">До:</label>
                              <input
                                type="date"
                                id="endDate"
                                value={editedPlan.endDate}
                                onChange={(e) => handleDateChange("endDate", e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <span>
                            {new Date(plan.startDate).toLocaleDateString('ru-RU')} - {new Date(plan.endDate).toLocaleDateString('ru-RU')}
                          </span>
                        )}
                      </dd>
                    </div>
                    
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Цели</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {isEditing ? (
                          <div className="space-y-2">
                            {editedPlan.goals.map((goal: string, index: number) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  value={goal}
                                  onChange={(e) => handleItemChange("goals", index, e.target.value)}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                                />
                                <button
                                  onClick={() => handleRemoveItem("goals", index)}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddItem("goals")}
                              className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                            >
                              + Добавить цель
                            </button>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1">
                            {plan.goals.map((goal: string, index: number) => (
                              <li key={index}>{goal}</li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Адаптации</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {isEditing ? (
                          <div className="space-y-2">
                            {editedPlan.adaptations.map((adaptation: string, index: number) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  value={adaptation}
                                  onChange={(e) => handleItemChange("adaptations", index, e.target.value)}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                                />
                                <button
                                  onClick={() => handleRemoveItem("adaptations", index)}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddItem("adaptations")}
                              className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                            >
                              + Добавить адаптацию
                            </button>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1">
                            {plan.adaptations.map((adaptation: string, index: number) => (
                              <li key={index}>{adaptation}</li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                    
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Методы</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {isEditing ? (
                          <div className="space-y-2">
                            {editedPlan.methods.map((method: string, index: number) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  value={method}
                                  onChange={(e) => handleItemChange("methods", index, e.target.value)}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                                />
                                <button
                                  onClick={() => handleRemoveItem("methods", index)}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddItem("methods")}
                              className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                            >
                              + Добавить метод
                            </button>
                          </div>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1">
                            {plan.methods.map((method: string, index: number) => (
                              <li key={index}>{method}</li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Индивидуальный образовательный план не создан
                </h3>
                <button
                  onClick={() => {
                    const newPlan = {
                      id: Date.now().toString(),
                      studentId: student.id,
                      startDate: new Date().toISOString().split('T')[0],
                      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                      goals: [""],
                      adaptations: [""],
                      methods: [""]
                    };
                    setPlan(newPlan);
                    setEditedPlan(newPlan);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Создать план
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
