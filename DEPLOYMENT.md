# Инструкции по деплою на Vercel

## Настройка переменных окружения в Vercel

1. Перейдите в настройки проекта в Vercel Dashboard
2. Откройте раздел "Environment Variables"
3. Добавьте следующие переменные:

### Обязательные переменные:
- `NEXTAUTH_SECRET` - секретный ключ для NextAuth (сгенерируйте случайную строку)
- `NEXTAUTH_URL` - URL вашего приложения (например: https://your-app-name.vercel.app)
- `DATABASE_URL` - строка подключения к PostgreSQL базе данных

### Пример значений:
```
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
```

## Настройка базы данных

1. Создайте PostgreSQL базу данных (можно использовать Vercel Postgres, Neon, Supabase или другого провайдера)
2. Скопируйте строку подключения и добавьте её как `DATABASE_URL`
3. После деплоя выполните миграции базы данных

## Команды для настройки базы данных после деплоя:

```bash
# Подключитесь к вашему серверу или используйте Vercel CLI
npx prisma migrate deploy
```

## Возможные проблемы и решения:

1. **Ошибка сборки Prisma**: Убедитесь, что `DATABASE_URL` правильно настроена
2. **Ошибки NextAuth**: Проверьте, что `NEXTAUTH_SECRET` и `NEXTAUTH_URL` установлены
3. **Проблемы с базой данных**: Убедитесь, что база данных доступна и миграции выполнены

## Проверка деплоя:

1. После успешного деплоя перейдите на https://your-app-name.vercel.app
2. Попробуйте войти в систему с тестовыми данными
3. Проверьте, что все страницы загружаются корректно
