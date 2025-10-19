"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";

interface LegalDocument {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  content: string;
  isExpanded: boolean;
}

export default function LegalPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>([
    {
      id: 1,
      title: "Концепция инклюзивной политики в Республике Казахстан на 2025 – 2030 годы",
      type: "Постановление Правительства",
      date: "30 декабря 2024 года № 1143",
      description: "Основной документ, определяющий стратегию развития инклюзивной политики в Казахстане",
      content: `Правительство Республики Казахстан ПОСТАНОВЛЯЕТ:

1. Утвердить прилагаемую Концепцию инклюзивной политики в Республике Казахстан на 2025 - 2030 годы (далее - Концепция).

2. Центральным государственным, местным исполнительным органам, государственным органам, непосредственно подчиненным и подотчетным Президенту Республики Казахстан (по согласованию), иным организациям (по согласованию), ответственным за реализацию Концепции:

1) принять необходимые меры по реализации Концепции;

2) обеспечить своевременную реализацию мероприятий, предусмотренных Планом действий по реализации Концепции;

3) не позднее 1 февраля года, следующего за отчетным годом, представлять информацию о ходе реализации Концепции в Министерство труда и социальной защиты населения Республики Казахстан.

3. Министерству труда и социальной защиты населения Республики Казахстан ежегодно, до 15 марта, представлять в Правительство Республики Казахстан сводную информацию о ходе реализации Концепции.

4. Контроль за исполнением настоящего постановления возложить на Министерство труда и социальной защиты населения Республики Казахстан.

5. Настоящее постановление вводится в действие со дня его подписания.`,
      isExpanded: false,
    },
    {
      id: 2,
      title: "Закон Республики Казахстан 'О социальной защищенности инвалидов'",
      type: "Закон РК",
      date: "1991 год",
      description: "Основной закон, гарантирующий создание социально-экономических, правовых и организационных условий для обеспечения равных возможностей",
      content: `Закон гарантирует создание социально-экономических, правовых и организационных условий для обеспечения равных возможностей для жизнедеятельности лиц с инвалидностью.

В рамках данного Закона заложено обеспечение социальной защищенности лиц с инвалидностью, создание необходимых условий для индивидуального развития, реализации творческих и производственных возможностей и способностей путем учета потребностей лиц с инвалидностью в соответствующих государственных программах.`,
      isExpanded: false,
    },
    {
      id: 3,
      title: "Закон Республики Казахстан 'О социальной и медико-педагогической коррекционной поддержке детей с ограниченными возможностями'",
      type: "Закон РК",
      date: "11 июля 2002 года",
      description: "Закон, направленный на обеспечение коррекционной поддержки детей с особыми потребностями",
      content: `Закон направлен на обеспечение коррекционной поддержки детей с ограниченными возможностями, усиление социальной поддержки и создание для лиц с инвалидностью определенных условий для интеграции в общество.

Реализованы правительственные программы реабилитации лиц с инвалидностью на 2002 - 2005 годы и 2006 - 2008 годы, целями которых стали создание и совершенствование системы реабилитации лиц с инвалидностью.`,
      isExpanded: false,
    },
    {
      id: 4,
      title: "Закон Республики Казахстан 'О специальных социальных услугах'",
      type: "Закон РК",
      date: "Декабрь 2008 года",
      description: "Закон, начавший процесс последовательной деинституционализации медико-социальных учреждений",
      content: `С принятием в декабре 2008 года Закона Республики Казахстан "О специальных социальных услугах" был начат процесс последовательной деинституционализации медико-социальных учреждений.

Закон направлен на улучшение качества предоставления специальных социальных услуг лицам с инвалидностью.`,
      isExpanded: false,
    },
    {
      id: 5,
      title: "Конвенция Организации Объединенных Наций о правах лиц с инвалидностью",
      type: "Международный договор",
      date: "20 февраля 2015 года (ратифицирована)",
      description: "Международная конвенция, ратифицированная Казахстаном для имплементации норм международных стандартов",
      content: `20 февраля 2015 года Казахстан ратифицировал Конвенцию Организации Объединенных Наций о правах лиц с инвалидностью, что стало важным шагом к имплементации норм международных стандартов в национальное законодательство.

Были разработаны и внедрены планы мероприятий по обеспечению прав и улучшению качества жизни лиц с инвалидностью на 2012 - 2018 годы и до 2025 года.`,
      isExpanded: false,
    },
    {
      id: 6,
      title: "Социальный кодекс Республики Казахстан",
      type: "Кодекс РК",
      date: "1 июля 2023 года",
      description: "Основной документ, регулирующий социальную защиту населения, включая лиц с инвалидностью",
      content: `C введением в действие с 1 июля 2023 года Социального кодекса Республики Казахстан начата трансформация системы социального обслуживания и поддержки населения.

Кодекс регулирует вопросы социальной защиты, включая специальные социальные услуги для лиц с инвалидностью.`,
      isExpanded: false,
    },
  ]);

  const toggleDocument = (id: number) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, isExpanded: !doc.isExpanded } : doc
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Нормативные акты" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Нормативные акты по инклюзивному образованию
          </h1>
          <p className="text-lg text-gray-600">
            Правовая база и законодательные акты Республики Казахстан в сфере инклюзивного образования и социальной защиты лиц с инвалидностью
          </p>
        </div>

        {/* Информационная панель */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-900">
                Информационно-правовая система
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Институт законодательства и правовой информации Министерства юстиции Республики Казахстан
              </p>
            </div>
          </div>
        </div>

        {/* Список документов */}
        <div className="space-y-6">
          {documents.map((document) => (
            <div key={document.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleDocument(document.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {document.type}
                      </span>
                      <span className="text-sm text-gray-500">{document.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {document.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {document.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <svg 
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${
                        document.isExpanded ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {document.isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Содержание документа:</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                        {document.content}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Дополнительные ресурсы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Полезные ссылки</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Информационно-правовая система Республики Казахстан</li>
                <li>• Министерство труда и социальной защиты населения РК</li>
                <li>• Министерство просвещения РК</li>
                <li>• Национальный центр по правам человека</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Контактная информация</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Телефон:</strong> (7172) 58-00-58</p>
                <p><strong>Email:</strong> support@zqai.kz</p>
                <p><strong>Время работы:</strong> 09:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
