// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import { UserProvider } from "@/contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Мета-тег viewport очень важен для корректного отображения на мобильных устройствах */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
