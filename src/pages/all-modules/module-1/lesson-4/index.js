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
          Как инвестиции <br />
          <span className="bg-[#E9CDA7]">помогают достичь</span> <br />
          целей
        </h1>
        <p className="text-center text-[16px] mb-[24px] px-[20px]">
          В прошлом уроке мы узнали, что инфляция может съесть часть накоплений.
          Давай разберемся, что же делать, если просто копить деньги —
          недостаточно.
        </p>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 4/main (3).png"
            alt="Artem with phone"
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
          <h2>Что такое инвестиции</h2>
          <div className="text-[10px] text-[#D8E2DE]">1/11</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          Инвестиции — это способ запустить деньги в работу. Вместо того чтобы
          просто держать накопления в копилке или на карте, их можно вложить.
          Например, в ценные бумаги.
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/lesson 4/1.png"
            alt="Plant growing"
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
        <div className="flex justify-end mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Ценные бумаги — это документы, которые подтверждают, что ты дал на
            время деньги какой-то компании.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">2/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если у такой компании бизнес идет хорошо, ты можешь получить назад и
          свои деньги, и еще проценты сверху. В следующих уроках подробнее
          разберем, как работают разные ценные бумаги.
        </p>
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
            Инвестиции — это не волшебство, не быстрый способ разбогатеть за
            неделю, а инструмент.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/11</div>
        </div>

        <p className="text-[16px] mb-[30px]">
          Представь, что у тебя в игре есть артефакт. Он не делает всю работу за
          тебя, но усиливает твоего героя. Например, дает бонус к силе.
          Инвестиции работают так же: они помогают сохранить и увеличить
          накопления.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 4/2.png"
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
        <div className="flex justify-between items-start mb-[15px]">
          <h2>Чем инвестиции отличаются от обычного накопления</h2>
          <div className="text-[10px] text-[#D8E2DE]">4/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Когда ты просто откладываешь деньги, сумма растет только за счет твоих
          усилий: пополняешь копилку, на сколько можешь.
        </p>
        <p className="text-[16px] mb-[30px]">
          А инвестиции строятся на предположениях, почему твои деньги могут
          принести доход без пополнений. Это называется инвестиционная идея.
        </p>
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
            Например, ты замечаешь, что многие ездят на электросамокатах. Если
            тренд продолжится, компания, которая их делает, может заработать
            больше.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/11</div>
        </div>

        <p className="text-[16px] mb-[30px]">
          Если одолжить компании деньги на время под проценты, можно
          потенциально заработать. Это и есть инвестиционная идея.
        </p>
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
            А еще инвестиции работают за счет{" "}
            <span className="bg-[#D8E2DE] font-semibold">
              сложного процента
            </span>
            : когда ты получаешь доход не только с вложенной суммы, но и с уже
            накопленных процентов.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">6/11</div>
        </div>

        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 4/3.png"
            alt="Magic lamp"
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
          <p className="text-[16px] mb-[30px]">
            Эффект{" "}
            <span className="bg-[#D8E2DE] font-semibold">
              сложного процента
            </span>{" "}
            усиливается со временем. Это называется «деньги делают деньги». И
            чем больше срок — тем сильнее этот эффект.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">7/11</div>
        </div>

        <p className="text-[16px] mb-[30px]">
          Например, 1 млн ₽ через 5 лет в инвестициях может превратиться в 1,7
          млн ₽, даже если не пополнять свои вложения. Так работает сложный
          процент.
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
          <h2>Инвестиции — это не гарантия, а возможность.</h2>
          <div className="text-[10px] text-[#D8E2DE]">8/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если идея не сработала, можно ничего не заработать и даже потерять
          вложенные деньги. Поэтому инвесторы всегда внимательно оценивают, во
          что вкладывают, зачем и что может пойти не так.
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
            Как инвестиции <br />
            <span className="bg-[#E9CDA7]">помогают достичь целей</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">9/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Допустим, ты хочешь накопить на телефон, просто откладывая деньги на
          отдельный счет.
        </p>
        <p className="text-[16px] mb-[30px]">
          Как быстро накопится нужная сумма, зависит от того, сколько ты сможешь
          откладывать каждый месяц. Возможно, ждать придется долго.
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 4/4.png"
            alt="Dartboard"
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
          <p className="text-[16px] mb-[30px]">
            Если вложить часть в инвестиции, есть шанс накопить быстрее. Деньги
            начинают работать и приносить дополнительный доход. Есть возможность
            достичь цели немного раньше или накопить больше, чем планируешь.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">10/11</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 4/5.png"
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
        <div className="flex justify-end mb-[15px]">
          <div className="text-[10px] text-[#D8E2DE]">11/11</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 4/6.png"
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
          Инвестиции — это не магия и не кнопка «разбогатеть». Это инструмент,
          который помогает{" "}
          <span className="bg-[#DFB57F]">быстрее приблизиться к цели</span>,
          если ты понимаешь, как он работает. Особенно если цель не на завтра, а
          на год, два или три вперед.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: <TestBlock testUrl="/all-modules/module-1/lesson-4/test" />,
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
          src="/images/lesson 4/main (3).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 4/1.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/lesson 4/2.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 4/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 4/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 4/5.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 4/6.png"
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
          Урок 4
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
