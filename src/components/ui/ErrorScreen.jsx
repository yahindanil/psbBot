export default function ErrorScreen({ error, onRetry, canRetry = true }) {
  // Функция для получения диагностической информации
  const getDiagnosticInfo = () => {
    const info = {
      timestamp: new Date().toLocaleString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      apiBaseUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
      isOnline: navigator.onLine,
    };

    return info;
  };

  // Анализ типа ошибки
  const analyzeError = (error) => {
    if (typeof error === "object" && error.type) {
      return {
        type: error.type,
        message: error.message,
        details: error.details,
      };
    }

    // Анализ строковых ошибок
    if (typeof error === "string") {
      if (error.includes("Failed to fetch")) {
        return {
          type: "NETWORK_ERROR",
          message: "Ошибка сети - не удалось подключиться к серверу",
          details: { originalError: error },
        };
      }
      if (error.includes("API Error")) {
        return {
          type: "API_ERROR",
          message: error,
          details: { originalError: error },
        };
      }
    }

    return {
      type: "UNKNOWN_ERROR",
      message: error?.message || error || "Неизвестная ошибка",
      details: { originalError: error },
    };
  };

  const errorAnalysis = analyzeError(error);
  const diagnosticInfo = getDiagnosticInfo();

  // Получение рекомендаций по устранению ошибки
  const getRecommendations = (errorType) => {
    switch (errorType) {
      case "NETWORK_ERROR":
        return [
          "Проверьте подключение к интернету",
          "Убедитесь, что сервер доступен",
          "Попробуйте обновить страницу",
          "Проверьте настройки брандмауэра",
        ];
      case "API_ERROR":
        return [
          "Сервер временно недоступен",
          "Попробуйте повторить запрос через несколько минут",
          "Обратитесь к администратору, если проблема повторяется",
        ];
      case "TIMEOUT_ERROR":
        return [
          "Превышено время ожидания ответа",
          "Проверьте скорость интернет-соединения",
          "Попробуйте повторить запрос",
        ];
      default:
        return [
          "Попробуйте обновить страницу",
          "Очистите кеш браузера",
          "Обратитесь к технической поддержке",
        ];
    }
  };

  const recommendations = getRecommendations(errorAnalysis.type);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#F5ECDA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        zIndex: 9999,
        overflow: "auto",
      }}
    >
      {/* Иконка ошибки */}
      <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#ff6b6b",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          fontSize: "40px",
          color: "white",
        }}
      >
        ⚠️
      </div>

      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#283B41",
          textAlign: "center",
          marginBottom: "10px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Ошибка подключения
      </h2>

      <p
        style={{
          fontSize: "16px",
          color: "#666",
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
        }}
      >
        {errorAnalysis.message}
      </p>

      {/* Статус подключения */}
      <div
        style={{
          backgroundColor: diagnosticInfo.isOnline ? "#d4edda" : "#f8d7da",
          border: `1px solid ${
            diagnosticInfo.isOnline ? "#c3e6cb" : "#f5c6cb"
          }`,
          color: diagnosticInfo.isOnline ? "#155724" : "#721c24",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {diagnosticInfo.isOnline
          ? "🟢 Интернет подключен"
          : "🔴 Нет подключения к интернету"}
      </div>

      {/* Рекомендации */}
      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h4
          style={{ margin: "0 0 10px 0", color: "#856404", fontSize: "16px" }}
        >
          💡 Рекомендации по устранению:
        </h4>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "#856404" }}>
          {recommendations.map((rec, index) => (
            <li key={index} style={{ marginBottom: "5px", fontSize: "14px" }}>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Подробности ошибки */}
      <details
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #ddd",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#666",
            marginBottom: "10px",
          }}
        >
          🔍 Техническая информация
        </summary>

        <div style={{ fontSize: "12px", color: "#333" }}>
          <div style={{ marginBottom: "15px" }}>
            <strong>Диагностика:</strong>
            <pre
              style={{
                backgroundColor: "#f8f9fa",
                padding: "8px",
                borderRadius: "4px",
                margin: "5px 0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(diagnosticInfo, null, 2)}
            </pre>
          </div>

          {errorAnalysis.details && (
            <div>
              <strong>Детали ошибки:</strong>
              <pre
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "8px",
                  borderRadius: "4px",
                  margin: "5px 0",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {JSON.stringify(errorAnalysis.details, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </details>

      {canRetry && onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: "Arial, sans-serif",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
}
