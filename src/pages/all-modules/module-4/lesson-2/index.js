import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LessonNavButtons from "@/components/ui/LessonNavButtons";
import TestBlock from "@/components/ui/TestBlock";

const lessonPages = [
  {
    type: "start",
    content: (
      <>
        <h1 className="text-center text-[24px] font-semibold mb-[24px]">
          Готовые решения <br />
          для инвестиций
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 12/main (9).png"
            alt="Lesson image"
            width={501.45}
            height={398}
            priority
            loading="eager"
          />
        </div>
        <div className="flex justify-center mb-[40px]">
          {/* Navigation to first lesson page handled in main component */}
        </div>
      </>
    ),
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Когда захотелось пиццу, есть как минимум два способа ее получить.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#DFB57F]">Приготовить самостоятельно:</span>{" "}
          выбрать ингредиенты, замесить тесто, испечь. Или заказать готовую, где
          за тебя все сделал повар.
        </p>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#DFB57F]">
            В инвестициях тоже не обязательно разбираться самостоятельно.
          </span>{" "}
          Есть готовые решения — ПИФы и доверительное управление.
        </p>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Что такое <br />
            доверительное <br />
            управление и когда <br />
            подходит
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Если инвестор не хочет сам управлять своими накоплениями, он может
          поручить это специалистам. Это называется доверительным управлением.
        </p>
        <p className="text-[16px] mb-[18px]">
          Ты ставишь цель и передаешь капитал профессиональной, а они решают,
          куда вложить деньги, чтобы ты достиг.
        </p>
        <p className="text-[16px]">
          По сути, ты{" "}
          <span className="bg-[#D8E2DE] font-semibold">
            перекладываешь работу на тех, кто профессионально занимается
            инвестициями.
          </span>{" "}
          А они получают за это свой процент.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Управляющие подбирают вложения под конкретного человека: учитывают
            его цель, сумму и отношение к риску.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Это как заказать кроссовки по индивидуальному дизайну, а не купить
          готовые, как у всех.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 12/1.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Что такое ПИФы <br />и зачем они нужны
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Представь большую коробку, в которую много людей собрали разные ценные
          бумаги: акции, облигации и другие.
        </p>
        <p className="text-[16px] mb-[18px]">
          Инвесторы покупают не бумаги отдельно, а доли в этой коробке. Такая
          доля называется пай. Как кусочек пиццы, которую поделили на всех.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 12/2.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            <span className="bg-[#D8E2DE] font-semibold">
              ПИФ — это паевый инвестиционный фонд.
            </span>{" "}
            Это та самая коробка с разными активами внутри.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px]">
          ПИФы составляют профессиональные управляющие. Они решают, куда вложить
          деньги фонда, чтобы он приносил доход. Следят за рынком, анализируют
          компании, читают новости. Задача инвестора — выбрать подходящий фонд.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Если ты только начинаешь разбираться в инвестициях, ПИФ может быть
            отличным стартом. Тебе не нужно самостоятельно выбирать отдельные
            акции или облигации и разбираться в финансовых показателях компаний.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 12/3.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <div></div>
          <div className="text-[10px] text-[#D8E2DE]">7/7</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 12/4.png"
            alt="Lesson image"
            width={191}
            height={232}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px] mb-[16px]">
          Доверительное управление — это индивидуальная услуга, когда портфель
          подбирают конкретному инвестору.
        </p>
        <p className="text-center text-white text-[16px]">
          <span className="bg-[#DFB57F]">
            ПИФы — это готовый набор из разных активов.
          </span>{" "}
          В структуре уже все рассказу, из чего они состоят.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: (
      <>
        <TestBlock testUrl="/all-modules/module-4/lesson-2/test" />
      </>
    ),
    bg: "bg-[#DFB57F]",
  },
];

export default function Lesson() {
  const [page, setPage] = useState(0);

  const handleStart = () => setPage(1);
  const handlePrev = () => {
    setPage((p) => (p === 1 ? 0 : Math.max(1, p - 1)));
  };
  const handleNext = () =>
    setPage((p) => Math.min(lessonPages.length - 1, p + 1));

  return (
    <div className="container-without-padding pt-[20px] pb-8 min-h-screen">
      {/* Preload all images */}
      <div style={{ display: "none" }}>
        <Image
          src="/images/lesson 12/main (9).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 12/1.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 12/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 12/3.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 12/4.png"
          alt=""
          width={191}
          height={232}
          priority
        />
        <Image
          src="/svgs/Arrow left.svg"
          alt=""
          width={5.5}
          height={8}
          priority
        />
      </div>

      <header className="relative flex items-center mb-[20px] min-h-[25px] pl-[16px] pr-[16px]">
        {/* Back button as Link, only on start page */}
        {page === 0 && (
          <Link
            href="/all-modules"
            className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-[#F5ECDA] absolute left-[16px] top-1/2 -translate-y-1/2"
          >
            <Image
              src="/svgs/Arrow left.svg"
              alt="Назад"
              width={5.5}
              height={8}
              loading="eager"
              className="pr-[1px]"
            />
          </Link>
        )}
        {/* Lesson label */}
        <div className="bg-[#749484] rounded-[30px] px-[15px] py-[5px] text-white text-[14px] mx-auto">
          Урок 12
        </div>
      </header>

      {/* Start page */}
      {page === 0 && (
        <div className="lesson-start-page mt-[10px]">
          {lessonPages[0].content}
          <div className="flex justify-center mb-[40px]">
            <Button className="w-[225px]" onClick={handleStart}>
              Начать урок
            </Button>
          </div>
        </div>
      )}

      {/* Lesson pages */}
      {page > 0 && (
        <div
          className={`flex-1 rounded-t-[15px] pr-[20px] pt-[20px] pb-[50px] pl-[16px] flex flex-col min-h-[calc(100vh-65px)] ${
            lessonPages[page].bg || "bg-white text-black"
          }`}
          style={{ minHeight: "calc(100vh - 65px)" }}
        >
          {lessonPages[page].content}
          {page < lessonPages.length - 1 && (
            <div className="mt-auto">
              <LessonNavButtons onPrev={handlePrev} onNext={handleNext} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
