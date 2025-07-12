import Link from "next/link";
import Image from "next/image";
import ModuleCard from "@/components/ui/ModuleCard";
import LessonCard from "@/components/ui/LessonCard";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { getUserProgress } from "@/utils/api";

export default function AllModules() {
  const [selectedModule, setSelectedModule] = useState(1);
  const [userProgress, setUserProgress] = useState(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Получаем данные пользователя из контекста
  const { telegramUser, dbUser, isLocalDevelopment } = useUser();

  // Загружаем прогресс пользователя
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!telegramUser?.id) return;

      try {
        setIsLoadingProgress(true);
        console.log(
          `[AllModules] Загрузка прогресса для пользователя ${telegramUser.id}...`
        );

        const progress = await getUserProgress(telegramUser.id);
        setUserProgress(progress);

        console.log("[AllModules] Прогресс пользователя получен:", progress);
      } catch (error) {
        console.error("[AllModules] Ошибка загрузки прогресса:", error);
        // Устанавливаем пустой прогресс для показа базового состояния
        setUserProgress({ modules: [], stats: { completed_lessons: 0 } });
      } finally {
        setIsLoadingProgress(false);
      }
    };

    fetchUserProgress();
  }, [telegramUser?.id]);

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
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-2.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-2.svg",
        imageAlt: "Target",
        title: "Урок 2",
        text: "Зачем ставить финансовые цели",
        href: "/all-modules/module-1/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-3.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-3.svg",
        imageAlt: "Arrow",
        title: "Урок 3",
        text: "Почему деньги теряют ценность",
        href: "/all-modules/module-1/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-4.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-4.svg",
        imageAlt: "Check",
        title: "Урок 4",
        text: "Как инвестиции помогают достичь целей",
        href: "/all-modules/module-1/lesson-4",
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
      },
      {
        imageSrc: "/images/start page and modules page/module 2/2-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 2/2-2.svg",
        imageAlt: "График",
        title: "Урок 2",
        text: "Что такое инвестиционные инструменты",
        href: "/all-modules/module-2/lesson-2",
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
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-2.svg",
        imageAlt: "Облигации",
        title: "Урок 2",
        text: "Облигации: как они работают и чем отличаются от акций",
        href: "/all-modules/module-3/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-3.svg",
        imageAlt: "ПИФ",
        title: "Урок 3",
        text: "ПИФ — как инвестировать во всё сразу",
        href: "/all-modules/module-3/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-4.svg",
        imageAlt: "Доходность и риск",
        title: "Урок 4",
        text: "Доходность и риск — как они связаны",
        href: "/all-modules/module-3/lesson-4",
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
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-2.svg",
        imageAlt: "Готовые решения",
        title: "Урок 2",
        text: "Как инвестировать с помощью готовых решений",
        href: "/all-modules/module-4/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-3.svg",
        imageAlt: "Диверсификация",
        title: "Урок 3",
        text: "Что такое диверсификация и зачем она нужна",
        href: "/all-modules/module-4/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-4.svg",
        imageAlt: "Первые шаги",
        title: "Урок 4",
        text: "С чего начать: первые шаги в инвестициях",
        href: "/all-modules/module-4/lesson-4",
      },
    ],
  };

  // Функция для определения состояния модуля
  const getModuleState = (moduleNumber) => {
    if (moduleNumber === 1) {
      // Первый модуль всегда открыт
      return "open";
    }

    if (!userProgress || !userProgress.modules) {
      // Если прогресс не загружен, все модули кроме первого заблокированы
      return "locked";
    }

    // Проверяем завершен ли предыдущий модуль
    const prevModuleProgress = userProgress.modules.find(
      (m) => m.order_index === moduleNumber - 1
    );

    if (prevModuleProgress && prevModuleProgress.completed) {
      return "open";
    }

    return "locked";
  };

  // Функция для определения состояния урока
  const getLessonState = (moduleNumber, lessonIndex) => {
    // Если модуль заблокирован, все его уроки тоже заблокированы
    const moduleState = getModuleState(moduleNumber);
    if (moduleState === "locked") {
      return "locked";
    }

    if (!userProgress || !userProgress.modules) {
      // Если прогресс не загружен, но модуль открыт - показываем уроки как открытые
      return "open";
    }

    // Находим модуль в прогрессе
    const moduleProgress = userProgress.modules.find(
      (m) => m.order_index === moduleNumber
    );

    if (!moduleProgress) {
      // Модуль не найден в БД, но разблокирован - уроки открыты
      return "open";
    }

    // Проверяем состояние конкретного урока
    if (moduleProgress.lessons && moduleProgress.lessons[lessonIndex]) {
      const lessonProgress = moduleProgress.lessons[lessonIndex];

      if (lessonProgress.completed) {
        return "done";
      }
    }

    // Урок не завершен, но модуль открыт - урок доступен
    return "open";
  };

  // Функция для получения уроков с динамическим состоянием
  const getLessonsWithState = (moduleNumber) => {
    const lessons = lessonsByModule[moduleNumber] || [];

    return lessons.map((lesson, index) => ({
      ...lesson,
      state: getLessonState(moduleNumber, index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5ECDA]">
      <div className="container-without-padding">
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
            {userProgress && (
              <div>
                <div className="font-bold mt-2 mb-1">Прогресс:</div>
                <div>
                  Завершено уроков: {userProgress.stats?.completed_lessons || 0}
                </div>
                <div>
                  Завершено модулей:{" "}
                  {userProgress.stats?.completed_modules || 0}
                </div>
                <div>
                  Общий прогресс: {userProgress.stats?.overall_progress || 0}%
                </div>
                <div className="font-bold mt-2 mb-1">Состояние модулей:</div>
                <div>
                  Модуль 1: {getModuleState(1)} | Модуль 2: {getModuleState(2)}{" "}
                  | Модуль 3: {getModuleState(3)} | Модуль 4:{" "}
                  {getModuleState(4)}
                </div>
                <div>Выбранный модуль: {selectedModule}</div>
              </div>
            )}
          </div>
        )}

        <main className="">
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
                locked={getModuleState(1) === "locked"}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(1)}
              />
              <ModuleCard
                imageSrc="/images/Coins.png"
                imageAlt="Target"
                title="Модуль №2"
                text="Знакомимся с миром инвестиций"
                locked={getModuleState(2) === "locked"}
                bgColor="#E9CDA7"
                onClick={() => setSelectedModule(2)}
              />
              <ModuleCard
                imageSrc="/images/Tablet.png"
                imageAlt="Target"
                title="Модуль №3"
                text="Исследуем инструменты инвестора"
                locked={getModuleState(3) === "locked"}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(3)}
              />
              <ModuleCard
                imageSrc="/images/Bag with stuff.png"
                imageAlt="Target"
                title="Модуль №4"
                text="Собираем твой первый портфель"
                locked={getModuleState(4) === "locked"}
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

            {isLoadingProgress ? (
              <div className="text-center py-8">
                <div className="text-gray-600">
                  Загружаем прогресс уроков...
                </div>
              </div>
            ) : (
              <>
                {getLessonsWithState(selectedModule).length === 0 ? (
                  <div className="text-gray-400">
                    Нет уроков для этого модуля
                  </div>
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
              </>
            )}
          </div>
        </main>
      </div>

      <div className="text-center mt-6 mb-8">
        <Link
          href="/dev"
          className="inline-block bg-[#4caf50] text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#45a049] transition-colors duration-300"
        >
          Dev - Данные пользователя
        </Link>
      </div>
    </div>
  );
}
