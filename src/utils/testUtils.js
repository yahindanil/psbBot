import Router from "next/router";
import { completeLesson } from "@/utils/api";

// Маппинг URL урока к ID урока в базе данных (согласно новой документации API)
const LESSON_URL_TO_ID_MAP = {
  "/all-modules/module-1/lesson-1": 1,
  "/all-modules/module-1/lesson-2": 2,
  "/all-modules/module-1/lesson-3": 3,
  "/all-modules/module-1/lesson-4": 4,
  "/all-modules/module-2/lesson-1": 5,
  "/all-modules/module-2/lesson-2": 6,
  "/all-modules/module-3/lesson-1": 7,
  "/all-modules/module-3/lesson-2": 8,
  "/all-modules/module-3/lesson-3": 9,
  "/all-modules/module-3/lesson-4": 10,
  "/all-modules/module-4/lesson-1": 11,
  "/all-modules/module-4/lesson-2": 12,
  "/all-modules/module-4/lesson-3": 13,
  "/all-modules/module-4/lesson-4": 14,
};

// Структура модулей и уроков для навигации
const LESSON_STRUCTURE = {
  "module-1": ["lesson-1", "lesson-2", "lesson-3", "lesson-4"],
  "module-2": ["lesson-1", "lesson-2"],
  "module-3": ["lesson-1", "lesson-2", "lesson-3", "lesson-4"],
  "module-4": ["lesson-1", "lesson-2", "lesson-3", "lesson-4"],
};

/**
 * Парсит URL урока и возвращает moduleId и lessonId
 * @param {string} lessonUrl - URL урока (например, "/all-modules/module-1/lesson-1")
 * @returns {Object} - {moduleId: 'module-1', lessonId: 'lesson-1'}
 */
export function parseLessonUrl(lessonUrl) {
  const match = lessonUrl.match(/\/all-modules\/(module-\d+)\/(lesson-\d+)/);
  if (match) {
    return {
      moduleId: match[1],
      lessonId: match[2],
    };
  }
  return null;
}

/**
 * Находит следующий урок
 * @param {string} lessonUrl - URL текущего урока
 * @returns {string|null} - URL следующего урока или null если это последний урок
 */
export function getNextLessonUrl(lessonUrl) {
  const parsed = parseLessonUrl(lessonUrl);
  if (!parsed) return null;

  const { moduleId, lessonId } = parsed;
  const lessons = LESSON_STRUCTURE[moduleId];

  if (!lessons) return null;

  const currentIndex = lessons.indexOf(lessonId);
  if (currentIndex === -1) return null;

  // Если есть следующий урок в том же модуле
  if (currentIndex < lessons.length - 1) {
    return `/all-modules/${moduleId}/${lessons[currentIndex + 1]}`;
  }

  // Если это последний урок в модуле, переходим к первому уроку следующего модуля
  const moduleNumber = parseInt(moduleId.split("-")[1]);
  const nextModuleId = `module-${moduleNumber + 1}`;

  if (LESSON_STRUCTURE[nextModuleId]) {
    return `/all-modules/${nextModuleId}/${LESSON_STRUCTURE[nextModuleId][0]}`;
  }

  // Если это последний урок последнего модуля, возвращаем null
  return null;
}

/**
 * Получает URL теста для урока
 * @param {string} lessonUrl - URL урока
 * @returns {string} - URL теста
 */
export function getTestUrlFromLessonUrl(lessonUrl) {
  return `${lessonUrl}/test`;
}

/**
 * Проверяет ответы теста и перенаправляет на страницу результатов (базовая функция)
 * @deprecated Используйте checkTestAndRedirectWithAPI для полной интеграции с API
 */
export function checkTestAndRedirect({
  correctAnswers,
  userAnswers,
  lessonUrl,
  router,
}) {
  const isSuccess = correctAnswers.every(
    (ans, idx) => ans === userAnswers[idx]
  );
  const resultPage = isSuccess
    ? "/all-modules/test-results/success"
    : "/all-modules/test-results/fail";
  router.push({
    pathname: resultPage,
    query: { from: lessonUrl },
  });
}

/**
 * Проверяет ответы теста, отправляет результат в API и перенаправляет на страницу результатов
 * @param {Object} params - Параметры теста
 * @param {Array} params.correctAnswers - Массив правильных ответов
 * @param {Array} params.userAnswers - Массив ответов пользователя
 * @param {string} params.lessonUrl - URL урока
 * @param {Object} params.router - Router объект Next.js
 * @param {Object} params.telegramUser - Данные пользователя Telegram
 * @param {number} params.timeSpentSeconds - Время прохождения урока в секундах
 * @param {Function} params.onLessonCompleted - Колбэк после успешного завершения урока
 * @param {Function} params.addLog - Функция логирования
 */
