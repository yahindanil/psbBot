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
          Облигации: <br />
          как работают и чем <br />
          отличаются от акций
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 8/main (8).png"
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
            Представь: ты даешь другу 1000 рублей на месяц. Он обещает вернуть
            1050 рублей. 50 рублей сверху за то, что ты выручаешь.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/11</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          Так же работает облигация, только вместо друга — компания или
          государство.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 8/1.png"
            alt="Character"
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
          <h2>Что такое облигация</h2>
          <div className="text-[10px] text-[#D8E2DE]">2/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Облигация — это как официальная расписка. Ты даёшь деньги взаймы, а
          тебе обещают вернуть их в срок и накинуть процент сверху. Этот
          «процент сверху» называется купоном.
        </p>
        <p className="text-[16px]">
          Когда срок облигации заканчивается, ты получаешь обратно её номинал —
          всю сумму, которую у тебя взяли в долг.
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
            При покупке облигации ты сразу знаешь, сколько заработаешь и когда.
            Поэтому облигации — один из самых предсказуемых и понятных
            инструментов. Все условия известны заранее, никаких сюрпризов.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/11</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 8/2.png"
            alt="Calendar"
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
          <h2>Как облигации приносят доход</h2>
          <div className="text-[10px] text-[#D8E2DE]">4/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Обычно, когда ты покупаешь облигацию, тебе положены регулярные выплаты
          — купоны.
        </p>
        <p className="text-[16px] mb-[30px]">
          Купоны могут приходить каждые три месяца, раз в полгода или раз в год.
          Это называется <span className="bg-[#E9CDA7]">купонный доход</span>.
          Обычно его указывают как годовой процент.
        </p>
        <p className="text-[16px]">
          Если у облигации за 1000 рублей купон 20% годовых, то доход — 200
          рублей в год.
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
          <h2>Еще можно заработать на разнице цен</h2>
          <div className="text-[10px] text-[#D8E2DE]">5/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Иногда облигации продаются дешевле, чем они стоят по номиналу. Если
          дождаться погашения, то заработаешь еще и на разнице.
        </p>
        <p className="text-[16px]">
          Перед тем как покупать такие облигации, стоит разобраться, а почему
          они такие дешевые. Бывает, что у бизнеса большие проблемы — инвесторы
          избавляются от его облигаций, поэтому их цена падает.
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
          <h2>Чем облигации отличаются от акций</h2>
          <div className="text-[10px] text-[#D8E2DE]">6/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Акции и облигации приносят доход по-разному.
        </p>
        <p className="text-[16px] mb-[30px]">
          Когда ты покупаешь акцию, ты можешь заработать, если у компании дела
          идут хорошо.
        </p>
        <p className="text-[16px] mb-[30px]">
          Но, если дела пойдут плохо, ты рискуешь потерять часть вложенных
          денег.
        </p>
        <p className="text-[16px]">
          У акций больше потенциала для роста, но и больше неопределенности.
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
            Облигация — это не доля в бизнесе, а долг компании перед
            инвесторами. Доход по ней потенциально меньше, чем по акциям,{" "}
            <span className="bg-[#E9CDA7]">зато более предсказуемый</span>. Ты
            знаешь, сколько и когда получишь, если все пойдет по плану.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">7/11</div>
        </div>
        <p className="text-[16px]">
          Цена у облигаций обычно меняется не так сильно, как у акций. Если
          компания не испытывает серьезных проблем, нет предпосылок к тому,
          чтобы цена облигации резко менялась.
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
            Облигации — инструмент с более предсказуемым доходом. Это как колесо
            обозрения, которое движется медленно и планово.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">8/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          А акции — это возможность роста, но и больший риск. Это как
          американские горки с резкими подъемами и падениями.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 8/3.png"
            alt="Character"
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
          <h2>Кто выпускает облигации</h2>
          <div className="text-[10px] text-[#D8E2DE]">9/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Облигации могут выпускать не только компании, но и государство.
          Например, чтобы строить дороги или школы.
        </p>
        <p className="text-[16px]">
          Чем надежнее тот, кто берет в долг, тем выше шанс, что тебе все вернут
          вовремя и с процентами.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 8/4.png"
            alt="Factory"
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
          <h2>Когда облигации могут пригодиться</h2>
          <div className="text-[10px] text-[#D8E2DE]">10/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Облигации — это не способ быстро разбогатеть. Они подходят, если ты
          хочешь, чтобы деньги работали и немного обгоняли инфляцию, но не
          планируешь сильно рисковать. Это хороший вариант для старта в
          инвестициях.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 8/5.png"
            alt="Character"
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
          <div className="text-[10px] text-[#D8E2DE]">11/11</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 8/6.png"
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
          Облигация — это способ получить процент за то, что ты даешь деньги в
          долг компании или государству. Как правило, это{" "}
          <span className="bg-[#E9CDA7]">более безопасный</span> инструмент, чем
          акции. Ты не потеряешь все, если выберешь компанию с умом.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-3/lesson-2/test"
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
          src="/images/lesson 8/main (8).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 8/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 8/2.png"
          alt=""
          width={285}
          height={238.64}
          priority
        />
        <Image
          src="/images/lesson 8/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 8/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 8/5.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 8/6.png"
          alt=""
          width={191}
          height={232.41}
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
          Урок 8
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
