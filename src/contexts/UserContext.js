import { createContext, useContext, useState, useEffect } from "react";
import { createOrGetUser } from "@/utils/api";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};

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
  });

  // Функция для логирования
  const log = (message, data = null) => {
    console.log(`[UserContext] ${message}`, data || "");
  };

  // Инициализация Telegram WebApp
  useEffect(() => {
    const initializeTelegram = async () => {
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
              isDbUserLoaded: true, // Помечаем как загруженное, даже если с ошибкой
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

    initializeTelegram();
  }, []);

  // Функция для повторной попытки создания пользователя в БД
  const retryDbUser = async () => {
    if (!state.telegramUser) {
      log("Нет данных Telegram для повторной попытки");
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

    // Вспомогательные геттеры
    isReady:
      state.isTelegramLoaded && state.isDbUserLoaded && !state.isInitializing,
    hasError: !!state.error,
    canUseApp: state.isInTelegram && state.telegramUser && state.dbUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
