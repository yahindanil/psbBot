import { useState } from "react";

export default function CorsTest() {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для нормализации URL (убирает двойные слэши)
  const normalizeUrl = (baseUrl, endpoint) => {
    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanEndpoint = endpoint.replace(/^\//, "");
    const normalizedUrl = `${cleanBaseUrl}/${cleanEndpoint}`;

    console.log(
      `[CORS Test] URL нормализация: ${baseUrl} + ${endpoint} = ${normalizedUrl}`
    );

    return normalizedUrl;
  };

  const addResult = (type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults((prev) => [
      ...prev,
      {
        timestamp,
        type,
        message,
        data: data ? JSON.stringify(data, null, 2) : null,
      },
    ]);
  };

  const testCors = async () => {
    setIsLoading(true);
    setTestResults([]);

    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    addResult("info", `Тестируем CORS для: ${apiUrl}`);

    try {
      // Тест 1: Простой GET запрос
      addResult("info", "Тест 1: GET запрос к корню API");
      const rootUrl = apiUrl.replace(/\/$/, ""); // Убираем завершающий слэш для корня
      const response1 = await fetch(rootUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response1.ok) {
        const data1 = await response1.json();
        addResult("success", "GET запрос успешен", data1);
      } else {
        addResult(
          "error",
          `GET запрос неуспешен: ${response1.status} ${response1.statusText}`
        );
      }

      // Тест 2: OPTIONS запрос (preflight)
      addResult("info", "Тест 2: OPTIONS запрос (preflight check)");
      const usersUrl = normalizeUrl(apiUrl, "/api/users");
      const response2 = await fetch(usersUrl, {
        method: "OPTIONS",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type",
        },
      });

      addResult("info", `OPTIONS ответ: ${response2.status}`, {
        status: response2.status,
        headers: Object.fromEntries(response2.headers.entries()),
      });

      // Тест 3: POST запрос
      addResult("info", "Тест 3: POST запрос к /api/users");
      const postUrl = normalizeUrl(apiUrl, "/api/users");
      const response3 = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegram_id: 123456789,
          username: "test_user",
          first_name: "Test User",
        }),
      });

      if (response3.ok) {
        const data3 = await response3.json();
        addResult("success", "POST запрос успешен", data3);
      } else {
        const errorText = await response3.text();
        addResult(
          "error",
          `POST запрос неуспешен: ${response3.status} ${response3.statusText}`,
          {
            status: response3.status,
            statusText: response3.statusText,
            body: errorText,
          }
        );
      }
    } catch (error) {
      addResult("error", `Ошибка сети: ${error.message}`, {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testWithDifferentOrigins = async () => {
    setIsLoading(true);
    setTestResults([]);

    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    addResult("info", `Тестируем с разными Origin заголовками`);

    const origins = [
      "https://psb-bot.vercel.app",
      "https://localhost:3000",
      "http://localhost:3000",
      window.location.origin,
    ];

    for (const origin of origins) {
      try {
        addResult("info", `Тестируем с Origin: ${origin}`);

        const testUrl = normalizeUrl(apiUrl, "/api/users");
        const response = await fetch(testUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
          },
          body: JSON.stringify({
            telegram_id: 123456789,
            username: "test_user",
            first_name: "Test User",
          }),
        });

        if (response.ok) {
          addResult("success", `Origin ${origin} - успешно`);
        } else {
          addResult("error", `Origin ${origin} - ошибка ${response.status}`);
        }
      } catch (error) {
        addResult(
          "error",
          `Origin ${origin} - сетевая ошибка: ${error.message}`
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#F5ECDA",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#283B41", marginBottom: "20px" }}>
          🔍 CORS и API Тестирование
        </h1>

        <div
          style={{
            backgroundColor: "#e8f4f8",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <strong>Текущий API URL:</strong>{" "}
          {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}
          <br />
          <strong>Текущий Origin:</strong>{" "}
          {typeof window !== "undefined" ? window.location.origin : "N/A"}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={testCors}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {isLoading ? "Тестирование..." : "Тест CORS"}
          </button>

          <button
            onClick={testWithDifferentOrigins}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#ccc" : "#ff9800",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {isLoading ? "Тестирование..." : "Тест Origins"}
          </button>
        </div>

        {testResults.length > 0 && (
          <div
            style={{
              backgroundColor: "#2c3e50",
              padding: "20px",
              borderRadius: "8px",
              color: "white",
              fontFamily: "monospace",
              fontSize: "14px",
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: "#ecf0f1" }}>
              📋 Результаты тестирования:
            </h3>

            {testResults.map((result, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <span style={{ color: "#bdc3c7" }}>[{result.timestamp}]</span>
                <span
                  style={{
                    color:
                      result.type === "error"
                        ? "#e74c3c"
                        : result.type === "success"
                        ? "#27ae60"
                        : "#3498db",
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {result.type.toUpperCase()}:
                </span>
                <span style={{ marginLeft: "10px" }}>{result.message}</span>

                {result.data && (
                  <pre
                    style={{
                      color: "#f39c12",
                      margin: "5px 0 0 40px",
                      fontSize: "12px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      backgroundColor: "#34495e",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    {result.data}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
          <h3>💡 Что проверяем:</h3>
          <ul>
            <li>
              <strong>Тест CORS</strong> - проверяет GET, OPTIONS и POST запросы
            </li>
            <li>
              <strong>Тест Origins</strong> - проверяет разные Origin заголовки
            </li>
            <li>
              Смотрите в консоль браузера (F12) для дополнительных деталей
            </li>
          </ul>

          <h3 style={{ marginTop: "20px" }}>
            🔧 Возможные решения CORS проблем:
          </h3>
          <ul>
            <li>
              Добавить <code>https://psb-bot.vercel.app</code> в CORS настройки
              сервера
            </li>
            <li>Проверить что сервер отвечает на OPTIONS запросы</li>
            <li>
              Убедиться что заголовки <code>Access-Control-Allow-*</code>{" "}
              настроены
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
