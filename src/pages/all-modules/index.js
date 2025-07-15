import Link from "next/link";
import Image from "next/image";
import ModuleCard from "@/components/ui/ModuleCard";
import LessonCard from "@/components/ui/LessonCard";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

export default function AllModules() {
  const [selectedModule, setSelectedModule] = useState(1);

  // Получаем данные пользователя из контекста
  const {
    telegramUser,
    dbUser,
    userStats,
    isLocalDevelopment,
    isReady,
    hasError,
    error,
    retryDbUser,
    getLessonStatus,
    getModuleStatus,
    isLessonCompleted,
    isModuleCompleted,
  } = useUser();

  // Базовые данные уроков (статичные метаданные)
  const lessonsByModule = {
    1: [
      {
        imageSrc: "/images/start page and modules page/module 1/1-1.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-1.svg",
        imageAlt: "Ruble",
        title: "Урок 1",
        text: "Почему деньги не берутся из воздуха",
        href: "/all-modules/module-1/lesson-1",
        lessonId: 1,
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-2.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-2.svg",
        imageAlt: "Target",
        title: "Урок 2",
        text: "Зачем ставить финансовые цели",
        href: "/all-modules/module-1/lesson-2",
        lessonId: 2,
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-3.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-3.svg",
        imageAlt: "Arrow",
        title: "Урок 3",
        text: "Почему деньги теряют ценность",
        href: "/all-modules/module-1/lesson-3",
        lessonId: 3,
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-4.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-4.svg",
        imageAlt: "Check",
        title: "Урок 4",
        text: "Как инвестиции помогают достичь целей",
        href: "/all-modules/module-1/lesson-4",
        lessonId: 4,
      },
    ],
    2: [
      {
        imageSrc: "/images/start page and modules page/module 2/2-1(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 2/2-1.svg",
        imageAlt: "Процент",
        title: "Урок 1",
        text: "Что можно назвать инвестициями, а что не стоит",
        href: "/all-modules/module-2/lesson-1",
        lessonId: 5,
      },
      {
        imageSrc: "/images/start page and modules page/module 2/2-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 2/2-2.svg",
        imageAlt: "График",
        title: "Урок 2",
        text: "Что такое инвестиционные инструменты",
        href: "/all-modules/module-2/lesson-2",
        lessonId: 6,
      },
    ],
    3: [
      {
        imageSrc: "/images/start page and modules page/module 3/3-1(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-1.svg",
        imageAlt: "Акции",
        title: "Урок 1",
        text: "Что такое акции и как они работают",
        href: "/all-modules/module-3/lesson-1",
        lessonId: 7,
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-2.svg",
        imageAlt: "Облигации",
        title: "Урок 2",
        text: "Облигации: как они работают и чем отличаются от акций",
        href: "/all-modules/module-3/lesson-2",
        lessonId: 8,
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-3.svg",
        imageAlt: "ПИФ",
        title: "Урок 3",
        text: "ПИФ — как инвестировать во всё сразу",
        href: "/all-modules/module-3/lesson-3",
        lessonId: 9,
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-4.svg",
        imageAlt: "Доходность и риск",
        title: "Урок 4",
        text: "Доходность и риск — как они связаны",
        href: "/all-modules/module-3/lesson-4",
        lessonId: 10,
      },
    ],
    4: [
      {
        imageSrc: "/images/start page and modules page/module 4/4-1(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-1.svg",
        imageAlt: "Самостоятельно",
        title: "Урок 1",
        text: "Как начать инвестировать самостоятельно",
        href: "/all-modules/module-4/lesson-1",
        lessonId: 11,
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-2.svg",
        imageAlt: "Готовые решения",
        title: "Урок 2",
        text: "Как инвестировать с помощью готовых решений",
        href: "/all-modules/module-4/lesson-2",
        lessonId: 12,
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-3.svg",
        imageAlt: "Диверсификация",
        title: "Урок 3",
        text: "Что такое диверсификация и зачем она нужна",
        href: "/all-modules/module-4/lesson-3",
        lessonId: 13,
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-4.svg",
        imageAlt: "Первые шаги",
        title: "Урок 4",
        text: "С чего начать: первые шаги в инвестициях",
        href: "/all-modules/module-4/lesson-4",
        lessonId: 14,
      },
    ],
  };

  // Функция для получения уроков с динамическим состоянием
  const getLessonsWithState = (moduleNumber) => {
    const lessons = lessonsByModule[moduleNumber] || [];

    return lessons.map((lesson) => {
      const status = getLessonStatus(lesson.lessonId);

      // Преобразуем статус в состояние для LessonCard
      let state;
      switch (status) {
        case "completed":
          state = "done";
          break;
        case "open":
          state = "open";
          break;
        case "locked":
        default:
          state = "locked";
          break;
      }

      return {
        ...lesson,
        state,
      };
    });
  };

  // Показываем загрузку если данные еще не готовы
  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#F5ECDA] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Загружаем ваши модули...</div>
          <div className="text-sm text-gray-400">
            Получаем данные о прогрессе
          </div>
        </div>
      </div>
    );
  }

  // Показываем ошибку если есть проблемы
  if (hasError) {
    return (
      <div className="min-h-screen bg-[#F5ECDA] flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-[#283B41]">
            Ошибка загрузки
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "Не удалось загрузить данные"}
          </p>
          <button
            onClick={retryDbUser}
            className="bg-[#4a90e2] text-white px-4 py-2 rounded-lg"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5ECDA]">
      <div className="container-without-padding pb-8">
        <header className="flex justify-between items-center mb-[15px] pl-[16px] pr-[16px] pt-[30px]">
          <h1>Все модули</h1>
          <Link href="/profile" aria-label="Profile">
            <Image
              src="/svgs/Profile icon.svg"
              alt="Profile Icon"
              width={30}
              height={30}
              priority
            />
          </Link>
        </header>

        {/* Уведомление о режиме разработки */}
        {isLocalDevelopment && (
          <div className="mx-4 mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-sm">
            <div className="font-bold mb-1 text-yellow-800">
              🛠 РЕЖИМ РАЗРАБОТКИ
            </div>
            <div className="text-yellow-700">
              Тестовый пользователь: {telegramUser?.first_name}{" "}
              {telegramUser?.last_name}
            </div>
          </div>
        )}

        {/* Debug информация для разработки */}
        {process.env.NODE_ENV === "development" && (
          <div className="mx-4 mb-4 p-3 bg-blue-100 rounded-lg text-sm">
            <div className="font-bold mb-1">Информация о пользователе:</div>
            <div>Telegram ID: {telegramUser?.id}</div>
            <div>
              Имя: {telegramUser?.first_name} {telegramUser?.last_name}
            </div>
            <div>Username: @{telegramUser?.username}</div>
            <div>БД ID: {dbUser?.id}</div>
            <div>Локальная разработка: {isLocalDevelopment ? "Да" : "Нет"}</div>
            {userStats && (
              <div>
                <div className="font-bold mt-2 mb-1">Статистика:</div>
                <div>
                  Завершено уроков: {userStats.completed_lessons || 0}/14
                </div>
                <div>
                  Завершено модулей: {userStats.completed_modules || 0}/4
                </div>
                <div>Прогресс уроков: {userStats.lessons_percentage || 0}%</div>
                <div>
                  Прогресс модулей: {userStats.modules_percentage || 0}%
                </div>
                <div>
                  Среднее время: {userStats.average_lesson_time || 0} сек
                </div>
                <div className="font-bold mt-2 mb-1">Состояние модулей:</div>
                <div>
                  Модуль 1: {getModuleStatus(1)} (
                  {isModuleCompleted(1) ? "✅" : "❌"}) | Модуль 2:{" "}
                  {getModuleStatus(2)} ({isModuleCompleted(2) ? "✅" : "❌"}) |
                  Модуль 3: {getModuleStatus(3)} (
                  {isModuleCompleted(3) ? "✅" : "❌"}) | Модуль 4:{" "}
                  {getModuleStatus(4)} ({isModuleCompleted(4) ? "✅" : "❌"})
                </div>
                <div className="font-bold mt-2 mb-1">
                  Состояние уроков (первые 4):
                </div>
                <div>
                  Урок 1: {getLessonStatus(1)} (
                  {isLessonCompleted(1) ? "✅" : "❌"}) | Урок 2:{" "}
                  {getLessonStatus(2)} ({isLessonCompleted(2) ? "✅" : "❌"}) |
                  Урок 3: {getLessonStatus(3)} (
                  {isLessonCompleted(3) ? "✅" : "❌"}) | Урок 4:{" "}
                  {getLessonStatus(4)} ({isLessonCompleted(4) ? "✅" : "❌"})
                </div>
                <div>Выбранный модуль: {selectedModule}</div>
              </div>
            )}
          </div>
        )}

        <main>
          <div
            className="mb-[30px] overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className="flex gap-[15px] pl-[16px] pr-[16px]"
              style={{
                minWidth: "100%",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              <ModuleCard
                imageSrc="/images/Target.png"
                imageAlt="Target"
                title="Модуль №1"
                text="Учимся ставить цели"
                locked={getModuleStatus(1) === "locked"}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(1)}
              />
              <ModuleCard
                imageSrc="/images/Coins.png"
                imageAlt="Coins"
                title="Модуль №2"
                text="Знакомимся с миром инвестиций"
                locked={getModuleStatus(2) === "locked"}
                bgColor="#E9CDA7"
                onClick={() => setSelectedModule(2)}
              />
              <ModuleCard
                imageSrc="/images/Tablet.png"
                imageAlt="Tablet"
                title="Модуль №3"
                text="Исследуем инструменты инвестора"
                locked={getModuleStatus(3) === "locked"}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(3)}
              />
              <ModuleCard
                imageSrc="/images/Bag with stuff.png"
                imageAlt="Bag"
                title="Модуль №4"
                text="Собираем твой первый портфель"
                locked={getModuleStatus(4) === "locked"}
                bgColor="#E9CDA7"
                onClick={() => setSelectedModule(4)}
              />
            </div>
            <style jsx>{`
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
          <div className="pl-[16px] pr-[16px]">
            <h2 className="font-semibold mb-[15px]">
              {`Модуль ${selectedModule}. Список уроков:`}
            </h2>

            {getLessonsWithState(selectedModule).length === 0 ? (
              <div className="text-gray-400">Нет уроков для этого модуля</div>
            ) : (
              getLessonsWithState(selectedModule).map((lesson, idx) =>
                lesson.href && lesson.state !== "locked" ? (
                  <Link key={idx} href={lesson.href} legacyBehavior>
                    <a style={{ display: "block" }}>
                      <LessonCard {...lesson} />
                    </a>
                  </Link>
                ) : (
                  <LessonCard key={idx} {...lesson} />
                )
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
