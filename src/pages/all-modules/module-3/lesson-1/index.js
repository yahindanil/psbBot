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
          <span className="bg-[#E9CDA7]">Что такое акции</span> <br />и как они
          работают
        </h1>
        <p className="text-center text-[16px] mb-[24px]">
          Представь, что вы с друзьями скинулись на пиццу. Кто дал денег больше,
          тот имеет право на кусочек побольше.
        </p>
        <p className="text-center text-[12px] mb-[24px]">
          С акциями примерно так же. Давай разберемся
        </p>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 7/main (7).png"
            alt="Character with pizza"
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
          <h2 className="text-[16px] font-semibold text-white">
            Что такое акция
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">1/10</div>
        </div>
        <p className="text-[16px] text-white mb-[30px]">
          <span className="font-semibold">Акция — это доля в компании.</span>{" "}
          Когда ты покупаешь акцию, у тебя появляется «кусочек» компании.
        </p>
        <p className="text-[16px] text-white mb-[30px]">
          Это не значит, что ты становишься директором этой компании. Но ты
          сможешь зарабатывать, если дела у компании будут в порядке.
        </p>
        <p className="text-[16px] text-white">
          Если компания развивается, становится популярнее и получает прибыль,
          то ее акции становятся дороже. А ты тоже в плюсе.
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
          <h2 className="text-[16px] font-semibold">
            Зачем компании выпускают акции
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="font-semibold">Представь:</span> бизнес хочет
          развиваться, выпускать новые продукты. Для этого нужны средства, но
          свободный денег у компании пока нет.
        </p>
        <p className="text-[16px]">
          Поэтому компания предлагает инвесторам поучаствовать в своем развитии
          через акции. Получает деньги на свои проекты, а инвестор —{" "}
          <span className="bg-[#D8E2DE]">шанс заработать,</span> если все
          сложится хорошо.
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
            <span className="font-semibold">Наоборот тоже бывает:</span> если
            план компании не сработает,{" "}
            <span className="bg-[#D8E2DE]">инвесторы потеряют деньги.</span> В
            инвестициях риск есть всегда.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/10</div>
        </div>
        <div className="flex justify-center mt-[30px]">
          <Image
            src="/images/lesson 7/1.png"
            alt="Scales"
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
          <h2 className="text-[16px] font-semibold">
            Как можно заработать на акциях
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">Есть два основных способа:</p>
        <p className="text-[16px] mb-[30px]">
          <strong>Продать дороже в будущем.</strong> Например, покупаешь акции
          за 10 000 рублей, а через год они стоят 12 000 рублей. Если продаешь,
          то зарабатываешь 2000 рублей.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 7/2.png"
            alt="Calculator"
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
            <strong>Получать дивиденды.</strong> Некоторые компании делятся
            частью своей{" "}
            <span className="bg-[#D8E2DE]">прибыли с акционерами</span> — теми,
            кто владеет их акциями. Эти выплаты называются дивидендами.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Не все компании платят дивиденды. Некоторые вкладывают прибыль, чтобы
          дальше развивать бизнес. Тогда заработать на акциях такой компании
          можно только за счет роста их стоимости. Ты всегда можешь узнать
          заранее, платит ли компания дивиденды.
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
            От чего зависит цена акций
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">6/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Цена акций зависит от того, каким{" "}
          <span className="bg-[#D8E2DE]">
            инвесторы видят будущее компании.
          </span>
        </p>
        <p className="text-[16px] mb-[30px]">
          Инвесторы смотрят, что происходит с бизнесом и вообще в мире, и
          решают, покупать акции или нет.
        </p>
        <p className="text-[16px]">
          Когда многие инвесторы считают компанию перспективной и хотят купить
          ее акции, <span className="bg-[#D8E2DE]">их цена будет расти.</span> А
          когда инвесторы, наоборот, хотят продать акции компании, то их цена
          будет падать.
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
            Вот как цена акций может{" "}
            <span className="bg-[#D8E2DE]">реагировать на поведение</span>{" "}
            инвесторов:
          </p>
          <div className="text-[10px] text-[#D8E2DE]">7/10</div>
        </div>
        <ul className="text-[16px] space-y-[15px] mb-[30px] list-disc pl-[20px]">
          <li>
            <strong>Люди увидели тревожные новости,</strong> что дела у компании
            идут плохо → боятся потерять деньги → продают акции → цена акций
            падает
          </li>
          <li>
            <strong>Компания отчиталась о хорошей прибыли</strong> → инвесторы
            бегут покупать ее акции, чтобы заработать → цена акций растет
          </li>
        </ul>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 7/3.png"
            alt="Character thinking"
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
          <h2 className="text-[16px] font-semibold">
            Почему акции — это инвестиции с риском
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">8/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          <span className="font-semibold">
            Цена акций может меняться каждый день.
          </span>{" "}
          Они могут подорожать — и ты заработаешь. Но если что-то пойдет не так,
          акции подешевеют, и ты можешь{" "}
          <span className="bg-[#D8E2DE]">потерять часть денег.</span>
        </p>
        <p className="text-[16px]">
          Никто не может предсказать, как будут развиваться события. Поэтому
          акции — инструмент с большим риском.
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
            <span className="font-semibold">
              Акции — это инструмент на долгий срок,
            </span>{" "}
            он не подойдет для краткосрочных целей. Здесь не стоит рассчитывать
            на результат через неделю и даже через год. Зато их можно
            использовать на будущее. Например, собрать деньги на старт своего
            бизнеса.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">9/10</div>
        </div>
        <div className="flex justify-center mt-[30px]">
          <Image
            src="/images/lesson 7/4.png"
            alt="Character with tablet"
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
          <div className="text-[10px] text-[#D8E2DE]">10/10</div>
        </div>
        <div className="flex justify-center mb-[30px]">
          <Image
            src="/images/lesson 7/5.png"
            alt="Lightbulb"
            width={191}
            height={232.41}
            loading="eager"
          />
        </div>
        <div className="text-center">
          <h2 className="text-[16px] font-semibold text-white">
            Коротко о главном
          </h2>
          <p className="text-[16px] text-white mb-[30px]">
            <span className="bg-[#DFB57F]">Акция — это частичка бизнеса,</span>{" "}
            которая поможет стать владельцем долей компании. Инвестор
            зарабатывает на акциях, если компания растет и платит дивиденды.
          </p>
          <p className="text-[16px] text-white">
            На акциях можно зарабатывать больше и быстрее, чем на других
            инструментах, но так же быстро можно и потерять деньги.
          </p>
        </div>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "test",
    content: (
      <TestBlock
        testUrl="/all-modules/module-3/lesson-1/test"
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
          src="/images/lesson 7/main (7).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 7/1.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 7/2.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 7/3.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 7/4.png"
          alt=""
          width={264}
          height={233}
          priority
        />
        <Image
          src="/images/lesson 7/5.png"
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
          Урок 7
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
