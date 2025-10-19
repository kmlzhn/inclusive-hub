"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для учеников
const mockStudents = [
  {
    id: "1",
    firstName: "Иван",
    lastName: "Смирнов",
    middleName: "Алексеевич",
    birthDate: "2015-05-15",
    grade: "4А",
    specialNeeds: ["Аутизм", "СДВГ"],
    observations: 5,
    lastObservation: "2025-10-10"
  },
  {
    id: "2",
    firstName: "Мария",
    lastName: "Иванова",
    middleName: "Петровна",
    birthDate: "2014-07-20",
    grade: "5Б",
    specialNeeds: ["ЗПР"],
    observations: 3,
    lastObservation: "2025-10-12"
  },
  {
    id: "3",
    firstName: "Алексей",
    lastName: "Петров",
    middleName: "Сергеевич",
    birthDate: "2016-03-10",
    grade: "3В",
    specialNeeds: ["Дислексия", "Дисграфия"],
    observations: 7,
    lastObservation: "2025-10-15"
  },
  {
    id: "4",
    firstName: "Екатерина",
    lastName: "Сидорова",
    middleName: "Александровна",
    birthDate: "2015-11-25",
    grade: "4Б",
    specialNeeds: ["ДЦП"],
    observations: 4,
    lastObservation: "2025-10-08"
  },
  {
    id: "5",
    firstName: "Дмитрий",
    lastName: "Кузнецов",
    middleName: "Иванович",
    birthDate: "2014-09-05",
    grade: "5А",
    specialNeeds: ["Слабовидящий"],
    observations: 6,
    lastObservation: "2025-10-14"
  }
];

export default function SpecialistStudentsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("");

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

  // Фильтрация учеников
  const filteredStudents = students.filter(student => {
    const fullName = `${student.lastName} ${student.firstName} ${student.middleName}`.toLowerCase();
    const searchMatch = searchTerm === "" || fullName.includes(searchTerm.toLowerCase());
    const gradeMatch = filterGrade === "" || student.grade === filterGrade;
    return searchMatch && gradeMatch;
  });

  // Получение уникальных классов для фильтра
  const uniqueGrades = Array.from(new Set(students.map(student => student.grade))).sort();

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
      <NavBar title={`${getSpecialistTitle()}: Мои ученики`} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Фильтры и поиск */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/3">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Поиск по имени</label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Введите ФИО ученика"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Фильтр по классу</label>
                <select
                  id="grade"
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Все классы</option>
                  {uniqueGrades.map((grade: string) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Список учеников */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ФИО
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата рождения
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Класс
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Особенности
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Наблюдения
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student: any) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.lastName} {student.firstName} {student.middleName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(student.birthDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.grade}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {student.specialNeeds.map((need: string, index: number) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">
                              {need}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.observations} (посл. {new Date(student.lastObservation).toLocaleDateString()})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-primary-600 hover:text-primary-900 mr-4"
                          onClick={() => {/* Перейти к профилю ученика */}}
                        >
                          Профиль
                        </button>
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => {/* Добавить наблюдение */}}
                        >
                          Наблюдение
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
    </div>
  );
}
