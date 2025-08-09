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
          <span className="bg-[#E9CDA7]">Доходность и риск — </span>
          <br />
          как они связаны
        </h1>
        <p className="text-center text-[16px] mb-[24px] px-[20px]">
          Может показаться, что в инвестициях надо нести все деньги туда, где
          самый большой доход. Но на самом деле, чем больше можно заработать,
          тем выше риск потерять деньги.
        </p>
        <p className="text-center text-[12px] text-gray-500 mb-[24px]">
          Давай разберемся почему
        </p>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 10/main (4).png"
            alt="Artem with charts"
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
          <h2>Что такое доходность</h2>
          <div className="text-[10px] text-[#D8E2DE]">1/8</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          Доходность — это то, сколько ты можешь заработать от вложенных денег.
          Её считают в процентах, чтобы понимать и сравнивать успешность разных
          инвестиций между собой. Это помогает определить, какие виды инвестиций
          выбрать подходящие.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 5/1.png"
            alt="Coins growing"
            width={249}
            height={208}
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
        <div className="flex justify-between mb-[15px]">
          <p className="text-[16px] mb-[20px] font-semibold">
            Доходность считают так:
          </p>
          <div className="text-[10px] text-gray-400">2/8</div>
        </div>
        <p className="text-[16px] mb-[20px] bg-[#D8E2DE]">
          (Заработок / Вложенная сумма) × 100
        </p>
        <p className="text-[16px] mb-[20px]">
          <span className="font-semibold">Например,</span> если ты вкладываешь
          10 000 рублей, а через год твои инвестиции стали стоить 11 000 рублей,
          то доходность — 10% годовых.
        </p>
        <p className="text-[16px] mb-[20px]">(1000 / 10 000) × 100 = 10%</p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-end mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            В инвестициях можно получить доход{" "}
            <span className="bg-[#D8E2DE]">двумя способами:</span>
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/8</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className=" font-semibold">Первый</span> — за счет роста
          стоимости. Например, покупаешь ценную бумагу за 1000 рублей, а потом
          продаешь за 1200. Твой доход — 200 рублей.
        </p>
        <p className="text-[16px] mb-[30px]">
          Но это сработает, если цена вырастет,{" "}
          <span className="bg-[#D8E2DE]">а она может и упасть.</span>
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
            <span className="font-semibold">Второй способ</span> — получать
            <span className="bg-[#D8E2DE]">выплаты от компаний,</span> в которые
            вкладываешь деньги. Подробнее разберем, как это работает, в
            следующих уроках.
          </p>
          <div className="text-[10px] text-gray-400">4/8</div>
        </div>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 5/2.png"
            alt="Briefcase with money"
            width={249}
            height={208}
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
          <h2>Что такое риск</h2>
          <div className="text-[10px] text-gray-400">5/8</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Риск — <span className="bg-[#D8E2DE]">это вероятность потерять</span>{" "}
          часть вложенных денег или заработать меньше, чем ожидаешь.
        </p>
        <p className="text-[16px] mb-[30px]">
          <span className="font-semibold">Например,</span> компания может
          закрыться, а у тебя останутся ее ценные бумаги, которые теперь ничего
          не стоят.
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
            В инвестициях всегда есть риск, даже в тех, которые кажутся очень
            надежными. Избавиться от риска нельзя. Можно только выбрать, какой{" "}
            <span className="bg-[#D8E2DE]">уровень риска</span> тебе подходит.
          </p>
          <div className="text-[10px] text-gray-400">6/8</div>
        </div>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 10/3.png"
            alt="Artem pointing"
            width={249}
            height={208}
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
            Выше доходность — <br />
            выше риск
          </h2>
          <div className="text-[10px] text-gray-400">7/8</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="font-semibold">В инвестициях есть правило:</span>{" "}
          если доходность высокая — значит, и риск потерять деньги тоже высокий.
        </p>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#D8E2DE]">Высокий доход</span> — это плата за
          неопределенность. Например, покупка ценных бумаг технологичного
          стартапа за год может как вырасти в два раза, так и резко упасть.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 5/4.png"
            alt="Cats on coin stacks"
            width={249}
            height={208}
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
        <div className="flex justify-end mb-[15px]">
          <div className="text-[10px] text-white">8/8</div>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/lesson 5/5.png"
            alt="Lightbulb with stars"
            width={249}
            height={208}
            loading="eager"
          />
          <h2 className="text-[24px] font-semibold mb-[30px] text-white text-center">
            Коротко о главном
          </h2>
          <p className="text-[16px] mb-[30px] text-white text-center">
            В инвестициях доходность и риск всегда связаны. Нет инвестиций, где
            доход высокий, а рисков нет.
            <span className="bg-[#E9CDA7]">
              {" "}
              Чем выше твоя обещаемая доходность
            </span>
            , тем внимательнее нужно разбираться, чем ты рискуешь.
          </p>
          <div className="flex justify-center mb-auto"></div>
        </div>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-3/lesson-4/test"
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
    <div className="container-without-padding pt-[20px] min-h-screen">
      {/* Preload all images */}
      <div style={{ display: "none" }}>
        <Image
          src="/images/lesson 5/main (4).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 5/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 5/2.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 5/3.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 5/4.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 5/5.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 5/6.png"
          alt=""
          width={249}
          height={208}
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
          Урок 10
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
          {page < lessonPages.length - 1 &&
            lessonPages[page].type !== "test" && (
              <div className="mt-auto">
                <LessonNavButtons onPrev={handlePrev} onNext={handleNext} />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
