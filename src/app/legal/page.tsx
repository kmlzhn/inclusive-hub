"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<LegalDocument[]>([
    {
      id: 1,
      title: "Қазақстан Республикасындағы инклюзивті саясаттың 2025 – 2030 жылдарға арналған тұжырымдамасы",
      type: "Үкімет қаулысы",
      date: "2024 жылғы 30 желтоқсан № 1143",
      description: "Қазақстандағы инклюзивті саясатты дамыту стратегиясын анықтайтын негізгі құжат",
      content: `Қазақстан Республикасының Үкіметі ҚАУЛЫ ЕТЕДІ:

1. Қоса беріліп отырған Қазақстан Республикасындағы инклюзивті саясаттың 2025 – 2030 жылдарға арналған тұжырымдамасы (бұдан әрі – Тұжырымдама) бекітілсін.

2. Тұжырымдаманы іске асыруға жауапты орталық мемлекеттік, жергілікті атқарушы органдар, Қазақстан Республикасының Президентіне тікелей бағынатын және есеп беретін мемлекеттік органдар (келісу бойынша), өзге де ұйымдар (келісу бойынша):

1) Тұжырымдаманы іске асыру жөнінде қажетті шаралар қабылдасын;

2) Тұжырымдаманы іске асыру жөніндегі іс-қимыл жоспарында көзделген іс-шаралардың уақтылы іске асырылуын қамтамасыз етсін;

3) есепті жылдан кейінгі жылдың 1 ақпанынан кешіктірмей Қазақстан Республикасының Еңбек және халықты әлеуметтік қорғау министрлігіне Тұжырымдаманың іске асырылу барысы туралы ақпарат ұсынып тұрсын.

3. Қазақстан Республикасының Еңбек және халықты әлеуметтік қорғау министрлігі жыл сайын 15 наурызға дейін Қазақстан Республикасының Үкіметіне Тұжырымдаманың орындалу барысы туралы жиынтық ақпарат ұсынып тұрсын.

4. Осы қаулының орындалуын бақылау Қазақстан Республикасының Еңбек және халықты әлеуметтік қорғау министрлігіне жүктелсін.

5. Осы қаулы қол қойылған күнінен бастап қолданысқа енгізіледі.`,
      isExpanded: false,
    },
    {
      id: 2,
      title: "Қазақстан Республикасының 'Мүгедектігі бар адамдарды әлеуметтік қорғау туралы' Заңы",
      type: "ҚР Заңы",
      date: "1991 жыл",
      description: "Тең мүмкіндіктерді қамтамасыз ету үшін әлеуметтік-экономикалық, құқықтық және ұйымдастырушылық жағдайлар жасауға кепілдік беретін негізгі заң",
      content: `Заң мүгедектігі бар адамдардың тыныс-тіршілігіне тең мүмкіндіктерді қамтамасыз ету үшін әлеуметтік-экономикалық, құқықтық және ұйымдастырушылық жағдайлар жасауға кепілдік береді.

Аталған Заң шеңберінде мүгедектігі бар адамдардың әлеуметтік қорғалуын қамтамасыз ету, тиісті мемлекеттік бағдарламаларда олардың мұқтаждығын ескеру жолымен жеке дамуына, шығармашылық және өндірістік мүмкіндіктері мен қабілеттерін іске асыру үшін қажетті жағдай жасау көзделді.`,
      isExpanded: false,
    },
    {
      id: 3,
      title: "Қазақстан Республикасының 'Кемтар балаларды әлеуметтік және медициналық-педагогикалық түзеу арқылы қолдау туралы' Заңы",
      type: "ҚР Заңы",
      date: "2002 жылғы 11 шілде",
      description: "Ерекше қажеттіліктері бар балаларға түзеу көмегі көрсетуді қамтамасыз етуге бағытталған заң",
      content: `Балаларды түзеу арқылы қолдауды қамтамасыз етуге, әлеуметтік қолдауды күшейтуге және мүгедектігі бар адамдарды қоғамға интеграциялау үшін белгілі бір жағдайлар жасауға бағытталған заң.

Мүгедектігі бар адамдарды оңалтудың 2002 – 2005 жылдарға және 2006 – 2008 жылдарға арналған үкіметтік бағдарламалары іске асырылды, олардың мақсаты – мүгедектігі бар адамдарды оңалту жүйесін құру және жетілдіру болды.`,
      isExpanded: false,
    },
    {
      id: 4,
      title: "Қазақстан Республикасының 'Арнаулы әлеуметтік қызметтер туралы' Заңы",
      type: "ҚР Заңы",
      date: "2008 жылғы желтоқсан",
      description: "Медициналық-әлеуметтік мекемелерді жүйелі түрде институттандыру процесін бастаған заң",
      content: `2008 жылғы желтоқсанда "Арнаулы әлеуметтік қызметтер туралы" Қазақстан Республикасының Заңы қабылданғалы медициналық-әлеуметтік мекемелерді жүйелі түрде институттандыру процесі басталды.

Заң мүгедектігі бар адамдарға арнаулы әлеуметтік қызметтер көрсету сапасын жақсартуға бағытталған.`,
      isExpanded: false,
    },
    {
      id: 5,
      title: "Біріккен Ұлттар Ұйымының Мүгедектігі бар адамдардың құқықтары туралы конвенциясы",
      type: "Халықаралық шарт",
      date: "2015 жылғы 20 ақпан (ратификацияланған)",
      description: "Халықаралық стандарттардың нормаларын имплементациялау үшін Қазақстан ратификациялаған халықаралық конвенция",
      content: `2015 жылғы 20 ақпанда Қазақстан Біріккен Ұлттар Ұйымының Мүгедектігі бар адамдардың құқықтары туралы конвенциясын ратификациялады, бұл халықаралық стандарттарды ұлттық заңнамаға интеграциялаудың маңызды қадамы болды.

Мүгедектігі бар адамдардың құқықтарын қамтамасыз ету және өмір сүру сапасын жақсарту жөніндегі 2012 – 2018 жылдарға және 2025 жылға дейінгі іс-шаралар жоспарлары әзірленді және енгізілді.`,
      isExpanded: false,
    },
    {
      id: 6,
      title: "Қазақстан Республикасының Әлеуметтік кодексі",
      type: "ҚР Кодексі",
      date: "2023 жылғы 1 шілде",
      description: "Халықты, оның ішінде мүгедектігі бар адамдарды әлеуметтік қорғауды реттейтін негізгі құжат",
      content: `2023 жылғы 1 шілдеден бастап Қазақстан Республикасының Әлеуметтік кодексі қолданысқа енгізілгеннен кейін халыққа әлеуметтік қызмет көрсету және қолдау жүйесін трансформациялау басталды.

Кодекс әлеуметтік қорғау мәселелерін, оның ішінде мүгедектігі бар адамдарға арнаулы әлеуметтік қызметтерді реттейді.`,
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
      <NavBar title={t('legal.title')} />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('legal.main_title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('legal.description')}
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
                {t('legal.info_system.title')}
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                {t('legal.info_system.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Список документов */}
        <div className="space-y-6">
          {documents.map((document: any) => (
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
                    <h4 className="text-lg font-medium text-gray-900 mb-3">{t('legal.document_content')}</h4>
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
            {t('legal.additional_resources')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{t('legal.useful_links')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Қазақстан Республикасының ақпараттық-құқықтық жүйесі</li>
                <li>• ҚР Еңбек және халықты әлеуметтік қорғау министрлігі</li>
                <li>• ҚР Оқу-ағарту министрлігі</li>
                <li>• Адам құқықтары жөніндегі ұлттық орталық</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{t('legal.contact_info')}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>{t('legal.phone')}</strong> (7172) 58-00-58</p>
                <p><strong>{t('legal.email')}</strong> support@zqai.kz</p>
                <p><strong>{t('legal.working_hours')}</strong> 09:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
