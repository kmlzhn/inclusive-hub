"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Мок данных для ресурсов
const mockResources = [
  {
    id: "1",
    name: "Кабинет психолога",
    type: "room",
    availability: "available",
    assignedTo: null,
    description: "Кабинет для индивидуальных занятий с психологом"
  },
  {
    id: "2",
    name: "Сенсорная комната",
    type: "room",
    availability: "occupied",
    assignedTo: "Петрова Анна Сергеевна",
    description: "Комната для сенсорной интеграции"
  },
  {
    id: "3",
    name: "Набор для развития моторики",
    type: "equipment",
    availability: "available",
    assignedTo: null,
    description: "Набор инструментов для развития мелкой моторики"
  },
  {
    id: "4",
    name: "Логопедический набор",
    type: "equipment",
    availability: "occupied",
    assignedTo: "Козлова Елена Викторовна",
    description: "Набор для логопедических занятий"
  },
  {
    id: "5",
    name: "Планшет для коммуникации",
    type: "device",
    availability: "maintenance",
    assignedTo: null,
    description: "Планшет с программой альтернативной коммуникации"
  }
];

export default function ResourcesPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const router = useRouter();
  const [resources, setResources] = useState(mockResources);
  const [selectedResource, setSelectedResource] = useState(null);
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
        <p className="text-lg">Загрузка...</p>
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

  const handleEditResource = (resource) => {
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

  const handleDeleteResource = (resourceId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот ресурс?")) {
      setResources(resources.filter(resource => resource.id !== resourceId));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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

  const getAvailabilityBadgeColor = (availability) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-yellow-100 text-yellow-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case "available": return "Доступен";
      case "occupied": return "Занят";
      case "maintenance": return "На обслуживании";
      default: return "Неизвестно";
    }
  };

  const getResourceTypeText = (type) => {
    switch (type) {
      case "room": return "Помещение";
      case "equipment": return "Оборудование";
      case "device": return "Устройство";
      default: return "Другое";
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
          <h2 className="text-3xl font-bold text-gray-900">Распределение ресурсов</h2>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
          >
            Назад к панели управления
          </button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="filter" className="text-sm font-medium text-gray-700">Фильтр:</label>
                <select
                  id="filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="all">Все ресурсы</option>
                  <option value="room">Помещения</option>
                  <option value="equipment">Оборудование</option>
                  <option value="device">Устройства</option>
                </select>
              </div>
              <button
                onClick={handleCreateResource}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
              >
                Добавить ресурс
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Назначен
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Описание
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
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
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
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
                        {selectedResource ? "Редактировать ресурс" : "Добавить ресурс"}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Название
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
                            Тип
                          </label>
                          <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="room">Помещение</option>
                            <option value="equipment">Оборудование</option>
                            <option value="device">Устройство</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                            Статус
                          </label>
                          <select
                            name="availability"
                            id="availability"
                            value={formData.availability}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="available">Доступен</option>
                            <option value="occupied">Занят</option>
                            <option value="maintenance">На обслуживании</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                            Назначен (оставьте пустым, если не назначен)
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
                            Описание
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
                    {selectedResource ? "Сохранить" : "Создать"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Отмена
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
