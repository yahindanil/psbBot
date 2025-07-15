import { createContext, useContext, useState, useEffect } from "react";
import { createOrGetUser, getUser, getUserStats } from "@/utils/api";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};

// Тестовые данные для локальной разработки
const createMockUserData = () => ({
  id: 123456789,
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  language_code: "ru",
  is_premium: false,
  photo_url: null,
  is_bot: false,
});

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    // Данные из Telegram WebApp
    telegramUser: null,
    isTelegramLoaded: false,
    isInTelegram: false,

    // Данные из нашей БД (полная информация о пользователе)
    dbUser: null,
    isDbUserLoaded: false,

    // Статистика пользователя
    userStats: null,
    isStatsLoaded: false,

    // Состояние загрузки и ошибок
    isInitializing: true,
    error: null,

    // Флаг для режима разработки
    isLocalDevelopment: false,
  });

  // Функция для логирования
  const log = (message, data = null) => {
    console.log(`[UserContext] ${message}`, data || "");
  };

  // Проверяем, запущено ли приложение локально
  const isLocalhost = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "::1"
    );
  };

  // Загружает полные данные пользователя и статистику
  const loadUserData = async (telegramId) => {
    try {
      log("Загрузка полных данных пользователя...");

      // Загружаем данные пользователя и статистику параллельно
      const [userData, statsData] = await Promise.all([
        getUser(telegramId),
        getUserStats(telegramId),
      ]);

      log("Данные пользователя получены:", userData);
      log("Статистика пользователя получена:", statsData);

      setState((prev) => ({
        ...prev,
        dbUser: userData,
        userStats: statsData,
        isDbUserLoaded: true,
        isStatsLoaded: true,
        isInitializing: false,
        error: null,
      }));

      return { userData, statsData };
    } catch (error) {
      log("Ошибка при загрузке данных пользователя:", error);

      const errorMessage = error.type
        ? `${error.type}: ${error.message}`
        : error.message || "Неизвестная ошибка подключения";

      setState((prev) => ({
        ...prev,
        error: error,
        isDbUserLoaded: true,
        isStatsLoaded: true,
        isInitializing: false,
      }));

      throw error;
    }
  };

  // Инициализация Telegram WebApp или локальных данных
  useEffect(() => {
    const initializeApp = async () => {
      const isLocalDev = isLocalhost();

      if (isLocalDev) {
        log("🛠 РЕЖИМ РАЗРАБОТКИ: Используются тестовые данные");

        // Создаем тестовые данные пользователя
        const mockUserData = createMockUserData();

        setState((prev) => ({
          ...prev,
          telegramUser: mockUserData,
          isTelegramLoaded: true,
          isInTelegram: false, // Не в Telegram, но это нормально для разработки
          isLocalDevelopment: true,
        }));

        // Автоматически создаем/получаем пользователя в БД с тестовыми данными
        try {
          log("Создание/получение тестового пользователя в БД...");

          const dbUserData = await createOrGetUser({
            telegram_id: mockUserData.id,
            username: mockUserData.username,
            first_name: mockUserData.first_name,
          });

          log("Тестовый пользователь успешно создан/получен в БД", dbUserData);

          // Загружаем полные данные пользователя
          await loadUserData(mockUserData.id);
        } catch (error) {
          log("Ошибка при работе с БД (тестовые данные)", error);

          const errorMessage = error.type
            ? `${error.type}: ${error.message}`
            : error.message || "Неизвестная ошибка подключения";

          setState((prev) => ({
            ...prev,
            error: error,
            isDbUserLoaded: true,
            isStatsLoaded: true,
            isInitializing: false,
          }));
        }

        return;
      }

      // Обычная логика для Telegram
      log("Инициализация Telegram WebApp...");

      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        const { WebApp } = window.Telegram;

        // Настройка Telegram WebApp
        WebApp.ready();
        WebApp.expand();

        const userData = WebApp.initDataUnsafe.user;

        if (userData) {
          log("Данные пользователя Telegram получены", userData);

          setState((prev) => ({
            ...prev,
            telegramUser: userData,
            isTelegramLoaded: true,
            isInTelegram: true,
          }));

          // Автоматически создаем/получаем пользователя в БД
          try {
            log("Создание/получение пользователя в БД...");

            const dbUserData = await createOrGetUser({
              telegram_id: userData.id,
              username: userData.username,
              first_name: userData.first_name,
            });

            log("Пользователь успешно создан/получен в БД", dbUserData);

            // Загружаем полные данные пользователя
            await loadUserData(userData.id);
          } catch (error) {
            log("Ошибка при работе с БД", error);

            setState((prev) => ({
              ...prev,
              error: error,
              isDbUserLoaded: true,
              isStatsLoaded: true,
              isInitializing: false,
            }));
          }
        } else {
          log("Данные пользователя Telegram не найдены");

          setState((prev) => ({
            ...prev,
            isTelegramLoaded: true,
            isInTelegram: true,
            isInitializing: false,
          }));
        }
      } else {
        log("Telegram WebApp недоступен - приложение запущено не в Telegram");

        setState((prev) => ({
          ...prev,
          isTelegramLoaded: true,
          isInTelegram: false,
          isInitializing: false,
        }));
      }
    };

    initializeApp();
  }, []);

  // Функция для повторной попытки создания пользователя в БД
  const retryDbUser = async () => {
    if (!state.telegramUser) {
      log("Нет данных пользователя для повторной попытки");
      return;
    }

    setState((prev) => ({ ...prev, error: null, isInitializing: true }));

    try {
      log("Повторная попытка создания/получения пользователя в БД...");

      const dbUserData = await createOrGetUser({
        telegram_id: state.telegramUser.id,
        username: state.telegramUser.username,
        first_name: state.telegramUser.first_name,
      });

      log(
        "Пользователь успешно создан/получен в БД (повторная попытка)",
        dbUserData
      );

      // Загружаем полные данные пользователя
      await loadUserData(state.telegramUser.id);
    } catch (error) {
      log("Ошибка при повторной попытке работы с БД", error);

      setState((prev) => ({
        ...prev,
        error: error,
        isInitializing: false,
      }));
    }
  };

  // Функция для обновления данных пользователя
  const refreshUserData = async () => {
    if (!state.telegramUser?.id) {
      log("Нет ID пользователя для обновления данных");
      return;
    }

    try {
      log("Обновление данных пользователя...");
      await loadUserData(state.telegramUser.id);
      log("Данные пользователя успешно обновлены");
    } catch (error) {
      log("Ошибка при обновлении данных пользователя:", error);
      throw error;
    }
  };

  // Функция для проверки, пройден ли конкретный урок
  const isLessonCompleted = (lessonId) => {
    if (!state.dbUser) return false;
    const lessonField = `lesson_${lessonId}`;
    return Boolean(state.dbUser[lessonField]);
  };

  // Функция для проверки, завершен ли модуль
  const isModuleCompleted = (moduleId) => {
    if (!state.dbUser) return false;
    const moduleField = `module_${moduleId}`;
    return Boolean(state.dbUser[moduleField]);
  };

  // Функция для получения статуса урока (открыт/закрыт/пройден)
  const getLessonStatus = (lessonId) => {
    if (!state.dbUser) return "locked";

    // Проверяем, пройден ли урок
    if (isLessonCompleted(lessonId)) {
      return "completed";
    }

    // Первый урок всегда открыт
    if (lessonId === 1) {
      return "open";
    }

    // Для остальных уроков проверяем, пройден ли предыдущий
    const prevLessonCompleted = isLessonCompleted(lessonId - 1);
    return prevLessonCompleted ? "open" : "locked";
  };

  // Функция для получения статуса модуля
  const getModuleStatus = (moduleId) => {
    if (!state.dbUser) return "locked";

    // Проверяем, завершен ли модуль
    if (isModuleCompleted(moduleId)) {
      return "completed";
    }

    // Первый модуль всегда открыт
    if (moduleId === 1) {
      return "open";
    }

    // Для остальных модулей проверяем, завершен ли предыдущий
    const prevModuleCompleted = isModuleCompleted(moduleId - 1);
    return prevModuleCompleted ? "open" : "locked";
  };

  const value = {
    // Данные
    telegramUser: state.telegramUser,
    dbUser: state.dbUser,
    userStats: state.userStats,

    // Состояния загрузки
    isTelegramLoaded: state.isTelegramLoaded,
    isDbUserLoaded: state.isDbUserLoaded,
    isStatsLoaded: state.isStatsLoaded,
    isInTelegram: state.isInTelegram,
    isInitializing: state.isInitializing,

    // Ошибки и действия
    error: state.error,
    retryDbUser,
    refreshUserData,

    // Дополнительные флаги
    isLocalDevelopment: state.isLocalDevelopment,

    // Вспомогательные геттеры
    isReady:
      state.isTelegramLoaded &&
      state.isDbUserLoaded &&
      state.isStatsLoaded &&
      !state.isInitializing,
    hasError: !!state.error,
    canUseApp:
      (state.isInTelegram || state.isLocalDevelopment) &&
      state.telegramUser &&
      state.dbUser,

    // Функции для работы с уроками и модулями
    isLessonCompleted,
    isModuleCompleted,
    getLessonStatus,
    getModuleStatus,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
