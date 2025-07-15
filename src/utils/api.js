// Базовый URL для API - используем переменную окружения или документированный URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://212.34.143.198:8000";

// URL вебхука Botmother
const BOTMOTHER_WEBHOOK_URL =
  "https://app.botmother.com/api/bot/action/LWjF-r9vH/DFDBB3BKCNB8BxeDLX-CQBaC1COBzBwBWCYDlBDxBVqDGClC2BUDFDsB8BEeBLcD";

// Маппинг уроков к их названиям
const LESSON_TITLES = {
  1: "Почему деньги не берутся из воздуха",
  2: "Зачем ставить финансовые цели",
  3: "Почему деньги теряют ценность",
  4: "Как инвестиции помогают достичь целей",
  5: "Что можно назвать инвестициями, а что не стоит",
  6: "Что такое инвестиционные инструменты",
  7: "Что такое акции и как они работают",
  8: "Облигации: как они работают и чем отличаются от акций",
  9: "ПИФ — как инвестировать во всё сразу",
  10: "Доходность и риск — как они связаны",
  11: "Как начать инвестировать самостоятельно",
  12: "Как инвестировать с помощью готовых решений",
  13: "Что такое диверсификация и зачем она нужна",
  14: "С чего начать: первые шаги в инвестициях",
};

/**
 * Отправляет уведомление о завершении урока в Botmother
 * @param {number} telegramId - ID пользователя в Telegram
 * @param {number} lessonId - ID урока (от 1 до 14)
 * @returns {Promise<void>}
 */
