import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function DevPage() {
  const [telegramData, setTelegramData] = useState({
    isLoaded: false,
    user: null,
    isInTelegram: false,
  });

  useEffect(() => {
    // Проверяем доступность Telegram WebApp
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      const { WebApp } = window.Telegram;
      const userData = WebApp.initDataUnsafe.user;

      setTelegramData({
        isLoaded: true,
        user: userData,
        isInTelegram: true,
      });
    } else {
      setTelegramData({
        isLoaded: true,
        user: null,
        isInTelegram: false,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dev - Данные пользователя Telegram</title>
      </Head>

      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1>Разработческая страница</h1>
        <h2>Данные пользователя Telegram</h2>

        {!telegramData.isLoaded ? (
          <p>Загрузка данных...</p>
        ) : !telegramData.isInTelegram ? (
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
        ) : !telegramData.user ? (
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
                <strong>ID пользователя:</strong>{" "}
                <code>{telegramData.user.id}</code>
              </p>
              <p>
                <strong>Имя:</strong> {telegramData.user.first_name}
              </p>
              {telegramData.user.last_name && (
                <p>
                  <strong>Фамилия:</strong> {telegramData.user.last_name}
                </p>
              )}
              {telegramData.user.username && (
                <p>
                  <strong>Username:</strong> @{telegramData.user.username}
                </p>
              )}
              <p>
                <strong>Язык:</strong> {telegramData.user.language_code}
              </p>
              <p>
                <strong>Premium:</strong>{" "}
                {telegramData.user.is_premium ? "Да" : "Нет"}
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
                {JSON.stringify(telegramData.user, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
          <p>
            <strong>Примечание:</strong> Эта страница предназначена только для
            разработки и отладки.
          </p>
          <p>
            Данные получены из{" "}
            <code>window.Telegram.WebApp.initDataUnsafe.user</code>
          </p>
        </div>

        {/* Переход к Dev странице */}
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
