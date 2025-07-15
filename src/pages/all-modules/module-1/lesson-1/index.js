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
          не берутся <span className="bg-[#E9CDA7]">из воздуха</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 1/main.png"
            alt="Lock Icon"
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
          <h2>Представь: тебе подарили 3000 ₽.</h2>
          <div className="text-[10px] text-[#D8E2DE]">1/9</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          Проходит всего пара дней — и ты не можешь вспомнить, куда они делись.
          Вроде ничего особенного не купил, но денег уже нет. Почему так
          произошло?
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/Money.png"
            alt="Lock Icon"
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
            Почему деньги <br />{" "}
            <span className="bg-[#E9CDA7]">быстро исчезают</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/9</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Деньги исчезают не потому, что с ними происходит что-то мистическое.
          Просто мы не всегда замечаем, на что тратим.
        </p>
        <p className="mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">
            Приводим несколько сценариев:
          </span>{" "}
          увидел прикольный чехол для телефона — не удержался и купил, пошел с
          друзьями в кафе голодный — купил лишнюю булочку.
        </p>
        <p>
          Суммы вроде небольшие, но если не следить, за пару дней можно
          потратить все карманные деньги.
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
          <h2>Как распоряжаться деньгами — это выбор</h2>
          <div className="text-[10px] text-[#D8E2DE]">3/9</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Деньги у всех появляются примерно одинаково. Например, вы с друзьями
          сделали что-то полезное по дому, продали на Авито свою коллекцию лего
          или получили деньги в подарок на день рождения. Но что дальше с ними
          будет, зависит от каждого из вас.
        </p>
        <p className="text-[16px] mb-[18px]">
          <span className="bg-[#D8E2DE] font-semibold">Приводим примеры:</span>{" "}
          кто-то тратит все сразу, а кто-то планирует и откладывает на новый
          велик. Все дело в выборе.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/Snacks or Bike.png"
            alt="Lock Icon"
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
          <h2>
            <span className="bg-[#E9CDA7]">Что мешает</span>
            <br />
            удержать деньги
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/9</div>
        </div>
        <p className="text-[16px] mb-[10px]">
          Есть три привычки, из-за которых деньги заканчиваются быстрее, чем
          хотелось бы.
        </p>
        <p className="text-[16px] mb-[18px]">
          <span className="bg-[#D8E2DE] font-semibold">Привычка 1.</span>{" "}
          Покупать на эмоциях. Видишь яркий скетчбук или значки на рюкзак — и в
          тот же момент покупаешь. Хотя дома уже есть два скетчбука, а значков —
          полный ящик. Через день забываешь о новых покупках и уже не понимаешь,
          зачем они тебе. Знакомо?
        </p>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Artem smiling.png"
            alt="Lock Icon"
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
            <span className="bg-[#E9CDA7]">Что мешает</span>
            <br />
            удержать деньги
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">5/9</div>
        </div>
        <p className="text-[16px] mb-[10px]">
          <span className="bg-[#D8E2DE] font-semibold">
            Привычка 2. Повторять за другими.
          </span>
          <br />
          Друг купил наушники, у одноклассников мерч от любимого блогера — и
          тебе тоже хочется.
        </p>
        <p className="text-[16px] mb-[18px]">
          Скорее всего, тебе эти вещи не нужны, но ты все равно покупаешь. Так
          деньги незаметно уходят на все подряд.
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
            <span className="bg-[#E9CDA7]">Что мешает</span>
            <br />
            удержать деньги
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">6/9</div>
        </div>
        <p className="text-[16px] mb-[10px]">
          <span className="bg-[#D8E2DE] font-semibold">
            Привычка 3. Ждать легких денег.
          </span>
          <br />В соцсетях часто попадается реклама: «Вложи сюда пару тысяч — и
          за неделю получишь в два раза больше!» Звучит заманчиво.
        </p>
        <p className="text-[16px] mb-[18px]">
          Но если тебе обещают деньги просто так — это обман. В надежде получить
          больше можно все потерять.
        </p>

        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Happy and sad Artem.png"
            alt="Lock Icon"
            width={349}
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
          <h2>Управлять деньгами можно научиться</h2>
          <div className="text-[10px] text-[#D8E2DE]">7/9</div>
        </div>
        <p className="text-[16px] mb-[10px]">
          Умение разбираться в деньгах называют{" "}
          <span className="bg-[#D8E2DE]">финансовой грамотностью.</span> Она
          помогает обращаться с деньгами так, чтобы их всегда хватало.
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
            Финансовая грамотность — это не суперспособность и не скучная
            теория, а простые шаги, которые можно делать каждый день. Расскажу о
            них в следующих уроках.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">8/9</div>
        </div>

        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Artem happy.png"
            alt="Lock Icon"
            width={324}
            height={259.37}
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
          <div className="text-[10px] text-[#D8E2DE]">9/9</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Lightbulb.png"
            alt="Lock Icon"
            width={191}
            height={232.41}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px]">
          Деньги — это{" "}
          <span className="bg-[#DFB57F]">не магия, а инструмент.</span>
          <br />
          Они не появляются просто так и не исчезают без причины.
          <br />
          Чем лучше ты понимаешь, как приходят и уходят деньги, тем проще тебе
          ими управлять.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: <TestBlock testUrl="/all-modules/module-1/lesson-1/test" />,
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
          src="/images/lesson 1/main.png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/Money.png"
          alt=""
          width={249}
          height={208}
          priority
        />
        <Image
          src="/images/Snacks or Bike.png"
          alt=""
          width={285}
          height={238.64}
          priority
        />
        <Image
          src="/images/Artem smiling.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/Happy and sad Artem.png"
          alt=""
          width={349}
          height={238.64}
          priority
        />
        <Image
          src="/images/Artem happy.png"
          alt=""
          width={324}
          height={259.37}
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
          Урок 1
        </div>
      </header>

      {/* Start page */}
      {page === 0 && (
        <div className="lesson-start-page mt-[10px]">
          {lessonPages[0].content}
          <div className="flex justify-center mb-[40px]">
            <Button className="w-[225px]" onClick={handleStart}>
              Начать учиться
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
