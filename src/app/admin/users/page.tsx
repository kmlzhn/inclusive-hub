"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";

// Мок данных для пользователей
const mockUsers = [
  {
    id: "1",
    name: "Администратор",
    email: "admin@school.ru",
    role: "ADMIN",
    createdAt: "2025-10-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Иванов Иван Иванович",
    email: "ivanov@school.ru",
    role: "TEACHER",
    createdAt: "2025-10-15T10:00:00Z"
  },
  {
    id: "3",
    name: "Петрова Анна Сергеевна",
    email: "petrova@school.ru",
    role: "PSYCHOLOGIST",
    createdAt: "2025-10-15T10:00:00Z"
  },
  {
    id: "4",
    name: "Сидоров Павел Николаевич",
    email: "sidorov@school.ru",
    role: "DEFECTOLOGIST",
    createdAt: "2025-10-15T10:00:00Z"
  },
  {
    id: "5",
    name: "Козлова Елена Викторовна",
    email: "kozlova@school.ru",
    role: "SPEECH_THERAPIST",
    createdAt: "2025-10-15T10:00:00Z"
  }
];

export default function UsersManagement() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "TEACHER",
    password: "",
  });

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

  const getRoleName = (role) => {
    switch (role) {
      case "ADMIN": return "Администратор";
      case "TEACHER": return "Учитель";
      case "PSYCHOLOGIST": return "Психолог";
      case "DEFECTOLOGIST": return "Дефектолог";
      case "SPEECH_THERAPIST": return "Логопед";
      case "TUTOR": return "Тьютор";
      default: return "Пользователь";
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      role: "TEACHER",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      setUsers(users.filter(user => user.id !== userId));
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
    
    if (selectedUser) {
      // Обновление пользователя
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, name: formData.name, email: formData.email, role: formData.role }
          : user
      ));
    } else {
      // Создание нового пользователя
      const newUser = {
        id: String(users.length + 1),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar title="Управление пользователями" />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
              >
                Добавить пользователя
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ФИО
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата создания
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {getRoleName(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
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

      {/* Модальное окно для создания/редактирования пользователя */}
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
                        {selectedUser ? "Редактировать пользователя" : "Добавить пользователя"}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            ФИО
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
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Роль
                          </label>
                          <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="ADMIN">Администратор</option>
                            <option value="TEACHER">Учитель</option>
                            <option value="PSYCHOLOGIST">Психолог</option>
                            <option value="DEFECTOLOGIST">Дефектолог</option>
                            <option value="SPEECH_THERAPIST">Логопед</option>
                            <option value="TUTOR">Тьютор</option>
                          </select>
                        </div>
                        {!selectedUser && (
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Пароль
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleFormChange}
                              required={!selectedUser}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {selectedUser ? "Сохранить" : "Создать"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
