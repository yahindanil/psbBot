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
          Зачем ставить <br />
          <span className="bg-[#E9CDA7]">финансовые цели</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 2/main.png"
            alt="Artem with coins"
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
          <h2>
            Поговорим <br />о приятном — о мечтах.
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          У тебя наверняка есть хотя бы одна. <br />
          Может, это путешествие с друзьями, <br />
          приставка или новый телефон.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 2/1.png"
            alt="Phone with stars"
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
          <h2>
            Чтобы мечта сбылась, <br />
            <span className="bg-[#E9CDA7]">преврати ее в цель.</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Цель — это желание, в котором есть <br />
          конкретное действие, срок и сумма.
        </p>
        <p className="mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">Вот просто мечта:</span>
          <br />— Хочу планшет.
        </p>
        <p className="mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">А вот цель:</span>
          <br />
          — Хочу накопить 40 000 ₽ за год <br />
          на планшет.
        </p>
        <p>
          Во втором случае получается посчитать, <br />
          сколько денег нужно откладывать <br />
          на покупку. Мечта превращается <br />в понятную цель.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 2/2.png"
            alt="Calendar with money"
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
            Зачем вообще <br />
            ставить цель
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Когда знаешь, зачем откладываешь <br />
          деньги, становится легче не тратить все <br />
          впустую.
        </p>
        <p className="mb-[30px]">
          Вокруг много интересных вещей, которые <br />
          хочется купить в моменте. Но, когда есть <br />
          цель, проще сказать себе: «Это классно, <br />
          но мне важнее другое».
        </p>
        <p className="mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">
            Цель — это как навигатор.
          </span>{" "}
          Показывает, <br />
          куда ты идешь, и помогает не сворачивать <br />в сторону.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 2/3.png"
            alt="Navigation device"
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
            Какая цель может <br />
            <span className="bg-[#E9CDA7]">реально сработать</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Как думаешь, получится ли у тебя достичь <br />
          таких целей?
        </p>
        <p className="mb-[30px]">
          — Хочу 5 миллионов за год! <br />— Хочу просто много денег!
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 2/4.png"
            alt="Artem pointing up"
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
          <p>
            Чтобы поставить цель, нужно прикинуть, сколько на неё нужно денег и
            когда получится их накопить.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">Например, так:</span>
          <br />
          — Хочу накопить 5000 ₽ за два <br />
          месяца на наушники. <br />
          — Хочу отложить 15 000 ₽ к лету <br />
          на поездку с друзьями.
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
          <h2>
            Как цель влияет <br />
            на деньги
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если цели нет — деньги просто уходят <br />
          на что попало. А если цель есть — ты сам <br />
          выбираешь, сколько отложить, на что <br />
          потратить карманные деньги, от чего <br />
          отказаться. С этого начинается контроль над деньгами
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 2/5.png"
            alt="Artem with coins"
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
          <div></div>
          <div className="text-[10px] text-[#D8E2DE]">7/7</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 2/6.png"
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
          Финансовая цель — это не отказ <br />
          от всего на свете, <span className="bg-[#DFB57F]">
            а твой выбор.
          </span>{" "}
          Если <br />
          понимаешь, что хочешь получить <br />
          и когда, проще двигаться к этому. <br />
          А деньги становятся инструментом, <br />
          который помогает прийти к цели.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: (
      <TestBlock testUrl="/all-modules/module-1/lesson-2/test" />
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
          src="/images/lesson 2/main.png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 2/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 2/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 2/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 2/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 2/5.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 2/6.png"
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
          Урок 2
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
