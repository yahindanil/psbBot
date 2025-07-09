# Архитектура автоматической инициализации пользователя

Эта документация описывает систему автоматического создания/получения пользователя при запуске приложения.

## 🏗 Общая архитектура

```
┌─────────────────┐
│     _app.js     │ ← Точка входа, оборачивает все в UserProvider
└─────────────────┘
          │
┌─────────────────┐
│  UserProvider   │ ← Автоматически инициализирует пользователя при запуске
│  (Context)      │
└─────────────────┘
          │
    ┌─────────┴─────────┐
    │                   │
┌───▼────┐         ┌────▼────┐
│Telegram│         │   API   │
│WebApp  │         │ Utils   │
└────────┘         └─────────┘
```

## 📁 Структура файлов

```
src/
├── contexts/
│   └── UserContext.js          # Главный контекст пользователя
├── utils/
│   └── api.js                  # Утилиты для работы с API
├── components/ui/
│   ├── LoadingScreen.jsx       # Экран загрузки
│   └── ErrorScreen.jsx         # Экран ошибки
└── pages/
    ├── _app.js                 # Интеграция UserProvider
    ├── all-modules/index.js    # Пример использования
    └── dev/index.js            # Страница разработки
```

## 🔄 Последовательность инициализации

1. **Запуск приложения** → `_app.js` загружает `UserProvider`
2. **UserProvider** автоматически:

   - Инициализирует Telegram WebApp (`WebApp.ready()`, `WebApp.expand()`)
   - Получает данные пользователя из `WebApp.initDataUnsafe.user`
   - Автоматически вызывает `POST /api/users` для создания/получения пользователя в БД
   - Предоставляет данные через Context API

3. **Любая страница** может использовать `useUser()` хук для получения:
   - Данных пользователя из Telegram
   - Данных пользователя из БД
   - Состояния загрузки/ошибок

## 🎣 Использование useUser хука

```javascript
import { useUser } from "@/contexts/UserContext";

function MyComponent() {
  const {
    telegramUser, // Данные из Telegram
    dbUser, // Данные из БД
    isInitializing, // Идет ли инициализация
    hasError, // Есть ли ошибка
    error, // Текст ошибки
    retryDbUser, // Функция повторной попытки
    canUseApp, // Можно ли использовать приложение
  } = useUser();

  if (isInitializing) return <LoadingScreen />;
  if (hasError) return <ErrorScreen error={error} onRetry={retryDbUser} />;
  if (!canUseApp) return <div>Приложение недоступно</div>;

  return <div>Добро пожаловать, {telegramUser.first_name}!</div>;
}
```

## 🔧 API функции (utils/api.js)

### createOrGetUser(userData)

Создает или получает существующего пользователя в БД.

```javascript
import { createOrGetUser } from "@/utils/api";

const user = await createOrGetUser({
  telegram_id: 123456789,
  username: "user123",
  first_name: "Иван",
});
```

### getUserProgress(telegramId)

Получает прогресс пользователя по модулям и урокам.

```javascript
import { getUserProgress } from "@/utils/api";

const progress = await getUserProgress(123456789);
```

### completeLesson(telegramId, lessonId, timeSpentSeconds)

Отмечает урок как завершенный.

```javascript
import { completeLesson } from "@/utils/api";

const result = await completeLesson(123456789, 1, 300);
if (result.module_completed) {
  console.log("Модуль завершен!");
}
```

## 🎯 Состояния UserContext

| Состояние        | Описание                                |
| ---------------- | --------------------------------------- |
| `isInitializing` | Идет процесс инициализации              |
| `hasError`       | Произошла ошибка при инициализации      |
| `canUseApp`      | Все готово для использования приложения |
| `isInTelegram`   | Приложение запущено в Telegram          |

## 🔄 Жизненный цикл

```
1. Загрузка приложения
   ↓
2. UserProvider.useEffect()
   ↓
3. Инициализация Telegram WebApp
   ↓
4. Получение userData из Telegram
   ↓
5. Автоматический вызов createOrGetUser()
   ↓
6. Сохранение данных в Context
   ↓
7. Приложение готово к использованию
```

## 🛠 Обработка ошибок

- **Telegram недоступен**: `isInTelegram = false`
- **Нет данных пользователя**: `telegramUser = null`
- **Ошибка API**: `hasError = true`, показывается `ErrorScreen`
- **Повторная попытка**: кнопка "Попробовать снова" вызывает `retryDbUser()`

## 📊 Логирование

Все действия логируются в консоль браузера с префиксом `[UserContext]`:

```
[UserContext] Инициализация Telegram WebApp...
[UserContext] Данные пользователя Telegram получены {...}
[UserContext] Создание/получение пользователя в БД...
[UserContext] Пользователь успешно создан/получен в БД {...}
```

## 🧪 Тестирование

- **Dev страница** (`/dev`) - полная диагностика системы
- **Debug информация** - показывается в development режиме
- **Ручные тесты** - дополнительные API вызовы на dev странице

## ⚡ Преимущества этой архитектуры

1. **Автоматизация**: Пользователь создается сразу при запуске
2. **Централизация**: Один источник данных для всего приложения
3. **Переиспользование**: Простой хук для любой страницы
4. **Обработка ошибок**: Единая система обработки всех состояний
5. **Типизация**: Четкие состояния и интерфейсы
6. **Отладка**: Подробное логирование и dev инструменты

## 🚀 Быстрый старт

1. Пользователь открывает приложение в Telegram
2. Автоматически создается/получается в БД
3. Все страницы используют `useUser()` для получения данных
4. Показываются экраны загрузки/ошибки при необходимости
5. Приложение готово к работе!

Больше никаких ручных вызовов API для создания пользователя - все происходит автоматически! 🎉
