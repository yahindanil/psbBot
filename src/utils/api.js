// Базовый URL для API - используем переменную окружения
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Проверяем корректность URL при инициализации
if (typeof window !== "undefined") {
  console.log(`[API] Используется API Base URL: ${API_BASE_URL}`);
}

/**
 * Улучшенная функция для обработки ошибок API
 * @param {Error} error - Ошибка
 * @param {string} endpoint - Эндпоинт API
 * @param {Object} requestData - Данные запроса
 * @returns {Error} Обогащенная ошибка
 */
const enhanceApiError = (error, endpoint, requestData = null) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    endpoint,
    baseUrl: API_BASE_URL,
    requestData,
    originalError: error.message,
  };

  // Определяем тип ошибки
  let errorType = "UNKNOWN_ERROR";
  let userMessage = "Неизвестная ошибка";

  if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
    errorType = "NETWORK_ERROR";
    userMessage = "Ошибка сети - не удалось подключиться к серверу";
  } else if (error.message.includes("API Error")) {
    errorType = "API_ERROR";
    userMessage = error.message;
  } else if (error.name === "AbortError") {
    errorType = "TIMEOUT_ERROR";
    userMessage = "Превышено время ожидания ответа";
  }

  const enhancedError = new Error(userMessage);
  enhancedError.type = errorType;
  enhancedError.details = errorInfo;

  console.error(`[API] ${errorType}:`, errorInfo);

  return enhancedError;
};

/**
 * Создает или получает пользователя в базе данных
 * @param {Object} userData - Данные пользователя из Telegram
 * @param {number} userData.telegram_id - ID пользователя в Telegram
 * @param {string} userData.username - Username пользователя (может быть null)
 * @param {string} userData.first_name - Имя пользователя
 * @returns {Promise<Object>} Объект пользователя из БД
 */
export const createOrGetUser = async (userData) => {
  const endpoint = "/api/users"; // Возвращаем правильный эндпоинт согласно документации
  const fullUrl = `${API_BASE_URL}${endpoint}`;

  try {
    console.log(`[API] Запрос к ${fullUrl}`, userData);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegram_id: userData.telegram_id,
        username: userData.username || null,
        first_name: userData.first_name,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    // Согласно документации, возвращается объект пользователя напрямую
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, userData);
    console.error(
      `[API] Ошибка создания/получения пользователя:`,
      enhancedError
    );
    throw enhancedError;
  }
};

/**
 * Получает прогресс пользователя
 * @param {number} telegramId - ID пользователя в Telegram
 * @returns {Promise<Object>} Прогресс пользователя
 */
export const getUserProgress = async (telegramId) => {
  const endpoint = `/api/users/${telegramId}/progress`;
  const fullUrl = `${API_BASE_URL}${endpoint}`;

  try {
    console.log(`[API] Запрос к ${fullUrl}`);

    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    // Согласно инструкции, API возвращает: { user: {...}, modules: [...], stats: {...} }
    // Возвращаем структуру как есть для совместимости с существующим кодом
    return {
      user: result.user,
      modules: result.modules || [],
      stats: result.stats || { completed_lessons: 0 },
    };
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, { telegramId });
    console.error(
      `[API] Ошибка получения прогресса пользователя:`,
      enhancedError
    );
    throw enhancedError;
  }
};

/**
 * Отмечает урок как завершенный
 * @param {number} telegramId - ID пользователя в Telegram
 * @param {number} lessonId - ID урока
 * @param {number} timeSpentSeconds - Время, потраченное на урок в секундах
 * @returns {Promise<Object>} Результат завершения урока
 */
export const completeLesson = async (
  telegramId,
  lessonId,
  timeSpentSeconds = 0
) => {
  const endpoint = `/api/users/${telegramId}/lessons/${lessonId}/complete`;
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const requestData = { telegramId, lessonId, timeSpentSeconds };

  try {
    console.log(`[API] Запрос к ${fullUrl}`, requestData);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time_spent_seconds: timeSpentSeconds,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, requestData);
    console.error(`[API] Ошибка завершения урока:`, enhancedError);
    throw enhancedError;
  }
};

/**
 * Фильтрует дубликаты модулей, оставляя только самые новые для каждого order_index
 * @param {Array} modules - Массив модулей
 * @returns {Array} Отфильтрованный массив модулей
 */
const filterDuplicateModules = (modules) => {
  if (!Array.isArray(modules)) return [];

  const modulesByOrder = {};

  // Группируем модули по order_index
  modules.forEach((module) => {
    const orderIndex = module.order_index;
    if (!modulesByOrder[orderIndex]) {
      modulesByOrder[orderIndex] = [];
    }
    modulesByOrder[orderIndex].push(module);
  });

  // Для каждого order_index берем самый новый модуль (по created_at)
  const filteredModules = [];
  for (const orderIndex in modulesByOrder) {
    const modulesForOrder = modulesByOrder[orderIndex];

    // Сортируем по дате создания (самый новый первым)
    modulesForOrder.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Берем самый новый
    filteredModules.push(modulesForOrder[0]);
  }

  // Сортируем по order_index
  filteredModules.sort((a, b) => a.order_index - b.order_index);

  return filteredModules;
};

/**
 * Получает список всех модулей
 * @returns {Promise<Array>} Список модулей
 */
export const getModules = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/modules`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    // Извлекаем массив модулей из обертки согласно инструкции бекендера
    const modules = result.modules || result;

    // Фильтруем дубликаты на фронтенде (временное решение)
    if (Array.isArray(modules)) {
      const filteredModules = filterDuplicateModules(modules);
      console.log(
        `[API] Отфильтровано ${modules.length} -> ${filteredModules.length} модулей`
      );
      return filteredModules;
    }

    return modules;
  } catch (error) {
    console.error("Ошибка получения модулей:", error);
    throw error;
  }
};

/**
 * Получает уроки модуля
 * @param {number} moduleId - ID модуля
 * @returns {Promise<Array>} Список уроков
 */
export const getModuleLessons = async (moduleId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/modules/${moduleId}/lessons`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    // Извлекаем массив уроков из обертки согласно инструкции бекендера
    return result.lessons || result;
  } catch (error) {
    console.error("Ошибка получения уроков модуля:", error);
    throw error;
  }
};
