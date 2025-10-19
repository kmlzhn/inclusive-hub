# Система переключения языков

## Обзор

В приложении InclusiveHub реализована система переключения между русским и казахским языками. Система включает в себя:

- Контекст для управления языком
- Компоненты переключателя языка для десктопа и мобильных устройств
- Автоматическое сохранение выбранного языка в localStorage
- Переводы для основных элементов интерфейса

## Структура файлов

### Контекст языка
- `src/context/LanguageContext.tsx` - Основной контекст для управления языком

### Компоненты
- `src/components/layout/LanguageSwitcher.tsx` - Переключатель для десктопа
- `src/components/layout/MobileLanguageSwitcher.tsx` - Переключатель для мобильных устройств

### Интеграция
- `src/app/layout.tsx` - Подключение LanguageProvider
- `src/components/layout/NavBar.tsx` - Интеграция в навигационную панель
- `src/app/dashboard/page.tsx` - Интеграция в главную панель

## Использование

### Добавление новых переводов

Для добавления новых переводов обновите объект `translations` в `LanguageContext.tsx`:

```typescript
const translations = {
  ru: {
    'new.key': 'Новый текст на русском',
    // ... другие переводы
  },
  kk: {
    'new.key': 'Жаңа мәтін қазақша',
    // ... другие переводы
  }
};
```

### Использование в компонентах

```typescript
import { useLanguage } from '@/context/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('my.title')}</h1>
      <p>Текущий язык: {language}</p>
    </div>
  );
}
```

### Добавление переключателя в новые страницы

1. Импортируйте компоненты:
```typescript
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import MobileLanguageSwitcher from "@/components/layout/MobileLanguageSwitcher";
```

2. Добавьте в JSX:
```jsx
{/* Для мобильных устройств */}
<div className="md:hidden">
  <MobileLanguageSwitcher />
</div>

{/* Для десктопа */}
<div className="hidden md:block">
  <LanguageSwitcher />
</div>
```

## Особенности

- **Автосохранение**: Выбранный язык автоматически сохраняется в localStorage
- **Адаптивность**: Отдельные компоненты для мобильных и десктопных устройств
- **Визуальные индикаторы**: Флаги стран и галочки для выбранного языка
- **Плавные анимации**: CSS transitions для улучшения UX

## Расширение функциональности

### Добавление нового языка

1. Обновите тип `Language` в `LanguageContext.tsx`:
```typescript
export type Language = 'ru' | 'kk' | 'en';
```

2. Добавьте переводы в объект `translations`

3. Обновите компоненты переключателя для поддержки нового языка

### Интеграция с i18n библиотеками

Для более сложных переводов можно интегрировать с библиотеками типа `react-i18next` или `next-i18next`, заменив простой объект переводов на более мощное решение.
