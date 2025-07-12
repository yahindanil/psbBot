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
│  (Context)      │ ← Поддерживает localhost режим для разработки
└─────────────────┘
          │
    ┌─────────┴─────────┐
    │                   │
┌───▼────┐         ┌────▼────┐
│Telegram│         │   API   │
│WebApp  │         │ Utils   │
│OR Mock │         │         │
└────────┘         └─────────┘
```

## 📁 Структура файлов

```
src/
├── contexts/
│   └── UserContext.js          # Главный контекст пользователя + localhost поддержка
├── utils/
│   └── api.js                  # Утилиты для работы с API
├── components/ui/
│   ├── LoadingScreen.jsx       # Экран загрузки
│   └── ErrorScreen.jsx         # Экран ошибки
└── pages/
    ├── _app.js                 # Интеграция UserProvider
    ├── index.js                # ГЛАВНАЯ страница с инициализацией
    ├── all-modules/index.js    # Пример использования
    └── dev/index.js            # Страница разработки
```

## 🔄 Последовательность инициализации

### 🌐 В Telegram:

1. **Запуск приложения** → `_app.js` загружает `UserProvider`
2. **UserProvider** автоматически:
   - Инициализирует Telegram WebApp (`WebApp.ready()`, `WebApp.expand()`)
   - Получает данные пользователя из `WebApp.initDataUnsafe.user`
   - Автоматически вызывает `POST /api/users` для создания/получения пользователя в БД

### 🛠 В localhost (режим разработки):

1. **Запуск приложения** → `_app.js` загружает `UserProvider`
2. **UserProvider** автоматически:

   - Определяет что это localhost
   - Создает тестовые данные пользователя: **John Doe (ID: 123456789)**
   - Автоматически вызывает `POST /api/users` с тестовыми данными
   - Показывает уведомления о режиме разработки

3. **Любая страница** может использовать `useUser()` хук для получения данных

## 🎣 Использование useUser хука

```javascript
import { useUser } from "@/contexts/UserContext";

function MyComponent() {
  const {
    telegramUser, // Данные из Telegram (или тестовые)
    dbUser, // Данные из БД
    isInitializing, // Идет ли инициализация
    hasError, // Есть ли ошибка
    error, // Текст ошибки
    retryDbUser, // Функция повторной попытки
    canUseApp, // Можно ли использовать приложение
    isLocalDevelopment, // 🆕 Режим локальной разработки
  } = useUser();

  if (isInitializing) return <LoadingScreen />;
  if (hasError) return <ErrorScreen error={error} onRetry={retryDbUser} />;
  if (!canUseApp) return <div>Приложение недоступно</div>;

  return (
    <div>
      {isLocalDevelopment && (
        <div>🛠 РЕЖИМ РАЗРАБОТКИ: {telegramUser.first_name}</div>
      )}
      <div>Добро пожаловать, {telegramUser.first_name}!</div>
    </div>
  );
}
```

## 🧪 Локальное тестирование

### Автоматическое определение:

Приложение автоматически определяет localhost по URL:

- `localhost`
- `127.0.0.1`
- `::1`

### Тестовые данные пользователя:

```javascript
{
  id: 123456789,
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  language_code: "ru",
  is_premium: false,
  photo_url: null,
  is_bot: false
}
```

### Уведомления в режиме разработки:

- 🛠 **Желтый баннер** на всех страницах
- **Логирование** с префиксом "🛠 РЕЖИМ РАЗРАБОТКИ"
- **Маркировка** тестовых данных в debug панели

## 🔧 API функции (utils/api.js)

### createOrGetUser(userData)

Создает или получает существующего пользователя в БД.

```javascript
import { createOrGetUser } from "@/utils/api";

// В Telegram
const user = await createOrGetUser({
  telegram_id: 987654321,
  username: "realuser",
  first_name: "Иван",
});

