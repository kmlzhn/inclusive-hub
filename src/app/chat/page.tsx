"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я AI-ассистент по инклюзивному образованию. Я могу помочь вам с вопросами о работе с детьми с особыми образовательными потребностями, адаптации учебных материалов и создании инклюзивной среды в классе. Чем могу помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  // Предустановленные ответы для имитации AI
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("адаптация") || lowerMessage.includes("адаптировать")) {
      return "Для адаптации учебных материалов рекомендую:\n\n• Использовать визуальные подсказки и схемы\n• Разбивать сложные задания на простые шаги\n• Применять мультисенсорные подходы (зрение, слух, осязание)\n• Предоставлять альтернативные форматы (аудио, видео, тактильные материалы)\n• Учитывать индивидуальные особенности каждого ребенка";
    }
    
    if (lowerMessage.includes("дислексия") || lowerMessage.includes("дислексия")) {
      return "При работе с детьми с дислексией важно:\n\n• Использовать шрифт без засечек (Arial, Verdana)\n• Увеличить межстрочный интервал\n• Применять цветовое кодирование\n• Давать больше времени на выполнение заданий\n• Использовать аудио-материалы\n• Разбивать текст на короткие абзацы";
    }
    
    if (lowerMessage.includes("аутизм") || lowerMessage.includes("рас")) {
      return "Для детей с РАС рекомендую:\n\n• Создать предсказуемую структуру урока\n• Использовать визуальное расписание\n• Минимизировать сенсорные раздражители\n• Применять социальные истории\n• Давать четкие и конкретные инструкции\n• Использовать специальные интересы ребенка в обучении";
    }
    
    if (lowerMessage.includes("гиперактивность") || lowerMessage.includes("сдвг")) {
      return "При работе с детьми с СДВГ:\n\n• Обеспечьте частые перерывы\n• Используйте активные методы обучения\n• Создайте четкие правила и границы\n• Применяйте позитивное подкрепление\n• Разместите ребенка ближе к учителю\n• Используйте таймеры и визуальные напоминания";
    }
    
    if (lowerMessage.includes("инклюзия") || lowerMessage.includes("инклюзивный")) {
      return "Инклюзивное образование основывается на принципах:\n\n• Принятие и уважение различий\n• Равные возможности для всех\n• Гибкость в методах обучения\n• Сотрудничество между всеми участниками\n• Адаптация образовательной среды\n• Поддержка каждого ребенка в соответствии с его потребностями";
    }
    
    if (lowerMessage.includes("помощь") || lowerMessage.includes("совет")) {
      return "Вот несколько общих советов для инклюзивного образования:\n\n• Создайте поддерживающую атмосферу в классе\n• Используйте разнообразные методы обучения\n• Поощряйте сотрудничество между детьми\n• Регулярно оценивайте прогресс каждого ребенка\n• Поддерживайте связь с родителями\n• Не бойтесь обращаться за помощью к специалистам";
    }
    
    // Общие ответы
    const generalResponses = [
      "Это отличный вопрос! В инклюзивном образовании важно учитывать индивидуальные потребности каждого ребенка. Можете рассказать больше о конкретной ситуации?",
      "Понимаю вашу озабоченность. Инклюзивное образование требует терпения и творческого подхода. Какие методы вы уже пробовали?",
      "Каждый ребенок уникален, и подходы должны быть индивидуальными. Что именно вас больше всего беспокоит в этой ситуации?",
      "Инклюзивное образование - это процесс, который требует времени и поддержки. Какую помощь вы хотели бы получить?",
      "Отличный вопрос! В инклюзивном классе важно создать среду, где каждый ребенок чувствует себя принятым и поддерживаемым."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Имитация задержки AI ответа
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 2000); // Задержка от 1 до 3 секунд
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="AI Чат-бот по инклюзии" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Заголовок чата */}
          <div className="bg-gray-100 text-gray-800 p-4 rounded-t-lg border-b">
            <h3 className="text-lg font-semibold">AI Ассистент по инклюзивному образованию</h3>
            <p className="text-sm text-gray-600">Задавайте вопросы о работе с детьми с особыми потребностями</p>
          </div>

          {/* Область сообщений */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-50 text-gray-800 border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Задайте вопрос о инклюзивном образовании..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>

        {/* Подсказки */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Популярные вопросы:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Как адаптировать материалы для детей с дислексией?",
              "Советы по работе с детьми с аутизмом",
              "Как создать инклюзивную среду в классе?",
              "Методы работы с гиперактивными детьми",
              "Принципы инклюзивного образования"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputText(suggestion)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
