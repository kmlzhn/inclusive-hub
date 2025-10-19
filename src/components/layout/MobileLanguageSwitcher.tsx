"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function MobileLanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: 'ru' | 'kk') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-gray-200 hover:bg-primary-600 rounded-md transition-colors"
        title={t('language.switch')}
      >
        <span className="text-lg">
          {language === 'ru' ? '🇷🇺' : '🇰🇿'}
        </span>
        <span>
          {language === 'ru' ? t('language.russian') : t('language.kazakh')}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
          <button
            onClick={() => handleLanguageChange('ru')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
              language === 'ru' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>🇷🇺</span>
            <span>{t('language.russian')}</span>
            {language === 'ru' && (
              <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button
            onClick={() => handleLanguageChange('kk')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
              language === 'kk' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>🇰🇿</span>
            <span>{t('language.kazakh')}</span>
            {language === 'kk' && (
              <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
