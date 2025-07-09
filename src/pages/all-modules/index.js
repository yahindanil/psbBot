import Link from "next/link";
import Image from "next/image";
import ModuleCard from "@/components/ui/ModuleCard";
import LessonCard from "@/components/ui/LessonCard";
import { useState } from "react";

export default function AllModules() {
  const [selectedModule, setSelectedModule] = useState(1);

  // Списки уроков по модулям
  const lessonsByModule = {
    1: [
      {
        imageSrc: "/images/start page and modules page/module 1/1-1.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-1.svg",
        imageAlt: "Ruble",
        title: "Урок 1",
        text: "Почему деньги не берутся из воздуха",
        state: "done",
        href: "/all-modules/module-1/lesson-1",
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-2.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-2.svg",
        imageAlt: "Target",
        title: "Урок 2",
        text: "Зачем ставить финансовые цели",
        state: "done",
        href: "/all-modules/module-1/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-3.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-3.svg",
        imageAlt: "Arrow",
        title: "Урок 3",
        text: "Почему деньги теряют ценность",
        state: "open",
        href: "/all-modules/module-1/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 1/1-4.svg",
        imageSrcLocked: "/images/start page and modules page/module 1/1-4.svg",
        imageAlt: "Check",
        title: "Урок 4",
        text: "Как инвестиции помогают достичь целей",
        state: "open",
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
        state: "open",
        href: "/all-modules/module-2/lesson-1",
      },
      {
        imageSrc: "/images/start page and modules page/module 2/2-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 2/2-2.svg",
        imageAlt: "График",
        title: "Урок 2",
        text: "Что такое инвестиционные инструменты",
        state: "locked",
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
        state: "locked",
        href: "/all-modules/module-3/lesson-1",
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-2.svg",
        imageAlt: "Облигации",
        title: "Урок 2",
        text: "Облигации: как они работают и чем отличаются от акций",
        state: "locked",
        href: "/all-modules/module-3/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-3.svg",
        imageAlt: "ПИФ",
        title: "Урок 3",
        text: "ПИФ — как инвестировать во всё сразу",
        state: "locked",
        href: "/all-modules/module-3/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 3/3-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 3/3-4.svg",
        imageAlt: "Доходность и риск",
        title: "Урок 4",
        text: "Доходность и риск — как они связаны",
        state: "locked",
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
        state: "locked",
        href: "/all-modules/module-4/lesson-1",
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-2(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-2.svg",
        imageAlt: "Готовые решения",
        title: "Урок 2",
        text: "Как инвестировать с помощью готовых решений",
        state: "locked",
        href: "/all-modules/module-4/lesson-2",
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-3(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-3.svg",
        imageAlt: "Диверсификация",
        title: "Урок 3",
        text: "Что такое диверсификация и зачем она нужна",
        state: "locked",
        href: "/all-modules/module-4/lesson-3",
      },
      {
        imageSrc: "/images/start page and modules page/module 4/4-4(1).svg",
        imageSrcLocked: "/images/start page and modules page/module 4/4-4.svg",
        imageAlt: "Первые шаги",
        title: "Урок 4",
        text: "С чего начать: первые шаги в инвестициях",
        state: "locked",
        href: "/all-modules/module-4/lesson-4",
      },
    ],
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
                locked={false}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(1)}
              />
              <ModuleCard
                imageSrc="/images/Coins.png"
                imageAlt="Target"
                title="Модуль №2"
                text="Знакомимся с миром инвестиций"
                locked={true}
                bgColor="#E9CDA7"
                onClick={() => setSelectedModule(2)}
              />
              <ModuleCard
                imageSrc="/images/Tablet.png"
                imageAlt="Target"
                title="Модуль №3"
                text="Исследуем инструменты инвестора"
                locked={true}
                bgColor="#DFB57F"
                onClick={() => setSelectedModule(3)}
              />
              <ModuleCard
                imageSrc="/images/Bag with stuff.png"
                imageAlt="Target"
                title="Модуль №4"
                text="Собираем твой первый портфель"
                locked={true}
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
            {lessonsByModule[selectedModule].length === 0 ? (
              <div className="text-gray-400">Нет уроков для этого модуля</div>
            ) : (
              lessonsByModule[selectedModule].map((lesson, idx) =>
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
      <div className="border-[2px] border-[#ACC0B1] rounded-[15px] px-5 py-4 flex items-center gap-4 max-w-[420px] mx-auto mt-6 bg-white">
        <Image
          src="/images/personal account/time.svg"
          alt="Песочные часы"
          width={40}
          height={40}
          className="min-w-[40px]"
          style={{ objectFit: "contain" }}
        />
        <div>
          <div className="text-[#283B41] text-[22px] font-bold leading-tight mb-1">
            15 минут
          </div>
          <div className="text-[#283B41] text-[16px] font-normal">
            Среднее время занятий
          </div>
        </div>
      </div>
    </div>
  );
}
