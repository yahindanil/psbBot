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
          Что можно назвать <br />
          инвестициями, <br />а что не стоит
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 5/main (5).png"
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
            Представь: знакомый показывает тебе сайт, на котором обещают удвоить
            деньги за неделю без рисков. Звучит круто, но давай подумаем: почему
            так быстро? Почему так просто? Кто вообще это обещает?
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/11</div>
        </div>
        <p className="text-[16px]">
          В этом уроке научимся отличать инвестиции от обмана.
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
          <h2>Что можно считать настоящей инвестицией</h2>
          <div className="text-[10px] text-[#D8E2DE]">2/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Если твой друг переводит 2000 рублей в тот проект в надежде, что
          выйдет из этой затеи?
        </p>
        <div className="space-y-[15px]">
          <label className="flex items-center space-x-[10px]">
            <input
              type="checkbox"
              className="w-[20px] h-[20px] border-2 border-gray-300 rounded"
            />
            <span className="text-[16px]">
              Друг получит через неделю 4000 рублей
            </span>
          </label>
          <label className="flex items-center space-x-[10px]">
            <input
              type="checkbox"
              className="w-[20px] h-[20px] border-2 border-gray-300 rounded"
            />
            <span className="text-[16px]">Друг потеряет деньги</span>
          </label>
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
            Скорее всего, через пару дней сайт не откроется, а деньги никто не
            вернет. Друг поверил в красивые обещания, отправил деньги и не
            разобрался, кто их получит и что с ними будет. Понадеялся, что
            кто-то просто так сделает его богаче. Но так не бывает.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/11</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 5/1.png"
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
          <p className="text-[16px]">
            Инвестиции — это не волшебство, а продуманные шаги. Ты отдаешь свои
            деньги на что-то сейчас, чтобы они работали.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">4/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Например, инвестиция — это дать в долг компании, которая отправит эти
          деньги на покупку нового оборудования. Она обязуется все вернуть
          вместе с процентами.
        </p>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#D8E2DE]">
            В этой ситуации инвестор понимает, куда он переводит деньги, зачем,
            на какой срок и что может пойти не так.
          </span>
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 5/2.png"
            alt="Building with shield"
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
          <p className="text-[16px]">
            <span className="bg-[#E9CDA7]">
              Представь, что выбираешь наушники. Можно выбрать самые дешевые или
              красивые из рекламы. Или изучить отзывы, посмотреть обзоры или
              даже сходить в магазин и послушать звучание.
            </span>
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/11</div>
        </div>
        <p className="text-[16px]">
          Если просто взять первые попавшиеся наушники, можно зря потратить
          деньги и пожалеть.
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
          <h2 className="text-[16px] font-semibold">
            Что нельзя считать инвестициями
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">6/11</div>
        </div>
        <p className="text-[16px]">
          <span className="bg-[#E9CDA7]">Финансовые пирамиды.</span> Если тебе
          предлагают вложить деньги и привести друзей, чтобы они тоже вложились,
          — это финансовая пирамида. Когда она рушится, люди теряют все, что
          туда перевели.
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
            <span className="bg-[#E9CDA7]">Азартные игры.</span> Ты ставишь
            деньги на удачу. Это случайность, а не инструмент. Здесь нельзя
            просчитать риски или заранее понять, сколько заработаешь. Это как
            сдавать тест без подготовки и науки: может, и повезет, но чаще нет.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">7/11</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 5/3.png"
            alt="Slot machine"
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
          <p className="text-[16px]">
            Сайты и группы в мессенджерах и соцсетях с «быстрым и
            гарантированным доходом». Это мошенники. Им выгодно обещать слишком
            много, чтобы человек перевел деньги на эмоциях и не задавал
            вопросов.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">8/11</div>
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
            Как распознать сомнительное предложение
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">9/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Обращай внимание на такие красные флаги:
        </p>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#E9CDA7]">
            Обещают быстрый крупный заработок.
          </span>{" "}
          Например, «+100% за неделю». Ни одна настоящая инвестиция не
          гарантирует доход.
        </p>
        <p className="text-[16px]">
          <span className="bg-[#E9CDA7]">Давят на эмоции:</span> «вложи прямо
          сейчас, предложение ограничено». Это попытка заставить тебя быстрее
          расстаться с деньгами.
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
            <span className="bg-[#E9CDA7]">Не дают информацию о рисках.</span>{" "}
            Помнишь железное правило инвестиций: чем выше доходность, тем выше
            риск? Если тебе говорят только о доходе, но ничего о рисках, лучше
            держаться подальше.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">10/11</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="bg-[#E9CDA7]">
            Не пишут, кто управляет деньгами и куда они идут.
          </span>{" "}
          Настоящие инвестиции делают только через профессиональных участников
          рынка ценных бумаг. У них есть лицензия Банка России.
        </p>
        <p className="text-[16px]">
          Если тебе предлагают вложиться через мессенджер или по ссылке с
          незнакомого сайта — останавливайся.
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
          <h2 className="text-[16px] font-semibold text-white">
            Коротко о главном
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">11/11</div>
        </div>
        <div className="flex justify-center mb-[30px]">
          <Image
            src="/images/lesson 5/4.png"
            alt="Lightbulb"
            width={191}
            height={232.41}
            loading="eager"
          />
        </div>
        <p className="text-[16px] text-white mb-[30px]">
          Настоящие инвестиции — это всегда{" "}
          <span className="bg-[#DFB57F]">взвешенное решение</span>. Если тебе
          обещают принести деньги быстро и без рисков — это мошенники.
        </p>
        <p className="text-[16px] text-white mb-[30px]">
          Инвестировать стоит только через{" "}
          <span className="bg-[#DFB57F]">компании-посредники с лицензией</span>{" "}
          Банка России — лицензией брокера.
        </p>
        <p className="text-[16px] text-white">
          Если ты не можешь найти информацию о компании на официальном сайте ЦБ
          РФ и не понимаешь, куда идут деньги, — держись от такого предложения
          подальше.
        </p>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-2/lesson-1/test"
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
          src="/images/lesson 5/1.png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 5/2.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 5/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 5/4.png"
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