export async function checkTestAndRedirectWithAPI({
  correctAnswers,
  userAnswers,
  lessonUrl,
  router,
  telegramUser,
  timeSpentSeconds = 300, // По умолчанию 5 минут
  onLessonCompleted = null,
  addLog = console.log, // Функция логирования, по умолчанию console.log
}) {
  const log = (type, message, data) => {
    if (typeof addLog === "function") {
      addLog(type, message, data);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`, data || "");
    }
  };

  log("info", "Начало функции checkTestAndRedirectWithAPI", {
    correctAnswers,
    userAnswers,
    lessonUrl,
    telegramUser: telegramUser
      ? { id: telegramUser.id, first_name: telegramUser.first_name }
      : null,
    timeSpentSeconds,
  });

  // Проверяем результат теста
  const correctCount = correctAnswers.reduce((count, correct, index) => {
    const isCorrect = userAnswers[index] === correct;
    log(
      "info",
      `Вопрос ${index + 1}: правильный ответ ${correct}, ответ пользователя ${
        userAnswers[index]
      }, корректно: ${isCorrect}`
    );
    return count + (isCorrect ? 1 : 0);
  }, 0);

  const isSuccess = correctCount === correctAnswers.length;
  log(
    "info",
    `Результат теста: ${correctCount}/${correctAnswers.length}, успешно: ${isSuccess}`
  );

  // Если тест пройден успешно, отправляем результат в API
  if (isSuccess && telegramUser) {
    try {
      const lessonId = LESSON_URL_TO_ID_MAP[lessonUrl];
      log("info", `Поиск lesson ID для URL ${lessonUrl}: ${lessonId}`);

      if (lessonId) {
        log("info", `Отправка результата теста в API для урока ${lessonId}`);
        log("info", "Параметры completeLesson", {
          telegramId: telegramUser.id,
          lessonId,
          timeSpentSeconds,
        });

        // Отправляем запрос о завершении урока
        const result = await completeLesson(
          telegramUser.id,
          lessonId,
          timeSpentSeconds
        );

        log("success", `Урок успешно завершен`, result);

        // Если модуль также завершен, показываем дополнительную информацию
        if (result.module_completed) {
          log("success", `Модуль ${result.module_id} также завершен!`, result);
        }

        // Вызываем колбэк после успешного завершения урока
        if (typeof onLessonCompleted === "function") {
          try {
            await onLessonCompleted(result);
            log("info", "Колбэк onLessonCompleted выполнен успешно");
          } catch (callbackError) {
            log("error", "Ошибка в колбэке onLessonCompleted", callbackError);
          }
        }
      } else {
        log("warning", `Lesson ID не найден для URL: ${lessonUrl}`);
        log("warning", "Доступные маппинги", LESSON_URL_TO_ID_MAP);
      }
    } catch (error) {
      log("error", `Ошибка отправки результата теста в API`, {
        message: error.message,
        details: error.details,
        type: error.type,
      });
      // Не блокируем пользователя, просто логируем ошибку
    }
  } else {
    if (!isSuccess) {
      log("info", `Тест не пройден, API не вызывается`);
    }
    if (!telegramUser) {
      log("warning", `Данные пользователя недоступны, API не вызывается`);
    }
  }

  // Получаем модуль и урок из URL для удобства
  const { moduleId, lessonId: lessonIdFromUrl } = parseLessonUrl(lessonUrl);
  log("info", `Парсинг URL: moduleId=${moduleId}, lessonId=${lessonIdFromUrl}`);

  if (isSuccess) {
    log("info", `Переход на страницу успеха`);
    router.push(`/all-modules/test-results/success?from=${lessonUrl}`);
  } else {
    log("info", `Переход на страницу неудачи`);
    router.push(`/all-modules/test-results/fail?from=${lessonUrl}`);
  }

  log("info", `Функция завершена`);
}

/**
 * Улучшенная версия функции с интеграцией таймера урока
 * @param {Object} params - Параметры теста
 * @param {Array} params.correctAnswers - Массив правильных ответов
 * @param {Array} params.userAnswers - Массив ответов пользователя
 * @param {string} params.lessonUrl - URL урока
 * @param {Object} params.router - Router объект Next.js
 * @param {Object} params.telegramUser - Данные пользователя Telegram
 * @param {Object} params.lessonTimer - Объект таймера урока (из useLessonTimer)
 * @param {Function} params.onLessonCompleted - Колбэк после успешного завершения урока
 * @param {Function} params.refreshUserData - Функция обновления данных пользователя
 * @param {Function} params.addLog - Функция логирования
 */
export async function checkTestWithTimer({
  correctAnswers,
  userAnswers,
  lessonUrl,
  router,
  telegramUser,
  lessonTimer,
  onLessonCompleted = null,
  refreshUserData = null,
  addLog = console.log,
}) {
  const log = (type, message, data) => {
    if (typeof addLog === "function") {
      addLog(type, message, data);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`, data || "");
    }
  };

  log("info", "Начало функции checkTestWithTimer", {
    lessonUrl,
    hasTimer: !!lessonTimer,
    telegramUser: telegramUser
      ? { id: telegramUser.id, first_name: telegramUser.first_name }
      : null,
  });

  // Останавливаем таймер и получаем время урока
  let timeSpentSeconds = 300; // Значение по умолчанию (5 минут)

  if (lessonTimer && typeof lessonTimer.stopTimer === "function") {
    try {
      timeSpentSeconds = lessonTimer.stopTimer();
      log("info", `Таймер остановлен. Время урока: ${timeSpentSeconds} секунд`);

      // Если время слишком маленькое, используем минимальное значение
      if (timeSpentSeconds < 10) {
        log(
          "warning",
          `Время урока слишком маленькое (${timeSpentSeconds}с), используем минимальное значение`
        );
        timeSpentSeconds = 60; // 1 минута минимум
      }

      // Если время слишком большое, ограничиваем его
      if (timeSpentSeconds > 7200) {
        // 2 часа
        log(
          "warning",
          `Время урока слишком большое (${timeSpentSeconds}с), ограничиваем до 2 часов`
        );
        timeSpentSeconds = 7200;
      }
    } catch (timerError) {
      log("error", "Ошибка при остановке таймера", timerError);
      timeSpentSeconds = 300; // Используем значение по умолчанию
    }
  } else {
    log(
      "warning",
      "Таймер не предоставлен или некорректен, используем время по умолчанию"
    );
  }

  // Вызываем основную функцию проверки теста
  await checkTestAndRedirectWithAPI({
    correctAnswers,
    userAnswers,
    lessonUrl,
    router,
    telegramUser,
    timeSpentSeconds,
    onLessonCompleted: async (result) => {
      // Обновляем данные пользователя после завершения урока
      if (typeof refreshUserData === "function") {
        try {
          await refreshUserData();
          log("info", "Данные пользователя обновлены после завершения урока");
        } catch (refreshError) {
          log("error", "Ошибка обновления данных пользователя", refreshError);
        }
      }

      // Вызываем переданный колбэк
      if (typeof onLessonCompleted === "function") {
        await onLessonCompleted(result);
      }
    },
    addLog,
  });
}

