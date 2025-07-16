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
          <span className="bg-[#E9CDA7]">диверсификация</span> <br />и зачем она
          нужна
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 13/main (12).png"
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
            В инвестициях есть простое правило: чтобы рисков было меньше, деньги
            нужно распределять по разным инструментам. Это называют
            диверсификацией.{" "}
            <span className="font-semibold">Рассказываю подробнее.</span>
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 13/1.png"
            alt="Lesson image"
            width={285}
            height={238}
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
          <h2>
            Почему риски есть <br />
            всегда
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">
            В мире постоянно что-то меняется.
          </span>{" "}
          Даже самые надежные компании время от времени испытывают трудности, а
          неприметные стартапы резко становятся популярными.
        </p>
        <p className="text-[16px] mb-[18px]">
          Невозможно заранее сказать, какая компания вырастет, а какая
          обанкротится. Поэтому в инвестициях{" "}
          <span className="bg-[#D8E2DE]">
            всегда есть риск потерять деньги.
          </span>
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 13/2.png"
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
            Что такое <br />
            диверсификация
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">
            Диверсификация — это когда ты распределяешь деньги между разными
            инструментами.
          </span>{" "}
          Так меньше риск потерять все, если один из вариантов не сработает.
        </p>
        <p className="text-[16px] mb-[18px]">
          Поэтому инвесторы не вкладывают все деньги в одну компанию, даже если
          она кажется очень перспективной.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 13/3.png"
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
            Как диверсифи- <br />
            цировать свой <br />
            портфель
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Распределять деньги можно по-разному:
        </p>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">
            ✅ Вложить часть в акции, часть — в облигации.
          </span>{" "}
          Обычно часть денег вкладывают в акции, чтобы была возможность
          заработать на росте бизнеса.
        </p>
        <p className="text-[16px]">
          Другая часть денег идет в облигации. Они приносят более стабильный
          доход за счет купонных выплат, и их цена обычно меняется не так
          сильно.
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
            <span className="bg-[#D8E2DE]">Если тебе важнее стабильность,</span>{" "}
            можно вложить большую часть в облигации и чуть меньше — в акции.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          <span className="bg-[#D8E2DE]">Если хочется рискнуть,</span> чтобы
          больше заработать, можно сделать наоборот: больше акций, меньше
          облигаций.
        </p>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">
            А вот вкладывать всё в акции новичку точно не стоит:
          </span>{" "}
          это слишком рискованная стратегия.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 13/4.png"
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
            <span className="font-semibold">✅ Использовать ПИФы,</span> где за
            тебя уже собрали разные активы в готовый портфель. Ты покупаешь пай
            и уже получаешь долю в ПИФе.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">
            ✅ Выбирать активы из разных отраслей.
          </span>{" "}
          Например, вложить часть денег в IT-компании, часть — в энергетику,
          часть — в транспорт. Если в одной сфере начнутся проблемы, другие
          могут поддержать общий результат.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 13/5.png"
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
            src="/images/lesson 13/6.png"
            alt="Lesson image"
            width={191}
            height={232}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px]">
          <span className="bg-[#DFB57F]">Диверсификация помогает</span> <br />
          сохранить деньги, когда рынок ведет <br />
          себя непредсказуемо. Это как <br />
          подстраховка: даже если одна <br />
          бумага в портфеле подешевеет, <br />
          другие могут, наоборот, подорожать.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: (
      <>
        <TestBlock testUrl="/all-modules/module-4/lesson-3/test" />
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
    <div className="container-without-padding pt-[20px] min-h-screen">
      {/* Preload all images */}
      <div style={{ display: "none" }}>
        <Image
          src="/images/lesson 13/main (12).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 13/1.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 13/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 13/3.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 13/4.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 13/5.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 13/6.png"
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
          Урок 13
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
