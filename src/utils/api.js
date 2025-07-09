// Базовый URL для API
const API_BASE_URL = "http://localhost:8000";

/**
 * Создает или получает пользователя в базе данных
 * @param {Object} userData - Данные пользователя из Telegram
 * @param {number} userData.telegram_id - ID пользователя в Telegram
 * @param {string} userData.username - Username пользователя (может быть null)
 * @param {string} userData.first_name - Имя пользователя
 * @returns {Promise<Object>} Объект пользователя из БД
 */
export const createOrGetUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
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
    return result;
  } catch (error) {
    console.error("Ошибка создания/получения пользователя:", error);
    throw error;
  }
};

/**
 * Получает прогресс пользователя
 * @param {number} telegramId - ID пользователя в Telegram
 * @returns {Promise<Object>} Прогресс пользователя
 */
export const getUserProgress = async (telegramId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${telegramId}/progress`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка получения прогресса пользователя:", error);
    throw error;
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
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${telegramId}/lessons/${lessonId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time_spent_seconds: timeSpentSeconds,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка завершения урока:", error);
    throw error;
  }
};