/**
 * Получает ID урока по его URL
 * @param {string} lessonUrl - URL урока
 * @returns {number|null} ID урока или null если не найден
 */
export function getLessonIdFromUrl(lessonUrl) {
  return LESSON_URL_TO_ID_MAP[lessonUrl] || null;
}

/**
 * Добавляет новый маппинг URL урока к ID (для расширения)
 * @param {string} lessonUrl - URL урока
 * @param {number} lessonId - ID урока в базе данных
 */
export function addLessonMapping(lessonUrl, lessonId) {
  LESSON_URL_TO_ID_MAP[lessonUrl] = lessonId;
}

/**
 * Получает информацию о модуле по ID урока
 * @param {number} lessonId - ID урока (1-14)
 * @returns {Object} - Информация о модуле
 */
export function getModuleInfoByLessonId(lessonId) {
  if (lessonId >= 1 && lessonId <= 4) {
    return { moduleId: 1, moduleName: "Учимся ставить цели" };
  } else if (lessonId >= 5 && lessonId <= 6) {
    return { moduleId: 2, moduleName: "Знакомимся с миром инвестиций" };
  } else if (lessonId >= 7 && lessonId <= 10) {
    return { moduleId: 3, moduleName: "Исследуем инструменты инвестора" };
  } else if (lessonId >= 11 && lessonId <= 14) {
    return { moduleId: 4, moduleName: "Собираем твой первый портфель" };
  }
  return { moduleId: null, moduleName: "Неизвестный модуль" };
}

/**
 * Проверяет, является ли урок последним в модуле
 * @param {number} lessonId - ID урока (1-14)
 * @returns {boolean} - true если урок последний в модуле
 */
export function isLastLessonInModule(lessonId) {
  return [4, 6, 10, 14].includes(lessonId);
}

/**
 * Получает номер урока в модуле
 * @param {number} lessonId - ID урока (1-14)
 * @returns {number} - Номер урока в модуле (1-4)
 */
export function getLessonNumberInModule(lessonId) {
  if (lessonId >= 1 && lessonId <= 4) {
    return lessonId;
  } else if (lessonId >= 5 && lessonId <= 6) {
    return lessonId - 4;
  } else if (lessonId >= 7 && lessonId <= 10) {
    return lessonId - 6;
  } else if (lessonId >= 11 && lessonId <= 14) {
    return lessonId - 10;
  }
  return 0;
}
