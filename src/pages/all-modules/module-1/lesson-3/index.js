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
          Почему деньги <br />
          <span className="bg-[#E9CDA7]">теряют ценность</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 3/main (2).png"
            alt="Artem thinking"
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
        <div className="flex justify-end mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Представь: ты копишь на велосипед. Наконец нужная сумма в копилке, а
            цена выросла. Пришлось на два месяца отложить покупку, чтобы собрать
            денег. А так хотелось летом гонять на новом велике!
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>

        <p className="text-[16px] mb-[53px]">
          Иногда денег хватает на покупку сегодня, а через пару лет — уже нет.
          Давай разбираться почему.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 3/1.png"
            alt="Bicycle with coins"
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
        <div className="flex justify-between items-start mb-[15px]">
          <h2>Почему со временем на ту же сумму можно купить меньше</h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Цены постепенно растут — это называют инфляцией. Денег в копилке
          столько же, что и год назад, а купить на них получится меньше. И это
          касается всего: техники, продуктов, одежды, транспорта.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 3/2.png"
            alt="Croissant with price"
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
        <div className="flex justify-end mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Инфляция — не баг системы, а фича. Если бы инфляции совсем не было,
            экономика не смогла бы развиваться. Не было бы так много товаров и
            услуг, которые можно купить.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>

        <p className="text-[16px] mb-[30px]">
          Но, если просто хранить деньги в копилке или на карте, они теряют
          ценность. Инфляция со временем сведет накопления. Согласен, неприятно,
          но это так.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 3/3.png"
            alt="Artem"
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
          <h2>
            Смотри, как <br />
            <span className="bg-[#E9CDA7]">работает инфляция</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Впиши цену вещи, чтобы узнать, сколько она может стоить через год с
          учетом инфляции*:
        </p>
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-white border border-gray-300 rounded-[8px] px-[16px] py-[12px] flex items-center">
            <input
              type="text"
              placeholder="1"
              className="text-[16px] font-semibold text-gray-900 bg-transparent border-none outline-none w-[40px]"
            />
            <span className="text-[16px] font-semibold text-gray-900 ml-[4px]">
              ₽
            </span>
          </div>
          <div className="mx-[16px]">
            <Image
              src="/images/lesson 3/exchange 1.svg"
              alt="Exchange"
              width={24}
              height={24}
              loading="eager"
            />
          </div>
          <div className="bg-white border border-gray-300 rounded-[8px] px-[16px] py-[12px] flex items-center">
            <span className="text-[16px] font-semibold text-gray-900">
              1.07
            </span>
            <span className="text-[16px] font-semibold text-gray-900 ml-[4px]">
              ₽
            </span>
          </div>
        </div>
        <p className="text-[12px] text-gray-500 text-center">
          * С 2014 по 2024 год средняя инфляция в России составила 7,04%.
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
          <h2>Почему важно учитывать инфляцию при постановке целей</h2>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если ты планируешь покупку через пару месяцев, инфляция не страшна.
          Но, если собираешься копить год или больше, на всякий случай добавляй
          к сумме запас — хотя бы 10%.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 3/4.png"
            alt="Coins"
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
        <div className="flex justify-end mb-[15px]">
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если не подстроиться под рост цен, в нужный момент может не хватить
          денег на покупку. Но есть секретный прием, который поможет увеличить
          твои накопления. О нем поговорим в следующем уроке.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 3/5.png"
            alt="Artem pointing"
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
        <div className="flex justify-end mb-[15px]">
          <div className="text-[10px] text-[#D8E2DE]">7/7</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 3/6.png"
            alt="Lightbulb"
            width={191}
            height={232}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px]">
          Инфляция{" "}
          <span className="bg-[#DFB57F]">не просто скучный термин</span> из
          учебника. Она влияет на твои покупки, цели и накопления. Но если
          знаешь, как она работает, можешь учитывать это в планах, чтобы точно
          хватило на твою цель.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: <TestBlock testUrl="/all-modules/module-1/lesson-3/test" />,
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
          src="/images/lesson 3/main (2).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 3/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 3/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 3/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 3/exchange 1.svg"
          alt=""
          width={24}
          height={24}
          priority
        />
        <Image
          src="/images/lesson 3/4.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 3/5.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 3/6.png"
          alt=""
          width={191}
          height={232}
          priority
        />
        <Image
          src="/images/Laptop.png"
          alt=""
          width={236}
          height={236}
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
          Урок 3
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
