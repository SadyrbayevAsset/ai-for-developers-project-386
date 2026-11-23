# Правила работы с проектом

## Стек

- Backend: Node.js + Fastify + TypeScript
- Frontend: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- API-контракт: TypeSpec
- Клиентский SDK: openapi-typescript
- Тесты: Vitest
- Линтер: ESLint
- Менеджер пакетов: npm
- CI: GitHub Actions

## Устройство проекта

```
.
├── backend/        # Fastify API
├── frontend/       # React SPA
├── typespec/       # TypeSpec-контракт и генерация OpenAPI
├── scripts/        # Вспомогательные скрипты
├── .github/workflows/ci.yml
├── .husky/         # Git-хуки
├── .nvmrc          # Версия Node.js
└── package.json    # Корневые npm-скрипты
```

## Команды

```bash
npm run install:all  # Установить зависимости во всех пакетах
npm run dev          # Запустить backend и frontend в режиме разработки
npm run build        # Собрать typespec, backend и frontend
npm run test         # Запустить тесты
npm run lint         # Запустить линтеры
npm run typecheck    # Проверить типы
npm run check        # Запустить lint, typecheck и test
```

## Правила коммитов

Все коммиты оформляются по спецификации [Conventional Commits](https://www.conventionalcommits.org/).

Допустимые префиксы: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`, `revert:`.

Примеры:

```
feat: add meeting type creation endpoint
fix: prevent overlapping bookings
docs: update README with setup instructions
```

Git-хуки запускают `npm run check` перед коммитом и проверяют формат сообщения.
