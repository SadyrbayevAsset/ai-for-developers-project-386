# feat: implement full booking and admin flow

Closes #1
Closes #2
Closes #3
Closes #4
Closes #5
Closes #6
Closes #7
Closes #8
Closes #9
Closes #10
Closes #11

## Summary

Этот PR реализует полный цикл бронирования звонков и управления типами встреч в одной интеграционной ветке.

```text
frontend/src/pages/
├── home.tsx          # входная точка
├── booking.tsx       # #5 выбор типа встречи
├── slots.tsx         # #6 календарь слотов
├── booking-form.tsx  # #7 форма записи и подтверждение
└── admin.tsx         # #8 админка владельца

backend/src/routes/
├── meeting-types.ts  # #3 CRUD типов встреч + генерация слотов
└── bookings.ts       # #3/#4 создание записей и проверка конфликтов

typespec/main.tsp     # #1 контракт API
frontend/src/generated/sdk.ts  # #2 сгенерированный SDK
openapi/openapi.yaml  # #2 сгенерированная спецификация

e2e/tests/booking.spec.ts      # #9 сквозной сценарий
.github/workflows/ci.yml       # #10 проверка сгенерированных артефактов
.github/workflows/release-please.yml  # #11 автоматические релизы
```

## Evidence

- `npm run check` проходит: lint, typecheck, backend/frontend unit tests.
- `npm run test:e2e:ci` проходит: поднимает backend и frontend, выполняет сквозной сценарий через Playwright.
- Генерация артефактов синхронизирована: `npm run generate` не создаёт diff.

## Merge Danger

**Door:** two-way — функциональность изолирована в ветке `feature/booking-flow`, откат возможен через revert.

**Blast Radius:** medium — добавлены новые endpoints, страницы и CI шаги; существующая домашняя страница не изменилась.
