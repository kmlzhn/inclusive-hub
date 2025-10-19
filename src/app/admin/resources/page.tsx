"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Мок данных для ресурсов
const mockResources = [
  {
    id: "1",
    name: "Психолог кабинеті",
    type: "room",
    availability: "available",
    assignedTo: null,
    description: "Психологпен жеке сабақтар өткізуге арналған кабинет"
  },
  {
    id: "2",
    name: "Сенсорлық бөлме",
    type: "room",
    availability: "occupied",
    assignedTo: "Айгүл Сәбитқызы",
    description: "Сенсорлық интеграцияға арналған бөлме"
  },
  {
    id: "3",
    name: "Моторика дамыту жинағы",
    type: "equipment",
    availability: "available",
    assignedTo: null,
    description: "Жіңішке моторика дамытуға арналған құралдар жинағы"
  },
  {
    id: "4",
    name: "Логопедиялық жинақ",
    type: "equipment",
    availability: "occupied",
    assignedTo: "Жанар Маратқызы",
    description: "Логопедиялық сабақтарға арналған жинақ"
  },
  {
    id: "5",
    name: "Коммуникация планшеты",
    type: "device",
    availability: "maintenance",
    assignedTo: null,
    description: "Альтернативті коммуникация бағдарламасы бар планшет"
  }
];

export default function ResourcesPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const { t } = useLanguage();
  const router = useRouter();
  const [resources, setResources] = useState(mockResources);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "room",
    availability: "available",
    assignedTo: "",
    description: ""
  });
  const [filterType, setFilterType] = useState("all");

  // Проверка роли пользователя
  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">{t('resources.loading')}</p>
      </div>
    );
  }

  const filteredResources = filterType === "all" 
    ? resources 
    : resources.filter(resource => resource.type === filterType);

  const handleCreateResource = () => {
    setSelectedResource(null);
    setFormData({
      name: "",
      type: "room",
      availability: "available",
      assignedTo: "",
      description: ""
    });
    setIsModalOpen(true);
  };

  const handleEditResource = (resource: any) => {
    setSelectedResource(resource);
    setFormData({
      name: resource.name,
      type: resource.type,
      availability: resource.availability,
      assignedTo: resource.assignedTo || "",
      description: resource.description
    });
    setIsModalOpen(true);
  };

  const handleDeleteResource = (resourceId: any) => {
    if (window.confirm(t('resources.delete_confirm'))) {
      setResources(resources.filter(resource => resource.id !== resourceId));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedResource) {
      // Обновление ресурса
      setResources(resources.map(resource => 
        resource.id === selectedResource.id 
          ? { 
              ...resource, 
              name: formData.name, 
              type: formData.type, 
              availability: formData.availability,
              assignedTo: formData.assignedTo || null,
              description: formData.description
            }
          : resource
      ));
    } else {
      // Создание нового ресурса
      const newResource = {
        id: String(resources.length + 1),
        name: formData.name,
        type: formData.type,
        availability: formData.availability,
        assignedTo: formData.assignedTo || null,
        description: formData.description
      };
      setResources([...resources, newResource]);
    }
    
    setIsModalOpen(false);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const getAvailabilityBadgeColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-yellow-100 text-yellow-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available": return t('resource_status.available');
      case "occupied": return t('resource_status.occupied');
      case "maintenance": return t('resource_status.maintenance');
      default: return t('resource_status.unknown');
    }
  };

  const getResourceTypeText = (type: string) => {
    switch (type) {
      case "room": return t('resource_types.room');
      case "equipment": return t('resource_types.equipment');
      case "device": return t('resource_types.device');
      default: return t('resource_types.other');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Навигационная панель */}
      <nav className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">InclusiveHub</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('resources.title')}</h2>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
          >
            {t('resources.back_to_dashboard')}
          </button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="filter" className="text-sm font-medium text-gray-700">{t('resources.filter')}</label>
                <select
                  id="filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="all">{t('resources.all_resources')}</option>
                  <option value="room">{t('resources.rooms')}</option>
                  <option value="equipment">{t('resources.equipment')}</option>
                  <option value="device">{t('resources.devices')}</option>
                </select>
              </div>
              <button
                onClick={handleCreateResource}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
              >
                {t('resources.add_resource')}
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('resources.resource_name')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('resources.resource_type')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('resources.resource_status')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('resources.assigned_to')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('resources.description')}
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">{t('resources.actions')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{getResourceTypeText(resource.type)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAvailabilityBadgeColor(resource.availability)}`}>
                          {getAvailabilityText(resource.availability)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.assignedTo || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {resource.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditResource(resource)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          {t('resources.edit')}
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {t('resources.delete')}
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

      {/* Модальное окно для создания/редактирования ресурса */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedResource ? t('resources.edit_resource') : t('resources.create_resource')}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {t('resources.resource_name')}
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            {t('resources.resource_type')}
                          </label>
                          <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="room">{t('resource_types.room')}</option>
                            <option value="equipment">{t('resource_types.equipment')}</option>
                            <option value="device">{t('resource_types.device')}</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                            {t('resources.resource_status')}
                          </label>
                          <select
                            name="availability"
                            id="availability"
                            value={formData.availability}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="available">{t('resource_status.available')}</option>
                            <option value="occupied">{t('resource_status.occupied')}</option>
                            <option value="maintenance">{t('resource_status.maintenance')}</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                            {t('resources.assigned_to_placeholder')}
                          </label>
                          <input
                            type="text"
                            name="assignedTo"
                            id="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            {t('resources.description')}
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {selectedResource ? t('resources.save') : t('resources.create')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {t('resources.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
