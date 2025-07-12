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

  // Перенаправляем на страницу результатов
  const resultPage = isSuccess
    ? "/all-modules/test-results/success"
    : "/all-modules/test-results/fail";
  router.push({
    pathname: resultPage,
    query: { from: lessonUrl },
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
