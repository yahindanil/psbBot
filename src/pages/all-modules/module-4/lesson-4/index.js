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
          <span className="bg-[#E9CDA7]">С чего начать:</span> первые <br />
          шаги в инвестициях
        </h1>
        <p className="text-center text-[16px] mb-[24px]">
          Многие откладывают первый шаг в инвестициях, потому что ждут удобного
          момента или больших денег. Но начать можно даже тогда, когда у тебя
          еще нет брокерского счета и миллионов рублей на нем.
        </p>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 14/main (13).png"
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
          <h2 className="text-white">
            Инвестиции <br />
            начинаются с цели
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">1/6</div>
        </div>
        <p className="text-white text-[16px] mb-[18px]">
          Может показаться, что для инвестиций главное — иметь крупную сумму на
          счете. Но это не так.
        </p>
        <p className="text-white text-[16px] mb-[18px]">
          Инвестиции начинаются с вопроса:{" "}
          <span className="font-semibold">«Зачем я хочу вложить деньги?».</span>{" "}
          Когда есть цель, деньги становятся способом ее достичь, а не просто
          цифрой на счете.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 14/1.png"
            alt="Lesson image"
            width={132}
            height={187}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Что можно сделать <br />
            уже сейчас
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/6</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Даже если тебе пока нет 18 лет и ты не можешь открыть брокерский счет,
          все равно можно готовиться инвестировать в будущем.
        </p>
        <p className="text-[16px] bg-[#D8E2DE]">Вот что ты можешь сделать ➡️</p>
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
            <span className="font-semibold">👍 Поставить цель.</span> Подумай,
            на что именно ты хочешь накопить, сколько для этого нужно денег и за
            какое время хотелось бы прийти к цели. Цель делает инвестирование
            понятным: ты не просто откладываешь,{" "}
            <span className="bg-[#D8E2DE]">а двигаешься к чему-то важному</span>{" "}
            для себя.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/6</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 14/2.png"
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
          <p className="text-[16px]">
            👍{" "}
            <span className="font-semibold">
              Посчитай, сколько нужно откладывать регулярно, чтобы достичь
            </span>{" "}
            цели. Лучше откладывать совсем понемногу, но делать это постоянно,
            чем ждать, пока начнешь зарабатывать много денег.{" "}
            <span className="bg-[#D8E2DE]">Инвестиции — это марафон,</span> а не
            спринт.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">4/6</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 14/3.png"
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
          <p className="text-[16px]">
            👍{" "}
            <span className="font-semibold">
              Узнать больше об инструментах.
            </span>{" "}
            Можно больше узнать, чем отличаются вклады, облигации, акции и ПИФы,
            какие инструменты подходят для разных сроков и целей. Чем лучше ты
            понимаешь сейчас, тем проще будет действовать, когда появится
            возможность открыть счет.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/6</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 14/4.png"
            alt="Lesson image"
            width={224}
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
        <div className="flex justify-end">
          <div className="text-[10px] text-[#D8E2DE]">6/6</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 14/5.png"
            alt="Lesson image"
            width={191}
            height={232}
            loading="eager"
          />
        </div>
        <div className="flex justify-between items-start mb-[15px]">
          <h2 className="text-white text-[24px] font-semibold text-center w-full">
            Коротко о главном
          </h2>
        </div>
        <p className="text-white text-[16px] mb-[18px] text-center">
          Теперь ты знаешь, что инвестиции —{" "}
          <span className="bg-[#DFB57F]">это не магия и не лотерея.</span> Это
          инструменты, которые помогают сохранить и приумножить деньги, чтобы
          достичь своих финансовых целей.
        </p>
        <p className="text-white text-[16px] mb-[18px] text-center">
          Мы разобрали, как ставить цели, выбирать инструменты, управлять
          рисками и почему важно начинать с малого. Что делать с этими знаниями
          — решать тебе.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: (
      <>
        <TestBlock testUrl="/all-modules/module-4/lesson-4/test" />
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
          src="/images/lesson 14/main (13).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 14/1.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 14/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 14/3.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 14/4.png"
          alt=""
          width={224}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 14/5.png"
          alt=""
          width={150}
          height={150}
          priority
        />
        <Image
          src="/images/test/completed.png"
          alt=""
          width={219}
          height={219}
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
          Урок 14
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
