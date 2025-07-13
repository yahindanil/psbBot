import Router from "next/router";
import { completeLesson } from "@/utils/api";

// Маппинг URL урока к ID урока в базе данных
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
 * @param {number} params.timeSpentSeconds - Время прохождения теста в секундах
 */
export async function checkTestAndRedirectWithAPI({
  correctAnswers,
  userAnswers,
  lessonUrl,
  router,
  telegramUser,
  timeSpentSeconds = 300, // По умолчанию 5 минут
}) {
  const isSuccess = correctAnswers.every(
    (ans, idx) => ans === userAnswers[idx]
  );

  // Если тест пройден успешно, отправляем результат в API
  if (isSuccess && telegramUser) {
    try {
      const lessonId = LESSON_URL_TO_ID_MAP[lessonUrl];

      if (lessonId) {
        console.log(`Отправка результата теста в API для урока ${lessonId}`);
        const result = await completeLesson(
          telegramUser.id,
          lessonId,
          timeSpentSeconds
        );

        console.log("Урок успешно завершен:", result);

        // Если модуль также завершен, можем показать дополнительную информацию
        if (result.module_completed) {
          console.log("Модуль также завершен:", result.module);
        }
      } else {
        console.warn(`Lesson ID не найден для URL: ${lessonUrl}`);
      }
    } catch (error) {
      console.error("Ошибка отправки результата теста в API:", error);
      // Не блокируем пользователя, просто логируем ошибку
    }
  }

  // Получаем модуль и урок из URL для удобства
  const parsed = parseLessonUrl(lessonUrl);
  const queryParams = {
    from: lessonUrl,
    ...(parsed && { module: parsed.moduleId, lesson: parsed.lessonId }),
  };

  // Перенаправляем на страницу результатов с расширенными параметрами
  const resultPage = isSuccess
    ? "/all-modules/test-results/success"
    : "/all-modules/test-results/fail";
  router.push({
    pathname: resultPage,
    query: queryParams,
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
