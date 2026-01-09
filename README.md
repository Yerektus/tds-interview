# TZ TDS Media Frontend developer

Проект был выполнен на основе ТЗ компании TDS Media, где было реализовано веб-приложение для работы со списком пользователей с возможностью просмотра, добавление, редактирования и удаления.

## Использованный стек

**Основные технологии:**
- TypeScript
- React
- React Router Dom

**Управление формами и данными:**
- React Hook Form
- RTK Query

**UI и стилизация:**
- shadcn/ui
- Tailwind CSS
- TanStack Table

**Разработка:**
- JSON Server
- ESLint
- Prettier

## Установка и запуск

1. Клонирование репозитория
```bash
git clone https://github.com/Feesder/tds-interview.git
cd tds-interview
```

2. Установка зависимостей
```bash
npm install
```

3. Настройка конфигурации. Создайте конфигурационный файл на основе шаблона и укажите параметры, а также JSON-файл:
```bash
cp ./.env.example ./.env
cp ./db.example.json ./db.json
```

4. Запуск приложения
```bash
npm run dev:all
```