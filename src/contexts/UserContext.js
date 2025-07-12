import { createContext, useContext, useState, useEffect } from "react";
import { createOrGetUser, initializeBasicData } from "@/utils/api";

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

    // Данные из нашей БД
    dbUser: null,
    isDbUserLoaded: false,

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
          log("Инициализация базовых данных (модули и уроки)...");
          await initializeBasicData();

          log("Создание/получение тестового пользователя в БД...");

          const dbUserData = await createOrGetUser({
            telegram_id: mockUserData.id,
            username: mockUserData.username,
            first_name: mockUserData.first_name,
          });

          log("Тестовый пользователь успешно создан/получен в БД", dbUserData);

          setState((prev) => ({
            ...prev,
            dbUser: dbUserData,
            isDbUserLoaded: true,
            isInitializing: false,
          }));
        } catch (error) {
          log("Ошибка при работе с БД (тестовые данные)", error.message);

          setState((prev) => ({
            ...prev,
            error: error.message,
            isDbUserLoaded: true,
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
            log("Инициализация базовых данных (модули и уроки)...");
            await initializeBasicData();

            log("Создание/получение пользователя в БД...");

            const dbUserData = await createOrGetUser({
              telegram_id: userData.id,
              username: userData.username,
              first_name: userData.first_name,
            });

            log("Пользователь успешно создан/получен в БД", dbUserData);

            setState((prev) => ({
              ...prev,
              dbUser: dbUserData,
              isDbUserLoaded: true,
              isInitializing: false,
            }));
          } catch (error) {
            log("Ошибка при работе с БД", error.message);

            setState((prev) => ({
              ...prev,
              error: error.message,
              isDbUserLoaded: true,
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

      setState((prev) => ({
        ...prev,
        dbUser: dbUserData,
        isDbUserLoaded: true,
        isInitializing: false,
        error: null,
      }));
    } catch (error) {
      log("Ошибка при повторной попытке работы с БД", error.message);

      setState((prev) => ({
        ...prev,
        error: error.message,
        isInitializing: false,
      }));
    }
  };

  const value = {
    // Данные
    telegramUser: state.telegramUser,
    dbUser: state.dbUser,

    // Состояния загрузки
    isTelegramLoaded: state.isTelegramLoaded,
    isDbUserLoaded: state.isDbUserLoaded,
    isInTelegram: state.isInTelegram,
    isInitializing: state.isInitializing,

    // Ошибки и действия
    error: state.error,
    retryDbUser,

    // Дополнительные флаги
    isLocalDevelopment: state.isLocalDevelopment,

    // Вспомогательные геттеры
    isReady:
      state.isTelegramLoaded && state.isDbUserLoaded && !state.isInitializing,
    hasError: !!state.error,
    canUseApp:
      (state.isInTelegram || state.isLocalDevelopment) &&
      state.telegramUser &&
      state.dbUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
