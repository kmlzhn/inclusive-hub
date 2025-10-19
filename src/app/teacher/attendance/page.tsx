"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AttendancePage() {
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

  const translateAbsenceReason = (reason: string) => {
    const reasonMap: { [key: string]: string } = {
      'Болезнь': t('absence_reasons.illness'),
      'Семейные обстоятельства': t('absence_reasons.family_circumstances'),
      'Медицинский прием': t('absence_reasons.medical_appointment'),
      'Проблемы с транспортом': t('absence_reasons.transport_issues'),
      'Погодные условия': t('absence_reasons.weather'),
      'Другое': t('absence_reasons.other'),
    };
    return reasonMap[reason] || reason;
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
    alert(t('attendance.saved_success'));
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('attendance.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('attendance.title')}</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t('attendance.back')}
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
                    {t('attendance.journal_title')}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {t('attendance.instruction')}
                  </p>
                </div>
                <div className="flex items-center">
                  <label htmlFor="date" className="mr-2 text-sm font-medium text-gray-700">
                    {t('attendance.date_label')}
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
                        {t('attendance.table.name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('attendance.table.surname')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('attendance.table.grade')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('attendance.table.presence')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('attendance.table.absence_reason')}
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
                              {student.attendance.present ? t('attendance.present') : t('attendance.absent')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!student.attendance.present && (
                            <input
                              type="text"
                              value={student.attendance.reason}
                              onChange={(e) => updateReason(student.id, e.target.value)}
                              placeholder={t('attendance.reason_placeholder')}
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
                  {t('attendance.save_button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
