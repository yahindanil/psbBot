export default function ErrorScreen({ error, onRetry, canRetry = true }) {
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
        Не удалось подключиться к серверу
      </p>

      {error && (
        <details
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            maxWidth: "100%",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            Подробности ошибки
          </summary>
          <pre
            style={{
              fontSize: "12px",
              color: "#333",
              marginTop: "10px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {error}
          </pre>
        </details>
      )}

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
