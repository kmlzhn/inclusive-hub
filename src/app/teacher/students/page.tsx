"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function StudentsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const { t } = useLanguage();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockStudents = [
      { id: "1", firstName: "Иван", lastName: "Иванов", grade: "5А", specialNeeds: ["ADHD", "Дислексия"] },
      { id: "2", firstName: "Мария", lastName: "Петрова", grade: "6Б", specialNeeds: ["Аутизм"] },
      { id: "3", firstName: "Алексей", lastName: "Смирнов", grade: "5А", specialNeeds: ["ЗПР"] },
      { id: "4", firstName: "Елена", lastName: "Козлова", grade: "7В", specialNeeds: ["Дисграфия"] },
    ];
    
    setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, []);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const translateSpecialNeed = (need: string) => {
    const needMap: { [key: string]: string } = {
      'ADHD': t('special_needs.adhd'),
      'Дислексия': t('special_needs.dyslexia'),
      'Аутизм': t('special_needs.autism'),
      'ЗПР': t('special_needs.zpr'),
      'Дисграфия': t('special_needs.dysgraphia'),
    };
    return needMap[need] || need;
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('students.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('students.title')}</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t('students.back')}
          </button>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t('students.list_title')}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {t('students.total_count')} {students.length}
                </p>
              </div>
              
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('students.table.name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('students.table.surname')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('students.table.grade')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('students.table.special_needs')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('students.table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student: any) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {student.specialNeeds.map((need: string, index: number) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {translateSpecialNeed(need)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => router.push(`/teacher/students/${student.id}`)}
                            className="text-primary-600 hover:text-primary-900 mr-3"
                          >
                            {t('students.actions.details')}
                          </button>
                          <button 
                            onClick={() => router.push(`/teacher/students/iop/${student.id}`)}
                            className="text-secondary-600 hover:text-secondary-900"
                          >
                            {t('students.actions.iop')}
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
    </div>
  );
}