// В localhost (автоматически)
const user = await createOrGetUser({
  telegram_id: 123456789,
  username: "johndoe",
  first_name: "John",
});
```

### getUserProgress(telegramId)

Получает прогресс пользователя по модулям и урокам.

```javascript
import { getUserProgress } from "@/utils/api";

// Работает одинаково в обоих режимах
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

| Состояние            | Описание                                |
| -------------------- | --------------------------------------- |
| `isInitializing`     | Идет процесс инициализации              |
| `hasError`           | Произошла ошибка при инициализации      |
| `canUseApp`          | Все готово для использования приложения |
| `isInTelegram`       | Приложение запущено в Telegram          |
| `isLocalDevelopment` | 🆕 Режим локальной разработки           |

## 🔄 Жизненный цикл

### В Telegram:

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

### В localhost:

```
1. Загрузка приложения
   ↓
2. UserProvider.useEffect()
   ↓
3. Определение localhost режима
   ↓
4. Создание тестовых данных John Doe
   ↓
5. Автоматический вызов createOrGetUser() с тестовыми данными
   ↓
6. Сохранение данных в Context + флаг isLocalDevelopment
   ↓
7. Приложение готово к использованию + показ уведомлений о разработке
```

## 🛠 Обработка ошибок

- **Telegram недоступен**: `isInTelegram = false` (но если localhost, то `canUseApp = true`)
- **Нет данных пользователя**: `telegramUser = null` (в localhost создаются тестовые)
- **Ошибка API**: `hasError = true`, показывается `ErrorScreen`
- **Повторная попытка**: кнопка "Попробовать снова" вызывает `retryDbUser()`

## 📊 Логирование

Все действия логируются в консоль браузера:

### В Telegram:

```
[UserContext] Инициализация Telegram WebApp...
[UserContext] Данные пользователя Telegram получены {...}
[UserContext] Создание/получение пользователя в БД...
[UserContext] Пользователь успешно создан/получен в БД {...}
```

### В localhost:

```
[UserContext] 🛠 РЕЖИМ РАЗРАБОТКИ: Используются тестовые данные
[UserContext] Создание/получение тестового пользователя в БД...
[UserContext] Тестовый пользователь успешно создан/получен в БД {...}
```

## 🧪 Тестирование

- **Dev страница** (`/dev`) - полная диагностика системы + поддержка localhost
- **Debug информация** - показывается в development режиме на всех страницах
- **Ручные тесты** - дополнительные API вызовы на dev странице
- **Уведомления о разработке** - желтые баннеры в localhost режиме

## ⚡ Преимущества этой архитектуры

1. **Автоматизация**: Пользователь создается сразу при запуске
2. **Централизация**: Один источник данных для всего приложения
3. **Переиспользование**: Простой хук для любой страницы
4. **Обработка ошибок**: Единая система обработки всех состояний
5. **Локальная разработка**: 🆕 Автоматическое определение и тестовые данные
6. **Отладка**: Подробное логирование и dev инструменты

## 🚀 Быстрый старт

### В Telegram:

1. Пользователь открывает приложение в Telegram
2. Автоматически создается/получается в БД
3. Все страницы используют `useUser()` для получения данных
4. Показываются экраны загрузки/ошибки при необходимости
5. Приложение готово к работе!

### В localhost:

1. Разработчик запускает `npm run dev`
2. Открывает `http://localhost:3000`
3. Автоматически создается тестовый пользователь John Doe
4. Показываются уведомления о режиме разработки
5. Приложение готово к тестированию!

## 🔧 Настройка для разработки

1. **Запуск бэкенда**: `cd education-bot-backend && python run.py`
2. **Запуск фронтенда**: `npm run dev`
3. **Открытие браузера**: `http://localhost:3000`
4. **Автоматическое создание пользователя**: John Doe (123456789)

Больше никаких ручных вызовов API или настройки тестовых данных - все происходит автоматически! 🎉
