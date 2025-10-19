"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chatbot.welcome_message'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  // Предустановленные ответы для имитации AI
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("адаптация") || lowerMessage.includes("адаптировать") || lowerMessage.includes("бейімдеу")) {
      return t('chatbot.responses.adaptation');
    }
    
    if (lowerMessage.includes("дислексия") || lowerMessage.includes("дислексия") || lowerMessage.includes("дислексия")) {
      return t('chatbot.responses.dyslexia');
    }
    
    if (lowerMessage.includes("аутизм") || lowerMessage.includes("рас") || lowerMessage.includes("аутизм")) {
      return t('chatbot.responses.autism');
    }
    
    if (lowerMessage.includes("гиперактивность") || lowerMessage.includes("сдвг") || lowerMessage.includes("гиперактивті")) {
      return t('chatbot.responses.adhd');
    }
    
    if (lowerMessage.includes("инклюзия") || lowerMessage.includes("инклюзивный") || lowerMessage.includes("инклюзия")) {
      return t('chatbot.responses.inclusion');
    }
    
    if (lowerMessage.includes("помощь") || lowerMessage.includes("совет") || lowerMessage.includes("көмек")) {
      return t('chatbot.responses.help');
    }
    
    // Общие ответы
    const generalResponses = [
      t('chatbot.responses.general_1'),
      t('chatbot.responses.general_2'),
      t('chatbot.responses.general_3'),
      t('chatbot.responses.general_4'),
      t('chatbot.responses.general_5')
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
      <NavBar title={t('chatbot.title')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Заголовок чата */}
          <div className="bg-gray-100 text-gray-800 p-4 rounded-t-lg border-b">
            <h3 className="text-lg font-semibold">{t('chatbot.assistant_title')}</h3>
            <p className="text-sm text-gray-600">{t('chatbot.assistant_subtitle')}</p>
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
                placeholder={t('chatbot.input_placeholder')}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {t('chatbot.send_button')}
              </button>
            </div>
          </div>
        </div>

        {/* Подсказки */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-gray-800 mb-2">{t('chatbot.popular_questions')}</h4>
          <div className="flex flex-wrap gap-2">
            {[
              t('chatbot.questions.adaptation_dyslexia'),
              t('chatbot.questions.autism_tips'),
              t('chatbot.questions.inclusive_environment'),
              t('chatbot.questions.hyperactive_children'),
              t('chatbot.questions.inclusion_principles')
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
