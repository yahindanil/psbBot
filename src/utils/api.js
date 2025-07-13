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
  const endpoint = "/api/users";
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
    return result;
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
 * Создает модуль в базе данных
 * @param {Object} moduleData - Данные модуля
 * @returns {Promise<Object>} Созданный модуль
 */
export const createModule = async (moduleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moduleData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка создания модуля:", error);
    throw error;
  }
};

/**
 * Создает урок в базе данных
 * @param {Object} lessonData - Данные урока
 * @returns {Promise<Object>} Созданный урок
 */
export const createLesson = async (lessonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка создания урока:", error);
    throw error;
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

    // Фильтруем дубликаты на фронтенде
    if (result.modules) {
      const filteredModules = filterDuplicateModules(result.modules);
      console.log(
        `[API] Отфильтровано ${result.modules.length} -> ${filteredModules.length} модулей`
      );
      return { ...result, modules: filteredModules };
    }

    return result;
  } catch (error) {
    console.error("Ошибка получения модулей:", error);
    throw error;
  }
};

/**
 * Получает уроки модуля
 * @param {number} moduleId - ID модуля
 * @returns {Promise<Object>} Модуль с уроками
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
    return result;
  } catch (error) {
    console.error("Ошибка получения уроков модуля:", error);
    throw error;
  }
};

/**
 * Инициализирует базовые модули и уроки в базе данных
 * @returns {Promise<void>}
 */
export const initializeBasicData = async () => {
  try {
    console.log("[API] Инициализация базовых данных...");

    // Проверяем есть ли уже модули
    const existingModules = await getModules();
    if (existingModules.modules && existingModules.modules.length >= 4) {
      console.log("[API] Модули уже существуют, пропускаем инициализацию");
      console.log(`[API] Найдено модулей: ${existingModules.modules.length}`);

      // Проверяем что есть модули с order_index 1, 2, 3, 4
      const requiredOrders = [1, 2, 3, 4];
      const existingOrders = existingModules.modules.map((m) => m.order_index);
      const missingOrders = requiredOrders.filter(
        (order) => !existingOrders.includes(order)
      );

      if (missingOrders.length === 0) {
        console.log("[API] Все необходимые модули найдены");
        return;
      } else {
        console.log(
          `[API] Отсутствуют модули с order_index: ${missingOrders.join(", ")}`
        );
      }
    }

    // Создаем модули
    const modules = [
      {
        name: "Учимся ставить цели",
        description: "Основы финансового планирования и постановки целей",
        order_index: 1,
      },
      {
        name: "Знакомимся с миром инвестиций",
        description: "Введение в инвестиции и инвестиционные инструменты",
        order_index: 2,
      },
      {
        name: "Исследуем инструменты инвестора",
        description: "Подробное изучение различных инвестиционных инструментов",
        order_index: 3,
      },
      {
        name: "Собираем твой первый портфель",
        description: "Практическое создание инвестиционного портфеля",
        order_index: 4,
      },
    ];

    const createdModules = [];
    for (const moduleData of modules) {
      const createdModule = await createModule(moduleData);
      createdModules.push(createdModule);
      console.log(`[API] Создан модуль: ${createdModule.name}`);
    }

    // Создаем уроки для каждого модуля
    const lessons = [
      // Модуль 1
      {
        module_id: createdModules[0].id,
        name: "Почему деньги не берутся из воздуха",
        description: "Изучаем основы экономики и происхождение денег",
        order_index: 1,
        duration_minutes: 15,
      },
      {
        module_id: createdModules[0].id,
        name: "Зачем ставить финансовые цели",
        description: "Важность планирования и постановки финансовых целей",
        order_index: 2,
        duration_minutes: 20,
      },
      {
        module_id: createdModules[0].id,
        name: "Почему деньги теряют ценность",
        description: "Понятие инфляции и её влияние на сбережения",
        order_index: 3,
        duration_minutes: 18,
      },
      {
        module_id: createdModules[0].id,
        name: "Как инвестиции помогают достичь целей",
        description: "Роль инвестиций в достижении финансовых целей",
        order_index: 4,
        duration_minutes: 22,
      },
      // Модуль 2
      {
        module_id: createdModules[1].id,
        name: "Что можно назвать инвестициями, а что не стоит",
        description: "Различие между инвестициями и спекуляциями",
        order_index: 1,
        duration_minutes: 25,
      },
      {
        module_id: createdModules[1].id,
        name: "Что такое инвестиционные инструменты",
        description: "Обзор основных инвестиционных инструментов",
        order_index: 2,
        duration_minutes: 30,
      },
      // Модуль 3
      {
        module_id: createdModules[2].id,
        name: "Что такое акции и как они работают",
        description: "Подробное изучение акций как инвестиционного инструмента",
        order_index: 1,
        duration_minutes: 35,
      },
      {
        module_id: createdModules[2].id,
        name: "Облигации: как они работают и чем отличаются от акций",
        description: "Изучение облигаций и их особенностей",
        order_index: 2,
        duration_minutes: 30,
      },
      {
        module_id: createdModules[2].id,
        name: "ПИФ — как инвестировать во всё сразу",
        description: "Паевые инвестиционные фонды и их преимущества",
        order_index: 3,
        duration_minutes: 28,
      },
      {
        module_id: createdModules[2].id,
        name: "Доходность и риск — как они связаны",
        description: "Взаимосвязь между доходностью и риском инвестиций",
        order_index: 4,
        duration_minutes: 32,
      },
      // Модуль 4
      {
        module_id: createdModules[3].id,
        name: "Как начать инвестировать самостоятельно",
        description: "Практические шаги для начала инвестирования",
        order_index: 1,
        duration_minutes: 40,
      },
      {
        module_id: createdModules[3].id,
        name: "Как инвестировать с помощью готовых решений",
        description: "Использование готовых инвестиционных продуктов",
        order_index: 2,
        duration_minutes: 35,
      },
      {
        module_id: createdModules[3].id,
        name: "Что такое диверсификация и зачем она нужна",
        description: "Принципы диверсификации инвестиционного портфеля",
        order_index: 3,
        duration_minutes: 30,
      },
      {
        module_id: createdModules[3].id,
        name: "С чего начать: первые шаги в инвестициях",
        description: "Практическое руководство по первым инвестициям",
        order_index: 4,
        duration_minutes: 45,
      },
    ];

    for (const lessonData of lessons) {
      const lesson = await createLesson(lessonData);
      console.log(`[API] Создан урок: ${lesson.name}`);
    }

    console.log("[API] Инициализация базовых данных завершена");
  } catch (error) {
    console.error("[API] Ошибка инициализации базовых данных:", error);
    throw error;
  }
};
