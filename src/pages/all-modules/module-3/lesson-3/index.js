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
          ПИФ: как инвестировать <br />
          <span className="bg-[#E9CDA7]">во все сразу</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 9/main (10).png"
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
          <p className="text-[16px] mb-[30px]">
            Вы с друзьями решили заказать еду. Но один хочет пиццу, другой —
            суши, третий — бургер. Чтобы никому не было обидно, вы скидываетесь
            и заказываете всего понемногу, и каждый получает то, что любит.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/7</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          С ПИФами так же:{" "}
          <span className="font-semibold">
            не нужно выбирать одну акцию — можно вложиться сразу в несколько
            компаний через один фонд.
          </span>
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 9/1.png"
            alt="Character with food"
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
          <h2>Из чего состоят ПИФы</h2>
          <div className="text-[10px] text-[#D8E2DE]">2/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#D8E2DE]">
            ПИФ — это коллективные инвестиции.
          </span>{" "}
          Управляющая компания распределяет деньги инвесторов между активами —
          например, акциями крупных компаний.
        </p>
        <p className="text-[16px]">
          <span className="font-semibold">
            Инвестор покупает пай — кусочки нескольких активов,
          </span>{" "}
          а не одну дорогую акцию в одиночку. Это как скинуться с друзьями на
          подписку на онлайн-кинотеатр вместо того, чтобы каждому платить всю
          сумму.
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
          <p className="text-[16px] mb-[18px]">
            <span className="font-semibold">
              ПИФ может состоять из одинаковых или разных инструментов.
            </span>{" "}
            Все зависит от того, какую стратегию выбрала управляющая компания.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Один ПИФ может включать только акции крупных компаний, другой — только
          облигации, а третий — смесь акций, облигаций и валюты.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 9/2.png"
            alt="Character"
            width={285}
            height={238.64}
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
            <span className="bg-[#D8E2DE]">Состав ПИФов прозрачен,</span> как и
            работа фонда. Ты всегда можешь посмотреть, во что профессионалы
            вложили деньги фонда, какую доходность он приносил в прошлом, кто им
            управляет. Управляющую компанию регулирует Центральный банк РФ.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">4/7</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 9/3.png"
            alt="Basket with coins and magnifying glass"
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
          <h2>Чем интересны ПИФы</h2>
          <div className="text-[10px] text-[#D8E2DE]">5/7</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="font-semibold">
            Подходят для старта в инвестициях.
          </span>{" "}
          Тебе не нужно копить десятки тысяч рублей, чтобы купить ценные бумаги
          крупных компаний. Начать инвестировать в фонды можно со 100 рублей.
          Это безопаснее, чем сразу вкладывать много денег.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 9/4.png"
            alt="Hand with coin"
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
          <p className="text-[16px] mb-[30px]">
            <span className="font-semibold">Помогают снижать риски.</span>{" "}
            Некоторые ПИФы позволяют купить долю в готовом портфеле из разных
            инструментов: акций, облигаций, драгоценных металлов, валюты.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">6/7</div>
        </div>
        <p className="text-[16px]">
          <span className="bg-[#D8E2DE]">Это помогает снижать риски:</span> если
          что-то одно упадет в цене, другой актив может вырасти.
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
          <div></div>
          <div className="text-[10px] text-[#D8E2DE]">7/7</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Lightbulb.png"
            alt="Lightbulb"
            width={191}
            height={232.41}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px]">
          ПИФ — это способ вложиться в набор{" "}
          <span className="bg-[#E9CDA7]">из нескольких активов</span>. ПИФ можно
          купить даже на 100 рублей, поэтому они подходят начинающим инвесторам.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-3/lesson-3/test"
        variant="module3"
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
          src="/images/lesson 9/main (9).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 9/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 9/2.png"
          alt=""
          width={285}
          height={238.64}
          priority
        />
        <Image
          src="/images/lesson 9/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 9/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/Lightbulb.png"
          alt=""
          width={191}
          height={232.41}
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
          Урок 9
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