const sendLessonCompletionWebhook = async (telegramId, lessonId) => {
  try {
    const lessonTitle = LESSON_TITLES[lessonId] || `Урок ${lessonId}`;

    const webhookData = {
      platform: "tg",
      users: [telegramId.toString()],
      data: {
        lesson_id: lessonId,
        lesson_title: lessonTitle,
        completion_time: new Date().toISOString(),
      },
    };

    console.log(
      `[BOTMOTHER] Отправка вебхука для урока ${lessonId}:`,
      webhookData
    );

    const response = await fetch(BOTMOTHER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[BOTMOTHER] Ошибка отправки вебхука:`, {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
    } else {
      console.log(`[BOTMOTHER] Вебхук успешно отправлен для урока ${lessonId}`);
    }
  } catch (error) {
    // Не блокируем основной процесс при ошибке вебхука
    console.error(`[BOTMOTHER] Ошибка при отправке вебхука:`, error);
  }
};

// Функция для нормализации URL (убирает двойные слэши)
const normalizeUrl = (baseUrl, endpoint) => {
  // Убираем завершающий слэш из базового URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  // Убираем начальный слэш из эндпоинта, если он есть
  const cleanEndpoint = endpoint.replace(/^\//, "");
  // Соединяем с одним слэшем
  const normalizedUrl = `${cleanBaseUrl}/${cleanEndpoint}`;

  console.log(
    `[API] URL нормализация: ${baseUrl} + ${endpoint} = ${normalizedUrl}`
  );
  return normalizedUrl;
};

// Проверяем корректность URL при инициализации
if (typeof window !== "undefined") {
  console.log(`[API] Используется API Base URL: ${API_BASE_URL}`);
}

/**
 * Проверяет доступность базового URL
 * @returns {Promise<Object>} Результат проверки
 */
const checkBaseUrlConnectivity = async () => {
  try {
    const testUrl = API_BASE_URL.replace(/\/$/, "");
    const response = await fetch(testUrl, {
      method: "GET",
      mode: "cors",
    });
    return {
      accessible: true,
      status: response.status,
      statusText: response.statusText,
      url: testUrl,
    };
  } catch (error) {
    return {
      accessible: false,
      error: error.message,
      url: API_BASE_URL.replace(/\/$/, ""),
    };
  }
};

/**
 * Улучшенная функция для обработки ошибок API
 * @param {Error} error - Ошибка
 * @param {string} endpoint - Эндпоинт API
 * @param {Object} requestData - Данные запроса
 * @param {Object} requestDetails - Детали запроса (URL, headers, etc.)
 * @returns {Error} Обогащенная ошибка
 */
const enhanceApiError = (
  error,
  endpoint,
  requestData = null,
  requestDetails = {}
) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    endpoint,
    baseUrl: API_BASE_URL,
    fullUrl: requestDetails.fullUrl,
    method: requestDetails.method || "UNKNOWN",
    requestHeaders: requestDetails.headers || {},
    requestData,
    responseStatus: requestDetails.responseStatus,
    responseStatusText: requestDetails.responseStatusText,
    responseHeaders: requestDetails.responseHeaders,
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
 * Создает или получает пользователя
 * @param {Object} userData - Данные пользователя
 * @param {number} userData.telegram_id - ID пользователя в Telegram
 * @param {string} userData.username - Username пользователя
 * @param {string} userData.first_name - Имя пользователя
 * @returns {Promise<Object>} Данные пользователя
 */
export const createOrGetUser = async (userData) => {
  const endpoint = "/api/users";
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  // Проверяем доступность базового URL
  const connectivity = await checkBaseUrlConnectivity();
  console.log(`[API] Проверка доступности базового URL:`, connectivity);

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const requestBody = {
    telegram_id: userData.telegram_id,
    username: userData.username || null,
    first_name: userData.first_name,
  };

  let requestDetails = {
    fullUrl,
    method: "POST",
    headers: requestHeaders,
  };

  try {
    console.log(`[API] Отправляем запрос:`, {
      url: fullUrl,
      method: "POST",
      headers: requestHeaders,
      body: requestBody,
    });

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    // Добавляем информацию о ответе
    requestDetails.responseStatus = response.status;
    requestDetails.responseStatusText = response.statusText;
    requestDetails.responseHeaders = {};

    // Собираем заголовки ответа
    for (const [key, value] of response.headers.entries()) {
      requestDetails.responseHeaders[key] = value;
    }

    console.log(`[API] Получен ответ:`, {
      status: response.status,
      statusText: response.statusText,
      headers: requestDetails.responseHeaders,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`[API] Тело ошибки:`, errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    // Согласно документации, возвращается объект пользователя напрямую
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(
      error,
      endpoint,
      userData,
      requestDetails
    );
    console.error(
      `[API] Ошибка создания/получения пользователя:`,
      enhancedError
    );
    throw enhancedError;
  }
};

/**
 * Получает пользователя по Telegram ID
 * @param {number} telegramId - ID пользователя в Telegram
 * @returns {Promise<Object>} Данные пользователя со всеми 18 полями (4 модуля + 14 уроков)
 */
export const getUser = async (telegramId) => {
  const endpoint = `/api/users/${telegramId}`;
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);

    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, { telegramId });
    console.error(`[API] Ошибка получения пользователя:`, enhancedError);
    throw enhancedError;
  }
};

/**
 * Получает статистику пользователя
 * @param {number} telegramId - ID пользователя в Telegram
 * @returns {Promise<Object>} Статистика пользователя (ProgressStats)
 */
export const getUserStats = async (telegramId) => {
  const endpoint = `/api/users/${telegramId}/stats`;
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);

    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, { telegramId });
    console.error(
      `[API] Ошибка получения статистики пользователя:`,
      enhancedError
    );
    throw enhancedError;
  }
};

/**
 * Получает среднее время прохождения уроков пользователем
 * @param {number} telegramId - ID пользователя в Telegram
 * @returns {Promise<Object>} Среднее время прохождения
 */
export const getUserAverageTime = async (telegramId) => {
  const endpoint = `/api/users/${telegramId}/average-time`;
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);

    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint, { telegramId });
    console.error(`[API] Ошибка получения среднего времени:`, enhancedError);
    throw enhancedError;
  }
};

/**
 * Обновляет среднее время прохождения уроков
 * @param {number} telegramId - ID пользователя в Telegram
 * @param {number} averageTime - Новое среднее время в секундах
 * @returns {Promise<Object>} Результат обновления
 */
export const updateUserAverageTime = async (telegramId, averageTime) => {
  const endpoint = `/api/users/${telegramId}/average-time`;
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const requestBody = {
    average_lesson_time: averageTime,
  };

  let requestDetails = {
    fullUrl,
    method: "PUT",
    headers: requestHeaders,
  };

  try {
    console.log(`[API] Запрос к ${fullUrl}`, {
      requestBody,
      headers: requestHeaders,
    });

    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    // Добавляем информацию о ответе
    requestDetails.responseStatus = response.status;
    requestDetails.responseStatusText = response.statusText;
    requestDetails.responseHeaders = {};

    // Собираем заголовки ответа
    for (const [key, value] of response.headers.entries()) {
      requestDetails.responseHeaders[key] = value;
    }

    console.log(`[API] Получен ответ:`, {
      status: response.status,
      statusText: response.statusText,
      headers: requestDetails.responseHeaders,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`[API] Тело ошибки:`, errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);

    // Отправляем вебхук в Botmother о завершении урока
    await sendLessonCompletionWebhook(telegramId, lessonId);

    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(
      error,
      endpoint,
      { telegramId, averageTime },
      requestDetails
    );
    console.error(`[API] Ошибка обновления среднего времени:`, enhancedError);
    throw enhancedError;
  }
};

/**
 * Отмечает урок как завершенный
 * @param {number} telegramId - ID пользователя в Telegram
 * @param {number} lessonId - ID урока (от 1 до 14)
 * @param {number} timeSpentSeconds - Время, потраченное на урок в секундах
 * @returns {Promise<Object>} Результат завершения урока
 */
export const completeLesson = async (
  telegramId,
  lessonId,
  timeSpentSeconds = 0
) => {
  const endpoint = `/api/users/${telegramId}/complete/${lessonId}`;
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);
  const requestData = { telegramId, lessonId, timeSpentSeconds };
  const requestHeaders = {
    "Content-Type": "application/json",
  };
  const requestBody = {
    lesson_id: lessonId,
    time_spent_seconds: timeSpentSeconds,
  };

  let requestDetails = {
    fullUrl,
    method: "POST",
    headers: requestHeaders,
  };

  try {
    console.log(`[API] Запрос к ${fullUrl}`, {
      requestData,
      requestBody,
      headers: requestHeaders,
    });

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    // Добавляем информацию о ответе
    requestDetails.responseStatus = response.status;
    requestDetails.responseStatusText = response.statusText;
    requestDetails.responseHeaders = {};

    // Собираем заголовки ответа
    for (const [key, value] of response.headers.entries()) {
      requestDetails.responseHeaders[key] = value;
    }

    console.log(`[API] Получен ответ:`, {
      status: response.status,
      statusText: response.statusText,
      headers: requestDetails.responseHeaders,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`[API] Тело ошибки:`, errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(
      error,
      endpoint,
      requestData,
      requestDetails
    );
    console.error(`[API] Ошибка завершения урока:`, enhancedError);
    throw enhancedError;
  }
};

/**
 * Получает информацию о системе (health check)
 * @returns {Promise<Object>} Информация о системе
 */
export const getSystemInfo = async () => {
  const endpoint = "/";
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint);
    console.error("Ошибка получения информации о системе:", enhancedError);
    throw enhancedError;
  }
};

/**
 * Получает состояние здоровья API
 * @returns {Promise<Object>} Состояние API
 */
export const getHealthCheck = async () => {
  const endpoint = "/health";
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint);
    console.error("Ошибка проверки здоровья API:", enhancedError);
    throw enhancedError;
  }
};

/**
 * Получает структуру курса (для отладки)
 * @returns {Promise<Object>} Структура курса
 */
export const getCourseStructure = async () => {
  const endpoint = "/api/debug/structure";
  const fullUrl = normalizeUrl(API_BASE_URL, endpoint);

  try {
    console.log(`[API] Запрос к ${fullUrl}`);
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`[API] Успешный ответ от ${endpoint}:`, result);
    return result;
  } catch (error) {
    const enhancedError = enhanceApiError(error, endpoint);
    console.error("Ошибка получения структуры курса:", enhancedError);
    throw enhancedError;
  }
};

// Удаляем старые неиспользуемые функции (getUserProgress, getModules, getModuleLessons)
// так как новый API имеет другую структуру
