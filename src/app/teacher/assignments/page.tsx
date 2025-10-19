"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AssignmentsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
  
  const router = useRouter();
  const { t } = useLanguage();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 1 week from now
    status: "active",
    adaptations: [""]
  });

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Для демо используем моковые данные
    const mockAssignments = [
      { 
        id: "1", 
        title: "Чтение по ролям", 
        subject: "Литература", 
        dueDate: "2025-10-25", 
        status: "active",
        adaptations: ["Увеличенный шрифт", "Дополнительное время"]
      },
      { 
        id: "2", 
        title: "Решение уравнений", 
        subject: "Математика", 
        dueDate: "2025-10-30", 
        status: "active",
        adaptations: ["Визуальные подсказки", "Пошаговые инструкции"]
      },
      { 
        id: "3", 
        title: "Проект по экологии", 
        subject: "Окружающий мир", 
        dueDate: "2025-11-15", 
        status: "pending",
        adaptations: ["Работа в паре", "Аудио инструкции"]
      },
      { 
        id: "4", 
        title: "Контрольная работа", 
        subject: "Русский язык", 
        dueDate: "2025-10-20", 
        status: "completed",
        adaptations: ["Отдельное помещение", "Дополнительное время"]
      },
    ];
    
    setTimeout(() => {
      setAssignments(mockAssignments);
      setIsLoading(false);
    }, 500); // Имитация задержки загрузки
  }, []);

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const translateSubject = (subject: string) => {
    const subjectMap: { [key: string]: string } = {
      'Математика': t('subjects.mathematics'),
      'Русский язык': t('subjects.russian'),
      'Литература': t('subjects.literature'),
      'Окружающий мир': t('subjects.world_around'),
      'История': t('subjects.history'),
      'География': t('subjects.geography'),
      'Биология': t('subjects.biology'),
      'Физика': t('subjects.physics'),
      'Химия': t('subjects.chemistry'),
      'Информатика': t('subjects.informatics'),
      'Иностранный язык': t('subjects.foreign_language'),
    };
    return subjectMap[subject] || subject;
  };

  const translateAdaptation = (adaptation: string) => {
    const adaptationMap: { [key: string]: string } = {
      'Увеличенный шрифт': t('adaptations.large_font'),
      'Дополнительное время': t('adaptations.extra_time'),
      'Визуальные подсказки': t('adaptations.visual_hints'),
      'Пошаговые инструкции': t('adaptations.step_instructions'),
      'Работа в паре': t('adaptations.pair_work'),
      'Аудио инструкции': t('adaptations.audio_instructions'),
      'Отдельное помещение': t('adaptations.separate_room'),
    };
    return adaptationMap[adaptation] || adaptation;
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAssignment({
      title: "",
      subject: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "active",
      adaptations: [""]
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: value
    });
  };
  
  const handleAdaptationChange = (index: number, value: string) => {
    const updatedAdaptations = [...newAssignment.adaptations];
    updatedAdaptations[index] = value;
    setNewAssignment({
      ...newAssignment,
      adaptations: updatedAdaptations
    });
  };
  
  const handleAddAdaptation = () => {
    setNewAssignment({
      ...newAssignment,
      adaptations: [...newAssignment.adaptations, ""]
    });
  };
  
  const handleRemoveAdaptation = (index: number) => {
    const updatedAdaptations = newAssignment.adaptations.filter((_, i) => i !== index);
    setNewAssignment({
      ...newAssignment,
      adaptations: updatedAdaptations.length > 0 ? updatedAdaptations : [""]
    });
  };
  
  const handleAddAssignment = () => {
    // Validate form
    if (!newAssignment.title.trim()) {
      alert(t('assignments.messages.title_required'));
      return;
    }
    
    if (!newAssignment.subject.trim()) {
      alert(t('assignments.messages.subject_required'));
      return;
    }
    
    if (!newAssignment.dueDate) {
      alert(t('assignments.messages.due_date_required'));
      return;
    }
    
    // Filter out empty adaptations
    const filteredAdaptations = newAssignment.adaptations.filter(a => a.trim() !== "");
    
    // Create new assignment
    const newAssignmentObj = {
      id: Date.now().toString(),
      title: newAssignment.title,
      subject: newAssignment.subject,
      dueDate: newAssignment.dueDate,
      status: newAssignment.status,
      adaptations: filteredAdaptations.length > 0 ? filteredAdaptations : []
    };
    
    // Add to assignments list
    setAssignments([newAssignmentObj, ...assignments]);
    handleCloseModal();
    
    // В реальном приложении здесь был бы запрос к API для сохранения данных
    alert(t('assignments.messages.created_success'));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{t('assignment_status.active')}</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">{t('assignment_status.pending')}</span>;
      case "completed":
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{t('assignment_status.completed')}</span>;
      default:
        return null;
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('assignments.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal for creating new assignment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{t('assignments.create_modal_title')}</h3>
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  {t('assignments.form.title_label')}
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  placeholder={t('assignments.form.title_placeholder')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  {t('assignments.form.subject_label')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={newAssignment.subject}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">{t('assignments.form.subject_placeholder')}</option>
                  <option value="Математика">{t('subjects.mathematics')}</option>
                  <option value="Русский язык">{t('subjects.russian')}</option>
                  <option value="Литература">{t('subjects.literature')}</option>
                  <option value="Окружающий мир">{t('subjects.world_around')}</option>
                  <option value="История">{t('subjects.history')}</option>
                  <option value="География">{t('subjects.geography')}</option>
                  <option value="Биология">{t('subjects.biology')}</option>
                  <option value="Физика">{t('subjects.physics')}</option>
                  <option value="Химия">{t('subjects.chemistry')}</option>
                  <option value="Информатика">{t('subjects.informatics')}</option>
                  <option value="Иностранный язык">{t('subjects.foreign_language')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  {t('assignments.form.due_date_label')}
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  {t('assignments.form.status_label')}
                </label>
                <select
                  id="status"
                  name="status"
                  value={newAssignment.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="active">{t('assignment_status.active')}</option>
                  <option value="pending">{t('assignment_status.pending')}</option>
                  <option value="completed">{t('assignment_status.completed')}</option>
                </select>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('assignments.form.adaptations_label')}
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAdaptation}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    {t('assignments.form.add_adaptation')}
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {newAssignment.adaptations.map((adaptation, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={adaptation}
                        onChange={(e) => handleAdaptationChange(index, e.target.value)}
                        placeholder={t('assignments.form.adaptation_placeholder')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {newAssignment.adaptations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAdaptation(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 flex space-x-2 justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('assignments.form.cancel')}
              </button>
              <button
                type="button"
                onClick={handleAddAssignment}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('assignments.form.create')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('assignments.title')}</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t('assignments.back')}
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
                    {t('assignments.list_title')}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {t('assignments.total_count')} {assignments.length}
                  </p>
                </div>
                <button 
                  onClick={handleOpenModal}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {t('assignments.create_button')}
                </button>
              </div>
              
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.name')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.subject')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.due_date')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.status')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.adaptations')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('assignments.table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignments.map((assignment: any) => (
                      <tr key={assignment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {assignment.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {translateSubject(assignment.subject)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getStatusBadge(assignment.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {assignment.adaptations.map((adaptation: string, index: number) => (
                              <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                {translateAdaptation(adaptation)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            {t('assignments.actions.edit')}
                          </button>
                          <button className="text-secondary-600 hover:text-secondary-900">
                            {t('assignments.actions.check')}
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
