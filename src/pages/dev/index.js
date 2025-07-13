import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import {
  createOrGetUser,
  initializeBasicData,
  completeLesson,
  getModules,
  getModuleLessons,
  getUserProgress,
} from "@/utils/api";

export default function DevPage() {
  // Используем данные пользователя из контекста
  const {
    telegramUser,
    dbUser,
    isInitializing,
    hasError,
    error: contextError,
    retryDbUser,
    isInTelegram,
    canUseApp,
    isLocalDevelopment,
  } = useUser();

  const [apiLogs, setApiLogs] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isTestingLesson, setIsTestingLesson] = useState(false);
  const [isInitializingData, setIsInitializingData] = useState(false);

  // Состояние для выбора уроков
  const [allModules, setAllModules] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [completingLessons, setCompletingLessons] = useState(new Set());

  // Функция для добавления лога
  const addLog = useCallback((type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs((prev) => [
      ...prev,
      {
        timestamp,
        type,
        message,
        data: data ? JSON.stringify(data, null, 2) : null,
      },
    ]);
  }, []);

  // Загрузка всех модулей и их уроков
  const loadAllModulesAndLessons = useCallback(async () => {
    setIsLoadingModules(true);
    addLog("info", "Загрузка всех модулей и уроков...");

    try {
      // Получаем модули
      const modulesResponse = await getModules();

      if (!modulesResponse.modules || modulesResponse.modules.length === 0) {
        addLog("warning", "Модули не найдены. Инициализируйте данные.");
        setAllModules([]);
        return;
      }

      // Для каждого модуля получаем его уроки
      const modulesWithLessons = [];

      for (const moduleItem of modulesResponse.modules) {
        addLog("info", `Загрузка уроков модуля: ${moduleItem.name}`);

        try {
          const lessonsResponse = await getModuleLessons(moduleItem.id);

          modulesWithLessons.push({
            ...moduleItem,
            lessons: lessonsResponse.lessons || lessonsResponse || [],
          });
        } catch (error) {
          addLog(
            "error",
            `Ошибка загрузки уроков модуля ${moduleItem.name}`,
            error.message
          );
          modulesWithLessons.push({
            ...moduleItem,
            lessons: [],
          });
        }
      }

      setAllModules(modulesWithLessons);
      addLog(
        "success",
        `Загружено ${modulesWithLessons.length} модулей с уроками`
      );
    } catch (error) {
      addLog("error", "Ошибка загрузки модулей", error.message);
      setAllModules([]);
    } finally {
      setIsLoadingModules(false);
    }
  }, [addLog]);

  // Загрузка прогресса пользователя
  const loadUserProgress = useCallback(async () => {
    if (!telegramUser) return;

    setIsLoadingProgress(true);
    addLog("info", "Загрузка прогресса пользователя...");

    try {
      const progressData = await getUserProgress(telegramUser.id);
      setUserProgress(progressData);
      addLog("success", "Прогресс пользователя загружен");
    } catch (error) {
      addLog("error", "Ошибка загрузки прогресса", error.message);
      setUserProgress(null);
    } finally {
      setIsLoadingProgress(false);
    }
  }, [telegramUser, addLog]);

  // Завершение конкретного урока
  const handleCompleteLessonById = async (moduleId, lessonId, lessonName) => {
    if (!telegramUser) {
      addLog("error", "Данные пользователя недоступны для завершения урока");
      return;
    }

    const lessonKey = `${moduleId}-${lessonId}`;
    setCompletingLessons((prev) => new Set([...prev, lessonKey]));
    addLog("info", `Завершение урока: ${lessonName} (ID: ${lessonId})`);

    try {
      const result = await completeLesson(telegramUser.id, lessonId, 300); // 5 минут
      addLog("success", `Урок "${lessonName}" успешно завершен!`, result);

      if (result.module_completed) {
        addLog("success", "Поздравляем! Модуль также завершен!");
      }

      // Обновляем прогресс после завершения
      await loadUserProgress();
    } catch (error) {
      addLog("error", `Ошибка завершения урока "${lessonName}"`, error.message);
    } finally {
      setCompletingLessons((prev) => {
        const newSet = new Set(prev);
        newSet.delete(lessonKey);
        return newSet;
      });
    }
  };

  // Проверка, завершен ли урок
  const isLessonCompleted = (lessonId) => {
    if (!userProgress || !userProgress.user || !userProgress.user.lessons)
      return false;
    return userProgress.user.lessons.some(
      (lesson) => lesson.lesson_id === lessonId
    );
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (telegramUser && allModules.length === 0) {
      loadAllModulesAndLessons();
      loadUserProgress();
    }
  }, [
    telegramUser,
    allModules.length,
    loadAllModulesAndLessons,
    loadUserProgress,
  ]);

  // Функция для очистки дублирующихся модулей
  const handleCleanupModules = async () => {
    setIsApiLoading(true);
    addLog("info", "Очистка дублирующихся модулей...");

    try {
      // Получаем все модули
      const modulesResponse = await getModules();

      if (!modulesResponse.modules || modulesResponse.modules.length === 0) {
        addLog("info", "Модули не найдены, очистка не требуется");
        return;
      }

      const modules = modulesResponse.modules;
      addLog("info", `Найдено ${modules.length} модулей`);

      // Группируем модули по order_index
      const modulesByOrder = {};
      modules.forEach((module) => {
        if (!modulesByOrder[module.order_index]) {
          modulesByOrder[module.order_index] = [];
        }
        modulesByOrder[module.order_index].push(module);
      });

      // Находим дубликаты
      let duplicatesFound = 0;
      for (const orderIndex in modulesByOrder) {
        const modulesForOrder = modulesByOrder[orderIndex];
        if (modulesForOrder.length > 1) {
          duplicatesFound += modulesForOrder.length - 1;
          addLog(
            "warning",
            `Найдено ${modulesForOrder.length} дубликатов для order_index ${orderIndex}`
          );
        }
      }

      if (duplicatesFound === 0) {
        addLog("success", "Дубликаты не найдены");
      } else {
        addLog(
          "info",
          `Найдено ${duplicatesFound} дубликатов. Для очистки нужно обратиться к бекендеру.`
        );
        addLog(
          "info",
          "Рекомендация: добавить уникальный индекс на поле order_index в БД"
        );
      }
    } catch (error) {
      addLog("error", "Ошибка очистки модулей", error.message);
    } finally {
      setIsApiLoading(false);
    }
  };

  // Диагностическая функция для проверки формата данных API
  const handleApiDiagnostic = async () => {
    setIsApiLoading(true);
    addLog("info", "Диагностика API - проверка формата данных...");

    try {
      // Тестируем getModules
      addLog("info", "Тестирование getModules...");
      const modulesData = await getModules();
      addLog(
        "info",
        `Тип данных getModules: ${
          Array.isArray(modulesData) ? "Array" : "Object"
        }`
      );
      addLog(
        "info",
        `Количество модулей: ${
          Array.isArray(modulesData) ? modulesData.length : "не массив"
        }`
      );
      addLog("info", "Полные данные getModules:", modulesData);

      if (Array.isArray(modulesData) && modulesData.length > 0) {
        // Тестируем getModuleLessons для первого модуля
        const firstModule = modulesData[0];
        addLog(
          "info",
          `Тестирование getModuleLessons для модуля ${firstModule.id}...`
        );

        const lessonsData = await getModuleLessons(firstModule.id);
        addLog(
          "info",
          `Тип данных getModuleLessons: ${
            Array.isArray(lessonsData) ? "Array" : "Object"
          }`
        );
        addLog(
          "info",
          `Количество уроков: ${
            Array.isArray(lessonsData) ? lessonsData.length : "не массив"
          }`
        );
        addLog("info", "Полные данные getModuleLessons:", lessonsData);
      }

      // Тестируем getUserProgress
      if (telegramUser?.id) {
        addLog(
          "info",
          `Тестирование getUserProgress для пользователя ${telegramUser.id}...`
        );
        const progressData = await getUserProgress(telegramUser.id);
        addLog(
          "info",
          `Тип данных getUserProgress: ${
            Array.isArray(progressData) ? "Array" : "Object"
          }`
        );
        addLog("info", "Полные данные getUserProgress:", progressData);
      }

      addLog("success", "Диагностика API завершена");
    } catch (error) {
      addLog("error", "Ошибка диагностики API", error.message);
    } finally {
      setIsApiLoading(false);
    }
  };

  // Функция для ручного вызова API (дополнительно к автоматическому)
  const handleManualApiCall = async () => {
    if (!telegramUser) {
      addLog("error", "Данные пользователя недоступны");
      return;
    }

    setIsApiLoading(true);
    addLog(
      "info",
      isLocalDevelopment
        ? "Ручной вызов API (тестовые данные)..."
        : "Ручной вызов API..."
    );

    try {
      const userData = {
        telegram_id: telegramUser.id,
        username: telegramUser.username || null,
        first_name: telegramUser.first_name,
      };

      addLog("info", "Отправляемые данные:", userData);

      const result = await createOrGetUser(userData);
      addLog(
        "success",
        `Пользователь успешно создан/получен (ручной вызов${
          isLocalDevelopment ? ", тестовые данные" : ""
        })`,
        result
      );
    } catch (error) {
      addLog("error", "Ошибка API (ручной вызов)", error.message);
    } finally {
      setIsApiLoading(false);
    }
  };

  // Функция для тестирования завершения урока (старая версия - только первый урок)
  const handleCompleteLesson = async () => {
    if (!telegramUser) {
      addLog("error", "Данные пользователя недоступны для завершения урока");
      return;
    }

    setIsTestingLesson(true);
    addLog("info", "Поиск первого урока для завершения...");

    try {
      // Сначала получаем модули
      addLog("info", "Получение списка модулей...");
      const modulesResponse = await getModules();

      if (!modulesResponse.modules || modulesResponse.modules.length === 0) {
        addLog("error", "Модули не найдены. Сначала инициализируйте данные.");
        return;
      }

      // Находим первый модуль (с order_index = 1)
      const firstModule = modulesResponse.modules.find(
        (m) => m.order_index === 1
      );
      if (!firstModule) {
        addLog("error", "Первый модуль не найден");
        return;
      }

      addLog(
        "info",
        `Найден первый модуль: ${firstModule.name} (ID: ${firstModule.id})`
      );

      // Получаем уроки первого модуля
      addLog("info", "Получение уроков первого модуля...");
      const lessonsResponse = await getModuleLessons(firstModule.id);

      if (!lessonsResponse.lessons && !Array.isArray(lessonsResponse)) {
        addLog("error", "Уроки в первом модуле не найдены");
        return;
      }

      const lessons = lessonsResponse.lessons || lessonsResponse;
      if (!lessons || lessons.length === 0) {
        addLog("error", "Уроки в первом модуле не найдены");
        return;
      }

      // Находим первый урок
      const firstLesson = lessons.find((l) => l.order_index === 1);
      if (!firstLesson) {
        addLog("error", "Первый урок не найден");
        return;
      }

      addLog(
        "info",
        `Найден первый урок: ${firstLesson.name} (ID: ${firstLesson.id})`
      );

      // Завершаем первый урок с реальным ID
      addLog("info", `Завершение урока ID ${firstLesson.id}...`);
      const result = await completeLesson(telegramUser.id, firstLesson.id, 300); // 5 минут
      addLog("success", "Урок успешно завершен!", result);

      if (result.module_completed) {
        addLog("success", "Поздравляем! Модуль также завершен!");
      }

      // Обновляем списки после завершения
      await loadUserProgress();
    } catch (error) {
      addLog("error", "Ошибка завершения урока", error.message);
    } finally {
      setIsTestingLesson(false);
    }
  };

  // Функция для инициализации базовых данных
  const handleInitializeData = async () => {
    setIsInitializingData(true);
    addLog("info", "Инициализация базовых данных (модули и уроки)...");

    try {
      await initializeBasicData();
      addLog("success", "Базовые данные успешно инициализированы!");

      // Перезагружаем модули после инициализации
      await loadAllModulesAndLessons();
      if (telegramUser) {
        await loadUserProgress();
      }
    } catch (error) {
      addLog("error", "Ошибка инициализации данных", error.message);
    } finally {
      setIsInitializingData(false);
    }
  };

  // Функция для очистки логов
  const clearLogs = () => {
    setApiLogs([]);
  };

  return (
    <>
      <Head>
        <title>Dev - Данные пользователя Telegram</title>
      </Head>

      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1>Разработческая страница</h1>

        {/* Уведомление о режиме разработки */}
        {isLocalDevelopment && (
          <div
            style={{
              backgroundColor: "#fff3cd",
              border: "2px solid #ffc107",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0", color: "#856404" }}>
              🛠 РЕЖИМ ЛОКАЛЬНОЙ РАЗРАБОТКИ
            </h2>
            <p style={{ margin: 0, color: "#856404" }}>
              Приложение запущено на localhost и использует тестовые данные
              пользователя.
              <br />
              Все API вызовы работают с тестовым пользователем{" "}
              <strong>John Doe (ID: 123456789)</strong>.
            </p>
          </div>
        )}

        {/* Состояние инициализации */}
        <div
          style={{
            backgroundColor: isInitializing
              ? "#fff3cd"
              : hasError
              ? "#ffe6e6"
              : canUseApp
              ? "#e8f5e8"
              : "#f8f9fa",
            border: `1px solid ${
              isInitializing
                ? "#ffeaa7"
                : hasError
                ? "#ff9999"
                : canUseApp
                ? "#4caf50"
                : "#dee2e6"
            }`,
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h2>Статус приложения</h2>
          {isInitializing && (
            <p>
              <strong>⏳ Инициализация:</strong> Подключение к серверу...
            </p>
          )}
          {hasError && (
            <div>
              <p>
                <strong>❌ Ошибка:</strong> {contextError}
              </p>
              <button
                onClick={retryDbUser}
                style={{
                  backgroundColor: "#ff6b6b",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Повторить попытку
              </button>
            </div>
          )}
          {!isInitializing && !hasError && canUseApp && (
            <p>
              <strong>✅ Готово:</strong> Пользователь успешно инициализирован
            </p>
          )}
          {!isInitializing && !hasError && !canUseApp && (
            <p>
              <strong>⚠️ Предупреждение:</strong> Приложение запущено не в
              Telegram
            </p>
          )}
        </div>

        <h2>
          Данные пользователя {isLocalDevelopment ? "(Тестовые)" : "Telegram"}
        </h2>

        {!isInTelegram && !isLocalDevelopment ? (
          <div
            style={{
              backgroundColor: "#ffe6e6",
              border: "1px solid #ff9999",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>⚠️ Внимание:</strong> Приложение не запущено внутри
              Telegram.
            </p>
            <p>Данные пользователя недоступны.</p>
          </div>
        ) : !telegramUser ? (
          <div
            style={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>⚠️ Предупреждение:</strong> Данные пользователя не
              найдены.
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#e8f5e8",
              border: "1px solid #4caf50",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>
              ✅ Данные пользователя получены
              {isLocalDevelopment ? " (тестовые)" : ""}:
            </h3>
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>ID пользователя:</strong> <code>{telegramUser.id}</code>{" "}
                {isLocalDevelopment && <em>(тест)</em>}
              </p>
              <p>
                <strong>Имя:</strong> {telegramUser.first_name}
              </p>
              {telegramUser.last_name && (
                <p>
                  <strong>Фамилия:</strong> {telegramUser.last_name}
                </p>
              )}
              {telegramUser.username && (
                <p>
                  <strong>Username:</strong> @{telegramUser.username}
                </p>
              )}
              <p>
                <strong>Язык:</strong> {telegramUser.language_code}
              </p>
              <p>
                <strong>Premium:</strong>{" "}
                {telegramUser.is_premium ? "Да" : "Нет"}
              </p>
              {isLocalDevelopment && (
                <p>
                  <strong>Режим:</strong>{" "}
                  <span style={{ color: "#e67e22" }}>Локальная разработка</span>
                </p>
              )}
            </div>

            <details style={{ marginTop: "20px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Полный объект пользователя (для разработки)
              </summary>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "5px",
                  overflow: "auto",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {JSON.stringify(telegramUser, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Данные из БД */}
        {dbUser && (
          <div style={{ marginTop: "20px" }}>
            <h2>Данные пользователя из БД</h2>
            <div
              style={{
                backgroundColor: "#e8f5e8",
                border: "1px solid #4caf50",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h3>✅ Пользователь найден в БД:</h3>
              <div style={{ marginTop: "10px" }}>
                <p>
                  <strong>БД ID:</strong> <code>{dbUser.id}</code>
                </p>
                <p>
                  <strong>Telegram ID:</strong>{" "}
                  <code>{dbUser.telegram_id}</code>{" "}
                  {isLocalDevelopment && <em>(тест)</em>}
                </p>
                <p>
                  <strong>Имя:</strong> {dbUser.first_name}
                </p>
                {dbUser.username && (
                  <p>
                    <strong>Username:</strong> @{dbUser.username}
                  </p>
                )}
                <p>
                  <strong>Создан:</strong>{" "}
                  {new Date(dbUser.created_at).toLocaleString()}
                </p>
                {dbUser.updated_at && (
                  <p>
                    <strong>Обновлен:</strong>{" "}
                    {new Date(dbUser.updated_at).toLocaleString()}
                  </p>
                )}
              </div>

              <details style={{ marginTop: "20px" }}>
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  Полный объект пользователя БД
                </summary>
                <pre
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "5px",
                    overflow: "auto",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  {JSON.stringify(dbUser, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Выбор и завершение уроков */}
        {telegramUser && (
          <div style={{ marginTop: "30px" }}>
            <h2>Управление уроками</h2>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                padding: "20px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3 style={{ margin: 0 }}>Все модули и уроки</h3>
                <div>
                  <button
                    onClick={loadAllModulesAndLessons}
                    disabled={isLoadingModules}
                    style={{
                      backgroundColor: "#17a2b8",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: isLoadingModules ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    {isLoadingModules ? "Загрузка..." : "Обновить"}
                  </button>
                  <button
                    onClick={loadUserProgress}
                    disabled={isLoadingProgress}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: isLoadingProgress ? "not-allowed" : "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {isLoadingProgress ? "Загрузка..." : "Обновить прогресс"}
                  </button>
                </div>
              </div>

              {isLoadingModules ? (
                <p style={{ color: "#6c757d", fontStyle: "italic" }}>
                  Загрузка модулей и уроков...
                </p>
              ) : allModules.length === 0 ? (
                <p style={{ color: "#e74c3c" }}>
                  Модули не найдены. Сначала инициализируйте базовые данные.
                </p>
              ) : (
                <div>
                  {allModules.map((moduleItem) => (
                    <div
                      key={moduleItem.id}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #dee2e6",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 10px 0",
                          color: "#495057",
                          fontSize: "18px",
                        }}
                      >
                        Модуль {moduleItem.order_index}: {moduleItem.name}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 15px 0",
                          color: "#6c757d",
                          fontSize: "14px",
                        }}
                      >
                        {moduleItem.description}
                      </p>

                      {moduleItem.lessons.length === 0 ? (
                        <p style={{ color: "#e74c3c", fontStyle: "italic" }}>
                          Уроки в модуле не найдены
                        </p>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "10px",
                          }}
                        >
                          {moduleItem.lessons
                            .sort((a, b) => a.order_index - b.order_index)
                            .map((lesson) => {
                              const isCompleted = isLessonCompleted(lesson.id);
                              const isCompleting = completingLessons.has(
                                `${moduleItem.id}-${lesson.id}`
                              );

                              return (
                                <div
                                  key={lesson.id}
                                  style={{
                                    backgroundColor: isCompleted
                                      ? "#d4edda"
                                      : "#fff3cd",
                                    border: `1px solid ${
                                      isCompleted ? "#c3e6cb" : "#ffeaa7"
                                    }`,
                                    borderRadius: "6px",
                                    padding: "12px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <div
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        color: isCompleted
                                          ? "#155724"
                                          : "#856404",
                                      }}
                                    >
                                      {isCompleted ? "✅" : "📚"} Урок{" "}
                                      {lesson.order_index}: {lesson.name}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "#6c757d",
                                        marginTop: "4px",
                                      }}
                                    >
                                      ID: {lesson.id} | Длительность:{" "}
                                      {lesson.duration_minutes} мин
                                    </div>
                                    {lesson.description && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "#6c757d",
                                          marginTop: "4px",
                                        }}
                                      >
                                        {lesson.description}
                                      </div>
                                    )}
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleCompleteLessonById(
                                        moduleItem.id,
                                        lesson.id,
                                        lesson.name
                                      )
                                    }
                                    disabled={isCompleting}
                                    style={{
                                      backgroundColor: isCompleted
                                        ? "#6c757d"
                                        : "#ffc107",
                                      color: "white",
                                      border: "none",
                                      padding: "6px 12px",
                                      borderRadius: "4px",
                                      cursor: isCompleting
                                        ? "not-allowed"
                                        : "pointer",
                                      fontSize: "12px",
                                      marginLeft: "10px",
                                      minWidth: "80px",
                                    }}
                                  >
                                    {isCompleting
                                      ? "..."
                                      : isCompleted
                                      ? "Завершен"
                                      : "Завершить"}
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* API Тестирование */}
        <div style={{ marginTop: "30px" }}>
          <h2>Тестирование API</h2>

          {/* Инициализация данных */}
          <div
            style={{
              backgroundColor: "#e8f5e8",
              border: "1px solid #4caf50",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h3>Инициализация базовых данных</h3>
            <p>Создание модулей и уроков в базе данных</p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              <strong>Сначала нажмите эту кнопку</strong> чтобы создать модули и
              уроки в БД.
            </p>

            <button
              onClick={handleInitializeData}
              disabled={isInitializingData}
              style={{
                backgroundColor: !isInitializingData ? "#4caf50" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: !isInitializingData ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              {isInitializingData
                ? "Инициализация..."
                : "Инициализировать данные"}
            </button>

            <button
              onClick={handleApiDiagnostic}
              disabled={!telegramUser || isApiLoading}
              style={{
                backgroundColor:
                  telegramUser && !isApiLoading ? "#17a2b8" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor:
                  telegramUser && !isApiLoading ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              {isApiLoading ? "Диагностика..." : "Диагностика формата API"}
            </button>

            <button
              onClick={handleCleanupModules}
              disabled={!telegramUser || isApiLoading}
              style={{
                backgroundColor:
                  telegramUser && !isApiLoading ? "#dc3545" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor:
                  telegramUser && !isApiLoading ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {isApiLoading ? "Проверка..." : "Проверить дубликаты"}
            </button>
          </div>

          {/* Завершение урока */}
          <div
            style={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h3>Быстрое тестирование первого урока</h3>
            <p>Автоматически найти и завершить первый урок первого модуля</p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              <strong>Примечание:</strong> Выше есть более удобный интерфейс для
              выбора конкретного урока.
            </p>
            {isLocalDevelopment && (
              <p style={{ color: "#e67e22" }}>
                <strong>Режим разработки:</strong> Завершение урока для John
                Doe.
              </p>
            )}

            <button
              onClick={handleCompleteLesson}
              disabled={!telegramUser || isTestingLesson}
              style={{
                backgroundColor:
                  telegramUser && !isTestingLesson ? "#ffc107" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor:
                  telegramUser && !isTestingLesson ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {isTestingLesson
                ? "Поиск и завершение урока..."
                : "Найти и завершить первый урок"}
            </button>

            {!telegramUser && (
              <p
                style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
              >
                Требуются данные пользователя
              </p>
            )}
          </div>

          {/* Ручной вызов создания пользователя */}
          <div
            style={{
              backgroundColor: "#f0f8ff",
              border: "1px solid #4a90e2",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h3>Ручной вызов API пользователя</h3>
            <p>
              Эндпоинт: <code>POST /api/users</code>
            </p>
            <p>
              <strong>Примечание:</strong> Пользователь уже автоматически создан
              при запуске приложения. Это дополнительный тест.
            </p>
            {isLocalDevelopment && (
              <p style={{ color: "#e67e22" }}>
                <strong>Режим разработки:</strong> Используются тестовые данные
                John Doe.
              </p>
            )}

            <button
              onClick={handleManualApiCall}
              disabled={!telegramUser || isApiLoading}
              style={{
                backgroundColor:
                  telegramUser && !isApiLoading ? "#4a90e2" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor:
                  telegramUser && !isApiLoading ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              {isApiLoading ? "Отправка..." : "Ручной вызов API"}
            </button>

            <button
              onClick={handleApiDiagnostic}
              disabled={!telegramUser || isApiLoading}
              style={{
                backgroundColor:
                  telegramUser && !isApiLoading ? "#17a2b8" : "#ccc",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor:
                  telegramUser && !isApiLoading ? "pointer" : "not-allowed",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {isApiLoading ? "Диагностика..." : "Диагностика API"}
            </button>

            {!telegramUser && (
              <p
                style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
              >
                Требуются данные пользователя
              </p>
            )}
          </div>

          {/* Логи API */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>Логи ручных API запросов</h3>
              <button
                onClick={clearLogs}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Очистить
              </button>
            </div>

            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "#000",
                color: "#00ff00",
                padding: "10px",
                borderRadius: "3px",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              {apiLogs.length === 0 ? (
                <div style={{ color: "#888" }}>
                  Логи ручных вызовов пока пусты...
                  <br />
                  <em>Автоматические вызовы смотрите в консоли браузера</em>
                  {isLocalDevelopment && (
                    <>
                      <br />
                      <em style={{ color: "#e67e22" }}>
                        Режим разработки: тестовые данные
                      </em>
                    </>
                  )}
                </div>
              ) : (
                apiLogs.map((log, index) => (
                  <div key={index} style={{ marginBottom: "8px" }}>
                    <span style={{ color: "#fff" }}>[{log.timestamp}]</span>
                    <span
                      style={{
                        color:
                          log.type === "error"
                            ? "#ff6b6b"
                            : log.type === "success"
                            ? "#51cf66"
                            : "#74c0fc",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {log.type.toUpperCase()}:
                    </span>
                    <span style={{ marginLeft: "5px" }}>{log.message}</span>
                    {log.data && (
                      <pre
                        style={{
                          color: "#ffd43b",
                          margin: "5px 0 0 20px",
                          fontSize: "11px",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {log.data}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
          <p>
            <strong>Примечание:</strong> Эта страница предназначена только для
            разработки и отладки.
          </p>
          <p>
            Пользователь автоматически создается/получается при запуске
            приложения.
          </p>
          <p>Автоматические логи можно посмотреть в консоли браузера (F12).</p>
          {isLocalDevelopment && (
            <p style={{ color: "#e67e22" }}>
              <strong>Режим разработки:</strong> Используются тестовые данные
              для локального тестирования.
            </p>
          )}
        </div>

        {/* Переход к модулям */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/all-modules"
            style={{
              display: "inline-block",
              backgroundColor: "#4caf50",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            Перейти к модулям
          </Link>
          <Link
            href="/cors-test"
            style={{
              display: "inline-block",
              backgroundColor: "#ff9800",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            🔍 CORS тест
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "#2196f3",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            🏠 Главная
          </Link>
        </div>
      </div>
    </>
  );
}
