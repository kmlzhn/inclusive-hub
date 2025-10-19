"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AttendancePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockStudents = [
      { 
        id: "1", 
        firstName: "Иван", 
        lastName: "Иванов", 
        grade: "5А", 
        attendance: { present: true, reason: "" } 
      },
      { 
        id: "2", 
        firstName: "Мария", 
        lastName: "Петрова", 
        grade: "6Б", 
        attendance: { present: false, reason: "Болезнь" } 
      },
      { 
        id: "3", 
        firstName: "Алексей", 
        lastName: "Смирнов", 
        grade: "5А", 
        attendance: { present: true, reason: "" } 
      },
      { 
        id: "4", 
        firstName: "Елена", 
        lastName: "Козлова", 
        grade: "7В", 
        attendance: { present: false, reason: "Семейные обстоятельства" } 
      },
    ];
    
    setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, [selectedDate]);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setIsLoading(true);
  };

  const toggleAttendance = (studentId: string) => {
    setStudents(students.map((student: any) => {
      if (student.id === studentId) {
        return {
          ...student,
          attendance: {
            ...student.attendance,
            present: !student.attendance.present,
            reason: !student.attendance.present ? "" : student.attendance.reason
          }
        };
      }
      return student;
    }));
  };

  const updateReason = (studentId: string, reason: string) => {
    setStudents(students.map((student: any) => {
      if (student.id === studentId) {
        return {
          ...student,
          attendance: {
            ...student.attendance,
            reason
          }
        };
      }
      return student;
    }));
  };

  const saveAttendance = () => {
    // В реальном приложении здесь будет запрос к API для сохранения данных
    alert("Данные о посещаемости сохранены!");
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Посещаемость</h1>
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
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Журнал посещаемости
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Отметьте присутствующих учеников
                  </p>
                </div>
                <div className="flex items-center">
                  <label htmlFor="date" className="mr-2 text-sm font-medium text-gray-700">
                    Дата:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Имя
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Фамилия
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Класс
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Присутствие
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Причина отсутствия
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
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={student.attendance.present}
                              onChange={() => toggleAttendance(student.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <span className="ml-2">
                              {student.attendance.present ? "Присутствует" : "Отсутствует"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!student.attendance.present && (
                            <input
                              type="text"
                              value={student.attendance.reason}
                              onChange={(e) => updateReason(student.id, e.target.value)}
                              placeholder="Укажите причину"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={saveAttendance}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
