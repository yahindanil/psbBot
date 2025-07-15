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
          Что такое <br />
          <span className="bg-[#E9CDA7]">инвестиционные</span> <br />
          инструменты
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 6/main (6).png"
            alt="Character"
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
          <p className="text-[16px] text-white">
            В играх у персонажа часто есть разные предметы: броня, зелье, карта.
            У каждого предмета — своя задача и возможности.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>
        <p className="text-[16px] text-white mb-[30px]">
          В инвестициях тоже есть такие предметы — вернее, инструменты.{" "}
          <span className="bg-[#DFB57F]">Они помогают приумножать деньги.</span>
        </p>
        <p className="text-[16px] text-white">Сейчас объясню подробнее.</p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 6/1.png"
            alt="Character in armor"
            width={264}
            height={233}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2 className="text-[16px] font-semibold">
            Что значит инструмент в инвестициях
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Представь, что ты получаешь монеты в игре. Можно положить их в
          инвентарь, купить броню или потратить на прокачку способностей.
        </p>
        <p className="text-[16px] mb-[30px]">
          Инвестиционные инструменты — это такие же способы управлять деньгами.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 6/2.png"
            alt="Investment icons"
            width={264}
            height={233}
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
          <h2 className="text-[16px] font-semibold">
            Какие бывают инструменты
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Это могут быть акции, облигации, ПИФы и другие, разберем их в
          следующих уроках. Они помогают сохранить и приумножить накопления.
        </p>
        <p className="text-[16px] mb-[30px]">
          Смысл такой: ты вкладываешь деньги, чтобы получить больше в будущем.
          Только результат не гарантирован. Ты можешь получить больше, меньше
          или даже ничего.
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
          <p className="text-[16px]">
            Чтобы использовать инвестиционный инструмент, важно разобраться, как
            он работает, что влияет на доходность и чем ты рискуешь.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Это как применить зелье в игре: если не знаешь, что оно делает, можно
          как прокачаться, так и телепортнуться в ловушку.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 6/3.png"
            alt="Character with potion"
            width={264}
            height={233}
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
          <h2 className="text-[16px] font-semibold">
            Что влияет на выбор инструмента
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Когда инвестор определил цель и выбирает, куда вложить деньги, он
          задает себе три вопроса:
        </p>
        <ul className="text-[16px] space-y-[15px]">
          <li>
            <strong>Зачем я инвестирую?</strong> Например, чтобы защитить
            сбережения от инфляции.
          </li>
          <li>
            <strong>Когда эти деньги могут понадобиться?</strong> Например,
            через 3 месяца или через 3 года.
          </li>
          <li>
            <strong>
              Что я почувствую, если сумма на счете временно уменьшится?
            </strong>{" "}
            Так можно понять свою готовность к риску.
          </li>
        </ul>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px]">
            Например, чтобы накопить деньги на поездку через 1 месяц, обычно
            инвестиционные инструменты не выбирают. За такое короткое время они
            не успеют принести доход или даже уйдут в минус.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          А если планируешь накопить на обучение через 5 лет, то можно
          пробовать.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 6/4.png"
            alt="Binoculars"
            width={264}
            height={233}
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
          <h2 className="text-[16px] font-semibold text-white">
            Коротко о главном
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">7/7</div>
        </div>
        <div className="flex justify-center mb-[30px]">
          <Image
            src="/images/lesson 6/5.png"
            alt="Lightbulb"
            width={191}
            height={232.41}
            loading="eager"
          />
        </div>
        <p className="text-[16px] text-white">
          <span className="bg-[#DFB57F]">
            Инвестиционные инструменты — это способы использовать деньги
            разумно.
          </span>{" "}
          Они помогают сохранять деньги и приумножать их.
        </p>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-2/lesson-2/test"
        variant="module2"
      />
    ),
    bg: "bg-[#DFB57F] text-black",
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
          src="/images/lesson 6/main (6).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 6/1.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 6/2.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 6/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 6/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 6/5.png"
          alt=""
          width={48}
          height={48}
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
          Урок 6
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
