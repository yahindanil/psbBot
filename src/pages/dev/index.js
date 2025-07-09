import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { createOrGetUser } from "@/utils/api";

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
  } = useUser();

  const [apiLogs, setApiLogs] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // Функция для добавления лога
  const addLog = (type, message, data = null) => {
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
  };

  // Функция для ручного вызова API (дополнительно к автоматическому)
  const handleManualApiCall = async () => {
    if (!telegramUser) {
      addLog("error", "Данные пользователя Telegram недоступны");
      return;
    }

    setIsApiLoading(true);
    addLog("info", "Ручной вызов API...");

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
        "Пользователь успешно создан/получен (ручной вызов)",
        result
      );
    } catch (error) {
      addLog("error", "Ошибка API (ручной вызов)", error.message);
    } finally {
      setIsApiLoading(false);
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
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>Разработческая страница</h1>

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

        <h2>Данные пользователя Telegram</h2>

        {!isInTelegram ? (
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
              <strong>⚠️ Предупреждение:</strong> Данные пользователя Telegram
              не найдены.
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
            <h3>✅ Данные пользователя получены:</h3>
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>ID пользователя:</strong> <code>{telegramUser.id}</code>
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
                  <code>{dbUser.telegram_id}</code>
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

        {/* API Тестирование */}
        <div style={{ marginTop: "30px" }}>
          <h2>Дополнительное тестирование API</h2>

          <div
            style={{
              backgroundColor: "#f0f8ff",
              border: "1px solid #4a90e2",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h3>Ручной вызов API</h3>
            <p>
              Эндпоинт: <code>POST /api/users</code>
            </p>
            <p>
              <strong>Примечание:</strong> Пользователь уже автоматически создан
              при запуске приложения. Это дополнительный тест.
            </p>

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
              }}
            >
              {isApiLoading ? "Отправка..." : "Ручной вызов API"}
            </button>

            {!telegramUser && (
              <p
                style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
              >
                Требуются данные пользователя Telegram
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
        </div>

        {/* Переход к модулям */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
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
        </div>
      </div>
    </>
  );
}
