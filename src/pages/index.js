import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  // Получаем данные пользователя из контекста
  const {
    telegramUser,
    dbUser,
    isInitializing,
    hasError,
    error,
    retryDbUser,
    canUseApp,
  } = useUser();

  // Показываем экран загрузки во время инициализации
  if (isInitializing) {
    return <LoadingScreen message="Инициализация приложения..." />;
  }

  // Показываем экран ошибки если что-то пошло не так
  if (hasError) {
    return <ErrorScreen error={error} onRetry={retryDbUser} canRetry={true} />;
  }

  // Показываем предупреждение если нет возможности использовать приложение
  if (!canUseApp) {
    return (
      <div className="min-h-screen bg-[#F5ECDA] flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-[#283B41]">
            Приложение недоступно
          </h2>
          <p className="text-gray-600 mb-4">
            Это приложение должно быть запущено через Telegram
          </p>
          <Link
            href="/dev"
            className="inline-block bg-[#4a90e2] text-white px-4 py-2 rounded-lg text-sm"
          >
            Перейти к dev странице
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-center">
      {/* Debug информация для разработки */}
      {process.env.NODE_ENV === "development" && (
        <div className="mx-4 mb-4 p-3 bg-blue-100 rounded-lg text-sm">
          <div className="font-bold mb-1">Информация о пользователе:</div>
          <div>Telegram ID: {telegramUser?.id}</div>
          <div>Имя: {telegramUser?.first_name}</div>
          <div>БД ID: {dbUser?.id}</div>
        </div>
      )}

      <p className="text-[14px] mb-[9px]">Бесплатный курс</p>
      <h1 className="mb-[9px]">
        Инвестиции
        <br />
        для подростков
      </h1>
      <p>
        Узнай о том, как управлять своими деньгами, копить на мечты и сделать
        первые инвестиции без страха.{" "}
      </p>
      <Image
        src="/images/start page and modules page/Artem with cup.png"
        alt="Иллюстрация курса"
        width={320}
        height={296}
        className="relative z-10 h-auto select-none mx-auto mb-[16px]"
        priority
      />
      <Link href="/all-modules">
        <Button className="w-[225px]">Начать учиться</Button>
      </Link>
    </div>
  );
}
