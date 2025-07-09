// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";

import { useEffect } from "react"; // 2. Импортируем useEffect

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Этот код будет выполнен только на клиенте, после того как компонент смонтируется.
    // Важно: нужно убедиться, что Telegram.WebApp доступен.
    // Script с strategy="beforeInteractive" помогает гарантировать это.
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      const { WebApp } = window.Telegram;

      // Обязательные вызовы для лучшего UX в Telegram Mini App
      WebApp.ready(); // Сообщает Telegram, что приложение загружено и готово.
      WebApp.expand(); // Разворачивает приложение на весь экран (обычно желательно).

      // Получаем "небезопасные" данные пользователя.
      // Помните: эти данные могут быть подделаны, используйте их только для некритичных задач!
      const userData = WebApp.initDataUnsafe.user;

      if (userData) {
        console.log("--- Telegram User Data (Unverified) ---");
        console.log("ID:", userData.id);
        console.log("First Name:", userData.first_name);
        if (userData.last_name) {
          console.log("Last Name:", userData.last_name);
        }
        if (userData.username) {
          console.log("Username:", userData.username);
        }
        console.log("Is Premium:", userData.is_premium);
        console.log("Language Code:", userData.language_code);
        console.log("Full User Object:", userData);
        console.log("---------------------------------------");
      } else {
        console.log("Telegram user data (initDataUnsafe.user) not found.");
      }

      // Вы также можете логировать полную строку initData, если нужно для отладки
      // console.log("Full initData string:", WebApp.initData);
    } else {
      console.warn(
        "Telegram WebApp object is not available. This app might not be running inside Telegram."
      );
    }
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз после первого рендера на клиенте.

  return (
    <>
      <Head>
        {/* Мета-тег viewport очень важен для корректного отображения на мобильных устройствах */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
